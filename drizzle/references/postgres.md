---
summary: "Connect Drizzle to Postgres drivers."
read_when:
  - "Setting up or refactoring the Postgres connection for Drizzle."
  - "Choosing the correct Drizzle Postgres driver for a runtime."
---
# Postgres Connection

## Setup checklist
- Identify the runtime (Node, Bun, serverless/edge) and the existing driver used in the repo.
- Centralize the connection in one module and export a single `db` instance.
- Use `DATABASE_URL` or the repo's config helpers instead of hardcoding credentials.

## Common drivers

### node-postgres (pg)

```ts
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool)
```

### postgres.js

```ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const client = postgres(process.env.DATABASE_URL, { max: 10 })
export const db = drizzle(client)
```

## Serverless / edge
- Use the adapter already chosen in the repo (Neon/Vercel/Cloudflare/etc.).
- Reuse a singleton client when the platform allows it; avoid creating a new client per request.
- Ensure connection cleanup in scripts and one-off tasks when required by the driver.
