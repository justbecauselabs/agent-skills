# Client Integration Guidelines

Read this when the task wires Convex into an application framework or another language client.

## Pick the framework-specific path

- Use the framework or client page that matches the actual stack instead of assuming React guidance applies to all clients.
- For Next.js, distinguish App Router from Pages Router before changing data loading or auth behavior.
- For TanStack integrations, confirm whether the task uses plain Convex React hooks or TanStack Query patterns.

## Integration guidance

- Keep deployment URL handling explicit in client setup.
- When the task affects server rendering, preloading, or server actions, use the framework-specific docs instead of generic client assumptions.
- For languages without first-party clients, use the OpenAPI flow and remember those calls are not reactive.

## Quick routing map

- React: `/client/react.md`
- React Native: `/client/react-native.md`
- Next.js App Router: `/client/nextjs/app-router.md`
- Next.js Pages Router: `/client/nextjs/pages-router.md`
- TanStack Query: `/client/tanstack/tanstack-query.md`
- Bun: `/client/javascript/bun.md`
- Node.js: `/client/javascript/node.md`
- OpenAPI and other languages: `/client/open-api.md`
- Platform quickstarts: `/quickstart/*.md`
