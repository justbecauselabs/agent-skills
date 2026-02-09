# Agent Skills Library

This repository is a library of Codex "skills": reusable, local instruction sets stored in `*/SKILL.md` files (and some internal/system skills in `.system/*/SKILL.md`).

Note: Some individual skill folders may also contain their own `AGENTS.md` (often generated/compiled for that skill). This root `AGENTS.md` is repository-level guidance.

## What To Do Here

- Read and edit skill docs (`SKILL.md`, `references/`, `rules/`, etc.).
- Add new skills as new folders with a `SKILL.md` at the top of the folder.

## What Not To Do Here

- Do not treat this repo like an app or package.
- Do not run any skill installation workflow from this repo.
- In particular: do not run the Skill Installer (`.system/skill-installer`) here (or anything under `.system/skill-installer/scripts/`). This repo already contains the skills; nothing needs to be installed to "use" them.
