# Phase 08 — Mouse Spotlight Effect

## Goal

Implement the cursor-following radial gradient overlay that gives the site its signature depth. The spotlight is a fixed overlay that follows the mouse and paints a soft sky-blue glow around the cursor. It only activates on desktop (≥1024px) and is completely absent on touch/mobile screens.

## Read first

- `context/ui-context.md` — Mouse Spotlight Effect section: gradient spec (`radial-gradient(600px at {x}px {y}px, var(--spotlight-color), transparent 80%)`), overlay positioning (fixed, inset-0, pointer-events-none, z-index 0), activation condition (`window.innerWidth >= 1024`), token `--spotlight-color`
- `context/architecture.md` — `src/scripts/spotlight.ts` boundary (vanilla TS, no Astro imports), script loading note
- `context/code-standards.md` — spotlight activation guard, `type="module"` loading
- `src/components/layout/TwoColumnLayout.astro` — the `id="spotlight-overlay"` div was added in Phase 02; the script targets this element

## Files changed

```
src/scripts/
  spotlight.ts                CREATE  mouse-tracking spotlight implementation
src/components/layout/
  BaseLayout.astro            UPDATE  load spotlight.ts script at end of <body>
```

## Implementation

### 1. Create `src/scripts/spotlight.ts`

```ts
const overlay = document.getElementById('spotlight-overlay');

if (!overlay) throw new Error('spotlight-overlay element not found');

function initSpotlight(): void {
  let active = false;

  function onMouseMove(e: MouseEvent): void {
    overlay!.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, var(--spotlight-color), transparent 80%)`;
  }

  function onMouseEnter(): void {
    if (!active) return;
    document.addEventListener('mousemove', onMouseMove);
  }

  function onMouseLeave(): void {
    document.removeEventListener('mousemove', onMouseMove);
    overlay!.style.background = '';
  }

  function activate(): void {
    active = true;
    document.addEventListener('mousemove', onMouseMove);
  }

  function deactivate(): void {
    active = false;
    document.removeEventListener('mousemove', onMouseMove);
    overlay!.style.background = '';
  }

  // Only activate on desktop
  const mq = window.matchMedia('(min-width: 1024px)');

  if (mq.matches) activate();

  mq.addEventListener('change', (e) => {
    if (e.matches) activate();
    else deactivate();
  });
}

initSpotlight();
```

The overlay div has `position: fixed; inset: 0; pointer-events: none; z-index: 0` — set these styles in `global.css` targeting `#spotlight-overlay`, not inline:

```css
#spotlight-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  transition: background 0.1s ease;
}
```

### 2. Update `BaseLayout.astro`

Add the spotlight script after the observer script at the end of `<body>`:

```astro
<script>
  import '/src/scripts/spotlight.ts';
</script>
```

Or as a separate `<script>` tag — keep spotlight separate from observer so they can be reasoned about independently.

## Verify when done

- [ ] Moving the mouse on a desktop screen (≥1024px) produces a soft sky-blue glow that follows the cursor
- [ ] The glow fades to transparent at the edges (no hard edge visible)
- [ ] The spotlight overlay does not block clicks on links, cards, or buttons (`pointer-events: none` confirmed)
- [ ] Resizing the browser below 1024px: spotlight deactivates and the overlay clears
- [ ] Resizing back above 1024px: spotlight reactivates
- [ ] On a touch device (or DevTools mobile emulation): no spotlight effect present
- [ ] The `--spotlight-color` token is used — no hardcoded rgba in the script (the token resolves to `rgba(56, 189, 248, 0.07)`)
- [ ] `npm run build` passes with zero errors
