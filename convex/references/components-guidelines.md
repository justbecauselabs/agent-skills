# Components Guidelines

Read this when the task involves Convex components.

## When to use components

- Use a component when the project is integrating a reusable Convex building block rather than writing everything in app-local functions.
- Check whether the task is about using an existing component or authoring a new one; the docs differ.

## Working guidance

- Preserve the component's public contract instead of rewriting it into ad hoc local patterns.
- Keep component configuration explicit and local to the integration point so app code can see how the component is wired.
- When a task spans component code and app code, verify which functions are owned by the component and which belong in the app.

## Read the live docs when needed

- `/components.md`
- `/components/using.md`
- `/components/authoring.md`
- `/components/understanding.md`
