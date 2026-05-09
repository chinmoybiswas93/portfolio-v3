# Phase 03 — About Section

## Goal

Render the About section in the right content pane. Content comes from `profile.about`, which is an HTML string. The section gets `id="about"` so the sidebar nav anchor link works. This is the simplest section — no sub-components needed.

## Read first

- `context/ui-context.md` — body text style (`--text-secondary`, 15px, line-height 1.7), section heading style (0.75rem uppercase, tracking wide, `--text-secondary`), Layout section (right content padding)
- `context/code-standards.md` — content rendering rule (`set:html` for HTML fields), section ID naming
- `src/data/profile.ts` — the `about` field (HTML string with anchor tags and `<br>` tags)

## Files changed

```
src/components/sections/
  AboutSection.astro          CREATE  section wrapper + HTML content render
src/pages/index.astro         UPDATE  replace placeholder content with AboutSection
```

## Implementation

### 1. Create `AboutSection.astro`

Props:
```ts
interface Props {
  about: string;
}
```

Structure:
```
<section id="about" class="...">
  <h2 class="section-label">About</h2>
  <div class="about-body" set:html={about} />
</section>
```

Section wrapper styles: `mb-16 scroll-mt-24`

Section label (`<h2>`) styles: `text-xs font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-6 lg:hidden`
- The label is **hidden on desktop** (`lg:hidden`) because the sidebar nav already labels the section.
- On mobile it's visible as a sticky header (Phase 09 adds the sticky behavior via JS; for now just render it).

Body `<div>` styles via scoped `<style>`:
```css
.about-body {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.75;
}
.about-body a {
  color: var(--text-primary);
  text-decoration-color: var(--accent);
  text-underline-offset: 3px;
  transition: color 150ms ease;
}
.about-body a:hover {
  color: var(--accent);
}
.about-body strong, .about-body b {
  color: var(--text-primary);
  font-weight: 600;
}
```

### 2. Update `src/pages/index.astro`

Remove the placeholder `<div>` from the `content` slot. Import `AboutSection` and pass `profile.about`:

```astro
<AboutSection about={profile.about} />
```

The right content pane should have consistent padding: `px-6 py-16 lg:px-16 lg:py-24`.
Apply this padding in `TwoColumnLayout.astro` on the right column wrapper, not inside each section component.

## Verify when done

- [ ] About text renders in the right content pane with correct color (`--text-secondary`)
- [ ] Links inside the about text (WPManageNinja, SEOPage1, WebSolutions) are styled with accent underline and turn `--accent` on hover
- [ ] Bold text (WPManageNinja in `<b>` tag) renders `--text-primary` and heavier weight
- [ ] Section heading "About" is visible on mobile and hidden on desktop
- [ ] The section has `id="about"` — clicking the sidebar "About" link scrolls to this section
- [ ] `npm run build` passes with zero errors
