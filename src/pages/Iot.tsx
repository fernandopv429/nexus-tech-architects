import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { ChatWidget } from "@/components/nexus/ChatWidget";
import { useSEO } from "@/hooks/useSEO";
import { Cpu, Wifi, Database, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const SITE = "https://nexusdevhub.com";

const iotFeatures = [
  {
    icon: Cpu,
    title: "Monitoramento em Tempo Real",
    desc: "Acompanhe o status de máquinas, sensores e dispositivos de qualquer lugar do mundo com latência zero.",
  },
  {
    icon: Wifi,
    title: "Conectividade Inteligente",
    desc: "Integração total via Wi-Fi, LoRaWAN, 4G/5G e protocolos industriais para garantir que seus dados nunca parem.",
  },
  {
    icon: Database,
    title: "Coleta e Armazenamento",
    desc: "Sistemas robustos de Big Data para armazenar e processar milhões de eventos por segundo com segurança.",
  },
  {
    icon: BarChart3,
    title: "Dashboards de Performance",
    desc: "Visualize métricas críticas em painéis personalizados que facilitam a tomada de decisão estratégica.",
  },
];

const Iot = () => {
  useSEO({
    title: "Soluções de IoT e Monitoramento Inteligente | Nexus DevHub",
    description:
      "Transforme sua empresa com Internet das Coisas (IoT). Monitoramento em tempo real, automação industrial e coleta de dados inteligente para escala operacional.",
    canonical: "/iot",
    keywords:
      "IoT, Internet das Coisas, monitoramento industrial, automação IoT, sensores inteligentes, telemetria, dashboards industriais, indústria 4.0",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Soluções de IoT — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        serviceType: "Internet das Coisas e Monitoramento",
        description:
          "Monitoramento em tempo real, telemetria e automação baseada em sensores para empresas e indústrias.",
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <Hero
        eyebrow="IoT & Indústria 4.0"
        headline={
          <>
            Sua Operação com{" "}
            <span className="text-primary">Inteligência de Dados</span> em Tempo Real.
          </>
        }
        description="Conecte seus ativos físicos ao mundo digital. Implementamos sensores, telemetria e dashboards inteligentes para que você tenha controle total da sua produção e infraestrutura."
        mockupImage="/nexus_iot_mockup.png" // Sugestão de imagem futura
      />

      {/* IoT Features Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Infraestrutura Conectada
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-foreground">
              Onde o mundo físico encontra a tecnologia
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Não apenas coletamos dados; transformamos sinais de sensores em decisões lucrativas para o seu negócio.
            </p>
          </div>

          <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {iotFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/50"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Calculadora />
      <Footer />
      <ChatWidget />
    </main>
  );
};

export default Iot;
