"use client";

/**
 * SystemPlate — the site's backdrop.
 *
 * The system Arjun builds, drawn the way a technical plate is drawn in print:
 * orthogonal hairline routing, dashed group boundaries, measurement ticks,
 * small-caps labels, annotation callouts with leader lines, a figure caption
 * and a scale rule. It draws ITSELF on arrival — ink laying down along the
 * polylines, nodes arriving with a ring — and then settles, traffic running the
 * lines.
 *
 * It is section-reactive: each section of the page is a different figure, and
 * the redraw is the event. The page snaps one screen at a time, so every snap
 * gets a plate laying itself down.
 *
 *   FIG. 01  REQUEST PATH — the production stack, ingress → K8s → data
 *   FIG. 02  TIMELINE     — 2021 › 2026
 *   FIG. 03  RETRIEVAL    — the RAG path
 *   FIG. 04  DELIVERY     — commit → canary → prod
 *   FIG. 05  CHANNELS     — how to reach him
 *
 * Decorative and pointer-events-none; all meaning is also in the text.
 */

import { useEffect, useRef } from "react";

/* Paper palette — kept literal so the canvas never has to read CSS vars. */
const INK = "22,24,29";
const ACCENT = ["#C0392B", "#2B5AA6", "#B07D18"] as const; // threat · perp · victim
const ink = (a: number) => `rgba(${INK},${a})`;
const hexA = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

type Pt = [number, number];
type Kind = "dot" | "box" | "ring" | "store" | "pod";

interface PNode {
  p: Pt;
  label?: string;
  kind?: Kind;
  accent?: number;
  /** pod replica count — draws a stacked card behind the box */
  reps?: number;
}
interface PEdge {
  pts: Pt[];
  accent?: number;
  dashed?: boolean;
}
interface PGroup {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  accent?: number;
}
interface PNote {
  /** where the leader line points */
  at: Pt;
  /** where the text sits */
  to: Pt;
  text: string;
  accent?: number;
}
interface Plate {
  fig: string;
  title: string;
  groups?: PGroup[];
  nodes: PNode[];
  edges: PEdge[];
  ticks?: { x: number; label: string }[];
  notes?: PNote[];
}

/** elbow route: out, one turn, in — the reason it reads as a diagram */
const el = (a: Pt, b: Pt, at = 0.5): Pt[] => {
  const mx = a[0] + (b[0] - a[0]) * at;
  return Math.abs(a[1] - b[1]) < 0.001 ? [a, b] : [a, [mx, a[1]], [mx, b[1]], b];
};

/* ------------------------------------------------------------------ FIG 01 */
const browser: Pt = [0.02, 0.5];
const ingress: Pt = [0.14, 0.5];
const gateway: Pt = [0.3, 0.28];
const auth: Pt = [0.3, 0.62];
const router: Pt = [0.42, 0.45];
const orch: Pt = [0.55, 0.25];
const retr: Pt = [0.55, 0.66];
const vllm: Pt = [0.7, 0.16];
const embed: Pt = [0.7, 0.44];
const otel: Pt = [0.42, 0.88];
const redis: Pt = [0.9, 0.2];
const qdrant: Pt = [0.9, 0.5];
const pg: Pt = [0.9, 0.72];
const tf: Pt = [0.12, 0.88];

