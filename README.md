# Arjun Chavan — Portfolio

**Live:** https://arjunchavan219.github.io/bio/

One résumé, three interfaces. The same content is rendered three ways, and the
switch between them is the point:

- **Visual** — an editorial page: a serif statement, a numbered contents index,
  and a technical plate per section that draws itself as you arrive.
- **Vim** — the full résumé as a Vim buffer. `j/k` to move, `:` for commands,
  `t` toggles raw Markdown against the rendered view. `:colo` opens a real
  Pmenu-style picker over six published colourschemes (classic, gruvbox,
  solarized, nord, tokyonight, catppuccin); `j/k` live-previews each one and the
  choice is remembered per browser.
- **k9s** — the résumé as a k9s TUI dashboard, using the actual k9s default
  skin rather than an invented one.

Switch with the pill (bottom-right) or press **`m`**. Quitting either terminal
(`:q`, `:qa`, `ZZ`, `ZQ`) always lands back on Visual.

Built with **Next.js 14** (App Router, static export), **React**, **TypeScript**,
and **Tailwind CSS**. No 3D, no WebGL — the visuals are SVG and canvas 2D.

---

## Run it locally

### Prerequisites

- **Node.js ≥ 18.17** — check with `node --version`
- **pnpm** — `corepack enable` (ships with Node 16.10+) or `npm install -g pnpm`

### Setup

```bash
git clone https://github.com/ArjunChavan219/bio.git
cd bio
pnpm install
pnpm dev
```

Open **http://localhost:3000**.

> **Don't run `pnpm build` while `pnpm dev` is running** — it corrupts the
> `.next` cache. Stop the dev server first, or use `pnpm tsc --noEmit` to
> typecheck without building.

### Production build

The site is a fully static export.

```bash
pnpm build      # → ./out
npx serve out   # preview
```

---

## Deploying to GitHub Pages

> **Read this before deploying.** Pages serves the **root of `main`**, not a
> `docs/` folder and not the source.

- **`feat/portfolio-rebuild`** — the source branch. All development happens here.
- **`main`** — the published build artifact. Its root *is* the live site.

To publish: build on the source branch, then copy the contents of `out/` to the
root of `main` and commit.

Two things that will silently break the deploy:

1. **`.nojekyll` must exist at the root of `main`.** Without it, Jekyll drops
   every `_next/` directory and the site loads with no CSS or JS.
2. **`basePath` is `/bio`** (see `next.config.mjs`). Plain `<a href="/x">`
   anchors are *not* rewritten by Next — they 404 in production while working
   perfectly on localhost. Use the `lib/asset.ts` helper for static assets.

**Never run `git add -A` on `main`** — it has no `.gitignore`, so it will
happily commit `node_modules/`.

---

## Editing content

All résumé content lives in **one file** — `lib/content.ts` (profile,
experience, projects, education, certifications, awards, scores, origin,
about). Every mode and every detail page reads from it, so the content never
forks. One derived view:

- `lib/textContent.ts` — flattens the model into the text the Vim and k9s modes
  render.

Visual mode shows the curated subset (`featured: true` projects); Vim and k9s
show everything.

The downloadable résumé lives at **`public/resume.pdf`**.

---

## Project layout

```
app/
  page.tsx              # mode shell (Visual / Vim / k9s)
  experience/           # deep experience page
  projects/[slug]/      # per-project detail pages
  icon.svg              # favicon
components/
  visual/               # editorial sections + self-drawing technical plates
  vim/                  # Vim mode, colourscheme picker
  k9s/                  # k9s mode
lib/
  content.ts            # single source of truth
  textContent.ts        # text projection for Vim/k9s
  asset.ts              # basePath-aware asset URLs
  ModeContext.tsx       # active mode (persisted to localStorage)
```

---

## Scripts

| Command       | What it does                 |
| ------------- | ---------------------------- |
| `pnpm dev`    | Dev server at localhost:3000 |
| `pnpm build`  | Static export to `./out`     |
| `pnpm lint`   | Next.js / ESLint             |
