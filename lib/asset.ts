/**
 * basePath-aware URL for files served straight out of `public/`.
 *
 * The site deploys to https://arjunchavan219.github.io/bio/, so next.config
 * sets `basePath: '/bio'` in prod. Next rewrites `next/link` hrefs and its own
 * asset URLs, but a plain `<a href="/resume.pdf">` is left untouched — it
 * resolves to the domain root and 404s live while working fine on localhost.
 *
 * Any absolute path to a public/ asset must go through this.
 */

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
