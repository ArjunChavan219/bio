# Arjun Chavan — Portfolio

A personal portfolio with three switchable "modes" of the same content:

- **Visual** — the polished GUI portfolio: a scroll-pinned, type-led site with a
  continuous particle cloud that morphs shape per section (sphere → helix →
  lattice → wave → ring) and reacts to the cursor.
- **Vim** — navigate the full résumé like a Vim buffer (`j/k`, `:commands`).
- **k9s** — browse it like a k9s TUI dashboard (resource table, `:` command bar).

Switch modes with the pill (bottom-right) or press **`m`** in Visual mode.

Built with **Next.js 14 (App Router, static export)**, **React**, **Tailwind CSS**,
and **React Three Fiber / three.js** for the particle background.

---

## Run it on another machine

### Prerequisites

- **Node.js ≥ 18.17** (Next.js 14 requirement) — check with `node --version`
- **pnpm** (this repo uses a `pnpm-lock.yaml`). Install once with either:
  ```bash
  corepack enable    # ships with Node 16.10+, no extra install
  # — or —
  npm install -g pnpm
  ```

### Setup

```bash
git clone <repo-url> bio
cd bio
pnpm install
```

### Develop

```bash
pnpm dev
```

Open **http://localhost:3000**. Hot-reload is on; edit and save.

### Production build / static export

The site is a fully static export (no server needed to host it).

```bash
pnpm build        # outputs static files to ./out
```

Serve `./out/` with any static file server to preview the production build, e.g.:

```bash
npx serve out
```

> **Note:** don't run `pnpm build` while `pnpm dev` is running — it can corrupt
> the `.next` cache. Stop the dev server first.

### Deploy to GitHub Pages

The repo is configured for GitHub Pages served from `/bio` (see `basePath` in
`next.config.mjs`). To regenerate the published `docs/` folder:

```bash
pnpm deploy:docs   # builds, adds .nojekyll, and copies out/ → docs/
```

Then commit `docs/` and point GitHub Pages at the `docs/` folder on your default
branch.

---

## Editing content

All résumé content lives in **one file** — `lib/content.ts` (profile, experience,
projects, education, certifications, awards, scores, origin, about). Every mode and
every detail page reads from it, so content never forks. Two derived views:

- `lib/textContent.ts` — flattens the model into the text the Vim/k9s modes render.
- Visual mode shows the curated subset (`featured: true` projects); Vim/k9s show
  everything.

To add a real downloadable résumé, drop a PDF at **`public/resume.pdf`** (the
"Resume" buttons link to it).

---

## Project layout

```
app/
  page.tsx              # mode shell (Visual / Vim / k9s)
  experience/           # dedicated deep experience page
  projects/[slug]/      # per-project detail pages
components/
  visual/               # Visual mode: hero, sections, particle field, pin stages
  vim/                  # Vim mode
  k9s/                  # k9s mode
lib/
  content.ts            # single source of truth for all content
  textContent.ts        # text projection for Vim/k9s
  ModeContext.tsx       # which mode is active (persisted)
```

---

## Scripts

| Command            | What it does                              |
| ------------------ | ----------------------------------------- |
| `pnpm dev`         | Dev server at localhost:3000              |
| `pnpm build`       | Static export to `./out`                  |
| `pnpm deploy:docs` | Build + copy to `./docs` for GitHub Pages |
| `pnpm lint`        | Next.js / ESLint                          |
