# Active Sprint: New Portfolio First Pass

## Plan

- [x] Enlarge the Tomorrowland detail-page hero poster while keeping its top
  position fixed.
- [x] Build and visually verify the Tomorrowland hero at desktop and mobile
  sizes without changing the other project-detail layouts.
- [x] Replace the Levi's detail gallery with the supplied beach billboard above
  the cyclist billboard, using equal left-aligned image boxes and a small gap.
- [x] Align the desktop Levi's image stack from Context's top edge through Tools'
  bottom edge, then build and verify desktop and mobile layouts.
- [x] Reduce the shared project-detail title size and lower the complete title,
  category, and campaign-link block toward the hero image's bottom edge.
- [x] Build and visually verify the shared project-title placement across all
  five detail pages at desktop and mobile sizes.
- [x] Repeat the Levi's image-position refinement, moving the portrait another
  increment up-left and the landscape image another increment downward.
- [x] Build and visually verify the second Levi's position adjustment.
- [x] Move the Levi's upper-left portrait slightly farther up and left, and the
  lower-right landscape image slightly downward without changing their sizes.
- [x] Build and visually verify the refined Levi's desktop image positions.
- [x] Refit the Levi's detail hero to the approved reference proportions: enlarge
  the upper-left portrait slightly, reduce the lower-right landscape image, and
  preserve a clear gap between them.
- [x] Build and visually verify the Levi's image pair at desktop and responsive
  sizes without changing the other project-detail compositions.
- [x] Reduce every project detail title slightly and increase its multiline
  spacing so the handwritten title lines do not overlap.
- [x] Build and visually verify the updated project-title treatment at desktop
  and mobile sizes.
- [x] Keep APRAMP's new image on project previews while using the campaign board
  as the APRAMP detail-page hero.
- [x] Build and verify the APRAMP detail route after separating its preview and
  detail imagery in typed project data.
- [x] Add the supplied CV as a downloadable About-page asset.
- [x] Replace the Hunter hero and billboard images with the supplied versions.
- [x] Add the supplied APRAMP landing image without removing the existing
  campaign board, and point the APRAMP hero to the new asset.
- [x] Build and verify the affected routes and downloadable CV, then remove the
  staging `new_assets/` folder.
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

- The production build passes. A 1366x900 production screenshot confirms the
  Tomorrowland hero poster is 12% larger and remains anchored to its prior top
  edge; a 390x844 screenshot confirms the responsive layout remains full-width
  and unchanged.
- The production build passes. At 1366x900, browser geometry confirms both
  Levi's detail images are exactly 527.83px by 355.59px with a 19.11px gap; the
  first image top matches Context at 886.45px and the second image bottom matches
  Tools at 1616.75px. At 390x844, both images remain exactly 350px by 233.33px
  with a 12px responsive gap.
- The production build passes; 1366x900 screenshots of all five project detail
  pages confirm the shared title group is smaller, substantially lower, and
  remains above the common hero-artwork baseline. Representative 390x844 checks
  confirm the longest title and APRAMP's extra campaign link remain unclipped.
- A second 1366x900 production screenshot confirms both Levi's images moved by
  another matching increment while remaining separated and correctly sized.
- A 1366x900 production screenshot confirms the Levi's portrait moved farther
  up-left and the landscape image moved lower while retaining their clear gap.
- The production build passes, and Levi's screenshots at 1366x900 and the
  headless-browser mobile minimum confirm the first image pair matches the source
  proportions, keeps a visible gap, and reflows without overlap.
- The production build passes, and 1366x768 plus 390x844 screenshots confirm
  project titles are smaller, multiline glyphs remain separated, and the longest
  title (`TOMORROWLAND REBRAND`) fits without clipping.
- The production build confirms APRAMP's preview and detail hero compile as
  separate assets, with `campaign-board.png` selected through `detailHero` only
  on the project detail page.
- The production build passes with the supplied Hunter hero and billboard, the
  new APRAMP landing hero, and the downloadable CV.
- SHA-1 comparisons confirm all four production assets match the supplied files;
  production preview requests return HTTP 200 for Home, About, Hunter, APRAMP,
  and the CV PDF.
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

- Approved portrait image
