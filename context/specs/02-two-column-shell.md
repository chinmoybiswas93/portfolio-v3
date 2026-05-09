# Phase 02 — Two-Column Shell

## Goal

Build the page layout skeleton: a sticky left sidebar and a scrollable right content pane. Wire in the left sidebar with Chinmoy's name, title, tagline, placeholder nav, and social icons. No section content yet — just the structural shell with real profile data visible.

## Read first

- `context/ui-context.md` — Layout section (desktop/tablet/mobile breakpoints, sidebar width, right content padding), Social Links icon sizes, color tokens for sidebar bg and border
- `context/architecture.md` — directory structure for `sidebar/` components, data flow rule (pages import data, not components)
- `src/data/profile.ts` — available fields: name, title, tagline, github, linkedin, twitter, resumeUrl

## Exact values from original site CSS (match these)

Extracted from `frontend-LlQX8KbT.css` on chinmoybiswas.com:

| Property | Value | Notes |
|---|---|---|
| Container max-width | `1200px` (`1400px` at ≥1920px) | `.portfolio-app` |
| Container padding | `0 2rem` | Outer wrapper horizontal |
| Left sidebar width | `45%` | Desktop only |
| Left sidebar padding | `0 2rem` horizontal, `6rem 0` vertical (sidebar-content) | Desktop |
| Left sidebar padding mobile | `padding: 3.5rem 0.5rem 0` | Mobile |
| Left sidebar width tablet | `380px` (min 350px), `padding: 0 1.5rem` | 769–1024px |
| Right content padding | `6rem 2rem` | Desktop `.content-container` |
| Right content padding mobile | `2rem 0` | Mobile |
| Profile name font-size | `48px` desktop, `42px` mobile (≤768px) | `.profile-name` |
| Profile name line-height | `1` | Tight heading |
| Profile name margin | `0 0 0.5rem` | Below name |
| Profile title font-size | `20px` | `.profile-title` |
| Profile title font-size mobile | `18px` | ≤768px |
| Profile title margin | `0 0 1.5rem` | Below title (original has large gap before tagline) |
| Profile tagline font-size | `16px` | `.profile-tagline` |
| Profile tagline max-width | `80%` desktop, `95%` mobile | `.profile-tagline` |
| Profile section margin-bottom | `3rem` desktop, `1.5rem` mobile | `.profile-section` |
| Nav items gap | `1rem` | `.nav-list` |
| Nav link font-size | `12px` | `.nav-link` |
| Nav link letter-spacing | `0.02em` | `.nav-link` (NOT 0.1em) |
| Nav link gap (line + text) | `0.5rem` | `.nav-link` |
| Nav margin-bottom | `3rem` | `.sidebar-nav` |
| Social links gap | `1.5rem` | `.social-links` |
| Body line-height | `1.6` | `--line-height-base` |
| Section margin-bottom | `5rem` desktop, `3rem` mobile | `.content-section` |
| Card inner gap (left/right) | `2rem` desktop, `1rem` mobile | `.item-card` |
| Tag padding | `0 0.5rem` | `.tag-item` |
| Tag gap in row | `0.5rem` | `.tag-list` |

## Files changed

```
src/components/layout/
  TwoColumnLayout.astro       CREATE  sticky-left + scrollable-right flex wrapper
src/components/sidebar/
  LeftSidebar.astro           CREATE  profile block + nav placeholder + social row
  SocialLinks.astro           CREATE  icon row: GitHub, LinkedIn, Twitter, Email
src/pages/index.astro         UPDATE  use TwoColumnLayout + LeftSidebar, pass profile data
```

## Implementation

### 1. Create `TwoColumnLayout.astro`

Props: none. Uses two named slots: `sidebar` and `content`.

Desktop layout (`lg:` breakpoint, ≥1024px):
- Outer wrapper: `flex min-h-screen max-w-[1200px] mx-auto px-8`
  - Max-width is **1200px** (not `max-w-screen-xl` which is 1280px)
  - `px-8` = `2rem` horizontal padding — matches `.portfolio-app { padding: 0 2rem }`
- Left column: `lg:sticky lg:top-0 lg:h-screen lg:w-[45%] lg:overflow-y-auto lg:flex-shrink-0`
  - No `max-width` cap on the sidebar column itself
- Right column: `flex-1 min-w-0 px-8 py-10 lg:px-8 lg:py-24`
  - Desktop: `px-8` (2rem) + `py-24` (6rem) — matches `.content-container { padding: 6rem 2rem }`
  - Mobile: `py-10` (2.5rem) approximates the mobile content spacing

