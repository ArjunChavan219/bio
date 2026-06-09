"use client";

import Link from "next/link";
import { experience, featuredProjects, about, profile } from "@/lib/content";
import Reveal from "./Reveal";

/** Shared section frame: amber eyebrow + Clash Display heading, reveal-on-scroll. */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="w-full px-6 py-10 sm:px-10 md:px-16">
      <div className="mx-auto w-full max-w-4xl rounded-2xl bg-space/45 p-7 ring-1 ring-white/10 backdrop-blur-sm md:p-10">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.34em] text-asignal">{eyebrow}</p>
          <h2 className="mb-12 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------ Experience ------------------------------- */

export function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="The track record" title="Experience">
      <div className="space-y-4">
        {experience.map((e, i) => (
          <Reveal key={e.id} delay={i * 80}>
            <Link
              href="/experience"
              className="group block border border-white/10 bg-white/[0.02] p-6 transition-all hover:border-asignal/50 hover:bg-white/[0.04]"
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-asignal">
                  {e.company}
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{e.location}</span>
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                {e.roles[0].title} · {e.roles[0].period}
              </p>
              <p className="mt-4 leading-[1.7] text-muted">{e.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {e.stack.slice(0, 5).map((s) => (
                  <span key={s} className="font-mono text-[11px] text-asignal/70">
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
          className="mt-8 inline-block border border-asignal/60 bg-asignal/15 px-6 py-3 font-display text-sm tracking-wide text-asignal transition-all hover:bg-asignal/25"
        >
          Full experience, certs & awards →
        </Link>
      </Reveal>
    </Section>
  );
}

/* -------------------------------- Projects ------------------------------- */

export function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Selected builds" title="Projects">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 70}>
            <Link
              href={`/projects/${p.id}`}
              className="group flex h-full flex-col border border-vsignal/30 bg-vsignal/[0.04] p-6 transition-all hover:border-asignal/60 hover:bg-vsignal/10"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] text-asignal/70">
                    [{t}]
                  </span>
                ))}
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-ink transition-colors group-hover:text-asignal">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{p.summary}</p>
              <span className="mt-4 inline-block font-mono text-xs text-asignal/0 transition-colors group-hover:text-asignal/70">
                Open →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="mt-6 font-mono text-xs text-muted">
          + more — academic, embedded & personal builds in the{" "}
          <span className="text-asignal/70">Vim / k9s</span> views (press <span className="text-ink/80">m</span>).
        </p>
      </Reveal>
    </Section>
  );
}

/* --------------------------------- About --------------------------------- */

export function AboutSection() {
  return (
    <Section id="about" eyebrow="Who I am" title="About">
      <div className="max-w-2xl space-y-6 text-lg leading-[1.7] text-muted">
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
  const items: [string, string, string][] = [
    ["Email", profile.links.email, `mailto:${profile.links.email}`],
    ["LinkedIn", profile.links.linkedinLabel, profile.links.linkedin],
    ["GitHub", profile.links.githubLabel, profile.links.github],
    ["Resume", "Download PDF", profile.links.resume],
  ];
  return (
    <Section id="contact" eyebrow="Reach me" title="Let's talk">
      <Reveal>
        <p className="mb-10 max-w-xl text-lg leading-[1.7] text-muted">
          Open to early-stage founding-engineer roles and senior IC roles shipping production software. The fastest way to reach me:
        </p>
      </Reveal>
      <Reveal delay={80}>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-white/10 bg-white/10 sm:grid-cols-2">
          {items.map(([label, value, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-1 bg-space px-6 py-6 transition-colors hover:bg-spaceLite"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-asignal/70">{label}</span>
              <span className="font-sans text-ink transition-colors group-hover:text-asignal">{value} ↗</span>
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
