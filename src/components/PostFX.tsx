import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

/**
 * Optional heavy post stack — NOT mounted by default in Scene (GPU / context issues).
 * To enable: import and render `<PostFX />` inside `Scene.tsx` after testing on your hardware.
 */
export function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.35}
        luminanceSmoothing={0.5}
        intensity={0.85}
        mipmapBlur={false}
        radius={0.4}
      />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  );
}
