## Application Building Context

Read the following files in order before implementing
or making any architectural decision:

1. `context/project-overview.md` — what this portfolio is,
   its sections, data model, and success criteria
2. `context/architecture.md` — Astro stack, directory structure,
   TypeScript interfaces, and build invariants
3. `context/ui-context.md` — color tokens, typography scale,
   layout rules, component patterns, and animations
4. `context/code-standards.md` — Astro conventions, TypeScript
   rules, styling rules, and file naming
5. `context/ai-workflow-rules.md` — the 10 build phases in order,
   scoping rules, and phase verification checklist
6. `context/progress-tracker.md` — current phase, what is done,
   what is next, and open questions

Update `context/progress-tracker.md` after completing
each phase or meaningful implementation step.

If implementation changes the architecture, color tokens,
or component patterns documented in the context files,
update the relevant file before continuing.

## Project Summary (quick reference)

**What**: Static Astro 6 portfolio for Chinmoy Biswas — a rebuild of
https://chinmoybiswas.com (currently WordPress + Vue SPA).

**Stack**: Astro 6 + TypeScript + Tailwind CSS 4 + Vanilla JS

**Key design**: Two-column layout — sticky left sidebar (45%) with
profile/nav/social + scrollable right content pane with About,
Experience, Projects sections. Dark navy theme (`#0f172a`),
sky-blue accent (`#38bdf8`), Inter font. Mouse spotlight on desktop.

**Content**: Lives in `src/data/*.ts` files — no CMS, no API.

**Build phases** (see `ai-workflow-rules.md` for full detail):
1. Foundation (Tailwind, global CSS, data files, BaseLayout)
2. Two-column shell (TwoColumnLayout, LeftSidebar)
3. About section
4. Experience section (timeline cards, skills tags)
5. Projects section (featured filter, cards)
6. Sidebar nav active state (Intersection Observer)
7. Projects archive page (`/projects`)
8. Spotlight effect (vanilla JS, desktop only)
9. Entrance animations (data-animate + observer)
10. Polish and QA (Lighthouse, mobile, a11y)

## Open Questions (answer before implementing)

See `context/progress-tracker.md` → Open Questions section.
Most important: real experience data, project data, profile image,
and resume URL need to be confirmed before Phase 1 data files are written.
