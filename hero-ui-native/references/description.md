---
summary: "HeroUI Native Description component documentation."
read_when:
  - "Using the HeroUI Native Description component"
  - "Adding helper text under inputs or headings"
---

# Description

Use `Description` to show helper text, captions, or supplemental guidance below inputs or headings.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the Quick Start guide.

```tsx
import { Description } from 'heroui-native';
```

## Usage

### Basic Usage

```tsx
<FormField>
  <TextField label="Email address" placeholder="hello@example.com" />
  <Description>We'll never share your email.</Description>
</FormField>
```

### As a FormField Slot

```tsx
<FormField>
  <TextField label="Password" secureTextEntry />
  <FormField.Description>Use at least 8 characters.</FormField.Description>
</FormField>
```

### Colors and Variants

```tsx
<Description color="success">Looks good</Description>
<Description color="danger" variant="subtle">Password is too short</Description>
```

## Anatomy

```tsx
<Description>...</Description>
```

## API Reference

### Description

| prop            | type                                             | default | description                                   |
| --------------- | ------------------------------------------------ | ------- | --------------------------------------------- |
| `children`      | `React.ReactNode`                                | -       | Content to render                             |
| `allowFontScaling` | `boolean`                                     | -       | Enable or disable font scaling                |
| `className`     | `string`                                         | -       | Additional classes for the root text          |
| `classNames`    | `{ base?: string }`                              | -       | Slot-specific class overrides                 |
| `color`         | `'default' \| 'success' \| 'warning' \| 'danger'` | -    | Semantic color intent                          |
| `numberOfLines` | `number`                                         | -       | Truncate text after a number of lines         |
| `textProps`     | `TextProps`                                      | -       | Extra props passed to the underlying Text     |
| `variant`       | `'default' \| 'subtle'`                          | -       | Visual emphasis for the description text      |
| `...TextProps`  | `TextProps`                                      | -       | All standard Text props are supported         |
