import { create } from "zustand";

/**
 * Global scroll-driven state shared between the DOM scroll listener
 * and the R3F canvas. Values are normalized 0..1 over the full page height.
 */
export type PortfolioState = {
  /** Overall page scroll progress [0, 1] */
  scrollProgress: number;
  /** Mouse position in NDC-like coords [-1, 1] for parallax */
  mouse: { x: number; y: number };
  /** Selected project id for modal (null = closed) */
  selectedProjectId: string | null;
  setScrollProgress: (v: number) => void;
  setMouse: (x: number, y: number) => void;
  setSelectedProjectId: (id: string | null) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  scrollProgress: 0,
  mouse: { x: 0, y: 0 },
  selectedProjectId: null,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId }),
}));
