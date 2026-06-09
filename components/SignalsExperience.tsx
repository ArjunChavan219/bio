"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { journey } from "@/lib/journey";

const VIOLET = new THREE.Color("#6D4AFF");
const AMBER = new THREE.Color("#F5B544");
const INDIGO = new THREE.Color("#32127A");

/** Number of full-viewport "pages" the hero scroll-region spans. Must match Hero.tsx. */
export const HERO_PAGES = 3;

function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function Nebula() {
  const tex = useMemo(makeGlowTexture, []);
  const clouds = useMemo(
    () => [
      { p: [-3.5, 1.4, -7], s: 13, c: INDIGO, o: 0.36 },
      { p: [3.8, 2.4, -8], s: 15, c: VIOLET, o: 0.26 },
      { p: [5.6, 2.8, -4.5], s: 7.5, c: AMBER, o: 0.24 },
      { p: [-5.2, -2.4, -9], s: 14, c: INDIGO, o: 0.3 },
      { p: [0.5, -3.2, -6], s: 11, c: VIOLET, o: 0.18 },
    ],
    []
  );
  const g = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (g.current) g.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.05) * 0.07;
  });
  return (
    <group ref={g}>
      {clouds.map((c, i) => (
        <sprite key={i} position={c.p as [number, number, number]} scale={[c.s, c.s, c.s]}>
          <spriteMaterial map={tex} color={c.c} transparent opacity={c.o} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  );
}

function Glow({ color, scale = 1, opacity = 0.9 }: { color: THREE.Color; scale?: number; opacity?: number }) {
  const tex = useMemo(makeGlowTexture, []);
  return (
    <sprite scale={[scale, scale, scale]}>
      <spriteMaterial map={tex} color={color} transparent opacity={opacity} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  );
}

function Node({ position, color, open = false }: { position: [number, number, number]; color: THREE.Color; open?: boolean }) {
  const core = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (open && core.current) {
      const mat = core.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(s.clock.elapsedTime * 2) * 0.25;
    }
  });
  return (
    <group position={position}>
      <Glow color={color} scale={open ? 1.9 : 1.2} opacity={open ? 0.95 : 0.7} />
      <mesh ref={core}>
        <sphereGeometry args={[0.07, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

function Flow({ curve, color, count = 100, speed = 0.05, size = 0.14 }: { curve: THREE.Curve<THREE.Vector3>; color: THREE.Color; count?: number; speed?: number; size?: number }) {
  const tex = useMemo(makeGlowTexture, []);
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const offsets = useMemo(() => Float32Array.from({ length: count }, () => Math.random()), [count]);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((s) => {
    if (!ref.current) return;
    const base = s.clock.elapsedTime * speed;
    for (let i = 0; i < count; i++) {
      curve.getPointAt((offsets[i] + base) % 1, tmp);
      positions[i * 3] = tmp.x;
      positions[i * 3 + 1] = tmp.y;
      positions[i * 3 + 2] = tmp.z;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={size} map={tex} color={color} transparent opacity={0.95} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

function System() {
  const visited = useMemo(
    () => new THREE.CatmullRomCurve3(journey.filter((w) => w.tone === "visited").map((w) => new THREE.Vector3(...w.pos)), false, "catmullrom", 0.4),
    []
  );
  const openArc = useMemo(() => {
    const a = new THREE.Vector3(...journey[2].pos);
    const b = new THREE.Vector3(...journey[3].pos);
    const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 1.0, 0.4));
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }, []);
  const visitedPts = useMemo(() => visited.getPoints(120).map((p) => [p.x, p.y, p.z] as [number, number, number]), [visited]);
  const openPts = useMemo(() => openArc.getPoints(60).map((p) => [p.x, p.y, p.z] as [number, number, number]), [openArc]);
  return (
    <group>
      <Line points={visitedPts} color="#6D4AFF" lineWidth={1.1} transparent opacity={0.32} />
      <Line points={openPts} color="#F5B544" lineWidth={1} dashed dashScale={2.5} dashSize={0.25} gapSize={0.18} transparent opacity={0.4} />
      <Flow curve={visited} color={VIOLET} count={130} speed={0.045} size={0.13} />
      <Flow curve={openArc} color={AMBER} count={80} speed={0.085} size={0.16} />
      {journey.map((w) => (
        <Node key={w.id} position={w.pos} color={w.tone === "open" ? AMBER : VIOLET} open={w.tone === "open"} />
      ))}
    </group>
  );
}

/**
 * Drives the camera along the journey using the WINDOW scroll position
 * (not drei ScrollControls). Progress is normalized over the hero scroll-region
 * (HERO_PAGES * viewport height). Once past the hero, progress clamps to 1 and
 * the camera parks at "the coast" as a calm backdrop behind the 2D content.
 */
function ScrollCamera() {
  const { camera } = useThree();
  const ptr = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const camPath = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 1.4, 12),
          new THREE.Vector3(journey[0].pos[0] * 0.5, journey[0].pos[1] + 1.1, 7.6),
          new THREE.Vector3(journey[1].pos[0] * 0.5, journey[1].pos[1] + 1.1, 7.0),
          new THREE.Vector3(journey[2].pos[0] * 0.5, journey[2].pos[1] + 1.1, 7.0),
          new THREE.Vector3(journey[3].pos[0] * 0.6, journey[3].pos[1] + 1.3, 7.6),
        ],
        false,
        "catmullrom",
        0.3
      ),
    []
  );
  const tgtPath = useMemo(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(0, 1.3, 0), ...journey.map((w) => new THREE.Vector3(...w.pos))], false, "catmullrom", 0.3),
    []
  );
  const tmpC = useMemo(() => new THREE.Vector3(), []);
  const tmpT = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const vh = window.innerHeight;
    // hero region is HERO_PAGES viewports tall; progress completes as its last screen settles
    const denom = Math.max(1, vh * (HERO_PAGES - 1));
    const o = THREE.MathUtils.clamp(window.scrollY / denom, 0, 1);
    camPath.getPointAt(o, tmpC);
    tgtPath.getPointAt(o, tmpT);
    tmpC.x += ptr.current.x * 0.3;
    tmpC.y += ptr.current.y * 0.2;
    camera.position.lerp(tmpC, 0.1);
    camera.lookAt(tmpT);
  });
  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0B0717"]} />
      <fog attach="fog" args={["#0B0717", 11, 30]} />
      <Stars radius={80} depth={50} count={2600} factor={3.6} saturation={0} fade speed={0.5} />
      <Nebula />
      <System />
      <ScrollCamera />
      <EffectComposer>
        <Bloom intensity={1.15} luminanceThreshold={0.15} luminanceSmoothing={0.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/**
 * Fixed full-viewport background canvas. Sits BEHIND all page content (-z-10)
 * and never scrolls; the camera moves in response to window scroll. The 2D
 * content (Hero copy, EditorialContent) flows over it in normal document flow.
 */
export default function SignalsExperience() {
  return (
    <div className="fixed inset-0 -z-10 bg-space">
      <Canvas dpr={[1, 1.6]} camera={{ position: [0, 1.4, 12], fov: 50 }} gl={{ antialias: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
