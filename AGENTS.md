# Samantha Lash Portfolio Agent Guide

Follow the shared command rules in `@/Users/theo/.codex/RTK.md`. Prefix every
shell command with `rtk`; use `rtk proxy` only when RTK has no wrapper for the
command.

## Session Startup

Before planning or editing, read these files in order:

1. `AGENTS.md`
2. `DESIGN.md`
3. `memory/MEMORY.md`
4. `LESSONS.md`
5. `memory/lessons.md`
6. `TASKS.md`
7. `tasks/todo.md`

Then inspect `git status` and the relevant source. Do not assume documentation
is newer than the code; reconcile any conflict before proceeding.

## Sources Of Truth

Use this priority when requirements conflict:

1. The user's latest instruction.
2. `references/goal-mockups/` for Samantha's wording and visual hierarchy.
3. `DESIGN.md` for approved product and interaction decisions.
4. `references/constanza-inspiration/` and `https://constanzacoscia.xyz/` for
   interaction and layout behavior only.
5. The archived portfolio for reusable Samantha assets and older context.

Never paraphrase Samantha's approved portfolio copy unless the user explicitly
asks for copy editing.

## Archive Safety

- `/archive/` must remain functional and independently routable.
- Never delete, rename, or reorganize `src/archive/portfolio/`, `inspo/`, or
  `archive/legacy-site/` unless the user explicitly requests an archive change.
- New work belongs under `src/new-portfolio/`. Copy an archive asset when the
  new site needs an independent production source; do not relocate it.
- Treat `dist/` as generated output and never hand-edit it.

## Working Practices

- Plan active work in `tasks/todo.md` before implementation.
- Keep project content in typed data, not duplicated across page components.
- Preserve clean URLs, keyboard access, responsive behavior, and reduced-motion
  support with every UI change.
- Run `npm run build` after meaningful code changes. Verify direct route output
  whenever routes or Vite configuration change.
- Do not add a dependency when the platform or existing stack can solve the
  problem clearly.

## Memory And Documentation

When the user says to remember something or corrects project behavior, create a
focused file in `memory/` and add it to `memory/MEMORY.md`:

- `user_*.md` for the user's working preferences.
- `project_*.md` for durable project facts or constraints.
- `feedback_*.md` for corrections to agent behavior.
- `reference_*.md` for external links, facts, and reference context.

Use `LESSONS.md` for the current concise principles that should guide work. Use
`memory/lessons.md` for narrative entries containing what happened, why it was
wrong or risky, what changed, and the deeper principle. Add narrative entries
when the user calls something a lesson/pattern or when a correction repeats; do
not manufacture lessons after routine work.

Use `TASKS.md` for milestones and the project roadmap. Use `tasks/todo.md` for
the current sprint's actionable checklist.

## End Of Major Work

Before finishing a major change or chat:

1. Mark shipped work and remaining work in `tasks/todo.md`.
2. Update `TASKS.md` if milestone status or roadmap scope changed.
3. Update `DESIGN.md` only when product/design truth changed.
4. Capture and index any new memory or qualifying lesson.
5. Run the relevant verification and report anything not verified.

