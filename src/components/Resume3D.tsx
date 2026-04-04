import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, RoundedBox } from "@react-three/drei";
import type { ResumeData } from "../types/resume";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { phaseWeights } from "../lib/scrollPhases";

function useResumeData() {
  const [data, setData] = useState<ResumeData | null>(null);
  useEffect(() => {
    fetch("/resume.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);
  return data;
}

type PanelProps = {
  title: string;
  subtitle: string;
  lines: string[];
  position: [number, number, number];
  color: string;
  delay: number;
};

/** Timeline card: mesh + Html copy (stable vs many Troika Text instances). */
function ResumePanel({ title, subtitle, lines, position, color, delay }: PanelProps) {
  const group = useRef<THREE.Group>(null);
  const col = useMemo(() => new THREE.Color(color), [color]);
  const body = lines.slice(0, 3).join(" · ");

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    const safeDt = Math.min(dt, 0.1);
    const sp = usePortfolioStore.getState().scrollProgress;
    const { wResume } = phaseWeights(sp);
    const rise = THREE.MathUtils.smoothstep(0.62 + delay, 0.88, sp) * wResume;
    const targetY = position[1] + THREE.MathUtils.lerp(-6, 0, rise);
    g.position.y = THREE.MathUtils.lerp(g.position.y, targetY, 1 - Math.exp(-4 * safeDt));
    g.position.x = position[0];
    g.position.z = position[2];
    const s = 0.35 + rise * 0.65;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, 1 - Math.exp(-5 * safeDt)));
  });

  return (
    <group ref={group} position={[position[0], position[1] - 6, position[2]]} scale={0.35}>
      <RoundedBox args={[2.8, 1.5, 0.08]} radius={0.05} smoothness={2}>
        <meshStandardMaterial
          color="#020617"
          emissive={col}
          emissiveIntensity={0.3}
          metalness={0.75}
          roughness={0.35}
          transparent
          opacity={0.94}
        />
      </RoundedBox>
      <Html transform occlude={false} distanceFactor={5} position={[0, 0, 0.06]} center style={{ width: "260px" }}>
        <div
          className="rounded-md border border-white/10 bg-slate-950/80 px-2 py-1.5 text-center backdrop-blur-sm"
          style={{ boxShadow: `0 0 20px ${color}33` }}
        >
          <p className="m-0 text-[11px] font-semibold leading-snug text-slate-100">{title}</p>
          <p className="m-0 mt-1 text-[9px] text-slate-400">{subtitle}</p>
          {body ? <p className="m-0 mt-1 text-[8px] leading-tight text-slate-500">{body}</p> : null}
        </div>
      </Html>
    </group>
  );
}

/** Single Html cloud for skills — avoids dozens of 3D text meshes. */
function SkillCloud({ items, color }: { items: string[]; color: string }) {
  const root = useRef<THREE.Group>(null);
  const flat = items.slice(0, 24);

  useFrame((state) => {
    const g = root.current;
    if (!g) return;
    const sp = usePortfolioStore.getState().scrollProgress;
    const { wResume } = phaseWeights(sp);
    g.rotation.y = state.clock.elapsedTime * 0.05 * wResume + sp * 0.35;
    g.visible = wResume > 0.08;
  });

  return (
    <group ref={root} position={[-2.0, -1.2, 1.8]}>
      <Html transform occlude={false} distanceFactor={5.5} position={[0, 0, 0]} center>
        <div
          className="max-w-[220px] rounded-lg border border-cyan-500/20 bg-black/50 px-2 py-2 text-center backdrop-blur-md"
          style={{ color }}
        >
          <p className="mb-1 text-[8px] uppercase tracking-widest text-slate-500">Skills</p>
          <div className="flex flex-wrap justify-center gap-1">
            {flat.map((s) => (
              <span
                key={s}
                className="rounded bg-white/5 px-1.5 py-0.5 text-[8px] text-slate-300"
                style={{ borderColor: `${color}44`, borderWidth: 1, borderStyle: "solid" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

/**
 * Resume section: arc panels + one skill cloud (DOM) for stability.
 */
export function Resume3D() {
  const data = useResumeData();
  const envGroup = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const g = envGroup.current;
    if (!g) return;
    const safeDt = Math.min(dt, 0.1);
    const sp = usePortfolioStore.getState().scrollProgress;
    const { wResume } = phaseWeights(sp);
    const targetRot = wResume * 0.55;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRot, 1 - Math.exp(-2.5 * safeDt));
  });

  if (!data) return null;

  const expPanels = data.experience.map((e, i) => {
    const angle = (i / Math.max(data.experience.length, 1)) * Math.PI * 0.9 - Math.PI * 0.45;
    const r = 5.2;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r + 1;
    const y = 0.4 - i * 0.35;
    return (
      <ResumePanel
        key={e.id}
        title={e.role}
        subtitle={`${e.company} · ${e.start} – ${e.end}`}
        lines={e.bullets.map((b) => b.text)}
        position={[x, y, z]}
        color="#22d3ee"
        delay={0.02 * i}
      />
    );
  });

  const eduPanels = data.education.map((ed, i) => {
    const angle = Math.PI * 0.35 + (i / Math.max(data.education.length, 1)) * 0.5;
    const r = 4.4;
    const x = Math.cos(angle) * r * -1;
    const z = Math.sin(angle) * r + 0.5;
    const y = -0.8 - i * 0.32;
    return (
      <ResumePanel
        key={ed.id}
        title={ed.degree}
        subtitle={`${ed.institution} · ${ed.start} – ${ed.end}`}
        lines={ed.detail ? [ed.detail] : []}
        position={[x, y, z]}
        color="#e879f9"
        delay={0.03 * i + 0.08}
      />
    );
  });

  const flatSkills = data.skills.flatMap((s) => s.items);

  return (
    <group ref={envGroup} position={[0, 0, 0]}>
      {expPanels}
      {eduPanels}
      <SkillCloud items={flatSkills} color="#7dd3fc" />
    </group>
  );
}
