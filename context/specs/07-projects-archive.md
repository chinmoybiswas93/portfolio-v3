# Phase 07 — Projects Archive Page

## Goal

Create the `/projects` route showing all projects (both featured and non-featured) in a full-page archive view. Desktop shows a table (Year / Project / Made at / Built with / Link). Mobile shows a simplified card list. Includes a back-navigation link to the homepage. Re-uses `Tag` from Phase 04.

## Read first

- `context/project-overview.md` — Projects Archive section spec (table columns, mobile behavior, back navigation)
- `context/ui-context.md` — color tokens (`--text-secondary`, `--text-primary`, `--accent`, `--border`, `--bg-surface`), body text style, tag styles
- `src/data/projects.ts` — all 6 projects including M-Smart Technology BD (non-featured); note the `year`, `madeAt`, `technologies[]`, `liveUrl`, `githubUrl` fields
- `src/data/types.ts` — the `Project` interface
- `src/components/layout/BaseLayout.astro` — how to wrap the page in the layout shell
- `src/components/ui/Tag.astro` — import and reuse for technology tags

## Files changed

```
src/components/projects/
  ProjectsTable.astro         CREATE  desktop table layout
  ProjectsTableRow.astro      CREATE  single table row for one project
  ProjectCardMobile.astro     CREATE  mobile card for one project
src/pages/
  projects.astro              CREATE  the /projects route
```

## Implementation

### 1. Create `ProjectsTableRow.astro`

Props:
```ts
interface Props {
  project: Project;
}
```

Renders a `<tr>` with five `<td>` cells:

1. **Year** — `project.year`, `--text-secondary`, 0.875rem, `w-16`
2. **Project** — project title. If `project.liveUrl` is set, wrap in `<a href={liveUrl} target="_blank" rel="noopener noreferrer">` styled `--text-heading` weight 600, hover `--accent` with `↗` inline. If no `liveUrl`, plain text.
3. **Made at** — `project.madeAt ?? '—'`, `--text-secondary`, 0.875rem
4. **Built with** — `<div class="flex flex-wrap gap-1">` mapping `project.technologies` to `<Tag label={tech} />`
5. **Link** — if `project.githubUrl`: GitHub icon link (16×16 SVG, same path as SocialLinks). If no GitHub URL, render `—`.

Row styles:
- `border-b border-[var(--border)]`
- Cell padding: `py-4 pr-6`
- Hover: `background: var(--bg-surface)` on the `<tr>` — use `:hover` in scoped `<style>`
- Transition: `background 150ms ease`

### 2. Create `ProjectsTable.astro`

Props:
```ts
interface Props {
  projects: Project[];
}
```

Renders a `<table class="w-full border-collapse">`:

```html
<thead>
  <tr>
    <th>Year</th>
    <th>Project</th>
    <th>Made at</th>
    <th>Built with</th>
    <th>Link</th>
  </tr>
</thead>
<tbody>
  {projects.map(p => <ProjectsTableRow project={p} />)}
</tbody>
```

`<th>` styles: `text-left text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] pb-4 pr-6`

### 3. Create `ProjectCardMobile.astro`

Props:
```ts
interface Props {
  project: Project;
}
```

Renders a simple list item for mobile. Structure:
```html
<li class="border-b border-[var(--border)] py-4">
  <div class="flex justify-between items-start gap-4">
    <div>
      <a href={liveUrl or githubUrl} class="font-semibold text-[var(--text-heading)] hover:text-[var(--accent)] transition-colors">
        {project.title} <span class="text-sm">↗</span>
      </a>
      <div class="flex flex-wrap gap-1 mt-2">
        {project.technologies.map(t => <Tag label={t} />)}
      </div>
    </div>
    <span class="text-xs text-[var(--text-secondary)] whitespace-nowrap">{project.year}</span>
  </div>
</li>
```

If neither `liveUrl` nor `githubUrl` exists, render the title as plain text (not a link).

### 4. Create `src/pages/projects.astro`

Import `BaseLayout`, `ProjectsTable`, `ProjectCardMobile`, all projects from `src/data/projects.ts`, and `profile` for the name in the header.

Sort projects by `year` descending before passing to components:
```ts
const sorted = [...projects].sort((a, b) => b.year - a.year);
```

Page layout:
```astro
<BaseLayout title={`All Projects — ${profile.name}`} description="Full archive of projects by Chinmoy Biswas">
  <div class="max-w-4xl mx-auto px-6 py-16 lg:px-12 lg:py-24">

    <!-- Back nav -->
    <a href="/" class="back-link">← {profile.name}</a>

    <!-- Heading -->
    <h1 class="mt-6 mb-12 text-4xl font-bold text-[var(--text-heading)]">
      All Projects
    </h1>

    <!-- Desktop table -->
    <div class="hidden md:block">
      <ProjectsTable projects={sorted} />
    </div>

    <!-- Mobile list -->
    <ul class="md:hidden">
      {sorted.map(p => <ProjectCardMobile project={p} />)}
    </ul>

  </div>
</BaseLayout>
```

Back link styles: `text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors flex items-center gap-1`

## Verify when done

- [ ] `/projects` route exists and renders — `npm run dev`, navigate to `http://localhost:4321/projects`
- [ ] All 6 projects render (including M-Smart Technology BD which is non-featured)
- [ ] Projects sorted by year descending: 2026 entries first, then 2025, then 2022
- [ ] Desktop (≥768px): table layout with 5 columns visible
- [ ] Mobile (<768px): card list visible, table hidden
- [ ] "← Chinmoy Biswas" back link in the top left navigates to `/`
- [ ] Project title links open in new tab
- [ ] CB Portfolio and CB QR Code rows show a GitHub icon link
- [ ] Technology tags render correctly in the "Built with" column
- [ ] "View All Projects ↗" link on the homepage (`/`) navigates to this page
- [ ] `npm run build` passes with zero errors and `/projects/index.html` exists in `dist/`
