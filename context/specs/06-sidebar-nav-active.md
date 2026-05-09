# Phase 06 — Sidebar Nav with Active State

## Goal

Replace the placeholder nav links in `LeftSidebar` with a proper `SidebarNav` component. Wire up an Intersection Observer in `src/scripts/observer.ts` that tracks which section is in the viewport and updates the active nav link. The active link gets a sky-blue left indicator and a shift in text color.

## Read first

- `context/ui-context.md` — Sidebar Nav Link pattern (normal state, active state with `--nav-active-line`, hover state, animated underline description), color tokens `--text-secondary`, `--text-primary`, `--text-heading`, `--accent`
- `context/code-standards.md` — animation rules (`data-animate` attribute pattern, Intersection Observer in `observer.ts`), script loading (`type="module"` at bottom of body)
- `context/architecture.md` — `src/scripts/observer.ts` boundary note (vanilla TS, no Astro imports)
- Section IDs from prior phases: `about`, `experience`, `projects` — these are the targets

## Files changed

```
src/components/sidebar/
  SidebarNav.astro            CREATE  nav links list with active-state markup
src/components/layout/
  LeftSidebar.astro           UPDATE  replace placeholder <nav> with <SidebarNav>
src/scripts/
  observer.ts                 CREATE  Intersection Observer for active nav + entrance animations
src/components/layout/
  BaseLayout.astro            UPDATE  load observer.ts at end of <body>
```

## Implementation

### 1. Create `SidebarNav.astro`

Props: none (section IDs and labels are static).

Render a `<nav aria-label="Page sections">` containing a `<ul>` with three `<li>` items.

Each nav item structure:
```html
<li>
  <a href="#about" data-nav-link="about" class="nav-link">
    <span class="nav-indicator" aria-hidden="true"></span>
    <span class="nav-label">About</span>
  </a>
</li>
```

The three entries: `about` / "About", `experience` / "Experience", `projects` / "Projects".

Scoped `<style>` for nav:
```css
.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.375rem 0;
  text-decoration: none;
  transition: all 150ms ease;
  color: var(--text-secondary);
}
.nav-link:hover {
  color: var(--text-primary);
}
.nav-link.active {
  color: var(--text-heading);
}
.nav-indicator {
  display: block;
  height: 1px;
  width: 2rem;
  background: currentColor;
  opacity: 0.4;
  transition: width 200ms ease, opacity 200ms ease;
  flex-shrink: 0;
}
.nav-link.active .nav-indicator,
.nav-link:hover .nav-indicator {
  width: 4rem;
  opacity: 1;
  background: var(--accent);
}
.nav-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

This recreates the "growing line + label" nav pattern from the original Brittany Chiang reference.

Hide the entire nav on mobile: `class="hidden lg:block mt-12"` on the `<nav>` element.

### 2. Update `LeftSidebar.astro`

Remove the placeholder `<nav>` block. Import and render `<SidebarNav />` in its place (between the tagline and the spacer `flex-1`).

### 3. Create `src/scripts/observer.ts`

This file handles two concerns:

**A) Active section tracking**

```ts
const sections = document.querySelectorAll<HTMLElement>('section[id]');
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');

function setActive(id: string) {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.navLink === id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  },
  { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
);

sections.forEach(section => sectionObserver.observe(section));

// Set initial active state based on scroll position
if (sections.length > 0) setActive(sections[0].id);
```

**B) Entrance animation triggering** (used in Phase 09 — set up the infrastructure now)

```ts
const animatedEls = document.querySelectorAll<HTMLElement>('[data-animate]');

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedEls.forEach(el => animObserver.observe(el));
```

Export nothing — this script runs as a side effect when loaded.

### 4. Update `BaseLayout.astro`

Add at the very end of `<body>`, before `</body>`:
```astro
<script type="module" src="/src/scripts/observer.ts"></script>
```

Astro bundles TypeScript files referenced via `<script src="...">` automatically during build. Alternatively use the Astro `<script>` tag inline approach:
```astro
<script>
  import '/src/scripts/observer.ts';
</script>
```
Use whichever approach works with the Astro 6 build. The inline import approach is preferred as it lets Astro handle bundling.

## Verify when done

- [ ] Sidebar nav shows three links: "About", "Experience", "Projects" — all uppercase small, with the growing-line indicator
- [ ] Nav is hidden on mobile (not visible below 1024px)
- [ ] Scrolling to the About section: "About" link becomes active (text brightens, indicator line turns sky-blue and extends)
- [ ] Scrolling to the Experience section: "Experience" becomes active, "About" deactivates
- [ ] Scrolling to the Projects section: "Projects" becomes active
- [ ] Initial page load: "About" is active before any scrolling
- [ ] Clicking a nav link scrolls smoothly to the correct section (requires `scroll-behavior: smooth` on the right content container — add it in `global.css` or `TwoColumnLayout.astro`)
- [ ] `npm run build` passes with zero errors — Astro resolves the TS script
