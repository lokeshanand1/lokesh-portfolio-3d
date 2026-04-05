import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function FluidBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !wireframeRef.current) return;
    
    // Slow undulation
    meshRef.current.rotation.z += delta * 0.02;
    wireframeRef.current.rotation.z += delta * 0.02;
    
    // Mouse Parallax effect
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    const rotX = -Math.PI / 2 + targetY * 0.5;
    const rotY = targetX * 0.5;

    meshRef.current.rotation.x += (rotX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (rotY - meshRef.current.rotation.y) * 0.02;
    
    wireframeRef.current.rotation.x += (rotX - wireframeRef.current.rotation.x) * 0.02;
    wireframeRef.current.rotation.y += (rotY - wireframeRef.current.rotation.y) * 0.02;
  });

  return (
    <group position={[0, -5, -15]}>
      {/* Solid Liquid Base */}
      <mesh ref={meshRef} scale={[50, 50, 5]}>
        <planeGeometry args={[1, 1, 128, 128]} />
        <MeshDistortMaterial 
          color="#020204" 
          emissive="#000000"
          distort={0.4} 
          speed={1} 
          roughness={0.1}
          metalness={1}
        />
      </mesh>
      
      {/* Wireframe Overlay for that tech/agency feel */}
      <mesh ref={wireframeRef} scale={[50, 50, 5.1]} position={[0, 0, 0.1]}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <MeshDistortMaterial 
          color="#1a1a2e" 
          emissive="#0a0a1f"
          distort={0.4} 
          speed={1} 
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
