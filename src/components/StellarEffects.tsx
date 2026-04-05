import { Sparkles } from '@react-three/drei';

export function StellarEffects() {
  return (
    <group>
      {/* Deep atmospheric cinematic dust */}
      <Sparkles 
        count={300} 
        scale={35} 
        size={1.5} 
        speed={0.05} 
        opacity={0.3} 
        color="#ffffff" 
        noise={1.5}
      />
      <Sparkles 
        count={150} 
        scale={25} 
        size={3} 
        speed={0.02} 
        opacity={0.15} 
        color="#00f3ff" 
      />
    </group>
  );
}
