// Google Analytics 4 helper
// Wraps gtag() with safe checks for SSR / blocked scripts.

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return;
  // Always push to dataLayer (works for GTM too if added later)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
  // Direct gtag call
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
};

// Conversion-grade events (recommended GA4 names where applicable)
export const trackCTAClick = (label: string, location: string, href?: string) =>
  trackEvent("cta_click", { cta_label: label, cta_location: location, cta_href: href });

export const trackWhatsAppClick = (
  source: "floating" | "hero" | "footer" | "contact" | "qualified",
  segmento?: string,
  porte?: string,
) => trackEvent("whatsapp_click", { source, segmento, porte });

export const trackFormSubmit = (
  formName: "contact" | "calculator_roi",
  extra: EventParams = {},
) => {
  trackEvent("generate_lead", { form_name: formName, ...extra });
  trackEvent("form_submit", { form_name: formName, ...extra });
};
