---
name: app-store-connect-cli
description: App Store Connect CLI (`asc`) workflows. Use when installing or updating `asc`, authenticating with App Store Connect API keys, and automating App Store Connect operations such as TestFlight, builds, reviews, devices, and reports.
---

# App Store Connect CLI

## Overview
Use this skill when the task is App Store Connect automation from the terminal. Prefer explicit, non-interactive `asc` commands with full flags so commands are scriptable and reproducible.

Official project:
- [rudrankriyam/App-Store-Connect-CLI](https://github.com/rudrankriyam/App-Store-Connect-CLI)

## Workflow
1. Verify availability and version:
   - `command -v asc`
   - `asc --version`
2. Install or update `asc` if needed (Homebrew preferred on macOS):
   - `brew tap rudrankriyam/tap`
   - `brew install rudrankriyam/tap/asc`
   - `brew upgrade rudrankriyam/tap/asc` (for updates)
3. Set up authentication with an App Store Connect API key profile:
   - `asc auth login --name "MyApp" --key-id "ABC123" --issuer-id "DEF456" --private-key /path/to/AuthKey.p8`
   - Validate: `asc auth status --validate`
4. Run task-specific commands with explicit filters and output format:
   - Default output is minified JSON for automation.
   - Use `--output table` for terminal readability.
   - Use `--output markdown` for docs.
5. For CI or strict automation:
   - Use `--strict-auth` to fail on mixed auth sources.
   - Use `--paginate` when full result sets are required.

## Authentication Rules
- Never echo or print private key contents.
- Prefer `--private-key /path/to/AuthKey.p8` over raw key material.
- Keep separate profiles per app/client and switch with:
  - `asc auth switch --name "ProfileName"`
- For diagnostics:
  - `asc auth doctor`
  - `asc auth doctor --fix --confirm` (only when explicitly intended)

## Command Reference
- Read `references/quick-reference.md` for common command patterns.

## Notes
- Prefer stable identifiers (`app` IDs, build IDs, group IDs) over name matching where possible.
- In automation scripts, keep output JSON and parse with `jq`.
- When the user asks for "latest", include explicit dates from returned data in the final response.
