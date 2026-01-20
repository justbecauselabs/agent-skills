---
summary: "Form layout and composition patterns using HeroUI Native."
read_when:
  - "Building forms with HeroUI Native components"
  - "Structuring labels, descriptions, and actions"
---

# Pattern: Form

Use `FormField` to group labels, inputs, and helper text into a consistent, accessible structure. Pair it with `TextField`, `Checkbox`, and `Button` to build common form layouts.

## Core Building Blocks

- `FormField` for grouping
- `FormField.Label` or `Label` for labels
- `FormField.Description` or `Description` for helper text
- `TextField`, `Select`, `Checkbox`, `Switch` for inputs
- `Button` for actions

## Basic Form Layout

```tsx
<FormField>
  <FormField.Label>Email</FormField.Label>
  <TextField placeholder="you@example.com" />
  <FormField.Description>We will send updates to this address.</FormField.Description>
</FormField>

<FormField>
  <FormField.Label>Password</FormField.Label>
  <TextField placeholder="********" secureTextEntry />
  <FormField.Description>Use at least 8 characters.</FormField.Description>
</FormField>

<Button>Continue</Button>
```

## Inline Options

```tsx
<FormField>
  <FormField.Label>Preferences</FormField.Label>
  <Checkbox defaultSelected>Send me updates</Checkbox>
</FormField>
```

## Tips

- Keep a consistent vertical rhythm using shared spacing utilities.
- Use `FormField` to enforce consistent spacing between label, input, and helper text.
- Keep action buttons aligned and grouped at the end of the form.
