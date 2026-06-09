"use client";

/**
 * Interactive ambient background for Visual mode.
 * A dense dot-grid drawn on canvas: dots carry a slow ambient wave so the field
 * breathes on its own, and brighten + scale + warm toward amber within a radius
 * of the cursor — a soft spotlight that follows the pointer. Dense and reactive,
 * so it reads as intentional rather than the sparse starmap we dropped.
 * Honors reduced-motion (renders a single static frame).
 */

import { useEffect, useRef } from "react";

const GAP = 40; // px between dots
const RADIUS = 170; // cursor influence radius

export default function InteractiveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let t = 0;
    let raf = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const dot = (x: number, y: number, force: number, ambient: number) => {
      const a = Math.min(0.85, 0.05 + ambient * 0.06 + force * 0.7);
      const r = 1 + force * 2.1;
      // base muted violet → warms to amber as force (cursor proximity) rises
      const cr = Math.round(150 + force * 95);
      const cg = Math.round(140 + force * 40);
      const cb = Math.round(200 - force * 130);
      ctx.fillStyle = `rgba(${cr},${cg},${cb},${a})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = () => {
      t += 0.006;
      ptr.x += (ptr.tx - ptr.x) * 0.09;
      ptr.y += (ptr.ty - ptr.y) * 0.09;
      ctx.clearRect(0, 0, w, h);

      // soft glow under the cursor for extra depth
      if (ptr.x > -9000) {
        const g = ctx.createRadialGradient(ptr.x, ptr.y, 0, ptr.x, ptr.y, RADIUS * 1.4);
        g.addColorStop(0, "rgba(245,181,68,0.06)");
        g.addColorStop(1, "rgba(245,181,68,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const ambient = Math.sin(x * 0.012 + y * 0.014 + t * 2) * 0.5 + 0.5;
          const d = Math.hypot(x - ptr.x, y - ptr.y);
          const force = d < RADIUS ? Math.pow(1 - d / RADIUS, 1.6) : 0;
          dot(x, y, force, ambient);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) dot(x, y, 0, 0.5);
      }
    };

    const onMove = (e: PointerEvent) => {
      ptr.tx = e.clientX;
      ptr.ty = e.clientY;
    };
    const onLeave = () => {
      ptr.tx = -9999;
      ptr.ty = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      staticFrame();
    } else {
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
