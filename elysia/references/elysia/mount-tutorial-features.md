---
summary: "Elysia docs: Mount."
read_when:
  - "Referring to Elysia documentation for Mount."
  - "Needing details from Mount in the Elysia docs."
---
# Mount

Elysia provides a Elysia.mount to interlop between backend frameworks that is built on Web Standard like Hono, H3, etc.

```typescript
import { Elysia, t } from 'elysia'
import { Hono } from 'hono'

const hono = new Hono()
	.get('/', (c) => c.text('Hello from Hono')

new Elysia()
	.get('/', 'Hello from Elysia')
	.mount('/hono', hono.fetch)
	.listen(3000)
```

This allows us to gradually migrate our application to Elysia, or use multiple frameworks in a single application.

## Assignment

Let's use the preview to **GET '/hono'** to see if our Hono route is working.

Try to modify the code and see how it changes!
