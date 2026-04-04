import { useEffect, useState } from "react";

const QUERY = "(max-width: 768px)";

/**
 * When true, we hide the heavy WebGL canvas and show the simplified 2D layout.
 */
export function useIsMobile3D(): boolean {
  const [mobile, setMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handler = () => setMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return mobile;
}
