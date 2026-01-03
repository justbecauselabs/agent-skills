---
summary: "Update Drizzle schemas and manage migrations."
read_when:
  - "Adding or modifying Drizzle schema files."
  - "Generating, applying, or reviewing migrations."
---
# Schemas and Migrations

## Workflow
- Update schema files in `drizzle-orm/<dialect>-core` (e.g., `pg-core`) and keep column types explicit.
- Keep `drizzle.config.*` aligned with schema paths and the migrations output folder.
- Generate migrations using the repo's existing scripts (preferred) or the configured `drizzle-kit` commands.
- Apply migrations with the same tooling used elsewhere in the repo; verify against the target database.

## Change discipline
- Prefer additive, backward-compatible changes when possible.
- When renaming or reshaping data, add explicit SQL or data backfills in migrations.
- Avoid editing historical migrations unless the repo explicitly allows it.
