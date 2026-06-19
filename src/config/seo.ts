/**
 * ============================================================
 *  CENTRAL DE SEO — Nexus DevHub
 * ============================================================
 *
 *  Fonte única de verdade para os metadados de TODAS as rotas.
 *  Edite aqui — as páginas só fazem `useSEO(getSeo(pathname))`.
 *
 *  Cada rota tem:
 *   - title         → <title> + og:title + twitter:title
 *   - description   → meta description + og + twitter
 *   - keywords      → meta keywords (opcional)
 *   - ogType        → "website" | "article" | "profile"
 *   - jsonLd        → Schema.org (Service/Article/FAQ etc.)
 *   - noIndex       → quando true, injeta robots="noindex,nofollow"
 *
 *  Rotas /lp/* são variantes para Google Ads:
 *   - Recebem noindex automaticamente
 *   - Têm canonical apontando para a rota original (sem /lp/)
 *   - Mesmo conteúdo, sem canibalizar SEO orgânico
 * ============================================================
 */

export const SITE_URL = "https://nexusdevhub.com";

export type SeoConfig = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogType?: "website" | "article" | "profile";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
};

const serviceJsonLd = (name: string, serviceType: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE_URL },
  areaServed: { "@type": "Country", name: "Brasil" },
  serviceType,
  description,
});

/** Registry: rota canônica → SeoConfig */
export const SEO_REGISTRY: Record<string, SeoConfig> = {
  "/": {
    title: "Nexus DevHub | CRM com IA, Automação e Tráfego",
    description:
      "Assumimos seu setor digital: CRM, agente de IA 24/7, tráfego pago e BI. Valor após diagnóstico gratuito.",
    canonical: "/",
    keywords:
      "setor digital terceirizado, automação de processos, RPA Brasil, automação com IA, agente de IA WhatsApp, CRM com IA, gestor de tráfego, CTO as a service, n8n, dashboards BI, automação WhatsApp",
    ogType: "website",
  },

  "/medico": {
    title: "Agendamento por IA para Clínicas | Nexus DevHub",
    description:
      "IA que qualifica pacientes e agenda no WhatsApp. CRM para clínicas com lembretes automáticos e redução de faltas.",
    canonical: "/medico",
    keywords:
      "agendamento por IA, gestão de clínicas, recepção 24/7, WhatsApp para clínica, IA para médicos, redução de faltas, CRM clínica, automação agendamento",
    ogType: "article",
    jsonLd: serviceJsonLd(
      "Agendamento por IA para Clínicas — Nexus DevHub",
      "Automação de Recepção e Agendamento para Saúde",
      "IA qualifica leads, responde dúvidas clínicas e agenda pacientes automaticamente, integrado ao painel da recepção.",
    ),
  },

  "/varejo": {
    title: "Recupere Carrinhos Abandonados com IA | Nexus DevHub",
    description:
      "Recupere carrinhos com IA no WhatsApp e Instagram. Rastreamento de Pix e centralização de dados. Diagnóstico gratuito.",
    canonical: "/varejo",
    keywords:
      "recuperação carrinho abandonado, CRM com IA, automação WhatsApp vendas, IA e-commerce, Instagram DM automático, automação marketplace, recuperação Pix",
    ogType: "article",
    jsonLd: serviceJsonLd(
      "Recuperação de Carrinhos com IA — Nexus DevHub",
      "Automação de Vendas e Recuperação com IA",
      "Recuperação automática de carrinhos abandonados via WhatsApp e Instagram DM com inteligência artificial.",
    ),
  },

  "/iot": {
    title: "Soluções de IoT e Monitoramento Inteligente | Nexus DevHub",
    description:
      "Transforme sua empresa com Internet das Coisas (IoT). Monitoramento em tempo real, automação industrial e coleta de dados inteligente para escala operacional.",
    canonical: "/iot",
    keywords:
      "IoT, Internet das Coisas, monitoramento industrial, automação IoT, sensores inteligentes, telemetria, dashboards industriais, indústria 4.0",
    ogType: "article",
    jsonLd: serviceJsonLd(
      "Soluções de IoT — Nexus DevHub",
      "Internet das Coisas e Monitoramento",
      "Monitoramento em tempo real, telemetria e automação baseada em sensores para empresas e indústrias.",
    ),
  },

  "/privacidade": {
    title: "Política de Privacidade | Nexus DevHub",
    description:
      "Como a Nexus DevHub coleta, usa e protege seus dados em formulários e anúncios. LGPD e direitos do titular.",
    canonical: "/privacidade",
    ogType: "article",
  },

  "/unsubscribe": {
    title: "Cancelar inscrição | Nexus DevHub",
    description:
      "Página para confirmar o cancelamento de inscrição em comunicações da Nexus DevHub.",
    canonical: "/unsubscribe",
    noIndex: true,
  },

  "/404": {
    title: "Página não encontrada (404) | Nexus DevHub",
    description:
      "A página que você procura não existe ou foi movida. Volte para a home da Nexus DevHub.",
    canonical: "/404",
    noIndex: true,
  },
};

/**
 * Resolve SEO de qualquer rota (incluindo aliases /lp/*).
 *
 *  /lp/medico   → carrega SEO de /medico, com canonical=/medico + noindex
 *  /lp/         → carrega SEO de /,        com canonical=/        + noindex
 *  /qualquer    → 404
 */
export const getSeo = (pathname: string): SeoConfig => {
  const clean = pathname.replace(/\/+$/, "") || "/";

  // Variante Google Ads
  if (clean.startsWith("/lp/") || clean === "/lp") {
    const base = clean === "/lp" ? "/" : clean.replace(/^\/lp/, "") || "/";
    const baseSeo = SEO_REGISTRY[base] ?? SEO_REGISTRY["/"];
    return { ...baseSeo, canonical: base, noIndex: true };
  }

  return SEO_REGISTRY[clean] ?? SEO_REGISTRY["/404"];
};
