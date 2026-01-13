# Full Text Search Guidelines

- A query for "10 messages in channel '#general' that best match the query 'hello hi' in their body" would look like:

```typescript
const messages = await ctx.db
  .query("messages")
  .withSearchIndex("search_body", (q) =>
    q.search("body", "hello hi").eq("channel", "#general"),
  )
  .take(10);
```
