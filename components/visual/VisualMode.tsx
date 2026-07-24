"use client";

/**
 * Visual mode — the polished, recruiter-facing GUI portfolio.
 *
 * A printed page: warm stock, ink type, a big serif statement and a numbered
 * contents index, over a technical plate of the system Arjun builds (see
 * SystemPlate) that draws itself and then runs. Vim and k9s are dark terminals,
 * so the three-mode switch reads as the document versus the machine — that is
 * the site's real signature, and this is its front door.
 *
 * The page is a deck: every section is exactly one screen and CSS scroll-snap
 * (see globals.css) makes a flick land on the next one. The nav carries the
 * section list so nothing is more than one click away.
 *
 * Flow: Hero → Experience (→ /experience) → Projects (→ /projects/[id]) →
 *       About → Contact.
 */

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { profile, sections } from "@/lib/content";
import {
  ExperienceSection,
  ProjectsSection,
  AboutSection,
  ContactSection,
  SECTION_ACCENT,
  type Accent,
} from "./Sections";

// Canvas + window measurement must not run during static prerender.
const SystemPlate = dynamic(() => import("./SystemPlate"), { ssr: false });

// Literal classes (Tailwind-safe) for the index numbers / hover per accent.
const NUM: Record<Accent, string> = {
  perp: "text-perp",
  victim: "text-victim",
  threat: "text-threat",
};
const HOVER: Record<Accent, string> = {
  perp: "group-hover:text-perp",
  victim: "group-hover:text-victim",
  threat: "group-hover:text-threat",
};

/**
 * Which section owns the viewport right now. Each panel is a full screen, so
 * "most visible wins" is unambiguous — and it keeps the nav in sync whether you
 * got there by click, keyboard, or a flick of the trackpad.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
        let best = ids[0];
        let bestRatio = 0;
        ratios.forEach((r, id) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });
        if (bestRatio > 0) setActive(best);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const NAV_IDS = ["top", ...sections.map((s) => s.id)];

function Nav({ active }: { active: string }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 bg-gradient-to-b from-space via-space/80 to-transparent px-6 py-4 font-mono sm:px-10">
      {/* The wordmark is redundant on a phone — the hero says the name at 3rem
          two lines down — and the four section links need the width. */}
      <a
        href="#top"
        className={`hidden shrink-0 text-[11px] uppercase tracking-[0.3em] transition-colors sm:block ${
          active === "top" ? "text-ink" : "text-ink/70 hover:text-ink"
        }`}
      >
        {profile.name}
      </a>

      {/* Section links — the whole site is one click away from anywhere. */}
      <ul className="no-scrollbar flex items-center gap-3 overflow-x-auto text-[9px] uppercase tracking-[0.14em] sm:gap-6 sm:text-[11px] sm:tracking-[0.26em]">
        {sections.map((s, i) => {
          const acc = SECTION_ACCENT[s.id] as Accent;
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                className={`group flex items-baseline gap-1.5 whitespace-nowrap transition-colors ${
                  on ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`text-[9px] ${on ? NUM[acc] : "text-muted/50"} transition-colors`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Background({ figure }: { figure: number }) {
  // The plate the page is printed on, plus the light falling across it.
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-space">
      {/* the light source — the page is stock, not a flat fill */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 6%, rgba(43,90,166,0.10) 0%, transparent 58%), radial-gradient(90% 70% at 6% 100%, rgba(255,255,255,0.85) 0%, transparent 55%)",
        }}
      />
      <SystemPlate figure={figure} />
      {/* Left scrim so the statement always sits on clean stock. */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-space via-space/70 to-transparent" />
    </div>
  );
}

function Hero() {
  // One screen, no more: the statement is clamped against viewport *height* as
  // well as width, so a wide-but-short window can't push the CTAs off the fold.
  return (
    <section
      id="top"
      className="relative flex min-h-screen snap-start flex-col justify-center px-6 pb-16 pt-24 sm:px-10 sm:pb-20 md:px-16"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        {/* the statement */}
        <div className="md:col-span-8">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.34em] text-threat animate-rise [animation-delay:0ms]">
            {profile.location}
          </p>
          <h1 className="font-display font-medium leading-[0.9] tracking-[-0.02em] text-ink animate-rise [animation-delay:80ms] text-[clamp(2.6rem,min(8.5vw,13vh),7rem)]">
            Software
            <br />
            Engineer
            <span className="align-super text-[0.3em] text-threat">®</span>
          </h1>
          <div className="mt-6 h-px w-24 bg-threat animate-rise [animation-delay:140ms]" />
          <p className="mt-6 max-w-xl font-sans leading-[1.65] text-muted animate-rise [animation-delay:200ms] text-[clamp(0.95rem,1.6vh,1.125rem)]">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 animate-rise [animation-delay:280ms]">
            {profile.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-2xl font-semibold text-ink md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 animate-rise [animation-delay:360ms]">
            <a
              href="#experience"
              className="bg-ink px-7 py-3 font-sans text-sm font-medium tracking-wide text-space transition-opacity hover:opacity-90"
            >
              See the work →
            </a>
            <a
              href={profile.links.resume}
              className="border border-ink/25 px-7 py-3 font-sans text-sm tracking-wide text-ink transition-colors hover:border-ink"
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
        </div>

        {/* Contents index — desktop only; on phones the nav carries the sections.
            It gets the same translucent stock panel the sections use, because it
            sits directly over the densest part of the plate. */}
        <nav className="hidden font-mono md:col-span-4 md:block animate-rise [animation-delay:320ms]">
          {/* Nearly opaque, unlike the section panels: this one is navigation and
              it sits over the densest corner of the plate, where a translucent
              fill let node labels run straight through the section names. */}
          <div className="rounded-2xl bg-space/90 p-5 ring-1 ring-ink/10 backdrop-blur-[3px]">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted">
              Index
            </p>
            <ul>
              {sections.map((s, i) => {
                const acc = SECTION_ACCENT[s.id] as Accent;
                return (
                  <li
                    key={s.id}
                    className="border-t border-ink/10 last:border-b"
                  >
                    <a
                      href={`#${s.id}`}
                      className="group flex items-baseline gap-4 py-3"
                    >
                      <span className={`text-xs ${NUM[acc]}`}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span
                          className={`block font-display text-xl text-ink transition-colors lg:text-2xl ${HOVER[acc]}`}
                        >
                          {s.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted">
                          {s.hint}
                        </span>
                      </span>
                      <span className="text-muted transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Pinned to the fold, not stacked below it — the hint is only useful if
          it is on the first screen. */}
      <p className="pointer-events-none absolute inset-x-0 bottom-5 hidden px-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted/60 animate-rise [animation-delay:440ms] sm:block sm:px-10 md:px-16">
        Press <span className="text-ink/80">m</span> for the Vim / k9s view ↘
      </p>
    </section>
  );
}

export default function VisualMode() {
  const active = useActiveSection(NAV_IDS);
  // One figure per section, in page order — the snap is what triggers a redraw.
  const figure = Math.max(0, NAV_IDS.indexOf(active));
  return (
    <main className="relative text-ink">
      <Background figure={figure} />
      <Nav active={active} />
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
