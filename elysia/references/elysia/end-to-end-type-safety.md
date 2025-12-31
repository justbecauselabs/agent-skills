---
summary: "Elysia docs: End-to-End Type Safety."
read_when:
  - "Referring to Elysia documentation for End-to-End Type Safety."
  - "Needing details from End-to-End Type Safety in the Elysia docs."
---
# End-to-End Type Safety

Elysia provides an end-to-end type safety between backend and frontend **without code generation** similar to tRPC, using Eden.

```typescript
import { Elysia } from 'elysia'
import { treaty } from '@elysiajs/eden'

// Backend
export const app = new Elysia()
	.get('/', 'Hello Elysia!')
	.listen(3000)

// Frontend
const client = treaty<typeof app>('localhost:3000')

const { data, error } = await client.get()

console.log(data) // Hello World
```

This works by inferring the types from the Elysia instance, and use type hints to provide type safety for the client.

See Eden Treaty.

## Assignment

Let's tab the  icon in the preview to see how's the request is logged.
