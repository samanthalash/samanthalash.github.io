# samanthalash.github.io

Vite + React portfolio frontend built as a tactile archival folder interface.

## Repository Layout

```text
/
├── index.html                  # Vite entry HTML
├── package.json                # App scripts and dependencies
├── public/
│   └── CNAME                   # Copied into the production build for GitHub Pages
├── src/
│   ├── App.tsx                 # Top-level folder state
│   ├── components/folder/      # Folder shell, tabs, interior, and content system
│   ├── data/                   # Typed tab and placeholder content config
│   └── styles/                 # Design tokens and global styles
├── content/
│   ├── site/                   # Copy notes and planning material
│   └── projects/               # Draft project content
├── archive/
│   └── legacy-site/            # Previous static HTML/CSS portfolio scaffold
└── dist/                       # Production build output (generated)
```

## Active App Structure

- The live site is the Vite app at the repository root.
- Placeholder portfolio content is configured in `src/data/folderSections.ts`.
- The visual folder system is composed from reusable React components in `src/components/folder/`.
- `public/` is reserved for files that must pass straight through to the build output.

## Legacy Content

- The earlier HTML-first portfolio scaffold now lives in `archive/legacy-site/`.
- It is kept for reference only and is no longer part of the live app path.
- Draft writing and project notes still belong in `content/`, since they can feed the React app later without mixing with runtime code.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Build Notes

- `npm run build` outputs the production site into `dist/`.
- `public/CNAME` is copied into `dist/` automatically by Vite.
- `node_modules/`, `dist/`, and TypeScript build artifacts are gitignored.
