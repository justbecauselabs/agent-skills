---
name: text-animations
description: Typography and text animation patterns for Remotion
---

## Text animations

Based on `useCurrentFrame()`, reduce the string character by character to create a typewriter effect.

## Typewriter Effect

Always use string slicing for typewriter effects. Never use per-character opacity.

```tsx
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Typewriter: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Characters per second
  const charsPerSecond = 20;
  const charsToShow = Math.floor((frame / fps) * charsPerSecond);
  const displayedText = text.slice(0, charsToShow);

  return (
    <div style={{ fontFamily: "monospace", fontSize: 48 }}>
      {displayedText}
      <span style={{ opacity: frame % (fps / 2) < fps / 4 ? 1 : 0 }}>|</span>
    </div>
  );
};
```

## Word Highlighting

Animate a word highlight effect, like with a highlighter pen:

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const WordHighlight: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const highlightProgress = interpolate(frame, [0, fps], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          background: "yellow",
          height: "100%",
          width: `${highlightProgress}%`,
          zIndex: -1,
        }}
      />
      <span style={{ fontSize: 48, fontWeight: "bold" }}>{text}</span>
    </div>
  );
};
```
