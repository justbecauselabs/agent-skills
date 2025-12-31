# TanStack Query Patterns (Agnostic Extract)

## Query Key Discipline
- Define stable key factories (e.g., `itemKeys.detail(id)`) so invalidation is consistent and discoverable.
- Keep keys colocated with the domain they represent.

## Mutations & Cache Updates
- Invalidate related queries after successful mutations.
- Use optimistic updates for responsive UI, but roll back on error.
- Update detail caches directly when you already have the new entity payload.

## Service Layer
- Centralize API calls in a service module instead of calling fetch directly inside hooks.
- Keep hooks thin: compose service calls + Query options in one place.

## Error & Loading Handling
- Use shared UI patterns for loading/empty/error states so screens remain consistent.
- Surface mutation failures via a single toast/notification adapter.

## Offline & Stale Data
- Be intentional with `staleTime` and `cacheTime`; avoid stale data for frequently-updated entities unless the UX allows it.
