# Query Guidelines

- Prefer `withIndex` / `withSearchIndex` over `.filter`. If you need complex logic and the result set is small, filter in TypeScript after a bounded query.
- Use `.filter` only when paginating and you can't express the predicate with indexes. `withIndex` is still more efficient when possible.
- Avoid `.collect()` on large or unbounded result sets. Use pagination, `.take(n)`, or denormalized counters instead. `.collect()` is fine for small result sets.
- Convex queries do NOT support `.delete()`. Instead, `.collect()` the results, iterate over them, and call `ctx.db.delete("tableName", row._id)` on each result.
- Use `.unique()` to get a single document from a query. This method will throw an error if there are multiple documents that match the query.
- When using async iteration, don't use `.collect()` or `.take(n)` on the result of a query. Instead, use the `for await (const row of query)` syntax.

## Ordering
- By default Convex always returns documents in ascending `_creationTime` order.
- You can use `.order('asc')` or `.order('desc')` to pick whether a query is in ascending or descending order. If the order isn't specified, it defaults to ascending.
- Document queries that use indexes will be ordered based on the columns in the index and can avoid slow table scans.
