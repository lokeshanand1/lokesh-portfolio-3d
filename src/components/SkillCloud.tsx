import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import resumeData from '../../public/resume.json';

export function SkillCloud() {
  const groupRef = useRef<THREE.Group>(null);
  
  const words = useMemo(() => {
    return resumeData.skills.map((word) => {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      return { word, position };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -50, 0]}>
      {words.map((item, i) => (
        <Html key={i} position={item.position} center zIndexRange={[100, 0]}>
          <div className="glass-panel px-3 py-1.5 rounded-full border border-white/10 hover:border-[#ff00ea]/50 transition-colors pointer-events-auto cursor-default">
            <span className="text-sm font-semibold neon-text-magenta whitespace-nowrap">{item.word}</span>
          </div>
        </Html>
      ))}
    </group>
  );
}
