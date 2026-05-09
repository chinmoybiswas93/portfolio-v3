# Phase 09 — Entrance Animations

## Goal

Add scroll-triggered entrance animations to section headings, experience cards, and project cards. The infrastructure (observer + CSS initial states) was set up in Phase 06. This phase adds the `data-animate` attributes to the right elements and defines the CSS transitions that make them visible. No new scripts — only markup and CSS changes.

## Read first

- `context/ui-context.md` — Entrance Animations table: `fade-in` (opacity 0→1), `slide-up` (translateY 20px + opacity), `slide-left` (translateX -15px + opacity), stagger delay formula (`index * 80ms`), `.visible` class trigger
- `context/code-standards.md` — `data-animate` attribute spec, initial state in CSS not inline style, graceful degradation note
- `src/scripts/observer.ts` — already observes `[data-animate]` elements and adds `.visible` class (built in Phase 06, Part B)
- `src/styles/global.css` — animation initial states were scaffolded in Phase 01; this phase fills them in properly

## Files changed

```
src/styles/global.css                     UPDATE  define animation transitions for fade-in, slide-up, slide-left
src/components/sections/
  AboutSection.astro                      UPDATE  add data-animate="fade-in" to the about body div
  ExperienceSection.astro                 UPDATE  add section heading animation
  ExperienceItem.astro                    UPDATE  confirm data-animate="slide-up" + stagger delay (added in Phase 04)
  ProjectsSection.astro                   UPDATE  add section heading animation
  ProjectItem.astro                       UPDATE  confirm data-animate="slide-up" + stagger delay (added in Phase 05)
src/components/sidebar/
  LeftSidebar.astro                       UPDATE  add fade-in to name, title, tagline, nav, social row with stagger
```

## Implementation

### 1. Update `src/styles/global.css` — animation definitions

Replace the Phase 01 scaffolded animation stubs with the full transitions:

```css
/* Base: all animated elements start hidden */
[data-animate] {
  opacity: 0;
  transition: opacity 400ms ease, transform 400ms ease;
}

[data-animate="fade-in"] {
  /* opacity starts at 0, no transform */
}

[data-animate="slide-up"] {
  transform: translateY(20px);
}

[data-animate="slide-left"] {
  transform: translateX(-15px);
}

/* Triggered by observer adding .visible */
[data-animate].visible {
  opacity: 1;
  transform: none;
}
```

Also add `scroll-behavior: smooth` to the right content pane. If `TwoColumnLayout.astro` wraps the right column in a div with a specific class (e.g., `right-content`), target that class. Otherwise add it globally:
```css
html {
  scroll-behavior: smooth;
}
```

Mobile sticky section headers — add now (was deferred from Phase 03):
```css
@media (max-width: 1023px) {
  .section-label {
    position: sticky;
    top: 0;
    padding: 0.75rem 0;
    backdrop-filter: blur(12px);
    background: var(--bg-sticky);
    z-index: 10;
    margin-left: -1.5rem;
    margin-right: -1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

### 2. Update `AboutSection.astro`

Add `data-animate="fade-in"` to the `<div set:html={about} />` wrapper.

### 3. Update `ExperienceSection.astro` and `ProjectsSection.astro`

Add `data-animate="fade-in"` to the section `<h2>` label (the mobile-only heading).

The experience and project items already have `data-animate="slide-up"` and `animation-delay` from Phases 04/05 — verify these are present. If they are inline styles, update them to CSS custom property driven:
```astro
style={`transition-delay: ${index * 80}ms`}
```
(Use `transition-delay` not `animation-delay` since the transition approach is used, not `@keyframes`.)

### 4. Update `LeftSidebar.astro`

Add staggered `data-animate="slide-up"` to the three main blocks with delays:
- Name `<h1>`: `data-animate="slide-up"` + `style="transition-delay: 0ms"`
- Title + tagline `<p>`: `data-animate="slide-up"` + `style="transition-delay: 80ms"`
- `<SidebarNav />` wrapper `<div>`: `data-animate="slide-up"` + `style="transition-delay: 160ms"`
- `<SocialLinks />` + resume row `<div>`: `data-animate="slide-up"` + `style="transition-delay: 240ms"`

The sidebar elements are always in view on load, so the observer will trigger `.visible` immediately on the first intersection tick. This produces a staggered entrance on first load.

## Verify when done

- [ ] On first page load: name, title, tagline, nav, and social links fade/slide in sequentially with ~80ms stagger
- [ ] Scrolling to the Experience section: cards slide up in sequence (first card 0ms delay, second 80ms, third 160ms, fourth 240ms)
- [ ] Scrolling to the Projects section: project cards slide up in sequence
- [ ] About section body fades in when scrolled into view
- [ ] With JavaScript disabled (disable in DevTools → Settings → Debugger): all content is visible immediately (graceful degradation — `[data-animate]` elements start hidden only when JS runs and sets the class)
- [ ] No layout shift visible during animation — elements take up their full space before becoming visible (opacity/transform only, not height/width)
- [ ] On mobile: section headings are sticky with backdrop blur as you scroll past them
- [ ] `npm run build` passes with zero errors
