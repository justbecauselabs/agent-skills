---
summary: "Elysia docs: Unit Test."
read_when:
  - "Referring to Elysia documentation for Unit Test."
  - "Needing details from Unit Test in the Elysia docs."
---
# Unit Test

Elysia provides a **Elysia.fetch** function to easily test your application.

**Elysia.fetch** takes a Web Standard Request, and returns a Response similar to the browser's fetch API.

```typescript
import { Elysia } from 'elysia'

const app = new Elysia()
	.get('/', 'Hello World')

app.fetch(new Request('http://localhost/'))
	.then((res) => res.text())
	.then(console.log)
```

This will run a request like an **actual request** (not simulated).

### Test

This allows us to easily test our application without running a server.

::: code-group

```typescript [Bun Test]
import { describe, it, expect } from 'bun:test'

import { Elysia } from 'elysia'

describe('Elysia', () => {
	it('should return Hello World', async () => {
		const app = new Elysia().get('/', 'Hello World')

		const text = await app.fetch(new Request('http://localhost/'))
			.then(res => res.text())

		expect(text).toBe('Hello World')
	})
})
```

```typescript [Vitest]
import { describe, it, expect } from 'vitest'

import { Elysia } from 'elysia'

describe('Elysia', () => {
	it('should return Hello World', async () => {
		const app = new Elysia().get('/', 'Hello World')

		const text = await app.fetch(new Request('http://localhost/'))
			.then(res => res.text())

		expect(text).toBe('Hello World')
	})
})
```

```typescript [Jest]
import { describe, it, test } from '@jest/globals'

import { Elysia } from 'elysia'

describe('Elysia', () => {
	test('should return Hello World', async () => {
		const app = new Elysia().get('/', 'Hello World')

		const text = await app.fetch(new Request('http://localhost/'))
			.then(res => res.text())

		expect(text).toBe('Hello World')
	})
})
```

:::

See Unit Test.

## Assignment

Let's tab the  icon in the preview to see how's the request is logged.
