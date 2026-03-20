# AI and Agents Guidelines

Read this when the task touches Convex AI features, the Agent component, or AI-assisted Convex workflows.

## Split the problem first

- Use `/ai.md` and `/ai/convex-mcp-server.md` for AI-assisted development workflow and MCP setup questions.
- Use `/agents.md` and related `/agents/*` pages for runtime product features built on the Agent component.

## Agent component guidance

- Choose the Agent component when the app needs threads, message history, tool calls, streaming, RAG, or workflow-style orchestration.
- Decide early whether the task is about messages, context, tools, streaming, usage tracking, or workflows because the implementation surface differs.
- Keep retrieval design explicit: recent context, search context, and tool context should be chosen deliberately rather than mixed casually.

## Practical notes

- Thread and message modeling matter. Confirm which identifier is the durable conversation key before changing schema or API design.
- Tool usage and workflow behavior should be designed around clear boundaries between transactional Convex work and external model or network calls.
- If the feature depends on retrieval quality, check whether plain text search, vector search, or both are intended.

## Read the live docs when needed

- `/ai.md`
- `/ai/convex-mcp-server.md`
- `/agents.md`
- `/agents/getting-started.md`
- `/agents/context.md`
- `/agents/tools.md`
- `/agents/streaming.md`
- `/agents/rag.md`
- `/agents/usage-tracking.md`
- `/agents/workflows.md`
