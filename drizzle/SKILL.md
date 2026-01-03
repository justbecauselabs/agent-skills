---
name: drizzle
description: Drizzle ORM usage guidance. Use when defining Drizzle schemas, writing queries, configuring database connections (especially Postgres), and managing migrations with drizzle-kit or existing project tooling.
---

# Drizzle ORM

## Scope
Focus on Drizzle ORM usage only (schemas, queries, connections, migrations). Follow existing project conventions before introducing new patterns.

## Workflow
- Inspect `drizzle.config.*`, schema files, and the database client setup before changes.
- Use the relevant references:
  - `references/querying.md` for query patterns, joins, transactions, and raw SQL.
  - `references/postgres.md` for Postgres drivers, connection setup, and runtime notes.
  - `references/schema-migrations.md` for schema changes and migrations.
- Keep schema changes and migrations in lockstep using the repo's scripts/commands.
