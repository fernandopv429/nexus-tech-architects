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

