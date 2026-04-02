# Robin Lobo — Portfolio

Personal portfolio and blog built with [Docusaurus](https://docusaurus.io/). Elegant editorial aesthetic with Playfair Display serif headings, warm ivory palette, and transparent voice.

## Sections

- **Home** — Hero, featured projects, tutorials callout, latest writing
- **Projects** — Filterable list with revenue, traction, and status
- **Tutorials** — Full-stack guides for developers
- **Writing** — Essays on building products and services
- **About** — Bio, stack, timeline, and contact

## Getting started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Install & run

```bash
npm install
npm start
```

Opens at `http://localhost:3000`.

### Build for production

```bash
npm run build
npm run serve   # preview the production build locally
```

## Customization

### 1. Your details

Edit `docusaurus.config.ts`:

```ts
title: "Your Name",
tagline: "Your tagline",
url: "https://yoursite.com",
```

Update navbar links, footer links, and social URLs to your own.

### 2. Homepage content

Edit `src/pages/index.tsx`:

- `PROJECTS` array — your featured projects with tags and links
- `POSTS` array — your latest blog posts (keep in sync with actual blog posts)

### 3. Projects page

Edit `src/pages/projects.tsx`:

- `PROJECTS` array — all your projects with revenue, status, launched date

### 4. About page

Edit `src/pages/about.tsx`:

- Bio paragraphs
- `TIMELINE` array — your work history
- `STACK` object — your tools and technologies
- Update the `avatarBox` initials and contact email

### 5. Blog posts

Add Markdown files to `blog/` with this frontmatter:

```md
---
slug: my-post-slug
title: My Post Title
authors:
  name: Your Name
  url: https://yoursite.com
tags: [tag1, tag2]
date: 2025-01-01
---

Your intro paragraph (shown in listing).

<!-- truncate -->

Rest of your post...
```

### 6. Tutorials

Add Markdown files to `docs/tutorial/` and register them in `sidebars.ts`.

### 7. Colors & fonts

Edit `src/css/custom.css`:

- `--e-accent` — primary green (`#2a5c45` default)
- `--e-accent2` — amber highlight (`#c8954a` default)
- `--e-bg` / `--e-surface` — background tones
- Font imports at the top — swap Playfair Display for any Google Font

## Deployment

### Vercel (easiest)

```bash
npm install -g vercel
vercel
```

### GitHub Pages

Add to `docusaurus.config.ts`:

```ts
organizationName: "yourusername",
projectName: "portfolio",
deploymentBranch: "gh-pages",
```

Then:

```bash
GIT_USER=yourusername npm run deploy
```

### Netlify / Cloudflare Pages

Build command: `npm run build`  
Output directory: `build`

## Stack

- [Docusaurus 3](https://docusaurus.io/) — framework
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — display font
- [DM Sans](https://fonts.google.com/specimen/DM+Sans) — body font
- [DM Mono](https://fonts.google.com/specimen/DM+Mono) — monospace / labels
- TypeScript throughout

## License

MIT — do whatever you want with it.
