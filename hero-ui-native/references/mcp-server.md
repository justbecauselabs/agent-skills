---
summary: "HeroUI Native MCP server setup and available tools."
read_when:
  - "Accessing HeroUI Native docs through MCP"
  - "Integrating HeroUI Native with AI tooling"
---

# MCP Server

HeroUI provides an MCP server so LLM tooling can query structured docs, tokens, and component data.

## Quick Setup

```bash
npx install @heroui/mcp
```

## Available Tools

- `get_hero_ui_components`: list available HeroUI Native components.
- `get_hero_ui_component`: fetch details for a specific component.
- `get_hero_ui_prompt`: get the latest HeroUI prompt for LLMs.
- `get_hero_ui_tokens`: fetch a set of design tokens.
- `get_hero_ui_tokens_list`: list token categories.
- `get_hero_ui_styles_list`: list styling utilities.
- `get_hero_ui_styles`: fetch a specific style utility.
- `get_hero_ui_styles_props`: get props related to style utilities.
