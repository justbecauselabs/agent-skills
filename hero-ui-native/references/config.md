---
summary: "HeroUI Native provider documentation."
read_when:
  - "Configuring HeroUI Native providers"
  - "Reviewing HeroUI Native provider options"
---

# HeroUINativeProvider

The `HeroUINativeProvider` is the root provider component that configures and initializes HeroUI Native in your React Native application. It provides global configuration and portal management for your application.

## Overview

The provider serves as the main entry point for HeroUI Native, wrapping your application with essential contexts and configurations:

- **Text Configuration**: Global text component settings for consistency across all HeroUI components
- **Animation Defaults**: Shared animation configs for components like tabs, accordions, dialogs, and toasts
- **Toast Defaults**: Global toast configuration used across the app
- **Portal Management**: Handles overlays, modals, and other components that render on top of the app hierarchy
- **Safe Area + Keyboard**: Installs safe area and keyboard listeners for overlay positioning

## Installation & Setup

### Basic Setup

Wrap your application root with the provider:

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>;
}
```

### With Configuration

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          maxFontSizeMultiplier: 1.5,
        },
      }}
    >
      {/* Your app content */}
    </HeroUINativeProvider>
  );
}
```

## Configuration Options

The provider accepts a `config` prop with the following options:

### Text Component Configuration

Global settings for all Text components within HeroUI Native. These props are carefully selected to include only those that make sense to configure globally across all Text components in the application:

```tsx
config={{
  textProps: {
    // Disable font scaling for accessibility
    allowFontScaling: false,

    // Auto-adjust font size to fit container
    adjustsFontSizeToFit: false,

    // Maximum font size multiplier when scaling
    maxFontSizeMultiplier: 1.5,

    // Minimum font scale (iOS only, 0.01-1.0)
    minimumFontScale: 0.5,
  },
}}
```

### Animation Configuration

Provide shared animation defaults for component transitions.

```tsx
config={{
  animations: {
    tabIndicator: {/* AnimationConfig */},
    accordionContent: {/* AnimationConfig */},
    accordionIndicator: {/* AnimationConfig */},
    dialog: {/* AnimationConfig */},
    popover: {/* AnimationConfig */},
    select: {/* AnimationConfig */},
    toast: {/* AnimationConfig */},
  },
}}
```

### Toast Configuration

Set global defaults for toast variants and behavior. Local toast props override these defaults.

```tsx
config={{
  toast: {
    defaultProps: {
      duration: 4000,
      placement: 'top',
    },
  },
}}
```

### Dev Info

Toggle dev-only overlay info when debugging layouts.

```tsx
config={{
  devInfo: {
    show: false,
  },
}}
```

## Architecture

### Provider Hierarchy

The `HeroUINativeProvider` internally composes multiple providers:

```
HeroUINativeProvider
├── TextComponentProvider (text configuration)
│   └── Your App
│   └── PortalHost (for overlays)
```

## Complete Example

Here's a comprehensive example showing all configuration options:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';

const config: HeroUINativeConfig = {
  // Global text configuration
  textProps: {
    minimumFontScale: 0.5,
    maxFontSizeMultiplier: 1.5,
    allowFontScaling: true,
    adjustsFontSizeToFit: false,
  },
  animations: {
    tabIndicator: {/* AnimationConfig */},
    accordionContent: {/* AnimationConfig */},
    dialog: {/* AnimationConfig */},
    toast: {/* AnimationConfig */},
  },
  toast: {
    defaultProps: {
      duration: 4000,
      placement: 'top',
    },
  },
};

export default function App() {
  return (
    <HeroUINativeProvider config={config}>
      <YourApp />
    </HeroUINativeProvider>
  );
}
```

## Integration with Expo Router

When using Expo Router, wrap your root layout:

```tsx
// app/_layout.tsx
import { HeroUINativeProvider } from 'heroui-native';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          minimumFontScale: 0.5,
          maxFontSizeMultiplier: 1.5,
        },
      }}
    >
      <Stack />
    </HeroUINativeProvider>
  );
}
```

## Best Practices

### 1. Single Provider Instance

Always use a single `HeroUINativeProvider` at the root of your app. Don't nest multiple providers:

```tsx
// ❌ Bad
<HeroUINativeProvider>
  <SomeComponent>
    <HeroUINativeProvider> {/* Don't do this */}
      <AnotherComponent />
    </HeroUINativeProvider>
  </SomeComponent>
</HeroUINativeProvider>

// ✅ Good
<HeroUINativeProvider>
  <SomeComponent>
    <AnotherComponent />
  </SomeComponent>
</HeroUINativeProvider>
```

### 2. Configuration Object

Define your configuration outside the component to prevent recreating on each render:

```tsx
// ❌ Bad
function App() {
  return (
    <HeroUINativeProvider
      config={{
        textProps: {
          /* inline config */
        },
      }}
    >
      {/* ... */}
    </HeroUINativeProvider>
  );
}

// ✅ Good
const config: HeroUINativeConfig = {
  textProps: {
    maxFontSizeMultiplier: 1.5,
  },
};

function App() {
  return (
    <HeroUINativeProvider config={config}>
      {/* ... */}
    </HeroUINativeProvider>
  );
}
```

### 3. Text Configuration

Consider accessibility when configuring text props:

```tsx
config={{
  textProps: {
    // Allow font scaling for accessibility
    allowFontScaling: true,
    // But limit maximum scale
    maxFontSizeMultiplier: 1.5,
  },
}}
```

## TypeScript Support

The provider is fully typed. Import types for better IDE support:

```tsx
import {
  HeroUINativeProvider,
  type HeroUINativeConfig,
} from 'heroui-native';

const config: HeroUINativeConfig = {
  // Full type safety and autocomplete
  textProps: {
    allowFontScaling: true,
    maxFontSizeMultiplier: 1.5,
  },
};
```

## Troubleshooting

### Type Errors

Ensure you're using the correct import paths:

```tsx
// ✅ Correct imports
import { HeroUINativeProvider } from 'heroui-native';
import type { HeroUINativeConfig } from 'heroui-native';

// ❌ Incorrect (internal path)
import { HeroUINativeProvider } from 'heroui-native/providers';
```

## See Also

- [Component Documentation](../../components/README.md) - Using HeroUI Native components
