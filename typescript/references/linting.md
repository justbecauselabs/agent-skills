---
summary: "TypeScript linting guidance with oxlint and biome."
read_when:
  - "You need to run or suggest lint commands for TypeScript."
  - "You need to choose between oxlint and biome for linting."
---

# TypeScript Linting

## Preferred flow
1. Use the repo's `package.json` scripts if they exist (for example, `lint` or `check`).
2. If a direct command is needed, prefer:
   - Type-aware linting: `oxlint --typeaware`
   - Fast linting: `biome lint .`

## Notes
- Keep lint commands consistent with the project's existing tooling.
- Avoid introducing new lint tools unless the repo already uses them.
