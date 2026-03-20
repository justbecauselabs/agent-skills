# Authentication Guidelines

Read this when the task touches authentication or user identity in Convex.

## Use the right auth path

- Use Convex Auth when the project is built around Convex's first-party auth flow.
- Use provider-specific guides when the app already uses Clerk, Auth0, or WorkOS/AuthKit.
- Use custom OIDC or custom JWT configuration only when the identity provider does not fit the built-in integrations.

## Function-level auth guidance

- Read auth state inside Convex functions instead of trusting client-supplied user identifiers.
- Prefer deriving the current user from `ctx.auth` and then loading the user document from your own table when the app stores per-user data.
- Keep authorization checks close to the query or mutation that touches protected data.

## Database guidance

- If the app needs profile or membership data, store a user record in Convex and index the external identity field for lookups.
- Treat webhook payloads from trusted auth providers as a valid place for narrow `v.any()` usage when the payload shape is large or provider-owned.

## Read the live docs when needed

- `/auth.md`
- `/auth/functions-auth.md`
- `/auth/database-auth.md`
- `/auth/convex-auth.md`
- Provider-specific pages under `/auth/`
