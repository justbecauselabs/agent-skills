import { afterEach, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import {
  ReviewError,
  assertRepositoryMatchesScope,
  assertScopeUnchanged,
  buildBundle,
  collectScope,
  invokeClaude,
  invokeCodex,
  isSensitivePath,
  reviewerPrompt,
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

  test("requires frozen reviews to match a clean checkout", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const scope = collectScope({
      repo,
      mode: "commit",
      base: "origin/main",
      commit: "HEAD",
    });

    expect(() => assertRepositoryMatchesScope({ repo, scope })).not.toThrow();

    writeFileSync(join(repo, "app.ts"), "export function value() { return 2; }\n");
    expect(() => assertRepositoryMatchesScope({ repo, scope })).toThrow(
      "branch and commit review require a clean worktree",
    );

    git(repo, "add", "app.ts");
    git(repo, "commit", "-qm", "second");
    expect(() => assertRepositoryMatchesScope({ repo, scope })).toThrow(
      "repository HEAD does not match reviewed revision",
    );
  });

  test("rejects repository changes made while a local review is running", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    writeFileSync(join(repo, "app.ts"), "export function value() { return 2; }\n");
    const scope = collectScope({
      repo,
      mode: "local",
      base: "origin/main",
      commit: "HEAD",
    });

    assertScopeUnchanged({
      repo,
      scope,
      mode: "local",
      base: "origin/main",
      commit: "HEAD",
    });

    writeFileSync(join(repo, "app.ts"), "export function value() { return 3; }\n");
    expect(() =>
      assertScopeUnchanged({
        repo,
        scope,
        mode: "local",
        base: "origin/main",
        commit: "HEAD",
      }),
    ).toThrow("repository changed during review; discard this verdict");
  });

  test("uses one combined review contract for every convergence round", () => {
    const prompt = reviewerPrompt("review bundle");

    expect(prompt).toContain(
      "Check correctness, security, structural quality, modularity, and reuse together.",
    );
    expect(prompt).toMatch(/Prefer\s+deleting complexity to moving it/);
    expect(prompt).toMatch(/Treat this as a read-only review/);
    expect(prompt).toContain(
      "search the repository for newly introduced or relocated helpers",
    );
    expect(prompt).toContain("generic utility modules without real aligned consumers");
    expect(prompt).not.toContain("# This round");
    expect(prompt).toContain("review bundle");
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

  test("runs Codex Sol at the repository root", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const canonicalRepo = realpathSync(repo);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    writeExecutable(
      join(binDirectory, "codex"),
      `
model=""
reasoning=""
project_doc_max_bytes=""
project_doc_fallback_filenames=""
project_trust=""
sandbox=""
skip_git_repo_check=false
ephemeral=false
ignore_user_config=false
ignore_rules=false
schema=""
output=""
color=""
cwd=""
actual_pwd="$PWD"
[ "$1" = "exec" ]
shift
while [ "$#" -gt 0 ]; do
  case "$1" in
    --model) shift; model="$1" ;;
    -c)
      shift
      case "$1" in
        'model_reasoning_effort="high"') reasoning="$1" ;;
        'project_doc_max_bytes=0') project_doc_max_bytes="$1" ;;
        'project_doc_fallback_filenames=[]') project_doc_fallback_filenames="$1" ;;
        projects.*'.trust_level="untrusted"') project_trust="$1" ;;
      esac
      ;;
    --sandbox) shift; sandbox="$1" ;;
    --skip-git-repo-check) skip_git_repo_check=true ;;
    --ephemeral) ephemeral=true ;;
    --ignore-user-config) ignore_user_config=true ;;
    --ignore-rules) ignore_rules=true ;;
    --output-schema) shift; schema="$1" ;;
    --output-last-message) shift; output="$1" ;;
    --color) shift; color="$1" ;;
    -C) shift; cwd="$1" ;;
  esac
  shift
done
[ "$model" = "gpt-5.6-sol" ]
[ "$reasoning" = 'model_reasoning_effort="high"' ]
[ "$project_doc_max_bytes" = "project_doc_max_bytes=0" ]
[ "$project_doc_fallback_filenames" = "project_doc_fallback_filenames=[]" ]
[ "$project_trust" = 'projects.${JSON.stringify(canonicalRepo)}.trust_level="untrusted"' ]
[ "$sandbox" = "" ]
[ "$skip_git_repo_check" = "true" ]
[ "$ephemeral" = "true" ]
[ "$ignore_user_config" = "true" ]
[ "$ignore_rules" = "true" ]
[ -s "$schema" ]
[ "$color" = "never" ]
[ "$cwd" = "${canonicalRepo}" ]
[ "$actual_pwd" = "${canonicalRepo}" ]
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

  test("runs Claude Fable at the repository root", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const canonicalRepo = realpathSync(repo);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    writeExecutable(
      join(binDirectory, "claude"),
      `
model=""
print_mode=false
effort=""
safe_mode=false
setting_sources=""
strict_mcp_config=false
mcp_config=""
tools="unset"
permission_mode=""
no_session_persistence=false
output_format=""
json_schema=""
actual_pwd="$PWD"
while [ "$#" -gt 0 ]; do
  case "$1" in
    --print) print_mode=true ;;
    --model) shift; model="$1" ;;
    --effort) shift; effort="$1" ;;
    --safe-mode) safe_mode=true ;;
    --setting-sources) shift; setting_sources="$1" ;;
    --strict-mcp-config) strict_mcp_config=true ;;
    --mcp-config) shift; mcp_config="$1" ;;
    --tools) shift; tools="$1" ;;
    --permission-mode) shift; permission_mode="$1" ;;
    --no-session-persistence) no_session_persistence=true ;;
    --output-format) shift; output_format="$1" ;;
    --json-schema) shift; json_schema="$1" ;;
  esac
  shift
