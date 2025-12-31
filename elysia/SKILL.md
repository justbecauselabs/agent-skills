---
name: elysia
description: Elysia framework guidance for server apps. Use when designing or implementing Elysia routes, handlers, context decoration, plugins, lifecycle hooks, validation schemas, error handling, OpenAPI/Swagger, WebSocket support, or deployment/runtime behavior.
---

# Elysia

## Overview
Use this skill to structure or troubleshoot Elysia servers, choose the right plugin or pattern, and map validation + OpenAPI behavior correctly.

## Quick Start
1. Identify the task category (routing/handlers, plugins, validation, errors, OpenAPI, websockets, lifecycle, deployment).
2. Open the matching reference file in `references/elysia/`.
3. Apply the pattern from the reference in the smallest scope possible.

## Reference Map
- **Routing & handlers**: `references/elysia/route.md`, `references/elysia/handler.md`, `references/elysia/handler-and-context.md`
- **Context, lifecycle, and encapsulation**: `references/elysia/extends-context-patterns.md`, `references/elysia/extends-context-tutorial-patterns.md`, `references/elysia/life-cycle-essential.md`, `references/elysia/life-cycle-tutorial-getting-started.md`, `references/elysia/encapsulation.md`
- **Validation & schemas**: `references/elysia/validation-essential.md`, `references/elysia/validation-tutorial-getting-started.md`, `references/elysia/validation-error.md`, `references/elysia/standalone-schema.md`, `references/elysia/typebox.md`
- **Errors**: `references/elysia/error-handling-patterns.md`, `references/elysia/error-handling-tutorial-patterns.md`
- **Plugins**: `references/elysia/overview-plugins.md`, plus plugin-specific docs (CORS, JWT, Swagger, OpenAPI, etc.)
- **OpenAPI**: `references/elysia/openapi-plugins.md`, `references/elysia/openapi-patterns.md`, `references/elysia/openapi-tutorial-features.md`
- **WebSockets**: `references/elysia/websocket-patterns.md`, `references/elysia/websocket-eden-treaty.md`
- **Deployment**: `references/elysia/deploy.md`, `references/elysia/vercel.md`, `references/elysia/preview.md`

## Notes
- Prefer the smallest Elysia instance or plugin scope that satisfies the requirement.
- Keep schemas explicit and reuse them across routes to stabilize OpenAPI output.
