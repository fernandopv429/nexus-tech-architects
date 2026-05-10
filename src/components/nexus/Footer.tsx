import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/nexus-logo.png";
import { WHATSAPP_URL } from "./WhatsAppButton";
import { trackWhatsAppClick } from "@/lib/analytics";

const links = [
  { label: "Soluções", href: "#atuacao" },
  { label: "Como funciona", href: "#hub" },
  { label: "Diferenciais", href: "#valor" },
  { label: "Áreas", href: "#areas" },
  { label: "Simulador de ROI", href: "#calculadora" },
  { label: "Cases", href: "#projetos" },
  { label: "FAQ", href: "#faq" },
  { label: "Fale conosco", href: "#contato" },
];

export const Footer = () => (
  <footer className="bg-background pb-12 pt-24" itemScope itemType="https://schema.org/Organization">
    <div className="container">
      {/* Massive wordmark */}
      <div className="border-b border-border pb-16 text-center">
        <h3 className="font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground">
          Nexus.
        </h3>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground">
          Setor digital de elite para empresas que querem escalar sem inflar a folha. CRM com IA, automação, dados e marketing de performance.
        </p>
      </div>

      {/* Contact + Sitemap grid */}
      <div className="grid gap-12 border-b border-border py-14 md:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Nexus DevHub — Setor Digital Terceirizado" className="h-9 w-9" />
            <span className="font-display text-base font-semibold text-foreground" itemProp="name">
              Nexus Dev Hub
            </span>
          </div>
          <p className="text-sm text-muted-foreground" itemProp="description">
            Seu setor digital terceirizado. Engenharia, IA e marketing em um só contrato.
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="addressCountry">Brasil</span> — Atendimento nacional
            </span>
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Contato
          </h4>
          <a
            href="mailto:comercial@nexusdevhub.com"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            itemProp="email"
          >
            <Mail className="h-4 w-4" />
            comercial@nexusdevhub.com
          </a>
          <a
            href="tel:+5587996487067"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            itemProp="telephone"
          >
            <Phone className="h-4 w-4" />
            (87) 99648-7067
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("footer")}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp comercial
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            Atendimento comercial: seg–sex, 9h–18h (BRT).
          </p>
        </div>

        {/* Sitemap */}
        <nav aria-label="Mapa do site" className="flex flex-col gap-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
            Mapa do site
          </h4>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Nexus Dev Hub — CNPJ sob demanda. Todos os direitos reservados.</p>
        <p>Setor Digital Terceirizado · Automação · IA · CRM · Marketing de Performance</p>
      </div>
    </div>
  </footer>
);
