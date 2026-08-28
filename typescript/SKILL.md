---
name: typescript
description: TypeScript best-practices guidance. Use when writing or reviewing TypeScript, choosing function and helper patterns, shaping TypeScript APIs, or running linting workflows.
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

## Do not write code comments
- Do not add or expand comments, JSDoc, TODOs, explanatory blocks, commented-out code, or directive comments unless the user explicitly asks for comments in code.
- Existing comments, neighboring style, lint rules, and documentation do not count as explicit user instruction.
- Express intent through naming, types, small functions, and clear structure.
- Preserve accurate existing comments. If a code change makes an existing comment stale, remove it instead of rewriting it unless the user explicitly requested code comments.

## Linting
- Read `references/linting.md` when running or recommending TypeScript lint commands (oxlint or biome) or adjusting lint workflows.