const FIG_01: Plate = {
  fig: "FIG. 01",
  title: "REQUEST PATH — PRODUCTION",
  groups: [
    { x: 0.24, y: 0.06, w: 0.54, h: 0.72, label: "KUBERNETES · GKE / AZURE" },
    { x: 0.64, y: 0.07, w: 0.12, h: 0.19, label: "NODE POOL · GPU", accent: 0 },
  ],
  nodes: [
    { p: browser, label: "CLIENT", kind: "ring" },
    { p: ingress, label: "INGRESS · nginx", kind: "box" },
    { p: gateway, label: "svc/gateway", kind: "pod", reps: 3 },
    { p: auth, label: "svc/auth", kind: "pod", reps: 2 },
    { p: router, label: "svc/router", kind: "pod", reps: 3, accent: 1 },
    { p: orch, label: "svc/orchestrator", kind: "pod", reps: 3 },
    { p: retr, label: "svc/retriever", kind: "pod", reps: 2 },
    { p: vllm, label: "vllm", kind: "pod", reps: 2, accent: 0 },
    { p: embed, label: "svc/embed", kind: "pod", reps: 2 },
    { p: otel, label: "otel-collector", kind: "box" },
    { p: redis, label: "REDIS", kind: "store" },
    { p: qdrant, label: "QDRANT", kind: "store", accent: 2 },
    { p: pg, label: "POSTGRES", kind: "store" },
    { p: tf, label: "TERRAFORM · CI/CD", kind: "box" },
  ],
  edges: [
    { pts: el(browser, ingress) },
    { pts: el(ingress, gateway, 0.55) },
    { pts: el(ingress, auth, 0.55) },
    { pts: el(gateway, router, 0.5), accent: 1 },
    { pts: el(auth, router, 0.5) },
    { pts: el(router, orch, 0.5), accent: 1 },
    { pts: el(router, retr, 0.5) },
    { pts: el(orch, vllm, 0.5), accent: 0 },
    { pts: el(orch, embed, 0.5) },
    { pts: el(orch, redis, 0.35), dashed: true },
    { pts: el(embed, qdrant, 0.5) },
    { pts: el(retr, qdrant, 0.6), accent: 2 },
    { pts: el(retr, pg, 0.6) },
    { pts: el(orch, otel, 0.2), dashed: true },
    { pts: el(retr, otel, 0.3), dashed: true },
    { pts: el(tf, [0.24, 0.78], 0.6), dashed: true },
  ],
  notes: [
    { at: vllm, to: [0.62, 0.02], text: "2M+ LLM QUERIES / DAY", accent: 0 },
    { at: [0.22, 0.28], to: [0.02, 0.16], text: "5M+ REQUESTS / DAY" },
    { at: router, to: [0.3, 0.98], text: "MULTI-PROVIDER ROUTING · −$50K / YR", accent: 1 },
    { at: orch, to: [0.55, 0.02], text: "HPA · AUTOSCALED" },
  ],
};

/* ------------------------------------------------------------------ FIG 02 */
const FIG_02: Plate = {
  fig: "FIG. 02",
  title: "TIMELINE — 2021 › 2026",
  nodes: [
    { p: [0.14, 0.5], label: "CIMPRESS", kind: "box" },
    { p: [0.32, 0.5], label: "DEVOPS", kind: "dot" },
    { p: [0.52, 0.5], label: "JHU · MSCS", kind: "box", accent: 1 },
    { p: [0.68, 0.5], label: "STRATEGY", kind: "box" },
    { p: [0.86, 0.5], label: "SWE 2", kind: "ring", accent: 0 },
  ],
  edges: [
    { pts: [[0.06, 0.5], [0.94, 0.5]] },
    { pts: el([0.14, 0.5], [0.2, 0.26], 0.5), dashed: true },
    { pts: el([0.52, 0.5], [0.46, 0.76], 0.5), dashed: true },
    { pts: el([0.68, 0.5], [0.74, 0.24], 0.5), dashed: true },
    { pts: el([0.86, 0.5], [0.92, 0.76], 0.5), dashed: true },
  ],
  ticks: [
    { x: 0.06, label: "2021" },
    { x: 0.22, label: "2022" },
    { x: 0.38, label: "2023" },
    { x: 0.54, label: "2024" },
    { x: 0.7, label: "2025" },
    { x: 0.86, label: "2026" },
  ],
  notes: [
    { at: [0.2, 0.26], to: [0.14, 0.14], text: "5M+ REQ / DAY · AWS + K8S" },
    { at: [0.46, 0.76], to: [0.34, 0.9], text: "16 MONTHS · GPA 3.9", accent: 1 },
    { at: [0.74, 0.24], to: [0.7, 0.12], text: "AUTODASH 2.0 · PoC → LAUNCH" },
    { at: [0.92, 0.76], to: [0.78, 0.9], text: "PROMOTED APR 2026", accent: 0 },
  ],
};

