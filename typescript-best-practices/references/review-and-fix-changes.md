# Review And Fix Changes

Read this reference when the user asks to review or review-and-fix a working tree, branch,
commit, or commit range through the `typescript-best-practices` lens.

This is not a generic bug-hunting workflow. Review only for `typescript-best-practices`
violations: weak boundaries, duplicated transforms, unnecessary cleanup, vague abstractions,
over-broad seams, weak invariants, unnecessary casts, missing function comments, oversized
functions, foundational helper duplication, poor why-comments, and missed refactors.

## Fast Path

1. Determine the review target with git.
2. Compute the actual diff or commit list to inspect.
3. Restrict the scope to `.ts` and `.tsx` files unless the user explicitly asks for broader
   review.
4. Break the work into disjoint slices.
5. Spawn 1-5 subagents for larger reviews when subagents are available.
6. Tell each subagent to use `typescript-best-practices` as the full review rubric.
7. Let each subagent apply obvious bounded fixes in its owned files.
8. Have each subagent report remaining violations and any larger refactors.
9. Review every returned patch or recommendation before deciding what lands.
10. Ask the user before doing a large or cross-cutting refactor.

## Determine Scope With Git

Use git to figure out what to review instead of guessing:

- Current working tree:
  use `git status --short` and `git diff --name-only HEAD`
- Current branch against base:
  find the merge base, then review `git diff --name-only <merge-base>...HEAD`
- Single commit:
  use `git show --name-only --stat --summary <commit>`
- Commit range:
  use `git log --oneline <range>` and `git diff --name-only <range>`

Then restrict to `.ts` and `.tsx` files unless the user explicitly asks to include supporting
files too.

Useful commands:

- `git status --short`
- `git diff --name-only HEAD`
- `git diff --stat HEAD`
- `git merge-base HEAD origin/main`
- `git diff --name-only <merge-base>...HEAD`
- `git show --name-only --stat --summary <commit>`
- `git log --oneline <range>`

If the chosen scope has no TypeScript or TSX files, say so and stop unless the user wants a
broader review.

## Agent Count

Choose subagent count based on TypeScript review scope when subagents are available:

- 1 agent:
  1-3 TS files, a small diff, or one coherent module
- 2 agents:
  4-8 TS files or two clear slices
- 3 agents:
  a medium review with multiple TypeScript modules
- 4-5 agents:
  a large review with clear, disjoint TypeScript file groups

Do not spawn more than 5 subagents.
Do not spawn subagents for tiny reviews that are faster to do locally.
If subagents are unavailable, do the review locally with the same workflow.

## Slice The Review

Break the work into disjoint review slices:

- by module or runtime layer
- by file ownership or write scope
- by feature area
- by implementation versus tests

Do not give multiple subagents overlapping write ownership.
Do not spawn multiple subagents to inspect the same unresolved question.

## Subagent Instructions

Each subagent should be told:

- the exact files or module slice it owns
- that it must use `typescript-best-practices` as the review rubric
- to focus on helper reuse, boundary quality, invariant modeling, comments-for-why, and refactor
  opportunities
- to apply obvious bounded fixes directly in its owned files
- to report larger refactors back instead of making them unilaterally
- that it is not alone in the codebase and must not revert unrelated changes

Subagents should prefer:

- adding or tightening boundary schemas
- extracting repeated local transforms or invariant helpers
- splitting oversized functions into smaller composable helpers
- removing unnecessary defensive normalization
- narrowing dependency seams
- improving domain types
- adding short helpful function comments and why-comments for non-obvious invariants

Subagents should avoid:

- generic bug hunting unrelated to TypeScript quality
- speculative architecture refactors
- overlapping edits with other subagents
- broad shared utility extraction without clear repetition

## Parent Responsibilities

The parent agent should:

1. determine review scope with git
2. narrow to TypeScript files
3. split the review into slices
4. spawn subagents when justified
5. wait for all subagents before making final decisions
6. inspect every returned patch or recommendation
7. integrate or refine obvious fixes
8. decide whether larger refactors are worth doing now
9. ask the user before making very large or cross-cutting changes

The parent agent owns final review judgment. Subagents gather signal and apply small safe fixes;
the parent decides what actually lands.

## What Counts As Obvious

Subagents may apply changes directly when the change is:

- a local Zod boundary fix
- a local cast removal
- a local repeated transform or invariant extraction within the owned slice
- splitting an obviously overgrown function into small local helpers within the owned slice
- removal of clearly unnecessary defensive cleanup
- narrowing an obviously over-broad seam
- moving purely foundational string, number, URL, array, dictionary, dedupe, or filter logic into
  an existing shared helper file
- adding a short helpful function comment or why-comment for a non-obvious invariant
- a missing local test that protects the TypeScript refactor or invariant

Subagents should report back instead of changing code when the change is:

- a new shared abstraction across many modules
- a cross-cutting boundary redesign
- a wide rename or type model migration
- architectural or behavior-heavy beyond the owned slice
- something the user should reasonably approve first

## Large Refactor Escalation

Ask the user before proceeding when:

- the proposed refactor spans many files or modules
- the change introduces a new shared abstraction
- the type model change is wide in scope
- the review reveals real duplication but the cleanup is not obviously safe in one pass

When escalating, summarize:

- what `typescript-best-practices` rule is being violated
- why the larger refactor would help
- what file scope it likely touches
- what risks or follow-up work it creates

## Findings And Output

Present findings as TypeScript quality findings ordered by impact. Use file references and explain
which `typescript-best-practices` rule is being violated.

After findings, summarize:

- obvious fixes applied
- larger refactors to consider
- any places where the review found no issue

If no `typescript-best-practices` violations are discovered, say so explicitly.

Use this output shape:

- `TypeScript Quality Findings`
- `Obvious Fixes Applied`
- `Larger Refactors To Consider`

If there are no findings, say:

- `No typescript-best-practices violations found in reviewed TypeScript scope.`

## Review Checklist

- Did git scope the review accurately?
- Was the review narrowed to the relevant TypeScript or TSX files?
- Was the work split into disjoint slices before spawning subagents?
- Did each subagent use `typescript-best-practices` as the review rubric?
- Did the review stay focused on TypeScript quality rather than generic bug hunting?
- Did the review catch oversized functions and foundational helper logic that should have been
  shared?
- Were obvious bounded fixes applied directly?
- Were larger refactors reported back instead of applied blindly?
- Did the parent wait for all subagents before deciding on larger work?
- Does every finding map back to a `typescript-best-practices` expectation?
- If a required refactor is very large, was the user asked before proceeding?
