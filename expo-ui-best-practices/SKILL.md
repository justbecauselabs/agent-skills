---
name: expo-ui-best-practices
description: Design and refine Expo app interfaces when deciding information hierarchy, tap behavior, route-versus-overlay presentation, light and dark mode parity, or visual verification. Use Expo Router and component-library skills for API details.
---

# Expo UI Best Practices

Use this skill for product and interaction decisions in Expo or React Native interfaces. Preserve the user's requested behavior and the app's established design language. Load the relevant Expo Router, design-system, or component-library skill when implementation details matter.

## Shape the Interface

- Start with the primary user task and make its current state and next action obvious.
- Subtract repeated headings, subtitles, nested surfaces, and decorative metadata before adding new chrome. Prefer one visual container per coherent group.
- Make a row or card the tap target when it has one destination. Keep a nested button only when it performs a distinct action.
- Keep compact controls readable and easy to press. Visual density must not reduce the effective touch target or obscure selected, disabled, loading, and destructive states.

## Choose the Presentation

- Use an inline dialog or sheet for a brief confirmation, short form, or small choice set that belongs to the current screen.
- Use a modal route when the flow behaves like a screen: it is full-screen, scrollable, stateful, multi-step, has its own header, accepts route parameters, or may need deep linking.
- When the user asks for a completely new route that appears as a modal, implement a route and configure the stack presentation. On iOS, use `fullScreenModal` when the request requires a true full-screen modal.
- Use a normal route when the destination is not temporary and belongs in the navigation hierarchy.

Do not simulate a route by stretching a component-library dialog across the viewport.

## Support Light and Dark Modes

- Use semantic theme tokens for backgrounds, surfaces, borders, text, icons, status colors, and pressed or disabled states. Avoid fixed colors that only work in one appearance.
- Preserve hierarchy and legibility in both modes. Dark mode is not a literal color inversion; elevated surfaces, overlays, separators, and system bars still need intentional contrast.
- Check selected, disabled, success, warning, error, and destructive states in both appearances when those states are in scope.

## Verify the Result

After implementing a visual change, run the app and capture the same meaningful state in light and dark modes when the environment supports it. Review the screenshots for:

- clear primary action and information hierarchy;
- clipping, overflow, safe-area, keyboard, and system-bar problems;
- duplicated chrome or unnecessary card nesting;
- complete row and card tap targets;
- distinguishable selected, disabled, pressed, and destructive states;
- modal presentation matching the requested navigation behavior.

A successful build is not visual verification. If screenshots cannot be captured, state that limitation instead of implying both appearances were reviewed.
