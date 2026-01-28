---
name: convex
description: Convex backend guidance for queries, mutations, actions, schema, validators, and API design. Use whenever interacting with a Convex backend, including implementing Convex functions, schema changes, HTTP endpoints, scheduling, storage, or client/server integration.
---

# Convex Guidelines

This skill provides comprehensive guidance for building Convex backends. Reference the appropriate guide below based on your current task.

## Repository Rules

These rules are specific to this codebase and must always be followed:

1. **One function per file** - Each query, mutation, or action must be in its own file. Do not combine multiple exported functions in a single file.

2. **Strict typing required** - Always use validators and TypeScript types for all arguments, return values, and variables. Never use `any`. Every function must have explicit `args` and `returns` validators.

## Reference Guides

### [Function Guidelines](references/function-guidelines.md)
Read when: Writing or modifying Convex functions (queries, mutations, actions), setting up HTTP endpoints, defining validators, registering functions, or designing your API structure. Essential for understanding function syntax, calling patterns, and pagination.

### [Validator Guidelines](references/validator-guidelines.md)
Read when: Defining argument or return type validators, especially when working with integers or record types. Covers deprecation notes and supported validator types.

### [Schema Guidelines](references/schema-guidelines.md)
Read when: Creating or modifying `convex/schema.ts`, adding tables, defining indexes, or working with system fields like `_id` and `_creationTime`.

### [TypeScript Guidelines](references/typescript-guidelines.md)
Read when: Working with TypeScript types in Convex, especially `Id<>` types, `Record` types, discriminated unions, or when you need to add Node.js type definitions.

### [Full Text Search Guidelines](references/full-text-search-guidelines.md)
Read when: Implementing search functionality using Convex's full-text search with `withSearchIndex`.

### [Query Guidelines](references/query-guidelines.md)
Read when: Writing database queries, filtering results, ordering data, or implementing async iteration. Important for understanding why `filter` should be avoided in favor of indexes.

### [Mutation Guidelines](references/mutation-guidelines.md)
Read when: Updating or replacing documents in the database using `ctx.db.patch` or `ctx.db.replace`.

### [Migrations Guidelines](references/migrations-guidelines.md)
Read when: Planning or running Convex migrations, handling schema evolution, or using this repo's migration shortcuts and run-all workflow.

### [Action Guidelines](references/action-guidelines.md)
Read when: Writing actions that call external APIs or use Node.js modules. Important to understand that actions cannot access `ctx.db` directly.

### [Scheduling Guidelines](references/scheduling-guidelines.md)
Read when: Setting up cron jobs or scheduled tasks using `crons.interval` or `crons.cron`.

### [File Storage Guidelines](references/file-storage-guidelines.md)
Read when: Working with file uploads, downloads, or metadata for images, videos, PDFs, or other large files.

### [Examples](references/examples.md)
Read when: You need a complete reference implementation. Contains a full chat-app example with AI integration showing schema design, public/internal functions, and background processing patterns.
