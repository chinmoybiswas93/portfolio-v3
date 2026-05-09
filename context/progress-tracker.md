# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

Phase 8 — Spotlight Effect (not started)

## Current Goal

Build `src/scripts/spotlight.ts`, desktop-only guard.

## Completed

### Phase 7 — Projects Archive Page ✓
- Created `ProjectsTableRow.astro` — `<tr>` with Year, Project (link + ↗), Made at, Built with (Tag pills), Link (GitHub SVG icon) columns; row hover uses `var(--bg-surface)`
- Created `ProjectsTable.astro` — `<table>` with styled `<thead>` (uppercase, tracking-widest, `--text-secondary`), maps rows via `ProjectsTableRow`
- Created `ProjectCardMobile.astro` — `<li>` card with title link (liveUrl fallback githubUrl), Tag pills, year badge; plain text if no URL
- Created `src/pages/projects.astro` — `/projects` route; sorts all 6 projects by year desc; desktop table / mobile list toggle via `hidden md:block` / `md:hidden`; "← Chinmoy Biswas" back link; uses `BaseLayout`
- `npm run build` passes with zero errors; `/projects/index.html` exists in `dist/`

### Phase 6 — Sidebar Nav Active State ✓
- Created `SidebarNav.astro` — `data-nav-link` attributes, growing-line indicator (`2rem` → `4rem`), `--accent` color on active/hover, uppercase small labels, hidden on mobile (`hidden lg:block`)
- Updated `LeftSidebar.astro` — replaced placeholder `<nav>` block with `<SidebarNav />`, removed old nav styles
- Created `src/scripts/observer.ts` — `IntersectionObserver` for active section tracking (`-30% 0px -60% 0px` rootMargin) + entrance animation observer infrastructure for Phase 09
- Updated `BaseLayout.astro` — loads `observer.ts` via `<script>` with relative import path at end of `<body>`
- `npm run build` passes with zero errors

### Phase 5 — Projects Section ✓
- Created `ExternalLink.astro` — styled `<a>` with slot, `--text-secondary` color, hover `--text-primary`, inline-flex, gap, transition 150ms
- Created `ProjectItem.astro` — two-column grid (100px thumbnail / 1fr content), card hover state matching ExperienceItem, title link with lazy `↗` on card hover, description, Tag pills, GitHub + Live `ExternalLink` rows
- Created `ProjectsSection.astro` — filters `featured: true`, slices to 5, "View All Projects ↗" link styled identically to `resume-link`
- Updated `index.astro` — imported `ProjectsSection` + `projects`, rendered after `ExperienceSection`
- M-Smart Technology BD correctly excluded (featured: false); CB Portfolio and CB QR Code show both GitHub and Live links
- `npm run build` passes with zero errors

### Phase 4 — Experience Section ✓
- Created `Tag.astro` — pill badge with `--accent-dim` bg, `--accent-dim-text` text, 9999px border-radius
- Created `ExperienceItem.astro` — two-column grid (25%/1fr), PRESENT badge for current role, company link with `↗` arrow on hover, skills row, card hover state
- Created `ExperienceSection.astro` — section wrapper with `id="experience"`, maps all 4 entries, "View Full Resume" link
- Updated `index.astro` — added `ExperienceSection` after `AboutSection`, imported `experience` data
- `npm run build` passes with zero errors

### Phase 3 — About Section ✓
- Created `AboutSection.astro` — `id="about"`, `set:html={about}`, scoped styles for links/bold/body text
- Updated `TwoColumnLayout.astro` right column padding to `px-6 py-16 lg:px-16 lg:py-24` per spec
- `index.astro` already wired with `<AboutSection about={profile.about} />`
- `npm run build` passes with zero errors

### Phase 2 — Two-Column Shell ✓
- Created `TwoColumnLayout.astro` — `max-w-[1200px]`, `45%` sticky sidebar, scrollable right pane, `#spotlight-overlay` div
- Created `LeftSidebar.astro` — name/title/tagline with correct font sizes, nav with indicator spans, resume link
- Created `SocialLinks.astro` — GitHub, LinkedIn, Twitter (conditional), Email icons with exact SVG paths and hover transitions
- Updated `src/pages/index.astro` — wired `TwoColumnLayout` + `LeftSidebar` + `AboutSection`
- Fixed: profile block mobile margin-bottom (`1.5rem` mobile / `3rem` desktop)
- Fixed: job title color corrected to `--text-primary`
- `npm run build` passes with zero errors

### Phase 1 — Foundation ✓
- Installed `tailwindcss` + `@tailwindcss/vite` (Tailwind CSS 4 Vite-native approach)
- Updated `astro.config.mjs` with `@tailwindcss/vite` Vite plugin
- Created `src/styles/global.css` with all CSS custom property tokens + base resets + animation initial states
- Created `src/components/layout/BaseLayout.astro` with Inter font loading and `<slot />`
- Updated `src/pages/index.astro` to use `BaseLayout`
- `npm run build` passes with zero errors

### Setup (pre-Phase 1)
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
