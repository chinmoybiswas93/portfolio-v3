# UI Context

## Theme

Dark mode only. No light mode. The design language is a deep navy technical workspace — near-black backgrounds, layered semi-transparent surfaces, and sky-blue accents for interactive elements. The original site's palette is preserved and refined: the navy is kept, the accent moves from muted indigo-blue to a more vivid sky-blue, and surfaces use subtle transparency + backdrop-blur for depth.

Visual reference: the original site at https://chinmoybiswas.com — keep all structural decisions (two-column layout, sidebar nav, section order) and improve spacing, type hierarchy, and card polish.

## Colors

All components must use these CSS custom property tokens — no hardcoded hex values.

| Role                 | CSS Variable            | Value                        | Notes                          |
| -------------------- | ----------------------- | ---------------------------- | ------------------------------ |
| Page background      | `--bg-base`             | `#0f172a`                    | slate-900, deep navy           |
| Surface (cards)      | `--bg-surface`          | `rgba(30, 41, 59, 0.6)`      | slate-800 at 60% opacity       |
| Surface hover        | `--bg-surface-hover`    | `rgba(30, 41, 59, 0.9)`      | slate-800 at 90% opacity       |
| Sidebar background   | `--bg-sidebar`          | `#0f172a`                    | same as base, sticky           |
| Sticky header blur   | `--bg-sticky`           | `rgba(15, 23, 42, 0.85)`     | mobile sticky section header   |
| Primary text         | `--text-primary`        | `#e2e8f0`                    | slate-200                      |
| Secondary text       | `--text-secondary`      | `#94a3b8`                    | slate-400, muted paragraphs    |
| Accent (links/nav)   | `--accent`              | `#38bdf8`                    | sky-400                        |
| Accent hover         | `--accent-hover`        | `#7dd3fc`                    | sky-300                        |
| Accent dim (tags)    | `--accent-dim`          | `rgba(56, 189, 248, 0.12)`   | sky-400 at 12% — tag bg        |
| Accent dim text      | `--accent-dim-text`     | `#38bdf8`                    | sky-400 — tag label            |
| Border               | `--border`              | `rgba(148, 163, 184, 0.12)`  | slate-400 at 12% opacity       |
| Border hover         | `--border-hover`        | `rgba(148, 163, 184, 0.25)`  | card hover border              |
| Spotlight glow       | `--spotlight-color`     | `rgba(56, 189, 248, 0.07)`   | sky-tinted cursor follow glow  |
| Heading text         | `--text-heading`        | `#f1f5f9`                    | slate-100                      |
| Nav active indicator | `--nav-active-line`     | `#38bdf8`                    | sky-400                        |
| "PRESENT" badge      | `--badge-present-bg`    | `rgba(56, 189, 248, 0.15)`   |                                |
| "PRESENT" badge text | `--badge-present-text`  | `#38bdf8`                    |                                |

## Typography

Font: **Inter** (Google Fonts variable font, weights 300–700).
Loaded via `<link rel="preconnect">` + `<link rel="preload" as="font">` in `BaseLayout.astro`.

| Role                 | CSS Variable          | Value                         |
| -------------------- | --------------------- | ----------------------------- |
| Font family          | `--font-sans`         | `'Inter', system-ui, sans-serif` |
| Name / H1            | `--text-name`         | `clamp(2rem, 5vw, 3rem)` + weight 700 |
| Section heading      | `--text-section`      | `0.75rem`, weight 600, tracking `0.1em`, uppercase |
| Job title            | `--text-title`        | `1.25rem`, weight 500         |
| Tagline              | `--text-tagline`      | `0.95rem`, weight 400, `--text-secondary` |
| Body text            | `--text-body`         | `0.9375rem` (15px), weight 400, line-height 1.7 |
| Small / meta text    | `--text-sm`           | `0.8125rem` (13px)            |
| Date / label text    | `--text-xs`           | `0.75rem` (12px), tracking `0.05em` |
| Code inline          | `--font-mono`         | `'JetBrains Mono', 'Fira Code', monospace` |

## Layout

