# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

Phase 1 — Foundation (not started)

## Current Goal

Install Tailwind CSS, set up CSS custom properties in `global.css`, write all TypeScript data files with real portfolio content, and create `BaseLayout.astro`.

## Completed

- Context files written: `project-overview.md`, `architecture.md`, `ui-context.md`, `code-standards.md`, `ai-workflow-rules.md`
- Astro 6 project initialized (blank starter at `/Users/chinmoy/projects/portfolio`)
- Source design analyzed: https://chinmoybiswas.com (Vue SPA via WordPress plugin `cb-portfolio`)
- All real content extracted from live site JSON data (`cbPortfolioData`, `cbExperienceData`, `cbProjectsData`)
- All project images downloaded to `public/images/projects/` (6 webp files)
- Logo downloaded to `public/images/logo.jpg`
- Data files created with real content:
  - `src/data/types.ts` — TypeScript interfaces
  - `src/data/profile.ts` — Chinmoy's real profile, social links, about text
  - `src/data/experience.ts` — 4 real work history entries
  - `src/data/projects.ts` — 6 real projects (5 featured, 1 non-featured)

## In Progress

- None yet

## Next Up

### Phase 1 — Foundation (remaining steps)
1. `npm install` Tailwind CSS 4 + `@astrojs/tailwind` integration
2. Update `astro.config.mjs` to add Tailwind integration
3. Create `src/styles/global.css` with all CSS custom property tokens from `ui-context.md`
4. Create `src/components/layout/BaseLayout.astro` (html shell, Inter font loading, global styles)
5. Update `src/pages/index.astro` to use `BaseLayout`
6. Run `npm run build` to verify zero errors

### Phase 2 — Two-Column Shell
- `TwoColumnLayout.astro`, `LeftSidebar.astro`, `SocialLinks.astro`
- Two-column desktop layout, single-column mobile collapse

### Phase 3 — About Section
- `AboutSection.astro` wired to `profile.about`

### Phase 4 — Experience Section
- `ExperienceSection.astro`, `ExperienceItem.astro`, `Tag.astro`

### Phase 5 — Projects Section
- `ProjectsSection.astro`, `ProjectItem.astro`, featured filter

### Phase 6 — Sidebar Nav Active State
- `SidebarNav.astro`, `src/scripts/observer.ts` (Intersection Observer)

### Phase 7 — Projects Archive Page
- `src/pages/projects.astro`, `ProjectsTable.astro`, `ProjectCard.astro`

### Phase 8 — Spotlight Effect
- `src/scripts/spotlight.ts`, desktop-only guard

### Phase 9 — Entrance Animations
- `data-animate` attributes, CSS transitions in `global.css`, observer extension

### Phase 10 — Polish and QA
- Lighthouse audit, spacing pass, mobile review, keyboard nav check

## Open Questions

- **Profile image**: `profile_image` field on the live site is empty — no photo set. Should we add one? If yes, provide a photo file.
- **Footer text**: Updated from WordPress-specific to Astro — confirm the new footer text is acceptable: "Inspired by Brittany Chiang... Built with Astro and deployed on Vercel."
- **Resume PDF**: Linked to `https://chinmoybiswas.com/resume.pdf` — should this be hosted locally in `public/resume.pdf` instead once deploying to Vercel/Netlify?
- **Twitter/X**: Included (`@_chinmoybiswas`). Confirm it's still active or remove it.
- **Projects page route**: Original WordPress `/projects` 404s. The Astro `/projects` page will be newly created at Phase 7 — it will show M-Smart Technology BD (the non-featured project) alongside all others.

## Architecture Decisions

- **Static data files over CMS**: Content lives in `src/data/*.ts` files. Rationale: eliminates the WordPress dependency entirely; content is edited by hand, which is appropriate for a personal portfolio that updates rarely.
- **No framework islands**: All interactivity (spotlight, scroll tracking, animations) is vanilla TypeScript. Rationale: zero JS overhead from a framework; portfolio interactions are simple enough to not need a reactive framework.
- **Tailwind CSS 4**: Using the new Tailwind 4 Vite-native integration for Astro. Rationale: smaller config, better performance, no `tailwind.config.js` needed.
- **Single-page scroll on homepage**: Homepage is a scroll-based single page (not multi-page router). Rationale: matches the original UX exactly; Astro generates a single `index.html` with anchor links.

## Session Notes

- Original Vue source: https://github.com/chinmoybiswas93/cb-portfolio — analyzed for component structure, CSS tokens, data shape, and animations
- Original live site: https://chinmoybiswas.com — two-column layout, deep navy `#0f172a` background, sky-blue accent improvements planned
- Data pre-populated from WordPress DB schema: `cb_portfolio`, `cb_portfolio_experience`, `cb_portfolio_projects` tables
- The Astro project is a blank starter — only `src/pages/index.astro` exists; all structure needs to be built
