# samanthalash.github.io

React + Vite portfolio frontend built as a tactile archival folder interface.

## Structure

```text
/
├── index.html                # Vite entry HTML
├── src/
│   ├── App.tsx               # Top-level folder state
│   ├── data/                 # Typed tab and placeholder content config
│   ├── components/folder/    # Folder shell, tabs, interior, and content system
│   └── styles/               # Tokens and global styles
├── about/                    # Existing static page
├── contact/                  # Existing static page
├── projects/                 # Existing static pages
└── content/                  # Draft notes and future portfolio copy
```

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Notes

- The root experience is now a React single-page folder interface with 5 tab dividers.
- Portfolio content is driven from `src/data/folderSections.ts`.
- Styling is split between shared design tokens and component-local CSS Modules to keep the realism maintainable.