Mobile (below `lg:`):
- Single column stacked — left column goes full width, loses sticky

Add the spotlight overlay div inside the wrapper (position fixed, inset-0, pointer-events-none, z-0) — it will be activated by the spotlight script in Phase 08. Give it `id="spotlight-overlay"`.

### 2. Create `LeftSidebar.astro`

Props:
```ts
interface Props {
  name: string;
  title: string;
  tagline: string;
  github: string;
  linkedin: string;
  twitter?: string;
  email: string;
  resumeUrl?: string;
}
```

Structure (top to bottom, full height, `flex flex-col`):
1. **Profile block** — `<h1>` with name. Font-size: `42px` mobile / `48px` desktop (`text-[42px] lg:text-[48px]`). Weight 700. `--text-heading` color. Line-height `1`. Margin-bottom `0.5rem`. Below it: `<p>` for title — `20px` desktop (`1.25rem`), `18px` mobile, weight 500, `--text-primary`. Margin-bottom `1.5rem`. Below it: `<p>` for tagline — `16px` (1rem), `--text-secondary`, max-width `80%`. Profile block margin-bottom: `3rem` desktop, `1.5rem` mobile.
2. **Nav placeholder** — render a `<nav>` with three `<a>` links: `#about`, `#experience`, `#projects` with text "About", "Experience", "Projects". Style links as: `--text-secondary`, uppercase, `12px` (0.75rem), letter-spacing **`0.02em`** (not `0.1em`), weight 600. Gap between nav items: `1rem`. Gap between line indicator and text within each link: `0.5rem`. Nav margin-bottom: `3rem`. Add a left-line indicator span (will be animated in Phase 06). For now, static styling is fine.
3. **Spacer** — `flex-1` to push social row to bottom
4. **Social + Resume row** — `<SocialLinks>` component + resume button

Sidebar inner padding: `px-8 py-14 lg:py-24`
- `px-8` = `2rem` — matches `.left-sidebar { padding: 0 2rem }`
- `py-14` = `3.5rem` mobile — matches `.sidebar-content { padding: 3.5rem 0.5rem 0 }` on mobile
- `lg:py-24` = `6rem` desktop — matches `.sidebar-content { padding: 6rem 0 }` on desktop

### 3. Create `SocialLinks.astro`

Props:
```ts
interface Props {
  github: string;
  linkedin: string;
  twitter?: string;
  email: string;
}
```

Render a `<div class="flex items-center gap-6">` with icon links. (`gap-6` = `1.5rem` — matches `.social-links { gap: 1.5rem }`). Each link:
- Opens in `target="_blank" rel="noopener noreferrer"`
- `aria-label` set to the platform name
- Icon is inline SVG, 20×20px, `stroke="currentColor"`, `fill="none"`, `stroke-width="2"`
- Color: `--text-secondary` normally, `--text-primary` on hover, transition 150ms

SVG paths to use:
- **GitHub**: `M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22`
- **LinkedIn**: `M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z`
- **Twitter/X**: `M4 4l16 16M4 20L20 4` (X shape — two diagonal strokes)
- **Email**: `M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6`

Only render Twitter link if the `twitter` prop is defined and non-empty.

After `<SocialLinks>`, render a resume link if `resumeUrl` is set:
```html
<a href={resumeUrl} target="_blank" rel="noopener noreferrer"
   class="...">Resume ↗</a>
```
Style: `--text-secondary`, small text, border border-`--border`, px-3 py-1.5, rounded, hover: `--text-primary` + border-`--border-hover`, transition 150ms.

### 4. Update `src/pages/index.astro`

Import `TwoColumnLayout`, `LeftSidebar`, and `profile`.

Pass all profile fields as props to `LeftSidebar`. In the `content` slot, render a temporary `<div class="py-24 px-8 text-[var(--text-secondary)]">Content coming in Phase 03–05</div>`.

## Verify when done

- [ ] Desktop (≥1024px): two columns visible — sidebar on left, content area on right
- [ ] Sidebar is sticky — scroll the right content area and the sidebar stays fixed
- [ ] Chinmoy's name, title, and tagline render with correct font sizes and colors
- [ ] GitHub, LinkedIn, Twitter, and Email icons are visible and clickable
- [ ] Twitter icon only renders if `profile.twitter` is defined
- [ ] Resume link is visible and links to the correct URL
- [ ] Mobile (<768px): single column, sidebar stacks above content area
- [ ] `npm run build` passes with zero errors
