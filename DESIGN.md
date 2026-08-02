# Samantha Lash Portfolio Design Specification

## Product Direction

Samantha's new portfolio combines her supplied content and visual identity with
the browsing behavior of Constanza Coscia's portfolio. The reference site's code
and proprietary assets are not copied. The prior Samantha portfolio remains
available at `/archive/`.

The local exports in `references/goal-mockups/` are the authority for wording,
project order, hierarchy, and desktop compositions. The Constanza screenshots in
`references/constanza-inspiration/` are the authority for the fixed-left,
scrolling-right desktop landing behavior.

## Routes And Content

- `/`: fixed introduction panel plus a separately scrolling list of five work
  previews on desktop; a normal stacked document on mobile.
- `/projects/`: an editorial collage overview linking to all five projects.
- `/about/`: biography, experience, education, skills, languages, and contact.
- `/projects/hunter-campaign/`
- `/projects/levis-campaign/`
- `/projects/apramp-campaign/`
- `/projects/tomorrowland-rebrand/`
- `/projects/la-manuela-rebrand/`
- `/archive/`: preserved previous interactive portfolio.

Project order is Hunter, Levi's, APRAMP, Tomorrowland, and La Manuela. Project
detail copy uses the exact Context, Role, Insight, Solution, and Tools wording in
the goal mockups.

## Visual System

- Canvas: warm near-white with black type and project artwork providing color.
- Display handwriting: Beth Ellen.
- Interface and editorial copy: Anonymous Pro regular and bold.
- Logo: Samantha's circular stamp; it links to Home.
- Home/About portrait area: neutral gray placeholder until a portrait is
  supplied.
- Composition: large negative space, asymmetric image placement, compact
  typewritten labels, and restrained underlined actions.

Desktop layouts should closely match the 1366px-wide goal exports without using
the exports as flattened page backgrounds. Use the individual source images.

## Interaction And Responsive Behavior

At desktop widths, Home occupies the viewport: the left introduction panel does
not move and only the right work feed scrolls. At tablet and phone widths, Home
becomes a conventional single document with the introduction followed by the
project cards.

Projects and detail pages preserve their editorial asymmetry on wide screens and
reflow into readable single-column sequences on narrow screens. Do not scale the
whole desktop canvas down. Navigation and project cards must work with keyboard,
touch, and pointer input. Focus must be visible.

Use only restrained entrance/reveal transitions. Disable nonessential motion
under `prefers-reduced-motion`. Route changes return to the top unless browser
history restoration is expected.

## Content And Link Policy

Visible portfolio wording is stored once in typed project data. Known contact
email and LinkedIn URL are active. The About page provides Samantha's supplied CV
as a direct download. Images require meaningful alt text; purely decorative marks
use empty alt text.

## Technical Boundaries

The new portfolio lives in `src/new-portfolio/`. The root app dispatches archive
paths to the lazy archived application and all other paths to the new app. Vite
generates route entry files so clean URLs survive direct GitHub Pages loads and
refreshes. Fonts are self-hosted and production assets are independent copies of
the chosen archive/inspiration files.
