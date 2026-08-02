# Active Sprint: New Portfolio First Pass

## Plan

- [x] Increase the shared top-left logo size across desktop and mobile layouts.
- [x] Lower the first landing-page project group by another increment.
- [x] Lower the first landing-page project group by one more increment.
- [x] Lower the first landing-page project group slightly while preserving the
  title, metadata, and image alignment.
- [x] Match the About page portrait block and name lockup to the landing page's
  current proportions, alignment, typography, and overlap.
- [x] Move the landing-page text group a final tiny step downward.
- [x] Nudge the landing-page text group slightly lower once more.
- [x] Lower the landing-page text group by one additional small increment.
- [x] Move the landing-page text group one more slight increment downward.
- [x] Move the landing-page name, summary, and contact links slightly downward
  as one visual group.
- [x] Apply another subtle responsive reduction to the landing-page name.
- [x] Reduce the responsive landing-page name by one additional increment.
- [x] Make one final slight reduction to the responsive landing-page name size.
- [x] Reduce the landing-page name lockup further at all responsive sizes.
- [x] Reduce the landing-page name lockup slightly at desktop and mobile sizes.
- [x] Refine the landing intro alignment, name spacing, summary width, and live
  LinkedIn treatment.
- [x] Align the landing-page project group with the right-hand navigation while
  preserving title-to-image spacing and image sizing.
- [x] Match every landing-page project image to the Hunter campaign image width
  while preserving each image's aspect ratio.
- [x] Align each landing-page project title with the top of its image and keep
  the sticky title within the image's bottom edge.
- [x] Inspect the current app, archive dependencies, references, and deployment.
- [x] Establish documentation, memory, lesson, and task conventions.
- [x] Organize the supplied references without changing archive paths.
- [x] Create typed site/project content and an isolated new application.
- [x] Implement Home, Projects, About, and five project detail routes.
- [x] Add self-hosted Beth Ellen and Anonymous Pro fonts.
- [x] Generate clean GitHub Pages route entry files and route metadata.
- [x] Verify production build, direct routes, responsive behavior, and `/archive/`.

## Verification

- The production build passes after increasing the shared logo from a 52–70px
  responsive range to 64–88px, with a 62px phone size.
- The production build passes after increasing the desktop feed's top inset from
  15vh to 17vh.
- The production build passes after increasing the desktop feed's top inset from
  13vh to 15vh.
- A 1366x768 production screenshot confirms the first project title, discipline,
  and image begin 2vh lower as one aligned group.
- A 1366x768 production screenshot confirms the About portrait block is flush
  with the viewport edge and its name lockup matches the current landing style.
- Production build and a 1366x768 headless Chrome screenshot confirm the landing
  name, summary, and contact links shift downward together while the portrait
  stays fixed.
- `npm run build` passes with TypeScript and Vite.
- Headless Chrome checks at 1366x768 and 390x844 confirm the landing portrait
  meets the left viewport edge, the uppercase name lines do not overlap or clip,
  the summary has the requested extra width, and LinkedIn uses the active-link
  treatment.
- A 1366x768 production screenshot confirms the landing-page project image's
  right edge aligns with the right edge of `ABOUT ME` and `+ PROJECTS`.
- Landing-page project images share the Hunter campaign's desktop width; mobile
  images remain uniformly full-width and every image retains its intrinsic ratio.
- Production preview returns HTTP 200 for all new routes, `/archive/`, and the
  APRAMP PDF.
- Headless Chrome screenshots were reviewed at 1366x768 and 500x844; project
  asset selection and detail-title spacing were corrected from that review.
- Desktop browser geometry confirms landing-page project titles start flush with
  their images and stop with zero overflow at each image's bottom edge.
- No tracked files under `src/archive/`, `inspo/`, or `archive/legacy-site/`
  changed.

## Deferred Inputs

- Final CV file
- Approved portrait image
