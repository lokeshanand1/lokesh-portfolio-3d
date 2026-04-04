import { useState, useEffect } from 'react';


export function useGlobalScrollVelocity() {
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const deltaY = currentScrollY - lastScrollY;
      const deltaTime = currentTime - lastTime;

      if (deltaTime > 0) {
        const vel = deltaY / deltaTime; // pixels per ms
        setVelocity(vel);
      }
      
      lastScrollY = currentScrollY;
      lastTime = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Decay velocity back to 0 over time
    const decayInterval = setInterval(() => {
      setVelocity((v) => {
        const newV = v * 0.9;
        return Math.abs(newV) < 0.01 ? 0 : newV;
      });
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(decayInterval);
    };
  }, []);

  return velocity;
}
