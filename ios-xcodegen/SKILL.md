---
name: ios-xcodegen
description: Create, edit, and troubleshoot XcodeGen project specs (project.yml/json) for iOS apps. Use when Codex needs to add or update targets, build settings, Info.plist/entitlements generation, dependencies, schemes, or run xcodegen to regenerate the .xcodeproj.
---

# iOS XcodeGen

## Overview
Use this skill to safely edit XcodeGen specs, regenerate the Xcode project, and verify the resulting build settings/targets.

## Workflow (default)
1) Locate the spec (`project.yml` or custom `--spec`).
2) Edit targets/settings/dependencies/schemes in the spec.
3) Regenerate with `xcodegen`.
4) Validate the generated `.xcodeproj`/build settings.

## Quick Commands
- Regenerate in repo root: `xcodegen`
- Custom spec path: `xcodegen --spec path/to/spec.yml`
- Only plists: `xcodegen --only-plists`

## Editing Guidance
- Treat `project.yml` as source of truth. Avoid manual edits in `.xcodeproj` unless explicitly requested; if you must, sync changes back into the spec.
- When adding targets, define `type`, `platform`, `sources`, and explicit `settings.base.PRODUCT_BUNDLE_IDENTIFIER` when needed.
- For Info.plist/entitlements, prefer `info:` / `entitlements:` blocks so XcodeGen writes files deterministically. Be aware `info` generation can overwrite existing plist contents.
- For dependencies, use `target:` entries with `embed: true` only when embedding is required (apps, extensions).
- For schemes, use `targets:<name>: all` in `schemes:` when you need explicit control.

## Reference
- For full spec syntax, property definitions, and examples, read `references/spec.md`.

## Validation Checklist
- After regeneration, confirm target product types, bundle IDs, build settings, and embedded targets.
- If build fails due to missing plist/entitlements, check `info` and `entitlements` paths in the spec.
- If Xcode UI changes were made, reconcile and move them into the spec before regenerating again.
