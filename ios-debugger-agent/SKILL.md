---
name: ios-debugger-agent
description: Use XcodeBuildMCP to build, run, launch, and debug the current iOS project on a booted simulator. Trigger when asked to run an iOS app, interact with the simulator UI, inspect on-screen state, capture logs/console output, or diagnose runtime behavior using XcodeBuildMCP tools.
---

# iOS Debugger Agent

## Overview
Use XcodeBuildMCP to build and run the current project scheme on a booted iOS simulator, interact with the UI, and capture logs. Prefer the MCP tools for simulator control, logs, and view inspection.

## React Native vs Native
- **React Native**: Build/run/launch is still through the iOS scheme. UI interaction is the same, but JS errors and `console.log` output often live in the Metro/Expo bundler output (or the RN redbox), not in simulator logs. If the app shows a blank screen or redbox, ask whether Metro is running and check bundler logs.
- **Native**: Use simulator logs and `captureConsole` for most issues. Crashes in Swift/ObjC or native modules should show up in sim logs.
- **Either**: Use MCP UI tools (`describe_ui`, `tap`, `gesture`, `screenshot`) the same way.

## Prereqs (for local fallback automation)
If MCP UI tools are unavailable and you need to drive the simulator directly:
- Check for `idb` and `idb_companion`. If missing, **tell the user** and suggest installing:
  - `brew tap facebook/fb`
  - `brew install idb-companion`
  - `pip3 install fb-idb`
- Optional but useful: `ios-simulator-mcp` (npm package) if the user wants MCP-style UI tools.
- **Security gotcha**: `idb_companion` logs its full environment to stdout. Run it with a sanitized env
  (`env -i PATH=... HOME=... TMPDIR=/tmp idb_companion ...`) or redirect output to a safe log to avoid leaking secrets.
- Keep `idb_companion` alive (foreground or nohup). If it dies, `idb list-targets` shows “No Companion Connected”.
  Reconnect with `idb connect localhost 10882`.
- Before starting a new `idb_companion`, kill any existing one (`pkill -f idb_companion`), then launch clean.
- If you started `idb_companion`, try to stop it at the end of the task to avoid leaving it running.

## Core Workflow
Follow this sequence unless the user asks for a narrower action.

### 1) Discover the booted simulator
- Call `mcp__XcodeBuildMCP__list_sims` and select the simulator with state `Booted`.
- If none are booted, ask the user to boot one (do not boot automatically unless asked).

### 2) Set session defaults
- Call `mcp__XcodeBuildMCP__session-set-defaults` with:
  - `projectPath` or `workspacePath` (whichever the repo uses)
  - `scheme` for the current app
  - `simulatorId` from the booted device
  - Optional: `configuration: "Debug"`, `useLatestOS: true`

### 3) Build + run (when requested)
- Call `mcp__XcodeBuildMCP__build_run_sim`.
- If the app is already built and only launch is requested, use `mcp__XcodeBuildMCP__launch_app_sim`.
- If bundle id is unknown:
  1) `mcp__XcodeBuildMCP__get_sim_app_path`
  2) `mcp__XcodeBuildMCP__get_app_bundle_id`

## UI Interaction & Debugging
Use these when asked to inspect or interact with the running app.

- **Describe UI**: `mcp__XcodeBuildMCP__describe_ui` before tapping or swiping.
- **Tap**: `mcp__XcodeBuildMCP__tap` (prefer `id` or `label`; use coordinates only if needed).
- **Type**: `mcp__XcodeBuildMCP__type_text` after focusing a field.
- **Gestures**: `mcp__XcodeBuildMCP__gesture` for common scrolls and edge swipes.
- **Screenshot**: `mcp__XcodeBuildMCP__screenshot` for visual confirmation.

### Local fallback tips (idb UI)
- Use `idb ui describe-all` or `describe-point` to confirm what’s currently visible.
- Horizontal swipes sometimes require longer duration: try `idb ui swipe --duration 1.0 x1 y1 x2 y2`.
- After navigation, re-check the UI tree to confirm the expected screen (e.g., onboarding page headline text changes).

## Logs & Console Output
- Start logs: `mcp__XcodeBuildMCP__start_sim_log_cap` with the app bundle id.
- Stop logs: `mcp__XcodeBuildMCP__stop_sim_log_cap` and summarize important lines.
- For console output, set `captureConsole: true` and relaunch if required.

## Troubleshooting
- If build fails, ask whether to retry with `preferXcodebuild: true`.
- If the wrong app launches, confirm the scheme and bundle id.
- If UI elements are not hittable, re-run `describe_ui` after layout changes.
- If local automation is requested but `idb`/`idb_companion` are missing, say so immediately and provide install steps.
