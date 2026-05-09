# Phase 01 — Foundation

## Goal

Install Tailwind CSS, wire up global CSS design tokens, create the `BaseLayout.astro` shell with Inter font loading, and confirm the build passes. All subsequent phases depend on the tokens and layout shell defined here.

## Read first

- `context/ui-context.md` — full color token table, typography scale, and font loading approach
- `context/architecture.md` — stack table (Tailwind 4, Astro 6), directory structure, build invariants
- `context/code-standards.md` — styling rules (no hardcoded hex, token-only), file organization

## Files changed

```
astro.config.mjs              UPDATE  add @astrojs/tailwind integration
package.json                  UPDATE  add tailwindcss + @astrojs/tailwind
src/styles/global.css         CREATE  all CSS custom property tokens + base resets
src/components/layout/
  BaseLayout.astro            CREATE  html shell, Inter font, global styles import
src/pages/index.astro         UPDATE  use BaseLayout, confirm build renders
```

## Implementation

### 1. Install dependencies

```sh
npm install tailwindcss @astrojs/tailwind
```

### 2. Update `astro.config.mjs`

Import and add the Tailwind integration:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

### 3. Create `src/styles/global.css`

Define all CSS custom properties from `ui-context.md`. Also add base resets and the Inter font-family assignment. All token values must match the color table in `ui-context.md` exactly.

Sections to include in order:
1. `:root {}` block with every `--` token from the color table
2. `:root {}` typography variables (`--font-sans`, `--font-mono`)
3. `*, *::before, *::after { box-sizing: border-box; }`
4. `html, body` — `background-color: var(--bg-base)`, `color: var(--text-primary)`, `font-family: var(--font-sans)`, `line-height: 1.7`, `-webkit-font-smoothing: antialiased`
5. `a` — inherit color, no underline by default
6. Custom scrollbar styles for `.scrollable` class (thin, `--border` color)
7. Animation initial states: `.fade-in`, `.slide-up`, `.slide-left` — opacity 0, transforms set; `.visible` variant that transitions to visible state (for Phase 09)

### 4. Create `src/components/layout/BaseLayout.astro`

Props interface:
```ts
interface Props {
  title?: string;
  description?: string;
}
```

The `<head>` must include:
- `<meta charset="utf-8" />`
- `<meta name="viewport" content="width=device-width, initial-scale=1" />`
- `<meta name="generator" content={Astro.generator} />`
- `<title>{title ?? 'Chinmoy Biswas — WordPress Developer'}</title>`
- `<meta name="description" content={description ?? profile.tagline} />`
- Google Fonts Inter preconnect + stylesheet link (weights 300–700, variable font preferred)
- `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`
- `<link rel="icon" href="/favicon.ico" />`

Import `../styles/global.css` in the frontmatter using Astro's CSS import.

The `<body>` renders a `<slot />`.

### 5. Update `src/pages/index.astro`

Import `BaseLayout` and `profile` from `src/data/profile.ts`. Wrap existing content in `<BaseLayout title={profile.name} description={profile.tagline}>`. Temporarily render `<h1>{profile.name}</h1>` as a smoke test.

## Verify when done

- [ ] `npm run build` completes with zero errors and zero TypeScript warnings
- [ ] `npm run dev` — browser shows the page with dark `#0f172a` background (not white)
- [ ] `--bg-base`, `--accent`, `--text-primary` are defined and accessible in browser DevTools `:root`
- [ ] Inter font loads (check Network tab — font request present)
- [ ] Tailwind utility classes work — add `class="text-red-500"` to a test element, confirm it applies, then remove
- [ ] No hardcoded hex values exist in `global.css`
