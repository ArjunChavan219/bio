/**
 * Hero — the scroll-region copy that rides over the fixed 3D canvas.
 * Three full-viewport sections (must total HERO_PAGES screens in SignalsExperience).
 * Transparent backgrounds so the Signals canvas shows through; the camera is
 * driven by window scroll, so scrolling here flies the journey.
 */
"use client";

import { useEffect, useState } from "react";

const shadow = "[text-shadow:0_2px_40px_rgba(11,7,23,0.85)]";

function Nav() {
  // Transparent over the 3D hero; gains a blurred backdrop once the editorial
  // content scrolls up underneath, so its labels never cross over body text.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-7 transition-colors duration-300 sm:px-12 ${
        scrolled ? "border-b border-white/[0.06] bg-space/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-ink/80">Arjun Chavan</span>
      <div className="pointer-events-auto flex gap-8 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
        <a href="#work" className="transition-colors hover:text-ink">Work</a>
        <a href="#about" className="transition-colors hover:text-ink">About</a>
        <a href="#contact" className="transition-colors hover:text-ink">Contact</a>
      </div>
    </nav>
  );
}

export default function Hero() {
  return (
    <>
      <Nav />
      <div className="relative z-10 w-full text-ink">
        <section className="flex h-screen flex-col justify-center px-6 sm:px-12 md:px-20">
          <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.34em] text-asignal">signal acquired</p>
          <h1 className={`font-display text-[clamp(3rem,10vw,8rem)] font-medium leading-[1.05] tracking-[-0.01em] ${shadow}`}>
            Applied <span className="text-asignal">AI</span>
            <br />
            Engineer
          </h1>
          <p className="mt-9 max-w-xl font-sans text-lg leading-[1.7] text-muted">
            I build production LLM systems — multi-agent orchestration, retrieval,
            and the infrastructure that keeps them reliable at scale.
          </p>
          <div className="mt-11 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[11px] tracking-[0.2em] text-muted">
            <span><span className="text-ink">2M+</span>&nbsp; queries / day</span>
            <span><span className="text-ink">multi-agent</span>&nbsp; workflows</span>
            <span><span className="text-ink">RAG</span>&nbsp; + evals</span>
            <span className="text-ink">AWS · GCP · Azure</span>
          </div>
          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.34em] text-muted/70">scroll to follow the signal ↓</p>
        </section>

        <section className="flex h-screen items-center justify-end px-6 sm:px-12 md:px-20">
          <div className="max-w-md text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-vsignal">the route</p>
            <h2 className={`mt-6 font-display text-[clamp(2rem,5vw,3.6rem)] font-medium leading-[1.15] tracking-[-0.01em] ${shadow}`}>
              Mumbai → Baltimore → Tysons.
            </h2>
            <p className="mt-6 font-sans leading-[1.7] text-muted">
              A master&apos;s at Johns Hopkins, then building enterprise AI at Strategy.
              The same line that traces a move across the world traces a system routing
              signals.
            </p>
          </div>
        </section>

        <section className="flex h-screen flex-col justify-center px-6 sm:px-12 md:px-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-asignal">the coast — next</p>
          <h2 className={`mt-6 max-w-3xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-medium leading-[1.08] tracking-[-0.01em] ${shadow}`}>
            The signal&apos;s still moving.
          </h2>
          <p className="mt-7 max-w-lg font-sans text-lg leading-[1.7] text-muted">
            Selected work, the full story, and how to reach me — just below.
          </p>
          <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.34em] text-muted/70">keep scrolling ↓</p>
        </section>
      </div>
    </>
  );
}
