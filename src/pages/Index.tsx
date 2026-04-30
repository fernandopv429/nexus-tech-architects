import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Atuacao } from "@/components/nexus/Atuacao";
import { HubFlow } from "@/components/nexus/HubFlow";
import { Valor } from "@/components/nexus/Valor";
import { Areas } from "@/components/nexus/Areas";
import { IoT } from "@/components/nexus/IoT";
import { Projetos } from "@/components/nexus/Projetos";
import { FAQ } from "@/components/nexus/FAQ";
import { ContactForm } from "@/components/nexus/ContactForm";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Nexus DevHub | Automação, RPA, IA e IoT para empresas no Brasil",
    description:
      "Departamento de tecnologia sob demanda: RPA, IA, IoT, totens, PDV e dashboards. Recupere até 20h/semana com o Hub Nexus.",
    canonical: "/",
    keywords:
      "automação de processos, RPA Brasil, automação com IA, IoT industrial, totem de autoatendimento, PDV integrado, manutenção preditiva, CTO as a service, n8n, dashboards BI, automação WhatsApp",
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
      <IoT />
      <Projetos />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
};

export default Index;
