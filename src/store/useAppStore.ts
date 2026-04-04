import { create } from 'zustand';

interface AppState {
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
  particlesEnabled: boolean;
  setParticlesEnabled: (enabled: boolean) => void;
  chaosLevel: number;
  setChaosLevel: (level: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeProject: null,
  setActiveProject: (id) => set({ activeProject: id }),
  particlesEnabled: true,
  setParticlesEnabled: (enabled) => set({ particlesEnabled: enabled }),
  chaosLevel: 0,
  setChaosLevel: (level) => set({ chaosLevel: level }),
}));
