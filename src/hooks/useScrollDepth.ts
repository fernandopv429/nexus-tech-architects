import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 90];

/** Tracks scroll depth milestones (25/50/75/90%) once per page load. */
export const useScrollDepth = () => {
  useEffect(() => {
    const fired = new Set<number>();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const pct = Math.round((window.scrollY / docHeight) * 100);
          for (const t of THRESHOLDS) {
            if (pct >= t && !fired.has(t)) {
              fired.add(t);
              trackEvent("scroll_depth", { percent: t });
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};
