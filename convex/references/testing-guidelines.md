# Testing Guidelines

Read this when the task adds or changes Convex tests.

## Pick the right testing layer

- Use the general testing docs for backend testing strategy.
- Use CI guidance when the task is about automation in pull requests or deployment pipelines.
- Use the local backend testing docs when the task needs behavior closer to a real backend.
- Use `convex-test` when the task needs fast mocked tests around function behavior.

## Practical guidance

- Match the testing level to the risk. Do not reach for full deployment-style testing when a focused function test is enough.
- Keep tests explicit about whether they cover query logic, mutation side effects, scheduling behavior, or action integration boundaries.
- If the task changes schema, indexes, auth checks, or scheduling, update tests at the level that exercises the affected contract.

## Read the live docs when needed

- `/testing.md`
- `/testing/ci.md`
- `/testing/convex-backend.md`
- `/testing/convex-test.md`
