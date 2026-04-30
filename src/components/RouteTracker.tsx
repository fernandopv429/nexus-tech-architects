import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";
import { useScrollDepth } from "@/hooks/useScrollDepth";

/** Sends a GA4 page_view on every SPA route change + tracks scroll depth globally. */
export const RouteTracker = () => {
  const location = useLocation();
  useScrollDepth();

  useEffect(() => {
    // Defer to allow the new page's <title> (set by useSEO) to apply first
    const id = window.setTimeout(() => {
      trackPageView(location.pathname + location.search, document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};
