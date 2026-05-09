# AI Workflow Rules

## Approach

Work on one phase at a time. Each phase has a spec file in `context/specs/`.
Read the spec, read the files it tells you to read, implement exactly what is written.
Nothing more. There are 10 build phases. Most files are NOT touched by any given phase.

## Before starting any phase

1. Read `context/progress-tracker.md` — confirm which phase is In Progress
2. Read `context/specs/NN-phase-name.md` for that phase
3. Read every file listed under "Read first" in the spec
4. If the spec references an existing component or token, verify it in the codebase first
5. Do not start coding until you have read everything the spec asks for

## Scoping rules

- Only create or modify files listed in the spec's "Files changed" section
- Do not refactor, clean up, or improve code outside the spec's scope
- Do not add components beyond what the spec describes, even if they seem useful
- Do not fix design issues you notice in other files — add them to Open Questions

## When to stop and ask

- The spec references a CSS token that is not defined in `global.css` — ask
- Two spec requirements seem to contradict each other — ask
- The existing component structure makes the spec implementation ambiguous — ask

Add the question to `progress-tracker.md` Open Questions before stopping.

## Protected files — never modify unless the phase spec explicitly lists them

- `src/data/types.ts` — interfaces are fixed; only change if a data shape bug is found
- `src/data/profile.ts`, `experience.ts`, `projects.ts` — content files, not styling files
- `public/images/` — static assets, never regenerated
- `tsconfig.json` — set at init
- `package.json` / `package-lock.json` — only touch to add a dependency the spec requires

## Verification before marking a phase complete

Run through this checklist before moving the phase to Completed in `progress-tracker.md`:

1. Every file in the spec's "Files changed" is created or modified
2. Every item in the spec's "Verify when done" is true
3. No file outside the spec's scope was touched
4. No existing CSS token was changed (new tokens may be added to `global.css`)
5. `npm run build` passes with zero TypeScript errors
6. The result looks correct in `npm run dev` — visual check required
7. `progress-tracker.md` is updated with the completed phase and next phase set to In Progress

## Backward compatibility

For every component modified in a later phase:
- Props interface must not change (new optional props are allowed)
- Existing slot usage in parent files must still work
- CSS custom property tokens referenced by the component must still exist in `global.css`
