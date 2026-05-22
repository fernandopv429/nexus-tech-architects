import { lazy, Suspense } from "react";
import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

// Above-the-fold: Navbar + Hero render eagerly.
// Everything below lazy-loads via Suspense — reduces initial JS for first paint.
const Contraste = lazy(() =>
  import("@/components/nexus/Contraste").then((m) => ({ default: m.Contraste }))
);
const Atuacao = lazy(() =>
  import("@/components/nexus/Atuacao").then((m) => ({ default: m.Atuacao }))
);
const Areas = lazy(() =>
  import("@/components/nexus/Areas").then((m) => ({ default: m.Areas }))
);
const Valor = lazy(() =>
  import("@/components/nexus/Valor").then((m) => ({ default: m.Valor }))
);
const HubFlow = lazy(() =>
  import("@/components/nexus/HubFlow").then((m) => ({ default: m.HubFlow }))
);
const MelhoriaContinua = lazy(() =>
  import("@/components/nexus/MelhoriaContinua").then((m) => ({ default: m.MelhoriaContinua }))
);
const Calculadora = lazy(() =>
  import("@/components/nexus/Calculadora").then((m) => ({ default: m.Calculadora }))
);
const Projetos = lazy(() =>
  import("@/components/nexus/Projetos").then((m) => ({ default: m.Projetos }))
);
const FAQ = lazy(() =>
  import("@/components/nexus/FAQ").then((m) => ({ default: m.FAQ }))
);
const ContactForm = lazy(() =>
  import("@/components/nexus/ContactForm").then((m) => ({ default: m.ContactForm }))
);
const Footer = lazy(() =>
  import("@/components/nexus/Footer").then((m) => ({ default: m.Footer }))
);
const LeadCaptureModal = lazy(() =>
  import("@/components/nexus/LeadCaptureModal").then((m) => ({ default: m.LeadCaptureModal }))
);

const SectionFallback = () => (
  <div className="min-h-[40vh] bg-background" aria-hidden="true" />
);

// Scoped LIGHT theme (Nexus.ai vibe) — overrides dark tokens only inside
// `.nexus-light-theme`. All shared components use semantic Tailwind classes
// and automatically inherit the lighter palette.
const themeStyles = `
.nexus-light-theme {
  --background: 43 45% 96%;
  --foreground: 207 45% 11%;
  --card: 0 0% 100%;
  --card-foreground: 207 45% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 207 45% 11%;
  --primary: 162 65% 30%;
  --primary-foreground: 0 0% 100%;
  --primary-glow: 162 60% 45%;
  --secondary: 40 30% 92%;
  --secondary-foreground: 207 45% 11%;
  --muted: 40 25% 90%;
  --muted-foreground: 210 12% 38%;
  --accent: 10 78% 54%;
  --accent-foreground: 0 0% 100%;
  --border: 40 18% 86%;
  --input: 40 18% 90%;
  --ring: 162 65% 30%;
  --gradient-radial: radial-gradient(circle at 20% 10%, hsl(162 65% 35% / 0.08), transparent 55%),
                     radial-gradient(circle at 90% 30%, hsl(10 78% 54% / 0.06), transparent 50%);
  --shadow-card: 0 24px 60px -28px hsl(207 45% 11% / 0.18);
}
`;

const Index = () => {
  useSEO({
    title: "Nexus DevHub | Setor Digital Próprio: Automação, IA e Marketing",
    description:
      "Assumimos seu setor digital: CRM, agente de IA 24/7, site de alta conversão, tráfego pago e BI. Valor apresentado após diagnóstico gratuito.",
    canonical: "/",
    keywords:
      "setor digital terceirizado, automação de processos, RPA Brasil, automação com IA, agente de IA WhatsApp, CRM com IA, gestor de tráfego, CTO as a service, n8n, dashboards BI, automação WhatsApp",
    ogType: "website",
  });
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
      <main className="nexus-light-theme relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <Navbar />
        <Hero mockupImages={["/nexus_mockup_crm.png", "/nexus_mockup_ecommerce.png"]} />
        <Suspense fallback={<SectionFallback />}>
          <Contraste />
          <Atuacao />
          <Areas />
          <Valor />
          <HubFlow />
          <MelhoriaContinua />
          <Calculadora />
          <Projetos />
          <FAQ />
          <ContactForm />
          <Footer />
        </Suspense>
        <WhatsAppFloating />
        <Suspense fallback={null}>
          <LeadCaptureModal />
        </Suspense>
      </main>
    </>
  );
};

export default Index;