### Desktop (≥1024px)
- Two-column flex container: `100vw`, `min-height: 100vh`
- **Left sidebar**: `width: 45%`, `max-width: 600px`, `position: sticky`, `top: 0`, `height: 100vh`, `overflow-y: auto`
- **Right content**: `flex: 1`, `overflow-y: auto`, `padding: 6rem 4rem 6rem 2rem`
- Max content width: `720px` inside the right column

### Tablet (768px–1023px)
- Sidebar width collapses to `380px`; right content takes remaining space
- Sidebar nav remains visible

### Mobile (<768px)
- Single column stacked layout
- Sidebar goes full-width, loses sticky; section nav is hidden
- Each section heading becomes a sticky bar with `backdrop-filter: blur(12px)`
- Right content: `padding: 4rem 1.5rem`

## Border Radius

| Context             | Value         |
| ------------------- | ------------- |
| Tags / badges       | `9999px` (pill) |
| Cards               | `0.5rem`      |
| Buttons             | `0.375rem`    |
| Images              | `0.375rem`    |

## Component Patterns

### Experience Card
- Two-column inner grid: `25% date column` + `75% content column` on desktop; stacked on mobile
- Top of card: position title (white, semibold) + company name as a styled link (on hover: sky-400 text + "↗" icon slides in)
- Date range: muted text, uppercase small caps, left column
- Description: body text with `--text-secondary` color
- Skills: pill tags row, `--accent-dim` background, `--accent-dim-text` text
- Card hover: subtle `--bg-surface-hover` background, `--border-hover` border, `box-shadow: 0 4px 20px rgba(0,0,0,0.2)`
- Transition: `all 200ms ease`

### Project Card (Featured)
- Two-column inner grid: `25% thumbnail` + `75% content` — or full-width if no image
- Thumbnail: rounded, `aspect-ratio: 16/9`, `object-fit: cover`
- Title: white, medium weight — link that turns sky-400 on hover
- Description: secondary text, 3–4 lines
- Tech tags: same pill style as skills
- Links row: GitHub icon + Live icon, both with subtle hover highlight
- Card hover: same elevated surface + border treatment as experience cards

### Tag / Badge
- Background: `--accent-dim`
- Text: `--accent-dim-text`, `--text-xs`, weight 500
- Padding: `0.25rem 0.625rem`
- Border radius: pill

### Sidebar Nav Link
- Normal state: `--text-secondary`, no underline
- Active state: `--text-heading`, sky-400 left-border indicator (`3px solid --accent`) + slight translate-x shift
- Hover: `--text-primary`, smooth 150ms transition
- Animated underline: `scaleX(0)` → `scaleX(1)` on hover via `::after` pseudo-element

### Section Heading
- All-caps label: `--text-xs`, `--text-secondary`, letter-spacing wide
- Sticky on mobile with blur backdrop

## Entrance Animations

All animated via Intersection Observer in `src/scripts/observer.ts`:

| Class Applied       | Animation                                   | Delay stagger        |
| ------------------- | ------------------------------------------- | -------------------- |
| `.fade-in`          | `opacity: 0 → 1`, `200ms ease`             | none                 |
| `.slide-up`         | `translateY(20px) opacity:0 → 0 opacity:1` | per-item: `index * 80ms` |
| `.slide-left`       | `translateX(-15px) opacity:0 → 0 opacity:1`| per-item: `index * 80ms` |

Cards in experience and projects lists get `.slide-up` with staggered delays.

## Mouse Spotlight Effect

- Radial gradient following cursor: `radial-gradient(600px at {x}px {y}px, var(--spotlight-color), transparent 80%)`
- Applied as `background` on the page root overlay (`position: fixed, pointer-events: none, inset: 0, z-index: 0`)
- Only activates on `window.innerWidth >= 1024`
- Implemented in `src/scripts/spotlight.ts`, loaded at end of `<body>` with `type="module"`

## Icons

- Inline SVG preferred for performance — no icon font
- Social icons: custom inline SVG or Iconify web component (`@iconify/astro` if added)
- External link indicator: `↗` Unicode or a 14×14 SVG arrow
- Sizes: 20×20px for social links, 16×16px for inline text icons

## Scrollbar

Custom minimal scrollbar on the right content pane (desktop only):
```css
scrollbar-width: thin;
scrollbar-color: var(--border) transparent;
```
