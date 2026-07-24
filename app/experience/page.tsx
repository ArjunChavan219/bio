import Link from "next/link";
import type { Metadata } from "next";
import { experience, education, awards, certifications, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experience — Arjun Chavan",
  description: "Full career detail: Strategy, Cimpress, and Johns Hopkins.",
};

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen bg-space text-ink">
      {/* Ambient background, matching the home Visual mode */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
        <div className="absolute -left-40 -top-40 h-[55vh] w-[55vh] rounded-full bg-perp/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/2 h-[50vh] w-[50vh] rounded-full bg-victim/10 blur-[130px]" />
      </div>

      <nav className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted transition-colors hover:text-ink">
          ← {profile.name}
        </Link>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-asignal">Experience</span>
      </nav>

      <header className="px-6 pb-12 pt-10 sm:px-10 md:px-16">
        <h1 className="font-display text-[clamp(2.4rem,8vw,5rem)] font-medium leading-[1.0] tracking-[-0.02em]">
          The track record
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-[1.7] text-muted">
          Four-plus years shipping production software — applied AI and full-stack systems at scale, from Mumbai to Tysons Corner.
        </p>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-24 sm:px-10 md:px-16">
        {experience.map((e) => (
          <section key={e.id} className="border-t border-ink/10 py-14">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
              <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">{e.company}</h2>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{e.location}</span>
            </div>

            <div className="mt-4 flex flex-col gap-1">
              {e.roles.map((r) => (
                <div key={r.title} className="flex items-baseline justify-between border-l-2 border-asignal/40 pl-4">
                  <span className="font-sans text-ink">{r.title}</span>
                  <span className="font-mono text-xs text-muted">{r.period}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-2xl leading-[1.7] text-muted">{e.summary}</p>

            <ul className="mt-6 space-y-3">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-3 leading-[1.7] text-muted">
                  <span className="mt-1 text-asignal">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              {e.accolades.map((a) => (
                <p key={a} className="flex gap-3 leading-[1.7] text-ink/90">
                  <span className="mt-0.5 text-asignal">★</span>
                  <span>{a}</span>
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {e.stack.map((s) => (
                <span key={s} className="border border-ink/15 px-2 py-1 font-mono text-[11px] text-muted">
                  {s}
                </span>
              ))}
            </div>
          </section>
        ))}

        <section className="border-t border-ink/10 py-14">
          <h2 className="mb-8 font-display text-3xl font-medium text-ink md:text-4xl">Education</h2>
          <div className="space-y-8">
            {education.map((ed) => (
              <div key={ed.id} className="border-l-2 border-asignal/40 pl-4">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                  <span className="font-display text-xl text-ink">{ed.degree}</span>
                  <span className="font-mono text-xs text-muted">{ed.period}</span>
                </div>
                <p className="mt-1 text-muted">{ed.school}</p>
                <p className="mt-2 text-sm leading-[1.7] text-muted">{ed.detail}</p>
                {ed.notes.map((n) => (
                  <p key={n} className="mt-1 text-sm leading-[1.7] text-muted/80">
                    · {n}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-ink/10 py-14">
          <h2 className="mb-8 font-display text-3xl font-medium text-ink md:text-4xl">Awards & Recognition</h2>
          <div className="space-y-4">
            {awards.map((a) => (
              <div key={a.text} className="flex gap-5 border-l-2 border-asignal/40 pl-4">
                <span className="font-mono text-sm text-asignal">{a.year}</span>
                <span className="leading-[1.6] text-muted">{a.text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-ink/10 py-14">
          <h2 className="mb-8 font-display text-3xl font-medium text-ink md:text-4xl">Certifications</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.name} className="flex flex-col">
                <span className="leading-snug text-ink/90">{c.name}</span>
                <span className="font-mono text-xs text-muted">
                  {c.issuer} · {c.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-ink/10 pt-10">
          <Link
            href="/#contact"
            className="inline-block border border-asignal/60 bg-asignal/15 px-6 py-3 font-display text-sm tracking-wide text-asignal transition-all hover:bg-asignal/25"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
