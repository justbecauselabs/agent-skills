# Schema Guidelines

- Always define your schema in `convex/schema.ts`.
- Always import the schema definition functions from `convex/server`.
- System fields are automatically added to all documents and are prefixed with an underscore. The two system fields that are automatically added to all documents are `_creationTime` which has the validator `v.number()` and `_id` which has the validator `v.id(tableName)`.
- Always include all index fields in the index name. For example, if an index is defined as `["field1", "field2"]`, the index name should be "by_field1_and_field2".
- Index fields must be queried in the same order they are defined. If you want to be able to query by "field1" then "field2" and by "field2" then "field1", you must create separate indexes.
- Avoid redundant indexes like `by_foo` and `by_foo_and_bar` when you can query both cases with the longer index.
- Exception: an index on `["foo"]` effectively sorts by `foo` then `_creationTime`. If you need `foo` + `_creationTime` ordering, you may still need the shorter index even if `by_foo_and_bar` exists.
