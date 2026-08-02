# Active Sprint: New Portfolio First Pass

## Plan

- [x] Inspect the current app, archive dependencies, references, and deployment.
- [x] Establish documentation, memory, lesson, and task conventions.
- [x] Organize the supplied references without changing archive paths.
- [x] Create typed site/project content and an isolated new application.
- [x] Implement Home, Projects, About, and five project detail routes.
- [x] Add self-hosted Beth Ellen and Anonymous Pro fonts.
- [x] Generate clean GitHub Pages route entry files and route metadata.
- [x] Verify production build, direct routes, responsive behavior, and `/archive/`.

## Verification

- `npm run build` passes with TypeScript and Vite.
- Production preview returns HTTP 200 for all new routes, `/archive/`, and the
  APRAMP PDF.
- Headless Chrome screenshots were reviewed at 1366x768 and 500x844; project
  asset selection and detail-title spacing were corrected from that review.
- No tracked files under `src/archive/`, `inspo/`, or `archive/legacy-site/`
  changed.

## Deferred Inputs

- LinkedIn URL
- Final CV file
- Approved portrait image
