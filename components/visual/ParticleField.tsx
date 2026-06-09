"use client";

/**
 * Continuous particle cloud for Visual mode.
 * ~6k points that MORPH between one target shape per section as the page
 * scrolls (sphere → helix → lattice → wave → ring), smoothed so the transition
 * is buttery. Retains cursor parallax (the mouse interaction Arjun liked) and a
 * slow auto-rotation so it's alive at rest. Bloom + violet→amber palette.
 *
 * Loaded via next/dynamic({ ssr:false }) from VisualMode so WebGL never runs
 * during static prerender.
 */

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const N = 6000;
const VIOLET = new THREE.Color("#7C5CFF");
const AMBER = new THREE.Color("#F5B544");
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const smoothstep = (e0: number, e1: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

/**
 * Map scroll to morph progress using the pinned [data-stage] tracks: progress
 * holds at shape i while stage i is pinned, then ramps to i+1 during the stage's
 * release (its hand-off to the next). Falls back to raw scroll if no stages.
 */
function scrollProgress(stageCount: number): number {
  const stages = document.querySelectorAll("[data-stage]");
  if (stages.length < 2) {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    return THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
  }
  let u = 0;
  for (let i = 0; i < stages.length - 1; i++) {
    const r = stages[i].getBoundingClientRect();
    const local = THREE.MathUtils.clamp(-r.top / r.height, 0, 1);
    u += smoothstep(0.4, 1.0, local); // hold until 40% scrolled, then morph
  }
  return u / (stageCount - 1);
}

function glowTexture() {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.5)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/** Build the morph targets — one Float32Array(N*3) per section. */
function buildShapes(): Float32Array[] {
  const sphere = new Float32Array(N * 3);
  const helix = new Float32Array(N * 3);
  const lattice = new Float32Array(N * 3);
  const wave = new Float32Array(N * 3);
  const ring = new Float32Array(N * 3);

  const latSide = Math.ceil(Math.cbrt(N)); // ~18
  const waveSide = Math.round(Math.sqrt(N)); // ~77

  for (let i = 0; i < N; i++) {
    const k = i * 3;

    // sphere — fibonacci distribution
    {
      const t = i / N;
      const phi = Math.acos(1 - 2 * t);
      const theta = GOLDEN * i;
      const r = 5.2;
      sphere[k] = r * Math.sin(phi) * Math.cos(theta);
      sphere[k + 1] = r * Math.cos(phi);
      sphere[k + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    // double helix
    {
      const t = i / N;
      const strand = i % 2;
      const ang = t * Math.PI * 2 * 6 + strand * Math.PI;
      const rr = 3.1;
      helix[k] = rr * Math.cos(ang);
      helix[k + 1] = (t - 0.5) * 12;
      helix[k + 2] = rr * Math.sin(ang);
    }

    // cube lattice
    {
      const ix = i % latSide;
      const iy = Math.floor(i / latSide) % latSide;
      const iz = Math.floor(i / (latSide * latSide)) % latSide;
      const span = 9;
      lattice[k] = (ix / (latSide - 1) - 0.5) * span;
      lattice[k + 1] = (iy / (latSide - 1) - 0.5) * span;
      lattice[k + 2] = (iz / (latSide - 1) - 0.5) * span;
    }

    // wave plane
    {
      const ix = i % waveSide;
      const iz = Math.floor(i / waveSide) % waveSide;
      const span = 12;
      const x = (ix / (waveSide - 1) - 0.5) * span;
      const z = (iz / (waveSide - 1) - 0.5) * span;
      wave[k] = x;
      wave[k + 1] = Math.sin(ix * 0.35) * Math.cos(iz * 0.35) * 1.8;
      wave[k + 2] = z;
    }

    // torus / ring
    {
      const R = 5;
      const r = 1.5;
      const u = (i / N) * Math.PI * 2 * 9;
      const v = GOLDEN * i;
      ring[k] = (R + r * Math.cos(v)) * Math.cos(u);
      ring[k + 1] = (R + r * Math.cos(v)) * Math.sin(u);
      ring[k + 2] = r * Math.sin(v);
    }
  }

  return [sphere, helix, lattice, wave, ring];
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const tex = useMemo(glowTexture, []);
  const shapes = useMemo(buildShapes, []);

  // mutable current positions + per-particle color
  const positions = useMemo(() => Float32Array.from(shapes[0]), [shapes]);
  const colors = useMemo(() => {
    const c = new Float32Array(N * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      tmp.copy(VIOLET).lerp(AMBER, Math.random() * 0.7);
      c[i * 3] = tmp.r;
      c[i * 3 + 1] = tmp.g;
      c[i * 3 + 2] = tmp.b;
    }
    return c;
  }, []);

  const prog = useRef(0); // smoothed scroll progress 0..1
  const ptr = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    // scroll progress, held on each section's shape while it's pinned
    const target = scrollProgress(shapes.length);
    prog.current += (target - prog.current) * 0.12;

    const seg = prog.current * (shapes.length - 1);
    const i0 = Math.min(shapes.length - 1, Math.floor(seg));
    const i1 = Math.min(shapes.length - 1, i0 + 1);
    const local = seg - i0;
    const a = shapes[i0];
    const b = shapes[i1];

    const time = state.clock.elapsedTime;
    for (let j = 0; j < N * 3; j++) {
      positions[j] = a[j] + (b[j] - a[j]) * local;
    }
    // gentle per-particle breathing
    for (let i = 0; i < N; i++) {
      const k = i * 3;
      positions[k + 1] += Math.sin(time + i * 0.7) * 0.03;
    }
    const geo = pointsRef.current.geometry;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // auto-rotation + cursor parallax
    ptr.current.rx += (ptr.current.y * 0.25 - ptr.current.rx) * 0.05;
    ptr.current.ry += (ptr.current.x * 0.4 - ptr.current.ry) * 0.05;
    const g = groupRef.current;
    g.rotation.y = time * 0.04 + ptr.current.ry;
    g.rotation.x = ptr.current.rx;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          map={tex}
          vertexColors
          transparent
          opacity={0.92}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 13], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <Particles />
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.08} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
