# Phase 05 — Projects Section

## Goal

Render the featured projects section on the homepage. Only projects with `featured: true` are shown (max 5). Each project card shows a thumbnail, title, description, technology tags, and GitHub/Live links. A "View All Projects" link leads to `/projects` (built in Phase 07). Re-uses the `Tag` component from Phase 04.

## Read first

- `context/ui-context.md` — Project Card component pattern (two-column inner grid, thumbnail aspect ratio, title hover, tech tags, external links row, card hover states)
- `context/architecture.md` — directory structure for `sections/` and `ui/` components; `ExternalLink.astro` listed under `ui/`
- `src/data/projects.ts` — 5 featured projects; note fields: `imageUrl`, `liveUrl`, `githubUrl` (some are undefined), `technologies[]`
- `src/data/types.ts` — the `Project` interface
- `src/components/ui/Tag.astro` — already built in Phase 04, import and reuse

## Files changed

```
src/components/ui/
  ExternalLink.astro          CREATE  styled "↗" link used in project cards
src/components/sections/
  ProjectsSection.astro       CREATE  section wrapper, featured filter, "View All" link
  ProjectItem.astro           CREATE  individual project card
src/pages/index.astro         UPDATE  add ProjectsSection after ExperienceSection
```

## Implementation

### 1. Create `ExternalLink.astro`

Props:
```ts
interface Props {
  href: string;
  label: string;
}
```

Renders `<a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>` with a slot for icon + text.

Styles: `--text-secondary`, inline-flex, items-center, gap-1.5, text-sm, hover `--text-primary`, transition 150ms.

### 2. Create `ProjectItem.astro`

Props:
```ts
interface Props {
  project: Project;
  index: number;
}
```

Outer card wrapper: same hover pattern as `ExperienceItem` — group, rounded-lg, p-4, transition, hover surface + border + shadow.
Add `data-animate="slide-up"` and `style={`animation-delay: ${index * 80}ms`}`.

Inner two-column grid: `grid grid-cols-[100px_1fr] gap-6 items-start`
On mobile: `grid-cols-1`

**Left column** — thumbnail:
- If `project.imageUrl` is defined: `<img src={project.imageUrl} alt={project.title} loading="lazy" class="rounded w-full aspect-video object-cover border border-[var(--border)] group-hover:border-[var(--border-hover)] transition-colors duration-200" />`
- If `project.imageUrl` is undefined: render a placeholder `<div>` with `--bg-surface` background, same rounded + aspect-video classes, containing a small "↗" centered.

**Right column** — content:
1. Title: `<h3>` — if `liveUrl` is set, wrap in `<a href={liveUrl} target="_blank">`. Title style: `--text-heading`, 1rem, weight 600. Link style: hover `--accent`, transition 150ms. After the title text, `<span class="inline-block ml-1 text-sm text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">↗</span>` (only show on card hover, not title hover, to keep it subtle).
2. Description: `<p>` — `--text-secondary`, 0.875rem, line-height 1.6, `mt-1.5`
3. Tech tags row: `<div class="flex flex-wrap gap-1.5 mt-3">` — map `project.technologies` to `<Tag label={tech} />`
4. Links row (if any links exist): `<div class="flex items-center gap-4 mt-3">`. Render `<ExternalLink>` for GitHub (label: "GitHub repo") and/or Live site (label: "Live site") using SVG icons:
   - GitHub icon: 16×16px, same SVG path as in `SocialLinks.astro`
   - External/globe icon for live URL: `M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z` (globe)

### 3. Create `ProjectsSection.astro`

Props:
```ts
interface Props {
  projects: Project[];
}
```

Filter featured projects in the frontmatter:
```ts
const featured = projects.filter(p => p.featured).slice(0, 5);
```

Structure:
```
<section id="projects" class="mb-16 scroll-mt-24">
  <h2 class="section-label lg:hidden">Projects</h2>
  <div class="flex flex-col gap-4">
    {featured.map((project, i) => <ProjectItem project={project} index={i} />)}
  </div>
  <div class="mt-8">
    <a href="/projects" class="view-all-link">
      View All Projects ↗
    </a>
  </div>
</section>
```

Style `view-all-link` identically to the `resume-link` in `ExperienceSection` — `--text-primary`, weight 600, hover `--accent`, underline offset 3px, transition 150ms.

### 4. Update `src/pages/index.astro`

Import `ProjectsSection` and `projects` from `src/data/projects.ts`. Render after `<ExperienceSection>`:

```astro
<ProjectsSection projects={projects} />
```

## Verify when done

- [ ] Exactly 5 featured projects render (M-Smart Technology BD is excluded — it has `featured: false`)
- [ ] Each project card shows the correct thumbnail image (downloaded webp files load correctly)
- [ ] CB Portfolio and CB QR Code cards both show a GitHub link AND a Live link
- [ ] TuFlamenco, Sylhet Helpline, Cardinal Health Care show only a Live link (no GitHub)
- [ ] Technology tags render as sky-blue pills for all projects
- [ ] Project title link opens the live URL in a new tab
- [ ] `↗` on the title is invisible by default and visible on card hover
- [ ] Card hover shows elevated surface + border (matches experience card behavior)
- [ ] "View All Projects ↗" link renders below the last card and points to `/projects`
- [ ] Section heading "Projects" is hidden on desktop, visible on mobile
- [ ] `id="projects"` is on the section — sidebar anchor link scrolls correctly
- [ ] `npm run build` passes with zero errors
