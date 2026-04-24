import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Atuacao } from "@/components/nexus/Atuacao";
import { HubFlow } from "@/components/nexus/HubFlow";
import { Valor } from "@/components/nexus/Valor";
import { Areas } from "@/components/nexus/Areas";
import { IoT } from "@/components/nexus/IoT";
import { FAQ } from "@/components/nexus/FAQ";
import { ContactForm } from "@/components/nexus/ContactForm";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Atuacao />
      <HubFlow />
      <Valor />
      <Areas />
      <IoT />
      <FAQ />
      <ContactForm />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
};

export default Index;
