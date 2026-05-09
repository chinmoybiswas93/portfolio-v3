# Code Standards

## General

- Keep components small and single-purpose — one visual concern per `.astro` file
- No component should import from `src/data/` directly; only `src/pages/` files do that
- Data flows top-down: page → layout → section → item component via Astro props
- Fix root causes, not symptoms — no `!important` hacks, no z-index fights

## TypeScript

- Strict mode is required (`strict: true` in `tsconfig.json`)
- All data interfaces live in `src/data/types.ts`; import from there, never redeclare inline
- No `any` — use the typed interfaces from `types.ts` or narrow explicitly
- Astro component props are typed with an interface at the top of the frontmatter block:
  ```ts
  ---
  interface Props {
    experience: Experience;
    index: number;
  }
  const { experience, index } = Astro.props;
  ---
  ```
- `undefined` is allowed on optional fields — use optional chaining (`?.`) to access them

## Astro

- Default to `.astro` components — no Vue, React, or Svelte unless the task explicitly requires client-side state that cannot be handled with vanilla JS
- Use Astro's built-in `<Image>` component (from `astro:assets`) when the image source is local; use a plain `<img>` with `loading="lazy"` for remote URLs
- `client:*` directives are banned — no framework islands
- Page-level scripts go at the bottom of the page body, using `<script type="module">`
- Inline scripts that should not be bundled use `<script is:inline>`
- Keep frontmatter logic minimal — data mapping/filtering belongs in the page file, not in components

## Styling

- Use CSS custom property tokens defined in `src/styles/global.css` — no hardcoded hex values anywhere
- Tailwind utility classes are the primary styling mechanism; use them for spacing, flex, grid, and responsive layout
- Component-scoped styles (`<style>`) are used only for:
  - CSS custom property inheritance overrides
  - Complex pseudo-element animations (e.g., nav underline `::after`)
  - `:global()` scopes for HTML content rendered via `set:html`
- Never use `@apply` with Tailwind inside `<style>` — write utility classes in the template directly
- Responsive design uses Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- The two-column layout breakpoint is `lg:` (1024px) — below that, single column

## Content Rendering

- About text and description fields may contain HTML — render with `<div set:html={profile.about} />`
- Never trust external HTML in `set:html` — only internal data files use this pattern
- Skills and technologies are `string[]` arrays in the data files — never comma-split at render time

## Animations and Scripts

- Entrance animations are driven by Intersection Observer in `src/scripts/observer.ts`
- Add `data-animate="slide-up"` (or `fade-in`, `slide-left`) attributes to elements that should animate
- The observer script picks up these attributes and toggles a `.visible` class; CSS handles the actual transition
- Initial state (hidden): set via CSS class, not inline `style` — so it degrades gracefully if JS is off
- Spotlight: loaded only at `lg:` breakpoint — check `window.innerWidth >= 1024` before attaching listeners

## File Organization

- `src/components/layout/` — page shell components (BaseLayout, TwoColumnLayout)
- `src/components/sidebar/` — left sidebar and its sub-components
- `src/components/sections/` — About, Experience, Projects section components and their item sub-components
- `src/components/projects/` — components used only on the `/projects` archive page
- `src/components/ui/` — generic reusable primitives (Tag, ExternalLink)
- `src/data/` — content data files + type definitions; never contains UI logic
- `src/scripts/` — vanilla TS modules; one file per concern (spotlight, observer)
- `src/styles/` — `global.css` only; everything else is scoped inside component `<style>` blocks
- `public/images/` — static image assets referenced by URL path

## Naming

- Component files: `PascalCase.astro` (e.g., `ExperienceItem.astro`)
- Data files: `camelCase.ts` (e.g., `experience.ts`)
- Script files: `camelCase.ts` (e.g., `spotlight.ts`)
- CSS custom properties: `--kebab-case` (e.g., `--bg-surface`)
- Data attributes for animation: `data-animate` with value `fade-in | slide-up | slide-left`
- Section IDs (for anchor nav): `about`, `experience`, `projects`

## Protected Files

Do not modify these unless explicitly instructed:

- `tsconfig.json` — TypeScript config set at project init
- `astro.config.mjs` — only change if adding an integration (e.g., Tailwind)
- `package.json` / `package-lock.json` — only change to add/remove dependencies
