import { useMemo } from "react";

/**
 * Detect WebGL1 context availability (used to show a friendly fallback).
 */
export function useWebGLSupport(): boolean {
  return useMemo(() => {
    try {
      const c = document.createElement("canvas");
      return !!(
        c.getContext("webgl") ||
        c.getContext("experimental-webgl") ||
        c.getContext("webgl2")
      );
    } catch {
      return false;
    }
  }, []);
}