/* ------------------------------------------------------------------ FIG 03 */
const src: Pt = [0.06, 0.5];
const chunk: Pt = [0.22, 0.5];
const emb2: Pt = [0.38, 0.5];
const store2: Pt = [0.56, 0.5];
const filt: Pt = [0.72, 0.32];
const rank: Pt = [0.72, 0.68];
const out: Pt = [0.9, 0.5];

const FIG_03: Plate = {
  fig: "FIG. 03",
  title: "RETRIEVAL — SELF-HOSTED",
  groups: [{ x: 0.5, y: 0.14, w: 0.3, h: 0.72, label: "vLLM ON VERTEX AI", accent: 1 }],
  nodes: [
    { p: src, label: "SOURCES ×4", kind: "box" },
    { p: chunk, label: "CHUNK", kind: "dot" },
    { p: emb2, label: "EMBED", kind: "box", accent: 1 },
    { p: store2, label: "QDRANT", kind: "store", accent: 2 },
    { p: filt, label: "METADATA FILTER", kind: "box" },
    { p: rank, label: "SCORE ≥ 0.7", kind: "box" },
    { p: out, label: "TYPED OUT", kind: "ring", accent: 0 },
  ],
  edges: [
    { pts: el(src, chunk) },
    { pts: el(chunk, emb2) },
    { pts: el(emb2, store2), accent: 1 },
    { pts: el(store2, filt, 0.5), accent: 2 },
    { pts: el(store2, rank, 0.5) },
    { pts: el(filt, out, 0.5) },
    { pts: el(rank, out, 0.5), accent: 0 },
    { pts: el(src, [0.06, 0.86], 0.5), dashed: true },
  ],
  notes: [
    { at: src, to: [0.02, 0.92], text: "PRIORITY FALLBACK PER ASSET CLASS" },
    { at: store2, to: [0.46, 0.04], text: "SEMANTIC + METADATA", accent: 2 },
    { at: out, to: [0.72, 0.94], text: "4 PYDANTIC SCHEMAS", accent: 0 },
  ],
};

/* ------------------------------------------------------------------ FIG 04 */
const commit: Pt = [0.06, 0.5];
const ci: Pt = [0.24, 0.5];
const img: Pt = [0.42, 0.5];
const canary: Pt = [0.6, 0.3];
const prod: Pt = [0.8, 0.5];
const rollback: Pt = [0.6, 0.72];

const FIG_04: Plate = {
  fig: "FIG. 04",
  title: "DELIVERY — COMMIT › PROD",
  groups: [{ x: 0.52, y: 0.16, w: 0.36, h: 0.7, label: "ZERO-DOWNTIME RELEASE" }],
  nodes: [
    { p: commit, label: "COMMIT", kind: "ring" },
    { p: ci, label: "CI · TESTS 82%", kind: "box", accent: 1 },
    { p: img, label: "IMAGE", kind: "box" },
    { p: canary, label: "CANARY", kind: "pod", reps: 2, accent: 2 },
    { p: prod, label: "PROD", kind: "pod", reps: 3, accent: 0 },
    { p: rollback, label: "ROLLBACK", kind: "box" },
  ],
  edges: [
    { pts: el(commit, ci) },
    { pts: el(ci, img), accent: 1 },
    { pts: el(img, canary, 0.5), accent: 2 },
    { pts: el(canary, prod, 0.5), accent: 0 },
    { pts: el(img, rollback, 0.5), dashed: true },
    { pts: el(rollback, prod, 0.5), dashed: true },
  ],
  notes: [
    { at: ci, to: [0.1, 0.06], text: "90% DEPLOY-TIME REDUCTION", accent: 1 },
    { at: prod, to: [0.72, 0.92], text: "AUTOMATION OVER REPETITION" },
  ],
};

/* ------------------------------------------------------------------ FIG 05 */
const hub: Pt = [0.24, 0.5];
const em: Pt = [0.64, 0.16];
const li: Pt = [0.7, 0.38];
const gh: Pt = [0.7, 0.62];
const cv: Pt = [0.64, 0.84];

