import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function ChaosScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const scroll = useScroll();

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const offset = scroll.offset; // 0 to 1
    
    // Rotate constantly but modify speed based on scroll
    meshRef.current.rotation.x += delta * (0.2 + offset * 2);
    meshRef.current.rotation.y += delta * (0.3 + offset * 3);
    
    // Pulsate scales based on time and scroll
    const scaleY = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2 + offset * 0.5;
    meshRef.current.scale.set(1 + offset, scaleY, 1 + offset);
    
    // Orbit camera slightly on mouse move (Parallax)
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <MeshDistortMaterial 
        color="#0f172a" 
        emissive="#000000"
        distort={0.3} 
        speed={0.5} 
        roughness={0.1}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
        wireframe={false}
      />
    </mesh>
  );
}
