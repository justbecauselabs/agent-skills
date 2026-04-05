---
name: typescript-best-practices
description: Use whenever writing, editing, refactoring, or reviewing TypeScript or TSX code. This skill defines how TypeScript should be modeled, how boundaries and shared helpers should be handled, how comments should be written, and how to keep code clear, DRY, and free of defensive AI slop. For review workflows, read references/review-and-fix-changes.md.
---

# TypeScript Best Practices

Use this skill as the default guidance for any `.ts` or `.tsx` change.

Keep this file practical. Record the repo's actual TypeScript standards here.

## References

- For review or review-and-fix requests on a working tree, branch, commit, or commit range, read
  `references/review-and-fix-changes.md` and use it as the workflow while keeping this file as the
  review rubric.

## Intent

- Provide a single baseline for how TypeScript should be written and refactored.
- Keep code strongly typed, easy to read, and easy to change.
- Reduce AI slop such as defensive cleanup, vague abstractions, duplicate transforms, and weak
  fallbacks.

## Fast Path

- Validate untyped JSON with Zod at the boundary.
- Keep functions small and composable.
- Keep boundary shapes separate from internal domain shapes.
- Convert external data once, then keep internal code strict and simple.
- Do not normalize values unless there is a real boundary or product reason.
- Preserve original source values; add derived internal keys when needed.
- Use `null` for meaningful absence in stable domain data.
- Reserve `undefined` for optional inputs and raw boundary payload fields.
- Reuse existing helpers before adding new ones.
- For string, number, URL, array, dictionary, dedupe, filter, or similar foundational logic,
  search for an existing shared helper location in the repo first and add shared logic there
  instead of burying it in feature code.
- Extract shared invariants and boundary adapters; do not invent generic cleanup utilities.
- Add a short helpful comment to each authored function that explains its purpose, invariant, or
  why it exists, without narrating the implementation line by line.

## Priority Order

1. Follow project-specific conventions first.
2. Make boundaries typed and explicit.
3. Reuse existing helpers and invariants before adding new abstractions.
4. Extract repeated boundary adapters or invariants once repetition is real.
5. Prefer clarity over cleverness.
6. Apply style preferences only after correctness, boundaries, and reuse are settled.

## Core Rules

### 1. Validate and coerce untyped boundary data once, then keep domain types strict.

Bad:

```ts
type Issue = {
  id: string;
  attemptCount: number;
};

function parseIssue({ body }: { body: string }): Issue {
  return JSON.parse(body) as Issue;
}
```

Good:

```ts
import { z } from "zod";

const issueSchema = z.object({
  id: z.string().min(1),
  attemptCount: z.coerce.number().int().nonnegative(),
});

type Issue = z.infer<typeof issueSchema>;

// Validate and coerce the raw payload once so the domain type can stay strict.
function parseIssue({ body }: { body: string }): Issue {
  return issueSchema.parse(JSON.parse(body) as unknown);
}
```

### 2. Keep functions small and composable. Use a `params` object when a function takes multiple authored parameters.

- Prefer `function name()` declarations over `const name = () => {}` for authored functions.

Bad:

```ts
function buildWorkspaceLabel(issue: Issue, ownerName?: string): string {
  const normalizedState = issue.state.trim().toLowerCase();
  const normalizedOwner = ownerName ? ownerName.trim() : "unassigned";
  const slug = `${issue.identifier}-${normalizedState}-${normalizedOwner}`
    .replaceAll(/[^\w-]+/g, "-")
    .replaceAll(/-+/g, "-")
    .replace(/^-|-$/g, "");

  if (!slug) {
    return "workspace";
  }

  return slug;
}
```

Good:

```ts
// Preserve the display state while deriving a stable key for internal path generation.
function buildWorkspaceLabel(params: {
  issue: Issue;
  ownerName?: string;
}): string {
  const stateKey = buildStateKey(params.issue.state);
  const ownerKey = buildOwnerKey(params.ownerName);

  return buildWorkspaceSlug({
    identifier: params.issue.identifier,
    stateKey,
    ownerKey,
  });
}

// Use a stable fallback only for internal workspace naming.
function buildOwnerKey(ownerName?: string): string {
  return ownerName ?? "unassigned";
}
```

### 3. Put foundational string, number, URL, array, dictionary, dedupe, and filter logic in shared helpers.

Bad:

```ts
function listUniqueIssueIds(issues: Issue[]): string[] {
  return [...new Set(issues.map((issue) => issue.id))];
}
```

Good:

```ts
import { unique } from "../shared/collections";

// Reuse the shared collection helper so dedupe behavior stays consistent across features.
function listUniqueIssueIds(issues: Issue[]): string[] {
  return unique(issues.map((issue) => issue.id));
}
```

If no shared helper exists yet, search for an existing shared helper location first. For purely
foundational logic like strings, numbers, URLs, arrays, dictionaries, deduping, or filtering, add
the reusable helper there instead of embedding it inside a feature module. Always look for utils/helpers/etc folders for these

### 4. Add a short helpful comment to each authored function.

Bad:

```ts
function parseToken(value: string): string {
  return value.trim();
}
```

Good:

```ts
// Keep env-token cleanup in one place so callers do not each invent their own parsing rules.
function parseToken(value: string): string {
  return value.trim();
}
```