const FIG_05: Plate = {
  fig: "FIG. 05",
  title: "CHANNELS",
  nodes: [
    { p: hub, label: "ARJUN CHAVAN", kind: "ring", accent: 1 },
    { p: em, label: "EMAIL", kind: "box" },
    { p: li, label: "LINKEDIN", kind: "box" },
    { p: gh, label: "GITHUB", kind: "box" },
    { p: cv, label: "RESUME.PDF", kind: "box", accent: 0 },
  ],
  edges: [
    { pts: el(hub, em, 0.45) },
    { pts: el(hub, li, 0.5) },
    { pts: el(hub, gh, 0.5) },
    { pts: el(hub, cv, 0.45), accent: 0 },
  ],
  notes: [{ at: hub, to: [0.06, 0.9], text: "TYSONS CORNER, VA · OPEN TO RELOCATION", accent: 1 }],
};

const PLATES = [FIG_01, FIG_02, FIG_03, FIG_04, FIG_05];

const polyLen = (pts: Pt[], W: number, H: number) => {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += Math.hypot((pts[i][0] - pts[i - 1][0]) * W, (pts[i][1] - pts[i - 1][1]) * H);
  return L;
};

/** point at distance d along a normalized polyline, in box pixels */
const along = (pts: Pt[], W: number, H: number, d: number) => {
  for (let i = 1; i < pts.length; i++) {
    const x0 = pts[i - 1][0] * W;
    const y0 = pts[i - 1][1] * H;
    const x1 = pts[i][0] * W;
    const y1 = pts[i][1] * H;
    const seg = Math.hypot(x1 - x0, y1 - y0);
    if (d <= seg) {
      const t = seg === 0 ? 0 : d / seg;
      return { x: x0 + (x1 - x0) * t, y: y0 + (y1 - y0) * t };
    }
    d -= seg;
  }
  const last = pts[pts.length - 1];
  return { x: last[0] * W, y: last[1] * H };
};

