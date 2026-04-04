import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { damp3 } from "maath/easing";
import { MorphCore } from "./MorphCore";
import { Particles } from "./Particles";
import { Projects3D } from "./Projects3D";
import { Resume3D } from "./Resume3D";
import { usePortfolioStore } from "../store/usePortfolioStore";
import { phaseWeights } from "../lib/scrollPhases";

const camIntro = new THREE.Vector3(0, 0.4, 8.5);
const camProjects = new THREE.Vector3(6.2, 2.1, 6.4);
const camResume = new THREE.Vector3(-6.0, 1.35, 7.2);
const targetPos = new THREE.Vector3();
const lookAt = new THREE.Vector3(0, 0, 0);

const cCyan = new THREE.Color("#22d3ee");
const cMagenta = new THREE.Color("#e879f9");
const cBlue = new THREE.Color("#3b82f6");

/**
 * Main WebGL composition: scroll-driven camera, phase lighting, core morph, projects, resume, particles.
 * Post-processing (bloom) is omitted by default — EffectComposer often crashes or loses context on
 * integrated GPUs / Safari; emissive materials still give a neon look.
 */
export function Scene() {
  const { camera } = useThree();
  const keyLight = useRef<THREE.PointLight>(null);
  const rimLight = useRef<THREE.PointLight>(null);
  const fillLight = useRef<THREE.DirectionalLight>(null);
  const tmpLightColor = useRef(new THREE.Color());

  useFrame((_, dt) => {
    const safeDt = Math.min(dt, 0.1);
    const t = usePortfolioStore.getState().scrollProgress;
    const { wIntro, wProjects, wResume } = phaseWeights(t);

    targetPos.set(0, 0, 0);
    targetPos.addScaledVector(camIntro, wIntro);
    targetPos.addScaledVector(camProjects, wProjects);
    targetPos.addScaledVector(camResume, wResume);
    damp3(camera.position, targetPos, 0.5, safeDt);
    camera.lookAt(lookAt);

    if (keyLight.current) {
      tmpLightColor.current.copy(cCyan).lerp(cMagenta, wProjects).lerp(cBlue, wResume * 0.6);
      keyLight.current.color.copy(tmpLightColor.current);
      keyLight.current.intensity = 0.65 + wIntro * 0.55 + wProjects * 0.75;
      keyLight.current.position.set(4 + wResume * 2, 5, 3 + wProjects * 1.5);
    }
    if (rimLight.current) {
      rimLight.current.color.setHex(wResume > 0.5 ? 0xe879f9 : 0x38bdf8);
      rimLight.current.intensity = 0.35 + wResume * 0.85;
      rimLight.current.position.set(-6, 2 - wIntro, -2);
    }
    if (fillLight.current) {
      fillLight.current.intensity = 0.08 + wIntro * 0.12;
    }
  });

  return (
    <>
      <color attach="background" args={["#030508"]} />
      <fog attach="fog" args={["#030508", 14, 42]} />

      <ambientLight intensity={0.1} />
      <directionalLight ref={fillLight} position={[3, 8, 2]} intensity={0.2} color="#94a3b8" />
      <pointLight ref={keyLight} position={[5, 5, 4]} intensity={1.2} distance={40} decay={2} />
      <pointLight ref={rimLight} position={[-6, 2, -2]} intensity={0.5} distance={35} decay={2} />

      <Particles />
      <MorphCore />
      <Projects3D />
      <Resume3D />
    </>
  );
}
