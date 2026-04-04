import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Icosahedron, Torus } from "@react-three/drei";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { phaseWeights } from "../lib/scrollPhases";

function smoothScalar(current: number, target: number, dt: number, lambda: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

/**
 * Central hero geometry: icosahedron + torus blend; weights derived from scroll in useFrame
 * to avoid React re-renders on every scroll tick.
 */
export function MorphCore() {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const icoMat = useRef<THREE.MeshStandardMaterial>(null);
  const torusMat = useRef<THREE.MeshStandardMaterial>(null);

  const c1 = useRef(new THREE.Color("#22d3ee"));
  const c2 = useRef(new THREE.Color("#e879f9"));
  const c3 = useRef(new THREE.Color("#38bdf8"));
  const tmpColor = useRef(new THREE.Color());

  useFrame((_, dt) => {
    const safeDt = Math.min(dt, 0.1);
    const t = usePortfolioStore.getState().scrollProgress;
    const { wIntro, wProjects, wResume } = phaseWeights(t);
    const morph = wProjects + wResume * 1.2;

    const g = groupRef.current;
    const ico = icoRef.current;
    const tor = torusRef.current;
    if (!g || !ico || !tor) return;

    const targetY = 0.38 + wIntro * 0.92;
    ico.scale.y = smoothScalar(ico.scale.y, targetY, safeDt, 3);
    ico.scale.x = smoothScalar(ico.scale.x, 1, safeDt, 3);
    ico.scale.z = smoothScalar(ico.scale.z, 1, safeDt, 3);

    ico.rotation.x += safeDt * (0.12 + wProjects * 0.22);
    ico.rotation.y += safeDt * (0.32 + wResume * 0.18);

    tor.rotation.x += safeDt * 0.38;
    tor.rotation.z += safeDt * 0.12 * morph;

    const torusScale = smoothScalar(tor.scale.x, 0.32 + wProjects * 0.88, safeDt, 2.8);
    tor.scale.setScalar(torusScale);

    g.rotation.z = smoothScalar(g.rotation.z, wResume * 0.4, safeDt, 2);

    const mix = tmpColor.current.copy(c1.current).lerp(c2.current, wProjects).lerp(c3.current, wResume * 0.45);
    if (icoMat.current) {
      icoMat.current.color.copy(mix);
      icoMat.current.emissive.copy(mix);
      icoMat.current.emissiveIntensity = 0.42 + wIntro * 0.58;
      icoMat.current.wireframe = wResume > 0.55;
    }
    if (torusMat.current) {
      torusMat.current.opacity = 0.32 + wProjects * 0.58;
      torusMat.current.emissiveIntensity = 0.32 + wProjects * 0.52;
    }
  });

  return (
    <group ref={groupRef}>
      <Icosahedron ref={icoRef} args={[1.15, 1]} castShadow>
        <meshStandardMaterial
          ref={icoMat}
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.9}
          metalness={0.85}
          roughness={0.22}
        />
      </Icosahedron>
      <Torus ref={torusRef} args={[1.4, 0.12, 16, 48]} castShadow>
        <meshStandardMaterial
          ref={torusMat}
          color="#c026d3"
          emissive="#86198f"
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.18}
          transparent
          opacity={0.55}
        />
      </Torus>
    </group>
  );
}