done
[ "$model" = "claude-fable-5" ]
[ "$print_mode" = "true" ]
[ "$effort" = "max" ]
[ "$safe_mode" = "true" ]
[ "$setting_sources" = "user" ]
[ "$strict_mcp_config" = "true" ]
[ "$mcp_config" = '{"mcpServers":{}}' ]
[ "$tools" = "default" ]
[ "$actual_pwd" = "${canonicalRepo}" ]
[ "$permission_mode" = "dontAsk" ]
[ "$no_session_persistence" = "true" ]
[ "$output_format" = "json" ]
[ -n "$json_schema" ]
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

  test("surfaces actionable reviewer CLI failures", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    const codex = join(binDirectory, "codex");
    const claude = join(binDirectory, "claude");
    writeExecutable(
      codex,
      "printf '\\033[31mcodex flag\\r changed\\033[0m\\n' >&2\nexit 9",
    );
    writeExecutable(claude, "printf 'claude flag changed\\n' >&2\nexit 7");

    expect(() =>
      invokeCodex({ repo, workspace, prompt: "review", binary: codex }),
    ).toThrow("Codex Sol review failed\ncodex flag changed");
    expect(() =>
      invokeClaude({ repo, workspace, prompt: "review", binary: claude }),
    ).toThrow("Claude Fable review failed\nclaude flag changed");
  });

  test("does not relay reviewer stdout on failure", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    const claude = join(binDirectory, "claude");
    writeExecutable(
      claude,
      "printf 'untrusted model output\\n'\nprintf 'usage error\\n' >&2\nexit 7",
    );

    expect(() =>
      invokeClaude({ repo, workspace, prompt: "review", binary: claude }),
    ).toThrow("Claude Fable review failed\nusage error");
    try {
      invokeClaude({ repo, workspace, prompt: "review", binary: claude });
    } catch (error) {
      expect(String(error)).not.toContain("untrusted model output");
    }
  });

  test("refuses an external executable symlinked into the repository", () => {
    const root = makeTemporaryRoot();
    const repo = makeRepository(root);
    const workspace = join(root, "workspace");
    const binDirectory = join(root, "bin");
    const repositoryBinary = join(repo, "reviewer");
    mkdirSync(workspace);
    mkdirSync(binDirectory);
    writeExecutable(repositoryBinary, "exit 0");
    const externalLink = join(binDirectory, "codex");
    symlinkSync(repositoryBinary, externalLink);

    expect(() =>
      invokeCodex({ repo, workspace, prompt: "review", binary: externalLink }),
    ).toThrow("refusing repository-local executable");
  });
});
