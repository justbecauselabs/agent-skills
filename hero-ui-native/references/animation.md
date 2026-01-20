---
summary: "HeroUI Native animation configuration and usage patterns."
read_when:
  - "Customizing HeroUI Native animations"
  - "Setting global animation defaults"
---

# Animation

HeroUI Native components that animate transitions expose an `animation` prop. The same `AnimationConfig` shape can be provided globally via `HeroUINativeProvider` and overridden per component.

## Global Defaults

Set shared animation defaults in the provider configuration:

```tsx
<HeroUINativeProvider
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
>
  <App />
</HeroUINativeProvider>
```

## Per-Component Overrides

Provide `animation` directly on components when you need custom behavior for a specific instance.

```tsx
<Dialog animation={{/* AnimationConfig */}} />
```

## Tips

- Use subtle durations and easing to reinforce state changes.
- Keep motion consistent by relying on provider defaults when possible.
