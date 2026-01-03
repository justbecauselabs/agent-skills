---
name: typescript
description: TypeScript best-practices guidance. Use when writing or reviewing TypeScript, choosing function and helper patterns, documenting intent, shaping TypeScript APIs, or running linting workflows.
---

# TypeScript Best Practices

## Scope
Apply these conventions across TypeScript code. Favor existing repo patterns and tooling before introducing new ones.

## Prefer parameter objects
- Define functions with a single `params: { ... }` argument to keep call sites readable and extensible.
- Group related inputs under descriptive keys; avoid long positional argument lists.
- For React hooks/components, align the parameter object shape with the exported type to preserve editor hints.

## Use `function name()` instead of `const name = () => {}`
- Declare functions with the `function` keyword.

## Keep functions small and composable
- Keep functions focused and well named; prefer breaking flows into smaller helpers rather than monolithic handlers.
- Compose small helpers to express intent; aim for single-responsibility business logic that reads like a narrative.

## Keep files small
- As files grow large, try to break them up into smaller composable files

## Look for existing solutions
- When you need to do some common logic, see if we already have a helper function or do the same logic somewhere else. If so extract it to a helper.

## Document intent with JSDoc
- Maintain `/** ... */` blocks on exported functions, hooks, and utilities; describe purpose, parameters, and return payloads.
- Update JSDoc whenever behavior or contracts change; stale comments are worse than no comments.

## Linting
- Read `references/linting.md` when running or recommending TypeScript lint commands (oxlint or biome) or adjusting lint workflows.
