# Convex Migrations (Memory repo)

## Quick commands (run from backend/)

- Run the standard chain:
  - `bun run migrations:run-all`
- Run a single migration (short name supported):
  - `bun run migrations:run -- '{"fn":"normalizeMemoryInfoTypes"}'`
- Check status:
  - `bun run migrations:status -- '{"names":["migrations:normalizeMemoryInfoTypes"]}'`
- Cancel a running migration:
  - `bun run migrations:cancel -- '{"name":"migrations:normalizeMemoryInfoTypes"}'`

These wrap `bunx convex run ...` and should be used instead of ad-hoc commands.

## Repo conventions

- All Convex commands must be run from `backend/`.
- Migrations live in `backend/convex/migrations.ts`.
- The migrations runner is `run` (single migration by name) and `runAll` (standard chain).
- Short names are allowed in `fn` because of `migrationsLocationPrefix: "migrations:"`.

## Standard migration workflow

1) **Loosen schema**: Temporarily allow legacy fields or wider validators so existing data validates.
2) **Deploy**: Run `bunx convex dev --once` to push schema + functions.
3) **Run migrations**: Use `bun run migrations:run-all` or individual migrations.
4) **Tighten schema**: Remove legacy fields, return to strict validators, deploy again.

## Common issues and fixes

- **"Can't find function migrations:XYZ"**
  - The migration didn’t deploy. Run `bunx convex dev --once` in `backend/` and retry.

- **Schema validation failed during deploy**
  - Existing data violates the new schema. Loosen the schema first (optional/nullable or string validators), deploy, migrate, then tighten.

- **Need to restart a migration**
  - Use `bun run migrations:run -- '{"fn":"<name>","cursor":null}'`.

- **Dry run a migration**
  - Use `bun run migrations:run -- '{"fn":"<name>","dryRun":true}'`.

## When to add to runAll

Add a migration to `runAll` if it is part of the standard cleanup sequence that should be run for every deploy or schema tightening. Keep one-off migrations manual.
