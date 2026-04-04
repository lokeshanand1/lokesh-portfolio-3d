import { useEffect, useCallback } from "react";
import { usePortfolioStore } from "../store/usePortfolioStore";

/**
 * Maps window scroll to a smooth 0..1 progress value and pushes it into Zustand.
 * Call once near the app root. Uses requestAnimationFrame to batch reads.
 */
export function useScrollProgress() {
  const setScrollProgress = usePortfolioStore((s) => s.setScrollProgress);

  const update = useCallback(() => {
    const el = document.documentElement;
    const scrollTop = el.scrollTop || document.body.scrollTop;
    const max = el.scrollHeight - el.clientHeight;
    const raw = max > 0 ? scrollTop / max : 0;
    const clamped = Math.min(1, Math.max(0, raw));
    setScrollProgress(clamped);
  }, [setScrollProgress]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);
}