### 5. Prefer explicit boundary errors over defensive defaults.

Bad:

```ts
function parseLimit(value?: string): number {
  return Number(value) || 0;
}
```

Good:

```ts
const limitSchema = z.coerce.number().int().nonnegative();

// Fail at the boundary instead of silently converting broken input into a fake default.
function parseLimit(value: string): number {
  return limitSchema.parse(value);
}
```

## Refactoring Rules

- Before adding a new helper, search the repo for an existing helper, transform, or adapter that
  already solves the same problem.
- For foundational logic on strings, numbers, URLs, arrays, dictionaries, deduping, or filtering,
  search for shared helper files first and add that logic there before introducing a feature-local
  helper.
- If the same invariant, transform, or adapter appears in multiple places, prefer extracting it
  over adding another copy.
- Extract after real repetition, not because two snippets look vaguely similar.
- Shared helpers should have a clear domain purpose.
- Do not introduce broad `sanitize*`, `normalize*`, `clean*`, or `format*` utilities that mix
  unrelated concerns.
- If an abstraction only exists to generically "clean up" values, the real fix is usually at a
  typed boundary.
- When refactoring, preserve the strongest existing types. Do not widen types just to make the
  refactor easier.
- Prefer small boundary adapters and invariant helpers over abstract utility layers.

## Comment Rules

- Add a short helpful comment to each authored function.
- Function comments should explain purpose, constraints, invariants, protocol quirks, product
  behavior, or refactor hazards.
- Comments should not narrate obvious control flow or restate the next line of code.
- Use comments sparingly but intentionally.
- Keep each function comment short and high signal.

Prefer:

- comments that explain what contract a function owns
- comments that explain why a fallback exists
- comments that explain why a transform preserves both `state` and `stateKey`
- comments that explain why a branch is strict, why a retry rule exists, or what invariant must
  stay true

Avoid:

- comments like "increment the counter"
- comments like "return the result"
- large prose blocks that should have been split into named helpers

## Workflow

1. Read this skill before making TypeScript changes.
2. For review or review-and-fix tasks, read `references/review-and-fix-changes.md` before scoping
   the work.
3. Follow project-specific conventions first when they conflict with generic guidance.
4. When data crosses into the system as JSON, define a Zod schema at that boundary.
5. When values are already trusted and typed, avoid unnecessary cleanup or coercion.
6. Keep functions small and composable.
7. For functions with multiple authored parameters, usually prefer `fn(params: { ... })`.
8. For functions with a single parameter, pass the value directly instead of wrapping it in a
   params object unless there is a strong local reason not to.
9. Add a short helpful comment to each authored function.
10. If the change is purely about strings, numbers, URLs, arrays, dictionaries, deduping,
   filtering, or similar foundational types, search for an existing shared helper location in the
   repo first and add the shared logic there.
11. If the code seems to require `as`, stop and look for a safer typing or validation approach
   first.
12. Before adding a new helper or abstraction, search the repo for an existing pattern you should
   reuse.
13. If similar logic exists in multiple modules, prefer extracting a shared invariant or boundary
   adapter over adding another copy.
14. Use subagents to inspect the codebase for existing helpers, repeated transforms, and refactor
    opportunities before introducing a new abstraction when subagents are available.
15. Use subagents for bounded multi-file refactors when the write scope is clear, but avoid broad
    reusable utilities unless the repetition is real.
16. If a proposed abstraction only exists to generically "clean up" values, stop and check whether
    the real fix belongs at a typed boundary instead.

## Red Flags

- `JSON.parse(...) as Foo`
- `Number(value) || 0`
- `input.trim().toLowerCase()` with no product reason
- repeated `foo ?? default` across business logic
- generic `sanitize*` or `normalize*` helpers with vague scope
- large feature-local helpers that should be split into small composable functions
- new feature-local string, number, URL, array, or dictionary helpers that should live in a shared
  helper file
- duplicated boundary transforms across multiple files
- domain types carrying both `null` and `undefined` without a good reason
- broad interfaces or classes passed through layers that only need one or two methods
- missing function comments
- comments that restate obvious code rather than preserving intent

## Review Checklist

- Is raw JSON being validated with Zod instead of cast?
- Are functions small and composable?
- Is boundary parsing happening once and early?
- Are boundary DTOs or view shapes translated once into internal domain types?
- Is external payload variance handled at the boundary rather than leaking into internal logic?
- Is the code using `null` and `undefined` deliberately instead of mixing both through domain
  code?
- Is the code normalizing values without a clear boundary or product reason?
- If normalization is required, does the code preserve the original value and add a derived key?
- Is there already an existing helper, transform, or adapter in the repo that should be reused?
- For foundational string, number, URL, array, dictionary, dedupe, or filter logic, did the code
  search for and use a shared helper file instead of adding feature-local duplication?
- Should repeated invariants or boundary adapters be extracted instead of copied again?
- Is `as` being used where stronger checks or better types should exist instead?
- Are domain invariants modeled with exact types like unions, `Map`, `Set`, or `as const` values?
- Does the code depend on the smallest capability surface it needs?
- Does each authored function have a short helpful comment?
- Are comments explaining why and constraints, rather than narrating what?
- Is the code hiding broken assumptions behind weak defaults or silent fallbacks?
