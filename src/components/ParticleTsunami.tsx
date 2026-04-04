import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleTsunami({ count = 3000 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Memoize random particle initial state
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      temp.push({
        position: new THREE.Vector3(x, y, z),
        originalPosition: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(0, 0, 0),
        factor: Math.random() * 0.5 + 0.1,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Mouse coords in 3D (approximate projection on z=0)
    const mouseZ = 0;
    const vec = new THREE.Vector3(state.pointer.x * 15, state.pointer.y * 15, mouseZ);
    
    particles.forEach((particle, i) => {
      // Swirl math
      const t = time * particle.factor;
      const target = particle.originalPosition.clone();
      target.x += Math.sin(t) * 2;
      target.y += Math.cos(t) * 2;
      target.z += Math.sin(t * 0.5) * 2;
      
      // Mouse repulsion
      const dist = vec.distanceTo(particle.position);
      if (dist < 4) {
        const force = vec.clone().sub(particle.position).normalize().multiplyScalar(-0.5);
        particle.velocity.add(force);
      }
      
      // Spring back
      const pull = target.sub(particle.position).multiplyScalar(0.02);
      particle.velocity.add(pull);
      particle.velocity.multiplyScalar(0.92); // Friction
      particle.position.add(particle.velocity);
      
      dummy.position.copy(particle.position);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.05; // Global spin
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0,0,-5]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#cbd5e1" transparent opacity={0.4} />
    </instancedMesh>
  );
}
