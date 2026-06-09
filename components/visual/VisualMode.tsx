"use client";

/**
 * Visual mode — the polished, recruiter-facing GUI portfolio.
 * Type-led (no abstract 3D); the three-mode switch is the site's signature.
 * Kept deliberately short — each item links to its own page for depth.
 *
 * Flow: Hero → Experience (→ /experience) → Projects (→ /projects/[id]) →
 *       About → Contact.
 */

import dynamic from "next/dynamic";
import { profile, sections } from "@/lib/content";
import { ExperienceSection, ProjectsSection, AboutSection, ContactSection } from "./Sections";
import Stage from "./Stage";

// WebGL must not run during static prerender.
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10">
      <a href="#top" className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/80">
        {profile.name}
      </a>
      <div className="hidden gap-7 font-mono text-[11px] uppercase tracking-[0.28em] text-muted md:flex">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="transition-colors hover:text-ink">
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Background() {
  // CSS-only ambient field: deep space + two slow-drifting color orbs + faint
  // grid. Reliable (no WebGL), never reads "empty," cheap to render.
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
      <div className="absolute -left-40 -top-40 h-[60vh] w-[60vh] rounded-full bg-vsignal/20 blur-[120px] animate-drift-slow" />
      <div className="absolute -right-40 top-1/3 h-[55vh] w-[55vh] rounded-full bg-asignal/10 blur-[130px] animate-drift-slower" />
      {/* Scroll-morphing particle cloud + cursor parallax */}
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-space" />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="w-full px-6 sm:px-10 md:px-16">
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.34em] text-asignal animate-rise [animation-delay:0ms]">
        {profile.location}
      </p>
      <h1 className="font-display text-[clamp(2.6rem,10vw,8rem)] font-medium leading-[0.98] tracking-[-0.02em] text-ink animate-rise [animation-delay:80ms]">
        Software
        <br />
        <span className="text-asignal">Engineer</span>
      </h1>
      <p className="mt-8 max-w-xl font-sans text-lg leading-[1.7] text-muted animate-rise [animation-delay:160ms]">
        {profile.tagline}
      </p>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 animate-rise [animation-delay:240ms]">
        {profile.metrics.map((m) => (
          <div key={m.label}>
            <div className="font-display text-2xl font-semibold text-ink md:text-3xl">{m.value}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4 animate-rise [animation-delay:320ms]">
        <a
          href="#experience"
          className="border border-asignal/60 bg-asignal/15 px-6 py-3 font-display text-sm tracking-wide text-asignal transition-all hover:bg-asignal/25"
        >
          See the work →
        </a>
        <a
          href={profile.links.resume}
          className="border border-vsignal/40 bg-vsignal/10 px-6 py-3 font-display text-sm tracking-wide text-vsignal transition-all hover:bg-vsignal/20"
        >
          Resume
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-2 py-3 font-mono text-xs text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          GitHub ↗
        </a>
      </div>

      <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.28em] text-muted/60 animate-rise [animation-delay:420ms]">
        Press <span className="text-ink/80">m</span> for the Vim / k9s view ↘
      </p>
    </section>
  );
}

export default function VisualMode() {
  return (
    <main className="relative text-ink">
      <Background />
      <Nav />
      <Stage>
        <Hero />
      </Stage>
      <Stage>
        <ExperienceSection />
      </Stage>
      <Stage>
        <ProjectsSection />
      </Stage>
      <Stage>
        <AboutSection />
      </Stage>
      <Stage>
        <ContactSection />
      </Stage>
      <footer className="border-t border-white/5 px-6 py-12 text-center font-mono text-xs tracking-wide text-muted md:px-12">
        Built with intention. Shipped with care.
      </footer>
    </main>
  );
}
