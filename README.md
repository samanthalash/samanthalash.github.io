# Samantha Lash Portfolio

Portfolio website for Samantha Lash, deployed to
[samanthalash.com](https://samanthalash.com) with GitHub Pages.

## Routes

- `/` presents Samantha's introduction beside a separately scrolling project
  feed on desktop and a stacked feed on mobile.
- `/projects/` presents the editorial project overview.
- `/about/` contains Samantha's profile, experience, education, and contact.
- `/projects/<project>/` contains one of five responsive case studies.
- `/archive/` preserves the previous interactive folder portfolio.

## Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- Self-hosted Beth Ellen and Anonymous Pro fonts
- GitHub Pages with clean generated route entry files

## Structure

```text
src/
  App.tsx                    Root dispatcher for the new site and /archive/
  new-portfolio/             New portfolio pages, typed content, styles, assets
  archive/portfolio/         Preserved previous Vite portfolio
references/
  goal-mockups/              Samantha's approved page compositions and wording
  constanza-inspiration/     Interaction and layout screenshots
memory/                      Indexed durable context and narrative lessons
tasks/                       Active sprint checklist
inspo/                       Protected archive imagery and source material
archive/legacy-site/         Older static portfolio reference
```

Read `AGENTS.md` before making changes. `DESIGN.md` defines current product and
design behavior, `TASKS.md` tracks the roadmap, and `memory/MEMORY.md` indexes
durable project context.

## Local Development

```bash
npm install
npm run dev
```

Build and preview the production site:

```bash
npm run build
npm run preview
```

The build writes `index.html` files for every clean route, including `/archive/`,
so direct visits and refreshes work on GitHub Pages.

## Editing The New Portfolio

Project copy, order, routes, metadata, and image assignments are defined in
`src/new-portfolio/data/portfolio.ts`. Shared layouts are in
`src/new-portfolio/NewPortfolioApp.tsx` and its CSS module. Copy approved in the
goal mockups should not be paraphrased.

LinkedIn and Download CV intentionally remain disabled until final targets are
provided. The Home and About portrait area intentionally remains gray until an
approved portrait is supplied.

## Archive

Do not rename, delete, or reorganize `src/archive/portfolio/`, `inspo/`, or
`archive/legacy-site/`. The previous portfolio depends on those paths and must
remain functional at `/archive/`.
