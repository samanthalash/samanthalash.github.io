# Samantha Lash Portfolio

Portfolio website for Samantha Lash, live at [samanthalash.com](https://samanthalash.com).

The site is a Vite + React portfolio designed as an interactive desktop folder. It opens with a desktop-style folder icon, then reveals a tabbed archive interface with page flips, project layouts, and image galleries.

## How The Site Works

- Visitors first see an intro folder screen. Once opened, that intro is hidden for the rest of the browser session with `sessionStorage`.
- The main experience is a fixed folder scene with tabs for Home, Creative Direction, Brand Identity, Strategy & Concept, and Contact.
- Project sections are presented as folder pages with animated page flipping. The corner controls turn pages forward and backward.
- Plus icons on project pages open full project galleries.
- The Contact page envelope opens the overall portfolio gallery.
- A one-time hint overlay explains the plus icons and page-flip corner. It is remembered with `localStorage`.
- Screens narrower than `1100px` show a desktop-only message instead of the folder interface.

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- GitHub Pages/custom-domain deployment

## Project Structure

```text
src/
  App.tsx                         App state, intro, viewport guard, gallery overlays
  components/desktop/             First-visit desktop folder screen
  components/folder/              Folder shell, tabs, pages, page flip, hint overlay
  components/editor/              Development-only visual layout editor
  components/portfolio/           Full-screen gallery overlay
  data/
    folderSections.ts             Folder tab labels and fallback copy
    folderPages.ts                Page order, project copy, and per-page config
    editableLayout.json           Visual page layouts used by the editor renderer
    galleryOverrides.json         Gallery additions/removals saved from the editor
    projectGalleries.ts           Per-project gallery image lists
    portfolioGallery.ts           Overall portfolio gallery image list
    layoutAssets.ts               Asset registry for editor/layout images
  assets/                         Imported site images and visual elements
  styles/                         Global styles and design tokens

public/
  CNAME                           Custom domain copied into production builds
  editor-assets/                  Images uploaded through the local layout editor
  gallery-assets/                 Gallery uploads saved through the local editor

inspo/                            Source/reference project imagery imported by Vite
content/                          Draft notes and project copy
archive/legacy-site/              Older static HTML/CSS version kept for reference
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the local site:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Editing Content And Layouts

Most visible project page layouts come from `src/data/editableLayout.json`, rendered by `CanvasPageRenderer`. The local visual editor is only available in Vite dev mode.

To edit layouts locally:

1. Run `npm run dev`.
2. Open the local site with `?edit=1`.
3. Use the editor panel to move, resize, add, duplicate, delete, or configure page elements.
4. Use Save in the editor panel. This writes changes back to `src/data/editableLayout.json`.
5. Commit the updated JSON and any uploaded assets.

Other common editing points:

- Folder tabs and fallback section copy: `src/data/folderSections.ts`
- Page order, page copy, and project-level layout config: `src/data/folderPages.ts`
- Project gallery image lists: `src/data/projectGalleries.ts`
- Overall portfolio gallery list: `src/data/portfolioGallery.ts`
- Gallery additions/removals from the local editor: `src/data/galleryOverrides.json`
- Editor asset registry: `src/data/layoutAssets.ts`

The Vite dev server also exposes local editor endpoints under `/__layout-editor/*`. Those endpoints do not exist in production.

## Assets And Galleries

Project imagery is pulled from both `src/assets/` and `inspo/`. Some galleries use `import.meta.glob` to include all images from specific `inspo/` folders, sorted naturally by filename.

Uploaded editor assets are stored under `public/editor-assets/`. Uploaded gallery assets are stored under `public/gallery-assets/`. Because these folders are inside `public/`, Vite copies them into the production build.

## Deployment Notes

- `npm run build` runs TypeScript first, then writes the production site to `dist/`.
- `public/CNAME` contains `samanthalash.com` and is copied into `dist/` during the Vite build.
- This repository is set up for GitHub Pages with the custom domain [samanthalash.com](https://samanthalash.com).
- Commit source changes, build locally to verify, then push the branch used by the GitHub Pages deployment.

