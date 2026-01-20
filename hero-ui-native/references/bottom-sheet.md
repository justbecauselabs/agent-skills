---
summary: "HeroUI Native Bottom Sheet component documentation."
read_when:
  - "Using the HeroUI Native Bottom Sheet component"
  - "Building slide-up panels and drawers"
---

# Bottom Sheet

Bottom Sheet is a slide-up panel that presents supplementary content without leaving the current screen.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the Quick Start guide.

```tsx
import { BottomSheet } from 'heroui-native';
```

## Usage

### Basic Usage

```tsx
const [isOpen, setIsOpen] = useState(false);

<BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} snapPoints={[0.25, 0.5, 0.9]}>
  <BottomSheet.Backdrop />
  <BottomSheet.Handle />
  <BottomSheet.Content>
    <Text className="text-base">Sheet content</Text>
  </BottomSheet.Content>
</BottomSheet>
```

### Controlled Index

```tsx
<BottomSheet
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  index={1}
  snapPoints={[0.3, 0.6, 0.9]}
/>
```

### Custom Styling

```tsx
<BottomSheet
  contentClassName="bg-surface"
  handleClassName="bg-divider"
  backdropClassName="bg-black/40"
/>
```

## Anatomy

```tsx
<BottomSheet>
  <BottomSheet.Backdrop />
  <BottomSheet.Handle />
  <BottomSheet.Content>...</BottomSheet.Content>
</BottomSheet>
```

## API Reference

### BottomSheet

| prop                   | type                 | default | description                                   |
| ---------------------- | -------------------- | ------- | --------------------------------------------- |
| `isOpen`               | `boolean`            | -       | Controls whether the sheet is open            |
| `onOpenChange`         | `(open: boolean) => void` | -  | Called when open state changes                |
| `onClose`              | `() => void`         | -       | Called when the sheet closes                  |
| `snapPoints`           | `number[]`           | -       | Array of snap points (fractions of height)    |
| `index`                | `number`             | -       | Controlled snap index                         |
| `closeOnOverlayPress`  | `boolean`            | -       | Close when the backdrop is pressed            |
| `dismissible`          | `boolean`            | -       | Allow swipe-to-dismiss                        |
| `backdropVariant`      | `string`             | -       | Backdrop style variant                        |
| `backdropClassName`    | `string`             | -       | Classes for the backdrop                      |
| `contentClassName`     | `string`             | -       | Classes for the content container             |
| `handleClassName`      | `string`             | -       | Classes for the drag handle                   |
