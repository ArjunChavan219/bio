"use client";

import Link from "next/link";
import { experience, featuredProjects, about, profile } from "@/lib/content";
import Reveal from "./Reveal";

/**
 * Section accents draw on the classification palette (blue = perp, yellow =
 * victim, red = threat) so each section carries a distinct colour without the
 * page turning loud. The hero's numbered index (VisualMode) uses the same map.
 * Class strings are written out in full so Tailwind keeps them.
 */
export type Accent = "perp" | "victim" | "threat";
export const SECTION_ACCENT: Record<string, Accent> = {
  experience: "perp",
  projects: "victim",
  about: "threat",
  contact: "perp",
};
const A: Record<
  Accent,
  { eyebrow: string; hover: string; tag: string; border: string; btn: string; num: string }
> = {
  perp: {
    eyebrow: "text-perp",
    hover: "group-hover:text-perp",
    tag: "text-perp/70",
    border: "hover:border-perp/50",
    btn: "border-perp/60 bg-perp/15 text-perp hover:bg-perp/25",
    num: "text-perp",
  },
  victim: {
    eyebrow: "text-victim",
    hover: "group-hover:text-victim",
    tag: "text-victim/70",
    border: "hover:border-victim/50",
    btn: "border-victim/60 bg-victim/15 text-victim hover:bg-victim/25",
    num: "text-victim",
  },
  threat: {
    eyebrow: "text-threat",
    hover: "group-hover:text-threat",
    tag: "text-threat/70",
    border: "hover:border-threat/50",
    btn: "border-threat/60 bg-threat/15 text-threat hover:bg-threat/25",
    num: "text-threat",
  },
};

/** Shared section frame: accent eyebrow + Fraunces heading, reveal-on-scroll. */
function Section({
  id,
  eyebrow,
  title,
  accent,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  accent: Accent;
  children: React.ReactNode;
}) {
  return (
    // One screen per section, snapped, with the panel floated in the middle so
    // there is real air above and below it.
    <section
      id={id}
      className="flex min-h-screen w-full snap-start items-center px-6 pb-16 pt-24 sm:px-10 md:px-16"
    >
      {/* Panels sit over the live topology; the backdrop-blur + /75 fill keep
          body copy legible over whatever is running behind. */}
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-space/55 p-6 ring-1 ring-ink/10 backdrop-blur-[2px] md:p-9">
        <Reveal>
          <p className={`mb-2 font-mono text-[11px] uppercase tracking-[0.34em] ${A[accent].eyebrow}`}>{eyebrow}</p>
          <h2 className="mb-7 inline-block font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------ Experience ------------------------------- */

export function ExperienceSection() {
  const a = A.perp;
  return (
    <Section id="experience" eyebrow="The track record" title="Experience" accent="perp">
      <div className="space-y-3">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 80}>
            <Link
              href="/experience"
              className={`group block border border-ink/10 bg-spaceLite/45 p-5 transition-all ${a.border} hover:bg-spaceLite/70`}
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className={`font-display text-xl font-medium text-ink transition-colors md:text-2xl ${a.hover}`}>
                  {e.company}
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{e.location}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                {e.roles[0].title} · {e.roles[0].period}
              </p>
              <p className="mt-3 text-[15px] leading-[1.6] text-muted">{e.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {e.stack.slice(0, 5).map((s) => (
                  <span key={s} className={`font-mono text-[11px] ${a.tag}`}>
                    [{s}]
                  </span>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <Link
          href="/experience"
          className={`mt-6 inline-block border px-6 py-2.5 font-sans text-sm tracking-wide transition-all ${a.btn}`}
        >
          Full experience, certs & awards →
        </Link>
      </Reveal>
    </Section>
  );
}

/* -------------------------------- Projects ------------------------------- */

export function ProjectsSection() {
  const a = A.victim;
  return (
    <Section id="projects" eyebrow="Selected builds" title="Projects" accent="victim">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <Link
              href={`/projects/${p.id}`}
              className={`group flex h-full flex-col border border-ink/10 bg-spaceLite/45 p-5 transition-all ${a.border} hover:bg-spaceLite/70`}
            >
              <div className="mb-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className={`font-mono text-[10px] ${a.tag}`}>
                    [{t}]
                  </span>
                ))}
              </div>
              <h3 className={`mb-2 font-display text-lg font-semibold text-ink transition-colors md:text-xl ${a.hover}`}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{p.summary}</p>
              <span className={`mt-3 inline-block font-mono text-xs text-transparent transition-colors ${a.hover}`}>
                Open →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="mt-5 font-mono text-xs text-muted">
          + more — academic, embedded & personal builds in the{" "}
          <span className={a.tag}>Vim / k9s</span> views (press <span className="text-ink/80">m</span>).
        </p>
      </Reveal>
    </Section>
  );
}

/* --------------------------------- About --------------------------------- */

export function AboutSection() {
  return (
    <Section id="about" eyebrow="Who I am" title="About" accent="threat">
      <div className="max-w-2xl space-y-5 text-[17px] leading-[1.65] text-muted">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 80} as="div">
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- Contact -------------------------------- */

export function ContactSection() {
  const a = A.perp;
  const items: [string, string, string][] = [
    ["Email", profile.links.email, `mailto:${profile.links.email}`],
    ["LinkedIn", profile.links.linkedinLabel, profile.links.linkedin],
    ["GitHub", profile.links.githubLabel, profile.links.github],
    ["Resume", "Download PDF", profile.links.resume],
  ];
  return (
    <Section id="contact" eyebrow="Reach me" title="Let's talk" accent="perp">
      <Reveal>
        <p className="mb-8 max-w-xl text-[17px] leading-[1.65] text-muted">
          Open to early-stage founding-engineer roles and senior IC roles shipping production software. The fastest way to reach me:
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {items.map(([label, value, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-1 bg-spaceLite/55 px-6 py-5 transition-colors hover:bg-spaceLite"
            >
              <span className={`font-mono text-[10px] uppercase tracking-[0.24em] ${a.tag}`}>{label}</span>
              <span className={`font-sans text-ink transition-colors ${a.hover}`}>{value} ↗</span>
            </a>
          ))}
        </div>
      </Reveal>
      {/* The footer lives inside the last panel — a separate block after it
          would be a screen with nothing on it under mandatory snapping. */}
      <Reveal delay={140}>
        <p className="mt-8 border-t border-ink/10 pt-5 text-center font-mono text-[11px] tracking-wide text-muted/70">
          Built with intention. Shipped with care.
        </p>
      </Reveal>
    </Section>
  );
}
