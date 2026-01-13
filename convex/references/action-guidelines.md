# Action Guidelines

- Always add `"use node";` to the top of files containing actions that use Node.js built-in modules.
- Never use `ctx.db` inside of an action. Actions don't have access to the database.
- Use `ctx.runQuery` / `ctx.runMutation` for database access from actions, and prefer internal function references (`internal.*`).
- Avoid multiple sequential `ctx.runQuery` / `ctx.runMutation` calls when you can fold work into a single internal function.
- Only use `ctx.runAction` from another action if you must cross runtimes; otherwise, call a helper function directly.
- Below is an example of the syntax for an action:
```ts
import { action } from "./_generated/server";

export const exampleAction = action({
    args: {},
    returns: v.null(),
    handler: async (ctx, args) => {
        console.log("This action does not return anything");
        return null;
    },
});
```
