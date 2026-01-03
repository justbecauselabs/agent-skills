---
name: bun
description: Bun runtime and package manager guidance. Use when running Bun commands, managing dependencies, executing scripts, using bunx, running tests, or troubleshooting Bun-specific behavior in JS/TS projects.
---

# Bun

## Overview
Use this skill to operate Bun projects and choose the correct Bun command for installs, scripts, and tests. Keep guidance consistent with the project's existing scripts and configuration.

## Workflow
1. Check for Bun indicators: `bun.lockb`, `bunfig.toml`, or `package.json` scripts that mention Bun.
2. Prefer project scripts over ad-hoc commands; use `bun run <script>` for `dev`, `build`, or `test` when defined.
3. Use Bun's native tools only when the repo expects them (for example, `bun test` with Bun's test runner).
4. Avoid editing lockfiles by hand; update dependencies via Bun commands.

## Command Reference
- Read `references/bun.md` when you need concrete command lines, testing guidance, or dependency workflows.

## Notes
- Keep commands explicit and predictable; avoid clever flags unless the project already uses them.
- If the repo uses another tool (pnpm, yarn, npm), follow that tool instead of forcing Bun.
