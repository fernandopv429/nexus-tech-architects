// Google Analytics 4 + Google Tag Manager helper
// All events are pushed to window.dataLayer so GTM can map them to tags/triggers.
// gtag() is also called directly as a fallback when GA4 is loaded outside GTM.

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined | null>;

const ensureDataLayer = () => {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
};

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  const dl = ensureDataLayer();
  if (!dl) return;
  dl.push(payload);
};

// Forward selected events to our backend webhook (non-blocking)
const FORWARD_EVENTS = new Set([
  "form_submit",
  "form_start",
  "generate_lead",
  "lead_captured",
  "whatsapp_click",
]);

const sendToWebhook = (body: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  try {
    const url = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/analytics-webhook`;
    const payload = JSON.stringify({
      ...body,
      page: {
        path: window.location.pathname,
        url: window.location.href,
        title: document.title,
        referrer: document.referrer || null,
      },
      ts: new Date().toISOString(),
    });
    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon && navigator.sendBeacon(url, blob)) return;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* swallow — analytics must never break UX */
  }
};

const forwardToWebhook = (eventName: string, params: EventParams) => {
  if (!FORWARD_EVENTS.has(eventName)) return;
  sendToWebhook({ event: eventName, data: params });
};

// Forward full lead payload (with PII) to webhook only — never to GTM/GA4
export const forwardLeadToWebhook = (
  formName: "contact" | "calculator_roi" | "popup",
  data: Record<string, unknown>,
) => {
  sendToWebhook({ event: "lead_captured", form_name: formName, data });
};

export const trackEvent = (eventName: string, params: EventParams = {}) => {
  const dl = ensureDataLayer();
  if (!dl) return;
  // GTM trigger payload
  dl.push({ event: eventName, ...params });
  // gtag fallback (GA4 direct)
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  // Backend webhook (leads + WhatsApp only)
  forwardToWebhook(eventName, params);
};

export const trackPageView = (path: string, title?: string) => {
  if (typeof window === "undefined") return;
  pushToDataLayer({
    event: "page_view",
    page_path: path,
    page_title: title ?? document.title,
    page_location: window.location.href,
  });
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title ?? document.title,
      page_location: window.location.href,
    });
  }
};

export const trackCTAClick = (label: string, location: string, href?: string) =>
  trackEvent("cta_click", { cta_label: label, cta_location: location, cta_href: href });

export const trackWhatsAppClick = (
  source: "floating" | "hero" | "footer" | "contact" | "qualified",
  segmento?: string,
  porte?: string,
) => trackEvent("whatsapp_click", { source, segmento, porte });

// Lightweight non-cryptographic hash so GTM/GA4 receives a stable
// non-PII identifier for the lead email (useful for dedup / audiences).
const simpleHash = (input: string): string => {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
};

export const trackFormStart = (formName: "contact" | "calculator_roi" | "popup") =>
  trackEvent("form_start", { form_name: formName });

export const trackFormSubmit = (
  formName: "contact" | "calculator_roi" | "popup",
  extra: EventParams & { email?: string } = {},
) => {
  const { email, ...rest } = extra;
  const enriched: EventParams = {
    form_name: formName,
    form_id: formName,
    ...rest,
  };
  if (email) {
    enriched.lead_email_domain = email.split("@")[1] ?? "";
    enriched.lead_email_hash = simpleHash(email.toLowerCase().trim());
  }
  // GA4 recommended event for lead capture
  trackEvent("generate_lead", enriched);
  // Generic form submit (for GTM triggers)
  trackEvent("form_submit", enriched);
};
