---
summary: "Elysia docs: Plugin."
read_when:
  - "Referring to Elysia documentation for Plugin."
  - "Needing details from Plugin in the Elysia docs."
---
# Plugin

Every Elysia instance can be plug-and-play with other instances by `use` method.

```typescript
import { Elysia } from 'elysia'

const user = new Elysia()
	.get('/profile', 'User Profile')
	.get('/settings', 'User Settings')

new Elysia()
	.use(user) // [!code ++]
	.get('/', 'Home')
	.listen(3000)
```

Once applied, all routes from `user` instance will be available in `app` instance.

### Plugin Config

You can also create a plugin that takes argument, and returns an Elysia instance to make a more dynamic plugin.

```typescript
import { Elysia } from 'elysia'

const user = ({ log = false }) => new Elysia() // [!code ++]
	.onBeforeHandle(({ request }) => {
		if (log) console.log(request)
	})
	.get('/profile', 'User Profile')
	.get('/settings', 'User Settings')

new Elysia()
	.use(user({ log: true })) // [!code ++]
	.get('/', 'Home')
	.listen(3000)
```

## Assignment

Let's apply the `user` instance to the `app` instance.

\<template #answer>

Similar to the above example, we can use the `use` method to plug the `user` instance into the `app` instance.

```typescript
import { Elysia } from 'elysia'

const user = new Elysia()
	.get('/profile', 'User Profile')
	.get('/settings', 'User Settings')

const app = new Elysia()
	.use(user) // [!code ++]
	.get('/', 'Home')
	.listen(3000)
```
