import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';
import projectsData from '../../public/projectData.json';

export function ProjectCarousel3D() {
  const groupRef = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const [hovered, setHovered] = useState<string | null>(null);

  // Radius of the carousel
  const radius = 6;

  useFrame(() => {
    if (!groupRef.current) return;
    
    // We want the carousel to rotate as the user scrolls between 20% and 50%
    const offset = scroll.offset;
    // Map offset to rotation (just continuous spin based on scroll position)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      offset * Math.PI * 4,
      0.1
    );
    
    // Float entire group into view smoothly as we slide down
    let targetY = 0;
    if (offset < 0.2) {
      targetY = -20 * (1 - offset / 0.2);
    } else if (offset > 0.6) {
      targetY = 20 * ((offset - 0.6) / 0.4);
    }
    
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, -15, 0]}>
      {projectsData.map((project, index) => {
        const angle = (index / projectsData.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Float key={project.id} speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group 
              position={[x, 0, z]} 
              rotation={[0, -angle + Math.PI/2, 0]}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(project.id); document.body.style.cursor = 'pointer'; }}
              onPointerOut={(e) => { e.stopPropagation(); setHovered(null); document.body.style.cursor = 'auto'; }}
              onClick={(e) => { e.stopPropagation(); console.log('Clicked', project.id); }}
            >
              {/* Abstract Representation of Project */}
              <mesh scale={hovered === project.id ? 1.5 : 1}>
                {project.modelType === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
                {project.modelType === 'torus' && <torusGeometry args={[0.8, 0.25, 16, 100]} />}
                {project.modelType === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
                <meshPhysicalMaterial 
                  color={hovered === project.id ? "#ffffff" : "#475569"} 
                  wireframe={false}
                  emissive={hovered === project.id ? "#ffffff" : "#000000"}
                  emissiveIntensity={hovered === project.id ? 0.3 : 0}
                  metalness={0.9}
                  roughness={0.2}
                  clearcoat={1}
                />
              </mesh>
              

            </group>
          </Float>
        );
      })}
    </group>
  );
}
