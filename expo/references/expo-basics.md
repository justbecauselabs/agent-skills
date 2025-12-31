# Expo Basics (Agnostic Extract)

## Platform & Tooling
- **Expo + React Native** provides the runtime and bundling workflow (Metro).
- **TypeScript** is commonly used with strict compiler settings.
- **Expo Prebuild** can generate native projects when you need to customize iOS/Android native code.

## App Configuration
- Use `app.json` or `app.config.ts` as the canonical manifest for app metadata, plugins, and platform settings.
- Prefer a dynamic config (`app.config.ts`) when you need environment-based values (API URLs, deep link domains, build variants).

## Build & Distribution
- **EAS profiles** typically define `development`, `preview`, and `production` build settings.
- Use EAS CLI for device builds and submissions; keep credentials managed via EAS.

## Environment & Networking
- Resolve API base URLs in a single place (e.g., a config module) and expose them through context if multiple layers need them.
- In simulators, you may need a special localhost mapping (device vs. emulator vs. physical device).

## Quality Gates
- Run lint and typecheck before publishing builds.
- If you introduce new native dependencies, validate with `expo doctor` or a clean prebuild.
