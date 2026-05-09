# Chinmoy Biswas — Portfolio

Personal portfolio site for [Chinmoy Biswas](https://chinmoybiswas.com), WordPress Developer and Tech Support Engineer. A static Astro rebuild of the original WordPress/Vue plugin-based portfolio, keeping the same two-column layout and dark aesthetic while improving typography, animations, and overall polish.

**Live site (original):** https://chinmoybiswas.com

## Tech Stack

- [Astro 6](https://astro.build) — static site generator
- TypeScript — strict mode throughout
- Tailwind CSS 4 — utility-first styling
- Vanilla JS — spotlight effect, scroll tracking, entrance animations
- No framework islands — zero Vue/React runtime

## Project Structure

```
src/
  components/
    layout/       # BaseLayout, TwoColumnLayout
    sidebar/      # LeftSidebar, SidebarNav, SocialLinks
    sections/     # About, Experience, Projects sections + item components
    projects/     # Projects archive table and cards
    ui/           # Tag, ExternalLink primitives
  data/
    types.ts      # Shared TypeScript interfaces
    profile.ts    # Personal info, social links, about text
    experience.ts # Work history array
    projects.ts   # Portfolio projects array
  pages/
    index.astro   # Homepage (About + Experience + Projects)
    projects.astro # /projects archive page
  scripts/
    spotlight.ts  # Mouse-tracking radial gradient (desktop only)
    observer.ts   # Intersection Observer — active nav + entrance animations
  styles/
    global.css    # CSS custom property tokens + base resets
public/
  images/
    projects/     # Project screenshot webp files
    logo.jpg      # Site logo
```

## Content

All content lives in `src/data/*.ts` — no CMS, no API, no database. To update the portfolio, edit the relevant data file directly.

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start dev server at `localhost:4321`        |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview the production build locally        |

## Build Phases

See [context/ai-workflow-rules.md](context/ai-workflow-rules.md) for the full 10-phase build plan, and [context/progress-tracker.md](context/progress-tracker.md) for current status.

## Design Reference

Inspired by the portfolio design of [Brittany Chiang](https://brittanychiang.com). Original implementation built as a WordPress plugin using Vue.js and PHP.
