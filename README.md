# agent-skills

Library of Codex skills. Each skill lives in its own folder and is defined by a `SKILL.md` file (plus optional `references/`, `rules/`, `scripts/`, etc.).

Some skill folders may also include their own `AGENTS.md` (often generated/compiled for that skill). This repository-level README/AGENTS file is separate.

## Important

This repo is just a library of skill definitions.

- You do not need to install anything to use these skills.
- Do not run the Skill Installer from this repo (`.system/skill-installer` or `.system/skill-installer/scripts/`).

## Skills Index

| Skill | Description | Path |
| --- | --- | --- |
| bun | Bun runtime and package manager guidance. Use when running Bun commands, managing dependencies, executing scripts, using bunx, running tests, or troubleshooting Bun-specific behavior in JS/TS projects. | `bun/SKILL.md` |
| convex | Convex backend guidance for queries, mutations, actions, schema, validators, and API design. Use whenever interacting with a Convex backend, including implementing Convex functions, schema changes, HTTP endpoints, scheduling, storage, or client/server integration. | `convex/SKILL.md` |
| drizzle | Drizzle ORM usage guidance. Use when defining Drizzle schemas, writing queries, configuring database connections (especially Postgres), and managing migrations with drizzle-kit or existing project tooling. | `drizzle/SKILL.md` |
| eden-treaty | Eden Treaty client usage for Elysia apps. Use when installing/configuring Eden Treaty, building type-safe clients, using Eden Fetch, or writing/maintaining Eden-based tests and type-safety flows. | `eden-treaty/SKILL.md` |
| expo | Expo project workflows and configuration. Use when working on Expo app setup, configuration files (app.json/app.config), prebuild, EAS build profiles, or environment-driven app settings. | `expo/SKILL.md` |
| expo-router | Expo Router navigation patterns. Use when adding or reorganizing routes, configuring stacks/tabs/modals, handling deep links, or implementing protected routes in Expo Router apps. | `expo-router/SKILL.md` |
| hero-ui-native | HeroUI Native component system guidance. Use when composing React Native UI with HeroUI Native components, configuring providers, referencing theme tokens, or looking up component APIs. | `hero-ui-native/SKILL.md` |
| ios-debugger-agent | Use XcodeBuildMCP to build, run, launch, and debug the current iOS project on a booted simulator. Trigger when asked to run an iOS app, interact with the simulator UI, inspect on-screen state, capture logs/console output, or diagnose runtime behavior using XcodeBuildMCP tools. | `ios-debugger-agent/SKILL.md` |
| ios-xcodegen | Create, edit, and troubleshoot XcodeGen project specs (project.yml/json) for iOS apps. Use when Codex needs to add or update targets, build settings, Info.plist/entitlements generation, dependencies, schemes, or run xcodegen to regenerate the .xcodeproj. | `ios-xcodegen/SKILL.md` |
| oracle | Use the @steipete/oracle CLI to bundle a prompt plus the right files and get a second-model review (API or browser) for debugging, refactors, design checks, or cross-validation. Prefer browser runs with --engine browser --browser-manual-login --browser-keep-browser. | `oracle/SKILL.md` |
| remotion | Best practices for Remotion - video creation in React. Use when building video compositions, animations, handling media assets, implementing transitions, working with captions, or using Remotion-specific APIs. | `remotion/SKILL.md` |
| skill-creator | Guide for creating effective skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Codex's capabilities with specialized knowledge, workflows, or tool integrations. | `.system/skill-creator/SKILL.md` |
| skill-installer | Install Codex skills into $CODEX_HOME/skills from a curated list or a GitHub repo path. Use when a user asks to list installable skills, install a curated skill, or install a skill from another repo (including private repos). | `.system/skill-installer/SKILL.md` |
| swift-concurrency-expert | Swift Concurrency review and remediation for Swift 6.2+. Use when asked to review Swift Concurrency usage, improve concurrency compliance, or fix Swift concurrency compiler errors in a feature or file. | `swift-concurrency-expert/SKILL.md` |
| swiftui-liquid-glass | Implement, review, or improve SwiftUI features using the iOS 26+ Liquid Glass API. Use when asked to adopt Liquid Glass in new SwiftUI UI, refactor an existing feature to Liquid Glass, or review Liquid Glass usage for correctness, performance, and design alignment. | `swiftui-liquid-glass/SKILL.md` |
| swiftui-performance-audit | Audit and improve SwiftUI runtime performance from code review and architecture. Use for requests to diagnose slow rendering, janky scrolling, high CPU/memory usage, excessive view updates, or layout thrash in SwiftUI apps, and to provide guidance for user-run Instruments profiling when code review alone is insufficient. | `swiftui-performance-audit/SKILL.md` |
| swiftui-ui-patterns | Best practices and example-driven guidance for building SwiftUI views and components. Use when creating or refactoring SwiftUI UI, designing tab architecture with TabView, composing screens, or needing component-specific patterns and examples. | `swiftui-ui-patterns/SKILL.md` |
| swiftui-view-refactor | Refactor and review SwiftUI view files for consistent structure, dependency injection, and Observation usage. Use when asked to clean up a SwiftUI view’s layout/ordering, handle view models safely (non-optional when possible), or standardize how dependencies and @Observable state are initialized and passed. | `swiftui-view-refactor/SKILL.md` |
| tanstack-query | TanStack Query usage patterns. Use when building or refactoring data-fetching hooks, defining query keys, handling mutations, cache invalidation, or optimistic updates in React/React Native apps. | `tanstack-query/SKILL.md` |
| tmux-background-tasks | Run and manage long-lived background commands using tmux sessions instead of background processes. Use when starting backend/API servers, Expo/React Native dev servers, job workers, watchers, or any task that should keep running while other commands are executed. | `tmux-background-tasks/SKILL.md` |
| typescript | TypeScript best-practices guidance. Use when writing or reviewing TypeScript, choosing function and helper patterns, documenting intent, shaping TypeScript APIs, or running linting workflows. | `typescript/SKILL.md` |
| upgrading-expo | Guidelines for upgrading Expo SDK versions and fixing dependency issues. | `upgrading-expo/SKILL.md` |
| vercel-react-native-skills | React Native and Expo best practices for building performant mobile apps. Use when building React Native components, optimizing list performance, implementing animations, or working with native modules. Triggers on tasks involving React Native, Expo, mobile performance, or native platform APIs. | `react-native-skills/SKILL.md` |
| xcodebuildmcp-cli | Official skill for the XcodeBuildMCP CLI. Use when doing iOS/macOS/watchOS/tvOS/visionOS work (build, test, run, debug, log, UI automation). | `xcodebuildmcp-cli/SKILL.md` |
