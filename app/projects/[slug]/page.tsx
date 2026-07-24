import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, profile } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.id === params.slug);
  return p
    ? { title: `${p.title} — Arjun Chavan`, description: p.summary }
    : { title: "Project — Arjun Chavan" };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const p = projects.find((x) => x.id === params.slug);
  if (!p) notFound();

  const blocks: [string, string][] = [
    ["The problem", p.problem],
    ["What I built", p.whatYouBuilt],
    ["Key decisions", p.keyDecisions],
  ];

  return (
    <main className="relative min-h-screen bg-space text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
        <div className="absolute -left-40 -top-40 h-[55vh] w-[55vh] rounded-full bg-perp/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[50vh] w-[50vh] rounded-full bg-victim/10 blur-[130px]" />
      </div>

      <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/#projects" className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-ink">
          ← Projects
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-asignal">{profile.name}</span>
      </nav>

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:px-10">
        <div className="mb-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] text-asignal/80">
              [{t}]
            </span>
          ))}
          <span className="font-mono text-[11px] text-muted">· {p.year}</span>
        </div>

        <h1 className="font-display text-[clamp(2.2rem,7vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.02em]">
          {p.title}
        </h1>
        {p.oneLiner && <p className="mt-6 max-w-2xl text-xl leading-[1.6] text-muted">{p.oneLiner}</p>}

        {p.stack && (
          <div className="mt-8 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="border border-ink/15 px-2 py-1 font-mono text-[11px] text-muted">
                {s}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-10">
          {blocks.map(([h, body]) => (
            <section key={h}>
              <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-asignal">{h}</h2>
              <p className="leading-[1.8] text-muted">{body}</p>
            </section>
          ))}

          {p.architecture && (
            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-asignal">The architecture</h2>
              <ul className="space-y-4">
                {p.architecture.map((a) => (
                  <li key={a.head} className="leading-[1.8] text-muted">
                    <span className="text-ink">{a.head}</span> — {a.body}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.decisions && (
            <section>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-asignal">Decisions that mattered</h2>
              <ul className="space-y-3">
                {p.decisions.map((d) => (
                  <li key={d} className="flex gap-3 leading-[1.8] text-muted">
                    <span className="mt-1 text-asignal">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="border-t border-ink/10 pt-6">
            <p className="italic leading-[1.8] text-muted">{p.whatItShows}</p>
          </section>
        </div>

        {p.links && (
          <div className="mt-10 flex flex-wrap gap-4">
            {p.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-asignal/60 bg-asignal/15 px-6 py-3 font-display text-sm tracking-wide text-asignal transition-all hover:bg-asignal/25"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
