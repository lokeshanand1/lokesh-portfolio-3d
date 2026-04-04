import * as THREE from "three";

/** Shared scroll → phase weights for intro / projects / resume (smooth overlaps). */
export function phaseWeights(t: number) {
  const introEnd = 0.38;
  const projectsEnd = 0.72;
  const s = THREE.MathUtils.smoothstep;
  const wIntro = 1 - s(introEnd - 0.02, introEnd + 0.12, t);
  const wProjects =
    s(introEnd - 0.02, introEnd + 0.12, t) * (1 - s(projectsEnd - 0.02, projectsEnd + 0.12, t));
  const wResume = s(projectsEnd - 0.02, projectsEnd + 0.12, t);
  const sum = wIntro + wProjects + wResume || 1;
  return { wIntro: wIntro / sum, wProjects: wProjects / sum, wResume: wResume / sum };
}
