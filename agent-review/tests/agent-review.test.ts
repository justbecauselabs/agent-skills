import { afterEach, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  ReviewError,
  buildBundle,
  collectScope,
  invokeClaude,
  invokeCodex,
  isSensitivePath,
  validateReport,
} from "../scripts/agent-review.ts";

const SCRIPT = resolve(import.meta.dir, "../scripts/agent-review.ts");
const temporaryRoots: string[] = [];

// Create an isolated temporary root and register it for cleanup.
function makeTemporaryRoot(): string {
  const root = mkdtempSync(join(tmpdir(), "agent-review-test."));
  temporaryRoots.push(root);
  return root;
}

// Run Git with deterministic test authorship.
function git(repo: string, ...args: string[]): string {
  const result = spawnSync("git", args, {
    cwd: repo,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "Agent Review Test",
      GIT_AUTHOR_EMAIL: "agent-review@example.invalid",
      GIT_COMMITTER_NAME: "Agent Review Test",
      GIT_COMMITTER_EMAIL: "agent-review@example.invalid",
    },
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || "git failed");
  }
  return result.stdout;
}

// Create a minimal committed repository for scope tests.
function makeRepository(root: string): string {
  const repo = join(root, "repo");
  mkdirSync(repo);
  git(repo, "init", "-q");
  writeFileSync(join(repo, "app.ts"), "export function value() {\n  return 1;\n}\n");
  git(repo, "add", "app.ts");
  git(repo, "commit", "-qm", "initial");
  return repo;
}

// Write a small fake executable without introducing test runtime dependencies.
function writeExecutable(path: string, body: string): void {
  writeFileSync(path, `#!/bin/sh\nset -eu\n${body}\n`);
  chmodSync(path, 0o755);
}

afterEach(() => {
  while (temporaryRoots.length > 0) {
    const root = temporaryRoots.pop();
    if (root) {
      rmSync(root, { recursive: true, force: true });
    }
  }
});

describe("agent-review", () => {
  test("refuses credential paths without blocking ordinary security code", () => {
    expect(isSensitivePath(".env")).toBe(true);
    expect(isSensitivePath(".env.production")).toBe(true);
    expect(isSensitivePath("config/credentials.json")).toBe(true);
    expect(isSensitivePath("certs/private.key")).toBe(true);
    expect(isSensitivePath(".ssh/id_ed25519")).toBe(true);
    expect(isSensitivePath(".env.example")).toBe(false);
    expect(isSensitivePath("src/token-utils.ts")).toBe(false);
  });

  test("collects tracked and untracked local changes", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    writeFileSync(join(repo, "app.ts"), "export function value() {\n  return 2;\n}\n");
    writeFileSync(join(repo, "new.ts"), "export const VALUE = 3;\n");

    const scope = collectScope({
      repo,
      mode: "local",
      base: "origin/main",
      commit: "HEAD",
    });

    expect(scope.paths).toEqual(["app.ts", "new.ts"]);
    expect(scope.snapshotRef).toBeNull();
    expect(scope.patch).toContain("return 2");
    expect(scope.patch).toContain("VALUE = 3");
    expect(scope.label).toContain("working tree");
  });

  test("includes current changed-file snapshots in the bundle", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    writeFileSync(join(repo, "app.ts"), "export function value() {\n  return 2;\n}\n");
    const scope = collectScope({
      repo,
      mode: "local",
      base: "origin/main",
      commit: "HEAD",
    });

    const bundle = buildBundle({ repo, scope });

    expect(bundle).toContain("# Patch");
    expect(bundle).toContain("## app.ts");
    expect(bundle).toContain("return 2");
  });

  test("rejects findings outside the changed path set", () => {
    expect(() =>
      validateReport({
        changedPaths: new Set(["app.ts"]),
        report: {
          verdict: "findings",
          summary: "one issue",
          findings: [
            {
              priority: "P1",
              category: "security",
              file: "outside.ts",
              line: 1,
              title: "Outside",
              evidence: "Not in the diff.",
              recommendation: "Do not report it.",
            },
          ],
        },
      }),
    ).toThrow(ReviewError);
  });

  test("collects a dry-run bundle without invoking a reviewer", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    writeFileSync(join(repo, "app.ts"), "export function value() {\n  return 2;\n}\n");

    const result = spawnSync("bun", [SCRIPT, "--mode", "local", "--dry-run"], {
      cwd: repo,
      encoding: "utf8",
      env: process.env,
    });

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("agent-review dry-run:");
    expect(result.stdout).toContain("1 changed paths");
  });

  test("uses the fixed Codex Sol profile", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    writeExecutable(
      join(binDirectory, "codex"),
      `
model=""
output=""
while [ "$#" -gt 0 ]; do
  case "$1" in
    --model) shift; model="$1" ;;
    --output-last-message) shift; output="$1" ;;
  esac
  shift
done
[ "$model" = "gpt-5.6-sol" ]
printf '{"verdict":"clean","summary":"clean","findings":[]}' > "$output"
`,
    );

    const report = invokeCodex({
      repo,
      workspace,
      prompt: "review",
      binary: join(binDirectory, "codex"),
    });

    expect(report).toEqual({
      verdict: "clean",
      summary: "clean",
      findings: [],
    });
  });

  test("uses the fixed Claude Fable profile", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    writeExecutable(
      join(binDirectory, "claude"),
      `
model=""
while [ "$#" -gt 0 ]; do
  if [ "$1" = "--model" ]; then
    shift
    model="$1"
  fi
  shift
done
[ "$model" = "claude-fable-5" ]
printf '{"structured_output":{"verdict":"clean","summary":"clean","findings":[]}}'
`,
    );

    const report = invokeClaude({
      repo,
      workspace,
      prompt: "review",
      binary: join(binDirectory, "claude"),
    });

    expect(report).toEqual({
      verdict: "clean",
      summary: "clean",
      findings: [],
    });
  });
});
