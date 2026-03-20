---
name: convex
description: Convex backend guidance for queries, mutations, actions, schema, validators, auth, components, agents, search, testing, production config, and client/server integration. Use whenever interacting with a Convex backend, including Convex functions, schema changes, HTTP endpoints, scheduling, storage, AI features, or framework integration.
---

# Convex Guidelines

This skill covers the current Convex docs surface. Start with the most relevant local guide below. If the task touches a newer platform area that is not mirrored in `references/` yet, consult the linked live docs from `https://docs.convex.dev/llms-full.txt` before making changes.

## Core rules

1. Prefer a single exported Convex function per file unless the surrounding codebase already uses another pattern. Small private helpers in the same file are fine.
2. Use precise validators when they improve safety, generated API types, OpenAPI output, or static codegen. Do not claim that `args` or `returns` validators are mandatory in every Convex function; when omitted, Convex falls back to `v.any()`.
3. Treat `v.any()` as an intentional escape hatch for genuinely dynamic payloads or trusted external webhook payloads, not as the default choice for normal application data.
4. Choose the runtime deliberately. Queries and mutations stay transactional around `ctx.db`; actions are for external I/O and Node-only work; vector search is action-only.
5. Prefer indexes and schema design over broad filtering. If a query shape matters for correctness or scale, verify the relevant index strategy.

## Use local reference guides first

### [Function Guidelines](references/function-guidelines.md)
Read when: Writing or modifying Convex functions, setting up HTTP endpoints, defining validators, registering functions, designing API structure, handling pagination, or choosing between query, mutation, action, internal function, and HTTP action.

### [Validator Guidelines](references/validator-guidelines.md)
Read when: Defining argument or return validators, especially for integers, records, unions, or dynamic payloads. Keep in mind that validators are recommended for stronger types, but not universally required by Convex.

### [Schema Guidelines](references/schema-guidelines.md)
Read when: Creating or modifying `convex/schema.ts`, adding tables, defining indexes, working with `_id` and `_creationTime`, or designing table relationships.

### [TypeScript Guidelines](references/typescript-guidelines.md)
Read when: Working with Convex TypeScript types, especially `Id<>`, `Record`, discriminated unions, generated API types, static codegen tradeoffs, or Node type setup.

### [Query Guidelines](references/query-guidelines.md)
Read when: Writing database queries, filtering results, ordering data, using pagination, or reasoning about index-backed access patterns.

### [Mutation Guidelines](references/mutation-guidelines.md)
Read when: Updating, replacing, inserting, or deleting documents using `ctx.db`.

### [Action Guidelines](references/action-guidelines.md)
Read when: Writing actions that call external APIs, use Node modules, run vector search, or coordinate non-transactional work.

### [Scheduling Guidelines](references/scheduling-guidelines.md)
Read when: Setting up cron jobs or scheduled work with scheduled functions and recurring jobs.

### [File Storage Guidelines](references/file-storage-guidelines.md)
Read when: Working with uploads, downloads, generated files, serving files, or file metadata.

### [Full Text Search Guidelines](references/full-text-search-guidelines.md)
Read when: Implementing text search with `withSearchIndex`.

### [Migrations Guidelines](references/migrations-guidelines.md)
Read when: Planning or running migrations, handling schema evolution, or using this repo's migration shortcuts and run-all workflow.

### [Examples](references/examples.md)
Read when: You need a fuller reference implementation, including schema design, public/internal functions, and background processing patterns.

### [Authentication Guidelines](references/auth-guidelines.md)
Read when: Configuring Convex Auth, Clerk, Auth0, WorkOS/AuthKit, custom OIDC or JWT providers, storing users in Convex, or reading auth state in functions.

### [Components Guidelines](references/components-guidelines.md)
Read when: Installing, using, or authoring Convex components.

### [AI and Agents Guidelines](references/ai-agents-guidelines.md)
Read when: Working with the Convex Agent component, threads, tools, streaming, RAG, usage tracking, workflows, the Convex MCP server, or AI codegen workflows.

### [Vector Search Guidelines](references/vector-search-guidelines.md)
Read when: Defining vector indexes, generating embeddings, or running hybrid/vector retrieval.

### [Testing Guidelines](references/testing-guidelines.md)
Read when: Adding backend tests, CI coverage, local backend tests, or `convex-test` mocks.

### [Production Guidelines](references/production-guidelines.md)
Read when: Editing `convex.json`, environment variables, preview deployments, multiple repositories, log streams, exception reporting, or deployment/runtime configuration.

### [Client Integration Guidelines](references/client-integration-guidelines.md)
Read when: Wiring Convex into React, React Native, Next.js App Router, Next.js Pages Router, TanStack Start, Bun, Node.js, Python, Swift, Kotlin, or OpenAPI-based clients.

## Practical guidance from the current docs

1. If a task affects the public API shape, generated clients, OpenAPI output, or static codegen, strongly prefer explicit `args` and `returns` validators.
2. If a task is internal-only and the payload is intentionally loose, a targeted `v.any()` can be acceptable, but document the trust boundary in code comments or surrounding helper names.
3. If a task involves advanced search, choose between full-text search and vector search early because the schema, indexes, and function types differ.
4. If a task involves frontend integration, pick the framework-specific client docs instead of assuming React defaults apply everywhere.
5. If a task involves deployment or AI tooling, check `convex.json` and CLI docs before inventing project-level conventions; current Convex docs cover `functions`, `aiFiles`, Node runtime settings, and static codegen options there.
6. If the local reference files are missing a detail, fall back to `https://docs.convex.dev/llms-full.txt` and the specific linked page for the feature you are using.
