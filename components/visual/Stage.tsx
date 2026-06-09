"use client";

/**
 * Scroll-pin track. The wrapper is taller than the viewport; the inner panel is
 * `sticky top-0`, so as you scroll through the track the content (and the fixed
 * particle background behind it) stays put — "stuck for a bit" — before the next
 * stage scrolls in. Each Stage carries a `data-stage` marker that ParticleField
 * reads to hold the morph on this section's shape while it's pinned.
 *
 * Track height ≈ 160vh → ~60vh of dwell. Content must fit one viewport to pin
 * cleanly (panels are designed compact for that reason).
 */

export default function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div data-stage className="relative h-[160vh]">
      <div className="sticky top-0 flex min-h-screen w-full items-center">{children}</div>
    </div>
  );
}
