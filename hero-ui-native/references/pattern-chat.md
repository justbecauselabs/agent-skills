---
summary: "Chat UI pattern using HeroUI Native components."
read_when:
  - "Building a chat interface"
  - "Designing message lists and input bars"
---

# Pattern: Chat

Use `ScrollShadow` to frame the message list, `Surface` to style message bubbles, and `TextField` plus `Button` for the composer.

## Message List

```tsx
<ScrollShadow className="flex-1" orientation="vertical">
  {messages.map((message) => (
    <Surface
      key={message.id}
      variant={message.isMine ? 'primary' : 'secondary'}
      className={message.isMine ? 'self-end' : 'self-start'}
    >
      <Text className="text-sm text-foreground">{message.text}</Text>
    </Surface>
  ))}
</ScrollShadow>
```

## Composer

```tsx
<Surface className="flex-row items-center gap-2">
  <TextField
    className="flex-1"
    placeholder="Type a message"
  />
  <Button isIconOnly>
    <Icon name="send" size={18} />
  </Button>
</Surface>
```

## Tips

- Keep the list scrollable and anchored to the latest message.
- Use `Surface` variants to differentiate sent vs. received messages.
- Consider `ScrollShadow` to indicate overflow.
