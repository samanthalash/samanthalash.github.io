# Samantha Lash Portfolio

This repository contains Samantha Lash's portfolio website. The live build is a
Vite + React app for GitHub Pages, designed as a tactile archival folder rather
than a conventional scrolling portfolio.

## What Has Been Built

- Reworked the original static portfolio into a typed React application.
- Built an opening desktop-style intro screen with a clickable folder icon that
  reveals the portfolio and remembers the intro state for the session.
- Created the main folder scene with tabbed sections for Home, Creative
  Direction, Brand Identity, Strategy & Concept, and Contact.
- Built reusable folder components for the shell, tabs, interior page, content
  panel, decorative marks, and page-flip behavior.
- Added a page-flip system with forward and backward controls, pointer dragging,
  keyboard support, layered stacking, and animated page depth.
- Moved portfolio section copy and page configuration into typed data files so
  project pages can be edited without changing the component structure.
- Added visual campaign pages for Levi's, Hunter, and Nylon using imported image
  assets, layered photography, stamps, paperclips, monograms, and archive-style
  layout details.
- Archived the earlier HTML/CSS version of the site in `archive/legacy-site/`
  for reference while keeping the Vite app as the active site.
- Kept the custom domain setup in `public/CNAME` so it is included in the
  production build for GitHub Pages.

## Active App Structure

```text
/
├── index.html                  # Vite entry HTML
├── package.json                # App scripts and dependencies
├── public/
│   └── CNAME                   # Copied into the production build
├── src/
│   ├── App.tsx                 # Intro state and active folder section state
│   ├── components/desktop/     # Opening desktop-style portfolio screen
│   ├── components/folder/      # Folder shell, tabs, page flip, and content UI
│   ├── data/                   # Section and page content configuration
│   ├── assets/                 # Portfolio images and visual ephemera
│   └── styles/                 # Design tokens and global styles
├── content/
│   ├── site/                   # Copy notes and planning material
│   └── projects/               # Draft project content
└── archive/
    └── legacy-site/            # Previous static HTML/CSS portfolio scaffold
```

## Editing Content

- Update tab labels and fallback section copy in `src/data/folderSections.ts`.
- Update individual page content, layout variants, image overrides, and stamp
  choices in `src/data/folderPages.ts`.
- Creative Direction pages have header-based IDs and aliases in
  `src/data/folderPages.ts`, so they can be referenced as Levi's Campaign,
  Hunter Campaign, or Nylon Editorial.
- Add or replace campaign imagery in `src/assets/`, then import it into the
  relevant data or component file.
- Keep long-form notes and drafts in `content/` until they are ready to become
  part of the React app.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Build Notes

- `npm run build` runs TypeScript and outputs the production site into `dist/`.
- `public/CNAME` is copied into `dist/` automatically by Vite.
- `node_modules/`, `dist/`, and TypeScript build artifacts are gitignored.
