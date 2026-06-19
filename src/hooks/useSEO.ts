import { useEffect } from "react";

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Quando true, injeta meta robots noindex,nofollow (ex.: /lp/*, /unsubscribe, 404). */
  noIndex?: boolean;
};

const SITE_URL = "https://nexusdevhub.com";
const JSONLD_ID = "page-jsonld";
const ROBOTS_PAGE_ID = "page-robots";
const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const upsertMeta = (selector: string, attr: string, name: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

export const useSEO = ({
  title,
  description,
  canonical,
  keywords,
  ogType,
  jsonLd,
  noIndex,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', "name", "description", description);
    if (keywords) upsertMeta('meta[name="keywords"]', "name", "keywords", keywords);
    if (ogType) upsertMeta('meta[property="og:type"]', "property", "og:type", ogType);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    // robots — sobrescreve o default do index.html quando noIndex=true
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noIndex ? "noindex, nofollow" : DEFAULT_ROBOTS,
    );

    const url = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${SITE_URL}${canonical}`
      : `${SITE_URL}${window.location.pathname}`;
    upsertLink("canonical", url);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);

    // Page-level JSON-LD (replace previous)
    const existing = document.getElementById(JSONLD_ID);
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSONLD_ID;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById(JSONLD_ID);
      if (s) s.remove();
      // Reverte robots para o default ao trocar de rota
      upsertMeta('meta[name="robots"]', "name", "robots", DEFAULT_ROBOTS);
      const r = document.getElementById(ROBOTS_PAGE_ID);
      if (r) r.remove();
    };
  }, [title, description, canonical, keywords, ogType, noIndex, JSON.stringify(jsonLd)]);
};
