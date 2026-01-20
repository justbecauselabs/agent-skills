---
summary: "HeroUI Native color system overview and tokens."
read_when:
  - "Working with HeroUI Native colors"
  - "Choosing semantic color tokens"
---

# Colors

HeroUI Native uses semantic color tokens so components stay consistent across light and dark themes. Base tokens describe intent (background, foreground, accent, success, warning, danger) rather than fixed values.

## Semantic Tokens

Common theme tokens include:

- `background`, `foreground`
- `surface`, `overlay`
- `default`, `accent`
- `success`, `warning`, `danger`

## Usage

Most components accept a `color` prop with semantic values like `default`, `accent`, `success`, `warning`, and `danger`.

```tsx
<Button color="accent">Primary Action</Button>
<Button color="danger">Delete</Button>
```

Use `useThemeColor` when you need to reference tokens directly:

```tsx
import { useThemeColor } from 'heroui-native';

const background = useThemeColor('background');
```
