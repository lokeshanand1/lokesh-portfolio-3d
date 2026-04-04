import { Sparkles } from '@react-three/drei';

export function StellarEffects() {
  return (
    <group>
      {/* Premium ambient stardust to provide microscopic depth and slow motion to the background */}
      <Sparkles 
        count={500} 
        scale={20} 
        size={2} 
        speed={0.2} 
        opacity={0.4} 
        color="#ffffff" 
        noise={0.5}
      />
      <Sparkles 
        count={200} 
        scale={15} 
        size={5} 
        speed={0.1} 
        opacity={0.1} 
        color="#94a3b8" 
      />
    </group>
  );
}
