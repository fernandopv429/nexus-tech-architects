import { lazy, Suspense } from "react";
import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { ChatWidget } from "@/components/nexus/ChatWidget";
import { useSEO } from "@/hooks/useSEO";

const Contraste = lazy(() =>
  import("@/components/nexus/Contraste").then((m) => ({ default: m.Contraste }))
);
const Areas = lazy(() =>
  import("@/components/nexus/Areas").then((m) => ({ default: m.Areas }))
);
const Valor = lazy(() =>
  import("@/components/nexus/Valor").then((m) => ({ default: m.Valor }))
);
const Calculadora = lazy(() =>
  import("@/components/nexus/Calculadora").then((m) => ({ default: m.Calculadora }))
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
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Contraste />
        <Areas />
        <Valor />
        <Calculadora />
        <FAQ />
        <ContactForm />
        <Footer />
      </Suspense>
      <ChatWidget />
      <Suspense fallback={null}>
        <LeadCaptureModal />
      </Suspense>
    </main>
  );
};

export default Index;
