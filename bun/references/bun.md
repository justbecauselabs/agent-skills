---
summary: "Bun command reference for installs, scripts, and tests."
read_when:
  - "You need to run or suggest Bun commands."
  - "You need Bun testing or dependency workflows."
---

# Bun Command Reference

## Project detection
- Look for `bun.lockb` or `bunfig.toml` to confirm Bun usage.
- Check `package.json` scripts for `dev`, `build`, `test`, and other task names.

## Install and dependency management
- Install dependencies: `bun install`
- Add a dependency: `bun add <pkg>`
- Add a dev dependency: `bun add -d <pkg>`
- Remove a dependency: `bun remove <pkg>`
- Avoid manual edits to `bun.lockb`; rerun `bun install` after changes.

## Running scripts and files
- Run a package.json script: `bun run <script>`
- Run a JS/TS file directly: `bun <path/to/file.ts>`
- One-off binaries without install: `bunx <pkg> [args]`

## Testing
- If the repo uses Bun’s test runner, use: `bun test`
- If tests are defined as a script, use: `bun run test`
- Prefer the repo’s established test command if it differs.

## Configuration
- Bun config file: `bunfig.toml`
- Prefer project-specific settings over global tweaks.
