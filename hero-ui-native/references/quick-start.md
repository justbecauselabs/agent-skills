---
summary: "HeroUI Native quick start setup and installation steps."
read_when:
  - "Setting up HeroUI Native for the first time"
  - "Installing HeroUI Native and peer dependencies"
---

# Quick Start

## 1. Install HeroUI Native

```bash
npm install heroui-native
```

## 2. Install Peer Dependencies

Minimum versions from the docs:

```bash
npm install react-native-reanimated@^3.4.1 react-native-safe-area-context@^4.14.0 react-native-svg@^15.11.2 @react-native-async-storage/async-storage@^2.1.1
```

For Expo:

```bash
npx expo install react-native-reanimated react-native-safe-area-context react-native-svg @react-native-async-storage/async-storage
```

## 3. Set Up Uniwind

Follow the Uniwind quickstart, then ensure your `global.css` includes HeroUI Native styles:

```css
@import 'tailwindcss';
@import 'uniwind';

@import 'heroui-native/styles';

@source './node_modules/heroui-native/lib';
```

Import `global.css` once at the root of your app (for example in `App.tsx` or `app/_layout.tsx`).

## 4. Wrap Your App With the Provider

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return <HeroUINativeProvider>{/* App content */}</HeroUINativeProvider>;
}
```

## 5. Use Your First Component

```tsx
import { Button } from 'heroui-native';

<Button>Get Started</Button>;
```