export default function SystemPlate({ figure = 0 }: { figure?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const want = useRef(figure);
  want.current = Math.max(0, Math.min(PLATES.length - 1, figure));

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let last = performance.now();
    let shown = want.current;
    let drawT = reduced ? 1 : 0;
    let fade = 1;
    let swapping = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const small = W < 760;

      if (want.current !== shown && !swapping) swapping = true;
      if (swapping) {
        fade -= dt * 3.2;
        if (fade <= 0) {
          fade = 0;
          shown = want.current;
          drawT = 0;
          swapping = false;
        }
      } else {
        fade = Math.min(1, fade + dt * 3.2);
        drawT = Math.min(1, drawT + dt * 0.5);
      }

      const plate = PLATES[shown];
      // The plate sits in the right two-thirds on wide screens so the statement
      // keeps a clean left margin; on phones it spans the width as texture.
      const bx = small ? W * 0.04 : W * 0.3;
      const bw = small ? W * 0.92 : W * 0.66;
      const by = H * 0.15;
      const bh = H * 0.66;
      const X = (n: number) => bx + n * bw;
      const Y = (n: number) => by + n * bh;
      // Everything is quieter on a phone — it is texture there, not a diagram.
      const A = (a: number) => a * fade * (small ? 0.5 : 1);

      ctx.clearRect(0, 0, W, H);
      ctx.lineJoin = "round";
      ctx.lineCap = "butt";

      /* ------------------------------------------------------------- frame */
      ctx.lineWidth = 1;
      ctx.strokeStyle = ink(A(0.14));
      ctx.strokeRect(bx, by, bw, bh);
      ctx.strokeStyle = ink(A(0.3));
      const tk = 13;
      (
        [
          [bx, by, 1, 1],
          [bx + bw, by, -1, 1],
          [bx, by + bh, 1, -1],
          [bx + bw, by + bh, -1, -1],
        ] as const
      ).forEach(([cx, cy, sx, sy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + sy * tk);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + sx * tk, cy);
        ctx.stroke();
      });

      // graph paper
      ctx.strokeStyle = ink(A(0.045));
      ctx.beginPath();
      for (let gx = bx; gx < bx + bw; gx += 40) {
        ctx.moveTo(gx, by);
        ctx.lineTo(gx, by + bh);
      }
      for (let gy = by; gy < by + bh; gy += 40) {
        ctx.moveTo(bx, gy);
        ctx.lineTo(bx + bw, gy);
      }
      ctx.stroke();

      /* ------------------------------------------------------------ groups */
      ctx.font = '500 8.5px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = "middle";
      plate.groups?.forEach((g, i) => {
        const p = Math.max(0, Math.min(1, (drawT - 0.02 - i * 0.06) * 3));
        if (p <= 0) return;
        const col = g.accent !== undefined ? ACCENT[g.accent] : null;
        ctx.save();
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = col ? hexA(col, A(0.3 * p)) : ink(A(0.22 * p));
        ctx.lineWidth = 1;
        ctx.strokeRect(X(g.x), Y(g.y), g.w * bw, g.h * bh);
        ctx.restore();
        if (!small) {
          ctx.fillStyle = col ? hexA(col, A(0.5 * p)) : ink(A(0.34 * p));
          ctx.fillText(g.label, X(g.x) + 6, Y(g.y) - 7);
        }
      });

      /* ------------------------------------------------------------- edges */
      const per = 1 / plate.edges.length;
      plate.edges.forEach((e, i) => {
        const t0 = i * per * 0.8;
        const p = Math.max(0, Math.min(1, (drawT - t0) / (per * 1.5)));
        if (p <= 0) return;
        const L = polyLen(e.pts, bw, bh);
        const col = e.accent !== undefined ? ACCENT[e.accent] : null;

        ctx.save();
        ctx.setLineDash(e.dashed ? [4, 5] : []);
        ctx.lineWidth = e.accent !== undefined ? 1.3 : 1;
        ctx.strokeStyle = col ? hexA(col, A(0.55)) : ink(A(0.3));
        ctx.beginPath();
        ctx.moveTo(X(e.pts[0][0]), Y(e.pts[0][1]));
        let d = L * p;
        for (let k = 1; k < e.pts.length && d > 0; k++) {
          const x0 = X(e.pts[k - 1][0]);
          const y0 = Y(e.pts[k - 1][1]);
          const x1 = X(e.pts[k][0]);
          const y1 = Y(e.pts[k][1]);
          const seg = Math.hypot(x1 - x0, y1 - y0);
          if (d >= seg) {
            ctx.lineTo(x1, y1);
            d -= seg;
          } else {
            const f = seg === 0 ? 0 : d / seg;
            ctx.lineTo(x0 + (x1 - x0) * f, y0 + (y1 - y0) * f);
            d = 0;
          }
        }
        ctx.stroke();
        ctx.restore();

        if (p < 1) {
          const head = along(e.pts, bw, bh, L * p);
          ctx.fillStyle = col ? hexA(col, A(0.95)) : ink(A(0.8));
          ctx.beginPath();
          ctx.arc(bx + head.x, by + head.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (!reduced) {
          const speed = 0.1 + (i % 4) * 0.03;
          const tt = ((now / 1000) * speed + i * 0.29) % 1;
          const pt = along(e.pts, bw, bh, L * tt);
          ctx.fillStyle = col ? hexA(col, A(0.9)) : ink(A(0.55));
          ctx.beginPath();
          ctx.arc(bx + pt.x, by + pt.y, col ? 2 : 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      /* ------------------------------------------------------------- ticks */
      if (plate.ticks && !small) {
        ctx.font = '500 9px "JetBrains Mono", ui-monospace, monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        plate.ticks.forEach((t, i) => {
          const p = Math.max(0, Math.min(1, (drawT - 0.12 - i * 0.05) * 4));
          if (p <= 0) return;
          const x = X(t.x);
          ctx.strokeStyle = ink(A(0.3 * p));
          ctx.beginPath();
          ctx.moveTo(x, Y(0.5) + 7);
          ctx.lineTo(x, Y(0.5) + 14);
          ctx.stroke();
          ctx.fillStyle = ink(A(0.42 * p));
          ctx.fillText(t.label, x, Y(0.5) + 19);
        });
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
      }

      /* ------------------------------------------------------------- nodes */
      ctx.font = '500 9.5px "JetBrains Mono", ui-monospace, monospace';
      plate.nodes.forEach((n, i) => {
        const p = Math.max(0, Math.min(1, (drawT - 0.05 - i * 0.045) * 5));
        if (p <= 0) return;
        const x = X(n.p[0]);
        const y = Y(n.p[1]);
        const col = n.accent !== undefined ? ACCENT[n.accent] : null;
        const stroke = col ? hexA(col, A(0.85 * p)) : ink(A(0.5 * p));
        ctx.strokeStyle = stroke;
        ctx.fillStyle = stroke;
        ctx.lineWidth = 1.1;

        if (p < 1) {
          ctx.save();
          ctx.globalAlpha = (1 - p) * fade;
          ctx.beginPath();
          ctx.arc(x, y, 6 + (1 - p) * 20, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        switch (n.kind) {
          case "pod": {
            // replica stack — offset cards behind the front one
            const reps = n.reps ?? 1;
            for (let r = reps - 1; r >= 0; r--) {
              ctx.globalAlpha = r === 0 ? 1 : 0.45;
              ctx.strokeRect(x - 5 + r * 2.6, y - 5 - r * 2.6, 10, 10);
            }
            ctx.globalAlpha = 1;
            break;
          }
          case "box":
            ctx.strokeRect(x - 5, y - 5, 10, 10);
            break;
          case "ring":
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "store":
            ctx.beginPath();
            ctx.ellipse(x, y - 5, 6, 2.3, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x - 6, y - 5);
            ctx.lineTo(x - 6, y + 4);
            ctx.moveTo(x + 6, y - 5);
            ctx.lineTo(x + 6, y + 4);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(x, y + 4, 6, 2.3, 0, 0, Math.PI);
            ctx.stroke();
            break;
          default:
            ctx.beginPath();
            ctx.arc(x, y, 2.4, 0, Math.PI * 2);
            ctx.fill();
        }

        if (n.label && !small) {
          ctx.fillStyle = col ? hexA(col, A(0.75 * p)) : ink(A(0.48 * p));
          ctx.fillText(n.label + (n.reps ? ` ×${n.reps}` : ""), x + 12, y);
        }
      });

      /* --------------------------------------------------------- callouts */
      if (!small) {
        ctx.font = '500 8.5px "JetBrains Mono", ui-monospace, monospace';
        plate.notes?.forEach((nt, i) => {
          const p = Math.max(0, Math.min(1, (drawT - 0.5 - i * 0.07) * 4));
          if (p <= 0) return;
          const col = nt.accent !== undefined ? ACCENT[nt.accent] : null;
          const ax = X(nt.at[0]);
          const ay = Y(nt.at[1]);
          const tx = X(nt.to[0]);
          const ty = Y(nt.to[1]);
          ctx.save();
          ctx.setLineDash([2, 3]);
          ctx.lineWidth = 1;
          ctx.strokeStyle = col ? hexA(col, A(0.35 * p)) : ink(A(0.22 * p));
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(tx, ty);
          ctx.stroke();
          ctx.restore();
          // tick under the label
          const w = ctx.measureText(nt.text).width;
          const rightward = tx < ax;
          const lx = rightward ? tx : tx - w;
          ctx.strokeStyle = col ? hexA(col, A(0.4 * p)) : ink(A(0.25 * p));
          ctx.beginPath();
          ctx.moveTo(lx, ty + 5);
          ctx.lineTo(lx + w, ty + 5);
          ctx.stroke();
          ctx.fillStyle = col ? hexA(col, A(0.72 * p)) : ink(A(0.45 * p));
          ctx.fillText(nt.text, lx, ty - 2);
        });
      }

      /* --------------------------------------------------------- caption */
      const cp = Math.max(0, Math.min(1, (drawT - 0.6) * 3));
      if (cp > 0 && !small) {
        ctx.textBaseline = "alphabetic";
        ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace';
        ctx.fillStyle = ink(A(0.5 * cp));
        ctx.fillText(`${plate.fig} — ${plate.title}`, bx, by + bh + 26);
        ctx.strokeStyle = ink(A(0.25 * cp));
        const rx = bx + bw - 80;
        const ry = by + bh + 22;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 80, ry);
        for (let k = 0; k <= 4; k++) {
          ctx.moveTo(rx + k * 20, ry - 3);
          ctx.lineTo(rx + k * 20, ry + 3);
        }
        ctx.stroke();
        ctx.textBaseline = "middle";
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
