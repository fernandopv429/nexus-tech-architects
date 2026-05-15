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
const VideoSection = lazy(() =>
  import("@/components/nexus/VideoSection").then((m) => ({ default: m.VideoSection }))
);
const LeadCaptureModal = lazy(() =>
  import("@/components/nexus/LeadCaptureModal").then((m) => ({ default: m.LeadCaptureModal }))
);

const SectionFallback = () => (
  <div className="min-h-[40vh] bg-background" aria-hidden="true" />
);

const Index = () => {
  useSEO({
    title: "Nexus DevHub | Setor Digital Próprio: Automação, IA e Marketing",
    description:
      "Assumimos seu setor digital: CRM, agente de IA 24/7, site de alta conversão, tráfego pago e BI. A partir de R$ 1.299/mês.",
    canonical: "/",
    keywords:
      "setor digital terceirizado, automação de processos, RPA Brasil, automação com IA, agente de IA WhatsApp, CRM com IA, gestor de tráfego, CTO as a service, n8n, dashboards BI, automação WhatsApp",
    ogType: "website",
  });
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <VideoSection />
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
  );
};

export default Index;
