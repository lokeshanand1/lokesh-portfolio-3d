import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';
import resumeData from '../../public/resume.json';

export function ResumeRibbon() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Create a curved path for the timeline
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 0, -10),
      new THREE.Vector3(5, -5, -5),
      new THREE.Vector3(-5, -10, 0),
      new THREE.Vector3(5, -15, 5),
      new THREE.Vector3(-5, -20, 10),
    ]);
  }, []);



  useFrame(() => {
    if (!groupRef.current) return;
    const offset = scroll.offset; // 0 to 1
    
    // The ribbon comes into view smoothly
    let targetY = 0;
    if (offset < 0.6) {
       targetY = -40 * (1 - offset / 0.6);
    } else {
       targetY = (offset - 0.6) * 20;
    }
    
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -30, 0]}>
      {/* The Ribbon Geometry */}
      <mesh>
        <tubeGeometry args={[curve, 128, 0.05, 8, false]} />
        <meshPhysicalMaterial color="#94a3b8" metalness={0.8} roughness={0.2} clearcoat={1} />
      </mesh>

      {/* Map Nodes (Work & Education) */}
      {[...resumeData.work, ...resumeData.education].map((_, index) => {
        const u = (index + 1) / (resumeData.work.length + resumeData.education.length + 1);
        const pos = curve.getPointAt(u);
        
        return (
          <Float key={index} speed={2} floatIntensity={0.5}>
            <group position={[pos.x, pos.y, pos.z]}>
              <mesh>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} metalness={0.5} roughness={0.1} />
              </mesh>

            </group>
          </Float>
        );
      })}
    </group>
  );
}
