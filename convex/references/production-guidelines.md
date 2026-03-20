# Production Guidelines

Read this when the task touches deployment, configuration, operations, or project-level Convex setup.

## Project configuration

- Check `convex.json` before inventing conventions for functions, generated files, AI files, or runtime settings.
- Treat environment variables and deployment configuration as first-class inputs to the design.

## Deployment guidance

- Confirm whether the task targets development, preview, or production deployments before changing behavior.
- In multi-repo or preview-deployment setups, avoid assumptions about a single frontend or a single deployment URL.
- Use the CLI and deployment docs when the task depends on agent mode, deploy keys, or local deployments.

## Operational integrations

- For logging, exception reporting, or stream/export setups, prefer the documented integration points over custom side channels.
- If a task changes domains, hosting, or frontend/backend URL wiring, verify the hosting and deployment model explicitly.

## Read the live docs when needed

- `/production.md`
- `/production/project-configuration.md`
- `/production/environment-variables.md`
- `/production/multiple-repos.md`
- `/production/integrations.md`
- `/production/hosting.md`
- `/cli/agent-mode.md`
- `/cli/local-deployments.md`
