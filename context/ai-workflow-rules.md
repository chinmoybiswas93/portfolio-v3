# AI Workflow Rules

## Approach

Build this portfolio incrementally, one phase at a time. Each phase has a clear deliverable that can be verified visually in the browser (`npm run dev`) and technically (`npm run build`). Context files define what to build, how to build it, and the current state. Always implement against these specs — do not invent behavior, styles, or components beyond what is defined.

## Build Phases (in order)

Work through these phases sequentially. Do not start a new phase until the current one passes its verification check.

### Phase 1 — Foundation
Install Tailwind CSS, configure `astro.config.mjs`, write `src/styles/global.css` with all CSS custom properties. Create `src/data/types.ts`, `src/data/profile.ts`, `src/data/experience.ts`, `src/data/projects.ts` with real content. Create `BaseLayout.astro` with font loading and global styles.

**Verify**: `npm run build` passes. `global.css` tokens render correctly on a test page.

### Phase 2 — Two-Column Shell
Create `TwoColumnLayout.astro` with sticky left + scrollable right. Wire it into `src/pages/index.astro`. Create `LeftSidebar.astro` with static name, title, tagline, nav placeholder, and social links. Confirm the layout is correct at desktop and collapses correctly on mobile.

**Verify**: Dev server shows two columns on desktop. Single column on mobile. No JS yet.

### Phase 3 — About Section
Create `AboutSection.astro` and render it in the right content pane. Content from `profile.about` via `set:html`. Add the section `id="about"` for anchor scrolling.

**Verify**: About text renders. HTML in the about field is handled correctly.

### Phase 4 — Experience Section
Create `ExperienceSection.astro` and `ExperienceItem.astro`. Render the experience array from `experience.ts`. Include date column, role, company link, description, and skills tags using `Tag.astro`. Add "PRESENT" badge for current roles. Add "View Full Resume" link.

**Verify**: All experience entries render. Skills show as pill tags. Current role shows badge.

### Phase 5 — Projects Section
Create `ProjectsSection.astro` and `ProjectItem.astro`. Render only `featured === true` projects (up to 5). Include thumbnail, title, description, tech tags, GitHub/Live links. Add "View All Projects" link to `/projects`.

**Verify**: Featured projects render. External links open correctly. Non-featured projects are excluded.

### Phase 6 — Sidebar Nav (Active State)
Create `SidebarNav.astro`. Add Intersection Observer logic in `src/scripts/observer.ts` to track which section is in viewport and update the active nav link class. Confirm smooth scroll works.

**Verify**: Scrolling between sections updates the active link in the sidebar. Works on mobile where nav is hidden (observer still runs; just nav is not visible).

### Phase 7 — Projects Archive Page
Create `src/pages/projects.astro`. Render all projects (not filtered by featured). Create `ProjectsTable.astro` for desktop view and `ProjectCard.astro` for mobile. Add back-navigation link to `/`.

**Verify**: `/projects` renders all projects. Desktop table layout. Mobile shows simplified view.

### Phase 8 — Spotlight Effect
Create `src/scripts/spotlight.ts`. Implement mouse-tracking radial gradient overlay. Load the script in `BaseLayout.astro` at bottom of body. Guard with `window.innerWidth >= 1024` and `window.matchMedia`.

**Verify**: Spotlight follows cursor on desktop. No effect on mobile/touch screens.

### Phase 9 — Entrance Animations
Add `data-animate` attributes to section headings, experience items, and project items. Extend `src/scripts/observer.ts` to observe these elements and toggle `.visible` class. Define CSS transitions for `fade-in`, `slide-up`, `slide-left` in `global.css`.

**Verify**: Items animate in on scroll. First-visible items animate on load. No layout shift from animation initial state.

### Phase 10 — Polish and QA
Final pass: typography refinement, spacing adjustments, hover state review, mobile experience audit, keyboard navigation check, Lighthouse run, fix any issues. Update `progress-tracker.md` with final status.

**Verify**: Lighthouse ≥95 on all four scores. No console errors. Site matches design intent from `ui-context.md`.

## Scoping Rules

- Work on one phase at a time — do not combine phase work in one session
- Prefer small, verifiable increments over large speculative changes
- Do not add features not defined in `project-overview.md`
- If a design decision is not covered by `ui-context.md`, resolve it there before implementing

## When to Split Work

Split an implementation step if it:

- Combines a new component AND a new data shape change at the same time
- Touches both a page file and a script file for unrelated reasons
- Requires verifying two separate visual behaviors in the same step

## Handling Missing Requirements

- If content data is unknown (e.g., exact experience dates), use a placeholder in the data file and add an open question in `progress-tracker.md`
- If a design decision is ambiguous (e.g., exact card hover shadow), pick the closest match from `ui-context.md` and note it
- Do not invent new sections, pages, or features without updating `project-overview.md` first

## Protected Files

Do not modify unless explicitly instructed:

- `tsconfig.json`
- `astro.config.mjs` (only modify to add an integration, not to change settings arbitrarily)
- `package.json` / `package-lock.json`
- `public/favicon.svg` / `public/favicon.ico`

## Before Moving to the Next Phase

1. The current phase renders correctly in `npm run dev` (visual check)
2. `npm run build` passes with zero TypeScript errors
3. No `architecture.md` invariant is violated
4. `progress-tracker.md` is updated to reflect the completed phase and next up
