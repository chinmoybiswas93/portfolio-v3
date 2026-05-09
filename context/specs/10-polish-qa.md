# Phase 10 — Polish and QA

## Goal

Final quality pass before the site is considered shippable. Fix spacing inconsistencies, audit mobile layout, verify keyboard navigation, run Lighthouse, and update the footer with the final text. No new features — only refinement, fixes, and the `PortfolioFooter` component.

## Read first

- `context/project-overview.md` — Success Criteria (Lighthouse ≥95, all sections render, projects archive, spotlight, active nav)
- `context/ui-context.md` — all spacing, border radius, and color token values for a final audit
- `context/architecture.md` — build invariants (must not violate any)
- `src/data/profile.ts` — `footerText` field for the footer component
- All previously built components — full visual review required

## Files changed

```
src/components/sections/
  PortfolioFooter.astro       CREATE  footer with profile.footerText
src/pages/index.astro         UPDATE  add PortfolioFooter at end of content slot
src/styles/global.css         UPDATE  any spacing or token fixes found during audit
context/progress-tracker.md   UPDATE  mark all phases complete, final session notes
```

Other files may be updated if specific visual bugs are found during the audit — note any changes here before making them.

## Implementation

### 1. Create `PortfolioFooter.astro`

Props:
```ts
interface Props {
  footerText: string;
}
```

Renders:
```astro
<footer class="mt-24 pb-16">
  <div class="footer-text" set:html={footerText} />
</footer>
```

Scoped `<style>`:
```css
.footer-text {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
.footer-text a {
  color: var(--text-primary);
  text-decoration-color: var(--accent);
  text-underline-offset: 3px;
  transition: color 150ms ease;
}
.footer-text a:hover {
  color: var(--accent);
}
```

### 2. Update `src/pages/index.astro`

Add `<PortfolioFooter footerText={profile.footerText} />` as the last element inside the content slot, after `<ProjectsSection>`.

### 3. Spacing and visual audit

Walk through every section on desktop and mobile. Check against `ui-context.md`:

- [ ] Right content pane padding: `px-6 py-16 lg:px-16 lg:py-24`
- [ ] Section bottom margin: `mb-16` between About → Experience → Projects → Footer
- [ ] Experience cards: inner grid is `25% / 75%` on desktop, stacked on mobile
- [ ] Project cards: inner grid is `100px / 1fr` on desktop, stacked on mobile
- [ ] Tag pill padding: `0.25rem 0.625rem`, border-radius `9999px`
- [ ] Card hover: `--bg-surface-hover` background, `--border-hover` border, box-shadow visible
- [ ] Sidebar: profile block has correct spacing from the top (`py-16 lg:py-24`)
- [ ] Social icon row: icons are 20×20px with `gap-5`
- [ ] Resume link: small text, pill border, correct hover color
- [ ] No hardcoded hex values anywhere — search the codebase: `grep -r '#[0-9a-fA-F]\{3,6\}' src/`

### 4. Keyboard navigation audit

- [ ] Tab through the homepage: all links and the resume button are reachable in logical order
- [ ] Sidebar nav links have visible focus styles (add `:focus-visible` outline if missing)
- [ ] Project card GitHub/Live links are individually focusable
- [ ] Projects archive page: table links are keyboard accessible

Add to `global.css` if focus styles are missing:
```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 3px;
}
```

### 5. Mobile layout audit

Test at 375px (iPhone SE), 390px (iPhone 14), and 768px (tablet):
- [ ] Sidebar stacks above content (no overflow)
- [ ] Section sticky headers appear with blur on scroll
- [ ] Experience cards: date stacks above content (no two-column layout on mobile)
- [ ] Project cards: thumbnail stacks above content
- [ ] Projects archive: table hidden, card list visible
- [ ] No horizontal scroll at any mobile breakpoint

### 6. Lighthouse audit

Run Lighthouse in Chrome DevTools (Incognito mode, "Desktop" preset first, then "Mobile"):

Target scores: Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥95.

Common issues to check:
- Images: all `<img>` tags have `alt` attributes, `loading="lazy"`, explicit `width`/`height` if known
- Font: Inter loaded with `rel=preload` — check no render-blocking font request
- Meta: `description` tag is populated from `profile.tagline`
- Lang: `<html lang="en">` in `BaseLayout.astro`
- Heading hierarchy: `<h1>` is the name in sidebar, `<h2>` for section labels, `<h3>` for card titles

### 7. Final `progress-tracker.md` update

Mark all 10 phases as Completed. Add a "Deployed" section if the site is pushed to Vercel/Netlify. Note any remaining open questions or deferred improvements for future sessions.

## Verify when done

- [ ] `npm run build` passes clean — zero errors, zero warnings
- [ ] Lighthouse Desktop: Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- [ ] Lighthouse Mobile: Performance ≥90 (acceptable for image-heavy portfolio)
- [ ] Footer renders with correct HTML including Brittany Chiang credit and Astro/Vercel links
- [ ] No `grep '#[0-9a-fA-F]' src/` matches (zero hardcoded hex in source)
- [ ] All 10 phases marked Complete in `progress-tracker.md`
- [ ] Site is visually improved vs. https://chinmoybiswas.com — better spacing, type scale, and interactions
