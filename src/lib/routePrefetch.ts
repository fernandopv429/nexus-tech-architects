// Route-level prefetch helpers.
// Each function returns the dynamic import promise so callers can await if needed.
// Vite caches the module after the first call, so subsequent navigations are instant.

const prefetchers: Record<string, () => Promise<unknown>> = {
  "/": () => import("@/pages/Index.tsx"),
  "/medico": () => import("@/pages/Medico.tsx"),
  "/varejo": () => import("@/pages/Varejo.tsx"),
  "/unsubscribe": () => import("@/pages/Unsubscribe.tsx"),
};

const started = new Set<string>();

export const prefetchRoute = (path: string) => {
  // Normalize: strip hash/query, keep pathname only
  const pathname = path.split("#")[0].split("?")[0] || "/";
  const fn = prefetchers[pathname];
  if (!fn || started.has(pathname)) return;
  started.add(pathname);
  // Fire and forget — swallow errors (e.g. offline)
  fn().catch(() => started.delete(pathname));
};

type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number };
type IdleCb = (deadline: IdleDeadline) => void;
type WindowWithIdle = Window & {
  requestIdleCallback?: (cb: IdleCb, opts?: { timeout: number }) => number;
};

/** Schedule prefetch of likely-next routes during browser idle time. */
export const prefetchIdle = (paths: string[]) => {
  if (typeof window === "undefined") return;
  const run = () => paths.forEach(prefetchRoute);
  const w = window as WindowWithIdle;
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.setTimeout(run, 1500);
  }
};
