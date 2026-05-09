# Phase 04 — Experience Section

## Goal

Render the full work history timeline. Each experience entry gets its own card with a two-column inner layout (date on the left, details on the right), skills as pill tags, a "PRESENT" badge for the current role, and company names as styled external links. A "View Full Resume" link sits below the last card.

## Read first

- `context/ui-context.md` — Experience Card component pattern (two-column grid, card hover states, tag/badge styles, PRESENT badge tokens), color tokens `--bg-surface`, `--bg-surface-hover`, `--border`, `--border-hover`, `--badge-present-bg`, `--badge-present-text`, `--accent`, `--accent-dim`, `--accent-dim-text`
- `context/architecture.md` — directory structure for `sections/` and `ui/` components
- `src/data/experience.ts` — all four entries; note fields: `current`, `skills[]`, `companyUrl`, `description` (plain text, not HTML)
- `src/data/types.ts` — the `Experience` interface

## Files changed

```
src/components/ui/
  Tag.astro                   CREATE  pill tag badge (used for skills and technologies)
src/components/sections/
  ExperienceSection.astro     CREATE  section wrapper, maps entries, "View Full Resume" link
  ExperienceItem.astro        CREATE  individual experience card
src/pages/index.astro         UPDATE  add ExperienceSection after AboutSection
```

## Implementation

### 1. Create `Tag.astro`

Props:
```ts
interface Props {
  label: string;
}
```

Renders a single `<span>` with the label text. Styles:
- Background: `var(--accent-dim)`
- Text color: `var(--accent-dim-text)`
- Font size: 0.75rem, weight 500
- Padding: `0.25rem 0.625rem`
- Border radius: `9999px` (pill)
- Display: `inline-block`
- White-space: `nowrap`

No hover state — tags are decorative only.

### 2. Create `ExperienceItem.astro`

Props:
```ts
interface Props {
  experience: Experience;
  index: number;
}
```

Outer card wrapper: `group relative rounded-lg p-4 transition-all duration-200`
- Normal: background transparent, border `1px solid transparent`
- Hover (via `group-hover` or CSS `:hover`): `background: var(--bg-surface-hover)`, `border-color: var(--border-hover)`, `box-shadow: 0 4px 20px rgba(0,0,0,0.2)`
- Add `data-animate="slide-up"` and `style={`animation-delay: ${index * 80}ms`}` for Phase 09

Inner two-column grid on desktop: `grid grid-cols-[25%_1fr] gap-4`
On mobile: single column (`grid-cols-1`)

**Left column** (date range):
- Start date + "–" + end date (or "PRESENT" badge if `current === true`)
- Text style: `--text-xs` size, `--text-secondary` color, uppercase, tracking wide, `font-variant-numeric: tabular-nums`
- "PRESENT" badge: `<span>` with background `var(--badge-present-bg)`, text `var(--badge-present-text)`, same pill border-radius as `Tag`, font-size 0.65rem, font-weight 600, padding `0.2rem 0.5rem`

**Right column** (details):
1. Position title: `<h3>` — `--text-heading` color, 1rem, weight 600, leading tight
2. Company name: if `companyUrl` is set, render `<a href={companyUrl} target="_blank" rel="noopener noreferrer">`. Style: `--text-secondary` color normally, `--accent` on hover. After the company name text, add an inline `↗` arrow that is `opacity-0 group-hover:opacity-100 transition-opacity duration-150 ml-0.5 text-xs`. Only animate the arrow on the `<a>` element hover, not the whole card.
3. Description: `<p>` — `--text-secondary`, 0.9375rem, line-height 1.7, `mt-2`
4. Skills row: `<div class="flex flex-wrap gap-2 mt-3">` — map `experience.skills` to `<Tag label={skill} />`

### 3. Create `ExperienceSection.astro`

Props:
```ts
interface Props {
  experience: Experience[];
  resumeUrl?: string;
}
```

Structure:
```
<section id="experience" class="mb-16 scroll-mt-24">
  <h2 class="section-label lg:hidden">Experience</h2>
  <div class="flex flex-col gap-4">
    {experience.map((exp, i) => <ExperienceItem experience={exp} index={i} />)}
  </div>
  {resumeUrl && (
    <div class="mt-8">
      <a href={resumeUrl} target="_blank" rel="noopener noreferrer" class="resume-link">
        View Full Resume ↗
      </a>
    </div>
  )}
</section>
```

Style the resume link: `--text-primary`, weight 600, 0.9375rem. On hover: `--accent`. Underline offset 3px with accent color. Transition 150ms.

### 4. Update `src/pages/index.astro`

Import `ExperienceSection`, `experience` from `src/data/experience.ts`. Render after `<AboutSection>`:

```astro
<ExperienceSection experience={experience} resumeUrl={profile.resumeUrl} />
```

## Verify when done

- [ ] All 4 experience entries render in order (WPManageNinja first)
- [ ] WPManageNinja shows "PRESENT" badge instead of an end date
- [ ] Each card's company name is a working external link that opens in a new tab
- [ ] The `↗` arrow on the company link is invisible by default and appears on hover
- [ ] Skills render as sky-blue pill tags for all four entries
- [ ] Card hover shows elevated surface + visible border (check in DevTools)
- [ ] "View Full Resume" link renders below the last card and links to `profile.resumeUrl`
- [ ] Section heading "Experience" is hidden on desktop, visible on mobile
- [ ] `id="experience"` is on the section — sidebar anchor link scrolls correctly
- [ ] `npm run build` passes with zero errors
