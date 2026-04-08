# samanthalash.github.io

HTML-first portfolio scaffold for a design website.

## Structure

```text
/
├── index.html                 # Homepage
├── about/                     # About page
├── contact/                   # Contact page
├── projects/                  # Work index + individual project pages
├── assets/
│   ├── css/                   # Global styles
│   ├── js/                    # Light progressive enhancement
│   ├── images/                # Public-facing image assets
│   └── fonts/                 # Custom webfonts
└── content/
    ├── site/                  # Draft copy, notes, messaging
    └── projects/              # Case study source content
```

## Build Approach

- Keep public pages as plain HTML so the site stays simple to edit and easy to host on GitHub Pages.
- Store brand notes, homepage copy, and case study drafts in `content/` so planning material stays organized.
- Add one folder per project inside `projects/` when you're ready to turn a case study into a public page.

## Start Here

- Edit `index.html` for the homepage.
- Update shared styles in `assets/css/main.css`.
- Add project thumbnails and mockups to `assets/images/projects/`.
- Draft portfolio copy in `content/site/` and `content/projects/`.
