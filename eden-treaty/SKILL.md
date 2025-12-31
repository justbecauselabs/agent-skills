---
name: eden-treaty
description: Eden Treaty client usage for Elysia apps. Use when installing/configuring Eden Treaty, building type-safe clients, using Eden Fetch, or writing/maintaining Eden-based tests and type-safety flows.
---

# Eden Treaty

## Overview
Use this skill to set up or troubleshoot Eden Treaty clients, configuration, and test usage for type-safe Elysia integrations.

## Quick Start
1. Confirm whether you need Treaty (client) or Fetch (fetch-like wrapper).
2. Open the matching reference in `references/`.
3. Apply the configuration pattern and verify types line up with the Elysia app instance.

## Reference Map
- **Install & setup**: `references/installation.md`
- **Client configuration**: `references/config.md`
- **Fetch alternative**: `references/fetch.md`
- **Testing**: `references/test.md`, `references/unit-test-eden-treaty.md`
- **Conceptual overview**: `references/overview-eden.md`, `references/overview-eden-treaty.md`, `references/end-to-end-type-safety.md`

## Notes
- Keep the client close to the app instance or endpoint it targets.
- Use the same Elysia version on both sides to avoid type drift.
