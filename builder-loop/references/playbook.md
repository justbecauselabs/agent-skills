# Builder Loop — Playbook

Concrete templates and commands for the workflow in `SKILL.md`.

## Contents
- Plan doc skeleton
- Optional subagent plan-validation prompt template
- Agent-review phase targets
- Gate matrix (this repo)
- Review budget
- Pitfalls this workflow exists to catch

## Plan doc skeleton

Use the task tracker by default. When a complex plan needs durable detail, write it
to a scratch file (e.g. `PLAN-<slug>.md`), validate, then delete it before CP1.

```markdown
# Plan: <task>

## Goal / constraints
- <hard requirements, defaults, "fix-forward" or "no-migrate" rules, etc.>

## Verified current state (file:line)
- <real call sites, schemas, contracts you actually read — not assumptions>

## Design decisions
1. <decision + why; name the exact functions/fields/files touched>

## Checkpoints
- CP1 — <slice>. Gate: <typecheck/test/build>. Tests: <cases>.
- CP2 — ...

## Risks / edge cases
- <churn, idempotency, null-safety, contract drift, rollout/default semantics>
```

## Optional subagent plan-validation prompt template

Use subagents only when the user or active agent instructions explicitly request
parallel review. In that case, spawn 2+ read-only agents, one per concern. Otherwise,
apply this same rubric locally against the real code. Example:

```
You are a senior <domain> reviewer. Read this plan doc: <path>. Then read the REAL
code it touches (<list the exact files>) and verify the plan is correct and complete.
This is plan validation — do NOT edit anything.

Answer concretely with file:line:
1. Does <key design decision> actually achieve <goal> without <stated constraint
   violation>? Point to the exact lines where each change must go.
2. Null-safety / loading / error states the plan misses?
3. Contract drift (e.g. server return shape ⇄ client decoder) — both sides covered?
4. Any OTHER call site / code path that must change and the plan omits? Grep broadly.
5. Anything WRONG, risky, or missing. Rank by severity, each with file:line + fix.
```

When parallel review is authorized, reconcile its findings with the local checks.
Do not run agent-review on the plan doc: its bundle contains changed-file snapshots,
so a plan-only diff does not include the real implementation needed to validate the
plan.

## Agent-review phase targets

Read `.agents/skills/agent-review/SKILL.md` immediately before invoking a review.
That canonical skill owns the runner path, engines, commands, result handling, and
bounded convergence rules. Builder-loop owns when and at what scope to review:

| Phase | Review target |
|-------|---------------|
| Explicitly requested checkpoint review | The checkpoint commit or working-tree changes |
| Final gate, committed | The complete branch against its remote base |
| Final gate, uncommitted | The complete working tree against `HEAD` |

## Gate matrix (this repo)

| Layer | Checkpoint gate |
|-------|-----------------|
| Backend (Convex/TS) | `cd backend && bun run typecheck && bun run lint && bun test <files>` |
| Backend final | `cd backend && bun run typecheck && bun run lint && bun run test` |
| iOS | `cd ios && tuist generate --no-open` then arm64 sim build (see `AGENTS.md` "Default CLI validation command"); do not reinstall the dev simulator unless asked |
| Web | `cd web && <typecheck/lint/build>` |

Format before agent-review if formatting can shift line locations.

## Review budget

- Verify each finding by reading the real code path before fixing; reject
  unrealistic edge cases, speculative risk, and broad rewrites.
- Checkpoint gates are typechecks, lint, focused tests, or builds. Do not add an
  agent-review call unless the user explicitly requested review at that checkpoint.
- At the final gate, run round 1 once. After accepted fixes, rerun relevant proof
  and allow one round-1 convergence review.
- Stop after the convergence review even if it reports findings. Report unresolved
  blockers and ask before expanding scope; never keep reviewing to obtain a clean
  label.
- Round 2 is an explicit deep structural review, not part of the default builder
  loop. Round 3 requires an explicit adversarial-review request.

## Pitfalls this workflow exists to catch

Real classes of bug that local plan validation, project gates, and integrated review
surfaced in practice:

- **Default/rollout semantics**: a flag's default (ON vs OFF) read inconsistently
  across server return, gate logic, and client decoder; or test factories masking
  the production default. Lock the default with explicit "absent ⇒ default" tests.
- **Side-effect can't run where you put it**: e.g. network I/O (analytics) inside a
  DB transaction/mutation aborts the write — schedule it best-effort instead.
- **Stale copy in untouched surfaces**: changing behavior (e.g. a timing value) while
  push/notification/secondary-screen copy still hardcodes the old wording.
- **Loading/unknown state collapsed**: treating `nil`/"not loaded yet" as a concrete
  value (e.g. `?? 0`) and showing the wrong control before data arrives.
- **Backstop vs threshold mismatch**: a periodic job's scan window narrower than the
  decision threshold it feeds, so the job always picks one branch.
- **Churn/idempotency**: a reconcile that rewrites steady-state rows every tick —
  skip the write when the row already matches desired state.
