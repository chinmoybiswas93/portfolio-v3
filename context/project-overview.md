# Chinmoy Biswas — Portfolio

## Overview

A personal developer portfolio for Chinmoy Biswas, a WordPress Developer and Tech Support specialist. The site is a static Astro rebuild of an existing WordPress/Vue plugin-based portfolio (https://chinmoybiswas.com). It preserves the original two-column layout and dark aesthetic while improving typography, animation quality, and overall visual polish. All content lives in static TypeScript data files — no CMS, no API, no auth.

## Goals

1. Ship a fast, statically generated portfolio that scores 95+ on Lighthouse
2. Preserve the two-column desktop layout and section structure from the original site
3. Improve visual design: better typography, refined color tokens, smoother animations
4. Make the mobile experience first-class, not an afterthought
5. Keep the codebase simple enough to update content by editing one data file

## Core User Flow

1. Visitor lands on the homepage — sees name, title, and nav in the sticky left sidebar
2. Visitor reads the About section in the right content pane
3. Visitor scrolls through Experience and Projects sections; sidebar nav highlights the active section
4. Visitor clicks "View Full Project Archive" to see the full projects table at `/projects`
5. Visitor clicks a social link or the resume button to contact or download CV

## Sections

### Homepage (`/`)

- **Left Sidebar** (sticky, 45% width on desktop):
  - Profile name (large heading)
  - Professional title
  - Tagline
  - Section navigation: About, Experience, Projects (with active-state indicator)
  - Social icon links: GitHub, LinkedIn, Twitter, Email
  - Resume button

- **Right Content** (scrollable, flex 1):
  - **About** — biographical paragraph with HTML support
  - **Experience** — timeline of work history cards; each card shows role, company (linked), date range, description, skills as tags; shows "PRESENT" badge for current role; "View Full Resume" link at bottom
  - **Projects** — up to 5 featured project cards; each shows image, title, description, tech tags, GitHub + Live links; "View All Projects" link at bottom
  - **Footer** — brief credit text

### Projects Archive (`/projects`)

- Back navigation to homepage
- "All Projects" heading
- Desktop: table with columns — Year, Project, Made at, Built with, Link
- Mobile: simplified list with project titles as links

## Data Model (Static TypeScript files)

All content lives in `src/data/`:

- `profile.ts` — name, title, tagline, about (HTML string), social URLs, resume URL, profile image path, footer text
- `experience.ts` — array of `{ company, position, companyUrl, startDate, endDate, current, description, skills[] }`
- `projects.ts` — array of `{ title, description, imageUrl, liveUrl, githubUrl, technologies[], year, madeAt, featured }`

## Scope

### In Scope

- Static Astro site with TypeScript data files
- Homepage with sidebar + scrollable content
- Projects archive page at `/projects`
- Mouse spotlight effect on desktop (vanilla JS)
- Active section tracking via Intersection Observer
- Entrance animations (fade-in, slide-up) on scroll
- Skeleton-free loading (static build — data is always present)
- Fully responsive: two-column desktop, single-column mobile
- Dark mode only

### Out of Scope

- CMS or admin panel (content is edited directly in data files)
- Contact form (email link only)
- Light mode toggle
- Blog or writing section
- Authentication or user accounts
- Server-side rendering or API routes

## Success Criteria

1. `npm run build` completes without errors or type errors
2. Homepage renders all three sections (About, Experience, Projects) with correct data
3. Projects archive page renders at `/projects` with full project table
4. Active sidebar nav link updates correctly as user scrolls between sections
5. Mouse spotlight effect activates on desktop (≥1024px) and is absent on mobile
6. Lighthouse scores: Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥95
7. Site is visually improved vs. the original: better spacing, type scale, and card polish
