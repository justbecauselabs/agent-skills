---
summary: "HeroUI Native composition patterns and compound components."
read_when:
  - "Composing HeroUI Native components"
  - "Using compound parts or asChild"
---

# Composition

HeroUI Native favors composable, slot-based components. Many components expose subcomponents to make layouts expressive and consistent.

## Compound Components

Use subcomponents for structured layouts and predictable styling:

```tsx
<Card>
  <Card.Header>Account</Card.Header>
  <Card.Body>Details here</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

## asChild

Use `asChild` to avoid extra wrappers and pass props to a child element.

```tsx
<Button asChild>
  <Pressable onPress={onPress}>
    <Button.Label>Continue</Button.Label>
  </Pressable>
</Button>
```

## Prop Forwarding

Components often expose `...Props` patterns to forward native props (for example `...TextProps` or `...PressableProps`) for fine-grained control.
