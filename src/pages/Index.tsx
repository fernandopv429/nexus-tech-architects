import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Atuacao } from "@/components/nexus/Atuacao";
import { HubFlow } from "@/components/nexus/HubFlow";
import { Valor } from "@/components/nexus/Valor";
import { Areas } from "@/components/nexus/Areas";
import { Projetos } from "@/components/nexus/Projetos";
import { FAQ } from "@/components/nexus/FAQ";
import { ContactForm } from "@/components/nexus/ContactForm";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

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
      <Calculadora />
      <Atuacao />
      <HubFlow />
      <Valor />
      <Areas />
      <Projetos />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
};

export default Index;
