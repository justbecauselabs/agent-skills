---
summary: "HeroUI Native Label component documentation."
read_when:
  - "Using the HeroUI Native Label component"
  - "Rendering consistent text labels in forms or headers"
---

# Label

Use `Label` to render headings or control labels with consistent typography.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the Quick Start guide.

```tsx
import { Label } from 'heroui-native';
```

## Usage

### Basic Usage

```tsx
<Label>Account</Label>
```

### As a FormField Slot

```tsx
<FormField>
  <FormField.Label>Email</FormField.Label>
  <TextField placeholder="hello@example.com" />
</FormField>
```

### Colors and Variants

```tsx
<Label color="muted">Optional</Label>
<Label color="danger" variant="subtle">Required</Label>
```

## Anatomy

```tsx
<Label>...</Label>
```

## API Reference

### Label

| prop            | type                                                           | default | description                                   |
| --------------- | -------------------------------------------------------------- | ------- | --------------------------------------------- |
| `children`      | `React.ReactNode`                                              | -       | Content to render                             |
| `align`         | `'left' \| 'center' \| 'right'`                               | -       | Text alignment                                |
| `className`     | `string`                                                       | -       | Additional classes for the root text          |
| `classNames`    | `{ base?: string }`                                            | -       | Slot-specific class overrides                 |
| `color`         | `'default' \| 'muted' \| 'success' \| 'warning' \| 'danger'` | -       | Semantic color intent                          |
| `textProps`     | `TextProps`                                                    | -       | Extra props passed to the underlying Text     |
| `variant`       | `'default' \| 'subtle'`                                       | -       | Visual emphasis for the label text            |
| `...TextProps`  | `TextProps`                                                    | -       | All standard Text props are supported         |
