# Vector Search Guidelines

Read this when the task uses embeddings or semantic retrieval.

## Core rule

- Vector search is performed from actions, not queries or mutations. Plan the function boundary around that constraint.

## Schema guidance

- Define a vector index with an explicit vector field and dimension count.
- Keep any additional filter fields intentional because they shape which constrained searches are possible.
- If the app stores embeddings in a separate table, define the linking fields and follow-up lookup path clearly.

## Function design guidance

- Use an action to run the vector search and then decide whether to return raw search results directly or hand the IDs to a query or mutation for follow-up loading.
- Remember that action results are not reactive. If the UI needs reactive document fields after search, separate retrieval from reactive document loading.
- Treat embedding generation as a separate concern from retrieval so the source of truth for embeddings stays clear.

## Choosing search mode

- Use full-text search when lexical matching is sufficient.
- Use vector search when semantic similarity matters.
- Use a hybrid design only when the product behavior actually benefits from both.

## Read the live docs when needed

- `/search/vector-search.md`
- `/search.md`
