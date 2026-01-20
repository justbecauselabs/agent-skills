---
summary: "HeroUI Native styling options and className usage."
read_when:
  - "Styling HeroUI Native components"
  - "Using className, classNames, or styles"
---

# Styling

HeroUI Native supports utility-first styling via Uniwind as well as standard React Native styles.

## className (Uniwind)

Use `className` for Tailwind-style utility classes:

```tsx
<Button className="bg-accent text-white">Save</Button>
```

For slot-based components, use `classNames` to target specific parts:

```tsx
<TextField
  classNames={{
    base: 'bg-surface',
    label: 'text-muted',
  }}
/>
```

## styles (React Native)

Many components accept a `styles` prop to override slots with React Native styles.

```tsx
<TextField styles={{ input: { paddingVertical: 12 } }} />
```

## Combining Classes

Use the `cn` helper to combine classes conditionally.

```tsx
import { cn } from 'heroui-native';

const classes = cn('px-4', isActive && 'bg-accent');
```
