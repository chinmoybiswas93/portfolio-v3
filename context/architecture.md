# Architecture Context

## Stack

| Layer       | Technology                        | Role                                              |
| ----------- | --------------------------------- | ------------------------------------------------- |
| Framework   | Astro 6 + TypeScript              | Static site generator; zero JS by default         |
| Styling     | Tailwind CSS 4 + CSS custom props | Utility classes + design token layer              |
| Icons       | Lucide (SVG inline) or Iconify    | Stroke-based icon set                             |
| Fonts       | Inter (Google Fonts)              | Primary UI typeface, loaded via `<link>` preload  |
| Interactivity | Vanilla JS (no framework)       | Spotlight, scroll tracking, entrance animations   |
| Content     | Static TypeScript files (`src/data/`) | Single source of truth for all portfolio data |
| Output      | Static (`output: 'static'`)       | Fully pre-rendered HTML/CSS/JS                    |

No database. No auth. No API routes. No server runtime.

## Directory Structure

```
src/
  components/         # Astro components (no Vue, no React)
    layout/
      BaseLayout.astro       # <html>, <head>, fonts, global CSS
      TwoColumnLayout.astro  # Desktop two-column wrapper
    sidebar/
      LeftSidebar.astro      # Profile, nav, social links
      SidebarNav.astro       # Section links (About / Experience / Projects)
      SocialLinks.astro      # Icon row for GitHub, LinkedIn, etc.
    sections/
      AboutSection.astro
      ExperienceSection.astro
      ExperienceItem.astro   # Individual experience card
      ProjectsSection.astro
      ProjectItem.astro      # Individual project card
      PortfolioFooter.astro
    projects/
      ProjectsTable.astro    # Desktop table for /projects page
      ProjectRow.astro        # Table row
      ProjectCard.astro       # Mobile card for /projects page
    ui/
      Tag.astro              # Skill / tech tag badge
      ExternalLink.astro     # "↗" link with icon
  data/
    profile.ts               # Personal info, social URLs, about text
    experience.ts            # Work history array
    projects.ts              # Projects array (featured flag included)
    types.ts                 # Shared TypeScript interfaces
  pages/
    index.astro              # Homepage
    projects.astro           # /projects archive
  styles/
    global.css               # CSS custom properties + base resets
  scripts/
    spotlight.ts             # Mouse spotlight effect (loaded on desktop only)
    observer.ts              # Intersection Observer for active nav + entrance anims
public/
  images/                   # Project images and profile photo
  favicon.svg
  favicon.ico
```

## System Boundaries

- `src/data/` — owns all content; no component may hardcode data that belongs here
- `src/components/` — pure presentational; receives data as Astro props; no data imports except from `src/data/types.ts`
- `src/pages/` — imports from `src/data/` and passes data down to components; owns page-level layout decisions
- `src/scripts/` — vanilla TS modules; loaded via `<script>` tags in layout or page files; must not import Astro components
- `src/styles/` — global CSS only; component-scoped styles live inside `<style>` blocks within each `.astro` file

## Data Interfaces (`src/data/types.ts`)

```ts
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;           // HTML string
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl?: string;
  profileImage?: string;
  footerText: string;      // HTML string
}

export interface Experience {
  company: string;
  position: string;
  companyUrl?: string;
  startDate: string;       // e.g. "Jan 2022"
  endDate?: string;        // omit if current
  current: boolean;
  description: string;     // HTML string
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  year: number;
  madeAt?: string;
  featured: boolean;
}
```

## Storage Model

- **Content**: Static TypeScript arrays/objects in `src/data/`. Edited directly by the developer.
- **Images**: Static files in `public/images/`. Referenced by URL path string in project data.
- **Fonts**: Loaded via Google Fonts CDN with `preconnect` and `rel=preload` for the variable font file.

## Build Invariants

1. `npm run build` must pass with zero TypeScript errors — strict mode is on
2. No component imports data directly from `src/data/` — only pages do
3. No hardcoded hex values in component `<style>` blocks — use CSS custom property tokens from `global.css`
4. No JavaScript framework (Vue, React, Svelte) — vanilla TS only for interactivity
5. All client-side scripts are loaded with `is:inline` or `type="module"` — never blocking render
6. The spotlight script must only activate at viewport width ≥1024px to avoid interfering with touch
7. The `/projects` page must be independently navigable with a back link to `/`
