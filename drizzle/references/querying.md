---
summary: "Drizzle query patterns."
read_when:
  - "Writing or refactoring Drizzle queries."
  - "Using joins, transactions, or raw SQL in Drizzle."
---
# Querying

## Core patterns
- Use `db.select().from(table)` and chain `where`, `orderBy`, `limit`, `offset`.
- Use predicate helpers like `eq`, `and`, `or`, `inArray`, `like`, `ilike` from `drizzle-orm`.
- Use `insert`, `update`, `delete`, and `returning()` (Postgres) for writes.
- Use `leftJoin`/`innerJoin` when joining tables directly.
- Use `db.transaction` for multi-step reads/writes that must be atomic.
- Use `sql` for raw SQL when Drizzle query builders are insufficient.

## Examples

```ts
import { and, eq, inArray } from 'drizzle-orm'
import { users } from './schema'

const rows = await db
  .select({ id: users.id, email: users.email })
  .from(users)
  .where(and(eq(users.active, true), inArray(users.role, roles)))
  .orderBy(users.createdAt)
  .limit(20)
```

```ts
import { eq } from 'drizzle-orm'
import { users, posts } from './schema'

const rows = await db
  .select({ userId: users.id, postId: posts.id })
  .from(users)
  .leftJoin(posts, eq(posts.userId, users.id))
  .where(eq(users.id, userId))
```

```ts
await db.transaction(async (tx) => {
  const [user] = await tx.insert(users).values(newUser).returning()
  await tx.insert(profiles).values({ userId: user.id })
})
```

```ts
import { sql } from 'drizzle-orm'

const result = await db.execute(sql`select now()`)
```

## Relation helpers (when enabled)
- If the project defines relations and exposes `db.query`, prefer `db.query.<table>` for nested loads.
- Follow existing query shapes and `with` clauses in the codebase.
