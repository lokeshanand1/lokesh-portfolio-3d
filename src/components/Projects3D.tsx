import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import { PROJECTS, type Project } from "../data/projects";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { phaseWeights } from "../lib/scrollPhases";

/**
 * Loads thumbnails without Suspense — failed SVG/HTTP won't tear down the whole canvas.
 */
function ProjectThumb({ url }: { url: string }) {
  const [map, setMap] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    let cancelled = false;
    loader.load(
      url,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        setMap(tex);
      },
      undefined,
      () => {
        if (!cancelled) setMap(null);
      }
    );
    return () => {
      cancelled = true;
      setMap((prev) => {
        prev?.dispose();
        return null;
      });
    };
  }, [url]);

  return (
    <mesh position={[0, 0.15, 0.07]}>
      <planeGeometry args={[1.15, 0.72]} />
      <meshBasicMaterial
        map={map ?? undefined}
        color={map ? "#ffffff" : "#0e7490"}
        toneMapped={false}
        transparent
        opacity={map ? 1 : 0.85}
      />
    </mesh>
  );
}

function spiralPos(i: number, n: number): [number, number, number] {
  const t = n <= 1 ? 0.5 : i / (n - 1);
  const angle = i * 0.92 + t * Math.PI * 1.6;
  const r = 4.0 + Math.sin(t * Math.PI) * 0.75;
  const y = (i - n / 2) * 1.05;
  return [Math.cos(angle) * r, y, Math.sin(angle) * r];
}

type CardProps = {
  project: Project;
  base: [number, number, number];
  index: number;
};

/**
 * Interactive card: RoundedBox + safe thumbnail + Html title (avoids Troika Text GPU/driver issues).
 */
function ProjectCard({ project, base, index }: CardProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const setSelected = usePortfolioStore((s) => s.setSelectedProjectId);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const safeDt = Math.min(dt, 0.1);
    const { scrollProgress, mouse } = usePortfolioStore.getState();
    const { wProjects } = phaseWeights(scrollProgress);

    const stagger = THREE.MathUtils.smoothstep(0.32, 0.58, scrollProgress - index * 0.04);
    const fly = THREE.MathUtils.lerp(14, 0, stagger * wProjects);

    const [bx, by, bz] = base;
    const targetX = bx + mouse.x * 0.35;
    const targetY = by + mouse.y * 0.28;
    const targetZ = bz + fly;

    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 1 - Math.exp(-5 * safeDt));
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 1 - Math.exp(-5 * safeDt));
    g.position.z = THREE.MathUtils.lerp(g.position.z, targetZ, 1 - Math.exp(-4 * safeDt));

    const tiltX = mouse.y * 0.18 + (hovered ? 0.06 : 0);
    const tiltY = mouse.x * 0.22 + (hovered ? 0.06 : 0);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, tiltX, 1 - Math.exp(-6 * safeDt));
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, tiltY + index * 0.08, 1 - Math.exp(-5 * safeDt));
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setSelected(project.id);
  };

  const accent = useMemo(() => new THREE.Color(project.accent), [project.accent]);

  return (
    <group ref={group} position={[base[0], base[1], base[2] + 14]}>
      <RoundedBox
        args={[1.35, 1.75, 0.1]}
        radius={0.06}
        smoothness={2}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color="#0f172a"
          emissive={accent}
          emissiveIntensity={hovered ? 0.55 : 0.22}
          metalness={0.85}
          roughness={0.3}
        />
      </RoundedBox>
      <ProjectThumb url={project.thumbnail} />
      <Html
        transform
        occlude={false}
        distanceFactor={6}
        position={[0, -0.78, 0.08]}
        center
        style={{ pointerEvents: "none", width: "200px", margin: 0 }}
      >
        <p
          className="m-0 text-center text-[9px] font-medium leading-tight text-sky-100"
          style={{ textShadow: "0 0 12px rgba(34,211,238,0.5)" }}
        >
          {project.title}
        </p>
      </Html>
    </group>
  );
}

/**
 * 3D spiral of project cards; visibility tied to scroll phase.
 */
export function Projects3D() {
  const root = useRef<THREE.Group>(null);
  const n = PROJECTS.length;
  const bases = useMemo(() => PROJECTS.map((_, i) => spiralPos(i, n)), [n]);

  useFrame((_, dt) => {
    const r = root.current;
    if (!r) return;
    const safeDt = Math.min(dt, 0.1);
    const t = usePortfolioStore.getState().scrollProgress;
    const { wProjects, wResume } = phaseWeights(t);
    const opacity = THREE.MathUtils.clamp(wProjects * 1.15 - wResume * 0.35, 0.08, 1);
    r.visible = opacity > 0.04;
    r.scale.setScalar(
      THREE.MathUtils.lerp(r.scale.x, 0.92 + wProjects * 0.12, 1 - Math.exp(-3 * safeDt))
    );
  });

  return (
    <group ref={root}>
      {PROJECTS.map((p, i) => (
        <ProjectCard key={p.id} project={p} base={bases[i]} index={i} />
      ))}
    </group>
  );
}

export type { Project };
