import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { ChatWidget } from "@/components/nexus/ChatWidget";
import { useSEO } from "@/hooks/useSEO";

const SITE = "https://nexusdevhub.com";

const chatPrints = [
  {
    src: "/whatsapp_ecommerce_v2_1.png",
    alt: "IA no WhatsApp recuperando cliente que abandonou o carrinho",
    title: "Carrinho abandonado → Venda finalizada",
    desc: "A IA identifica o abandono, entra em contato no WhatsApp e conduz o cliente até o pagamento — sozinha, em minutos.",
  },
  {
    src: "/whatsapp_ecommerce_v2_2.png",
    alt: "Automação de Instagram DM respondendo cliente em segundos",
    title: "DM do Instagram respondida em 3 segundos",
    desc: "Nenhuma pergunta fica sem resposta. A IA atende clientes no Instagram e Mercado Livre 24 horas por dia.",
  },
];

const Varejo = () => {
  useSEO({
    title: "Recupere Carrinhos Abandonados com IA | Nexus DevHub",
    description:
      "Transforme carrinhos abandonados em vendas finais com IA no WhatsApp e Instagram. Recuperação automática 24/7, rastreamento de Pix e centralização de dados. Diagnóstico gratuito.",
    canonical: "/varejo",
    keywords:
      "recuperação carrinho abandonado, CRM com IA, automação WhatsApp vendas, IA e-commerce, Instagram DM automático, automação marketplace, recuperação Pix",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Recuperação de Carrinhos com IA — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        serviceType: "Automação de Vendas e Recuperação com IA",
        description:
          "Recuperação automática de carrinhos abandonados via WhatsApp e Instagram DM com inteligência artificial.",
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <Hero
        eyebrow="E-commerce & Marketplace"
        headline={
          <>
            Recupere até 30% dos
            <br />
            <span className="text-primary">Carrinhos Abandonados</span>
            <br />
            com IA no WhatsApp
          </>
        }
        description="Cada carrinho abandonado é uma venda perdida. Nossa IA reativa clientes no WhatsApp e Instagram DM, rastreia Pix pendentes e centraliza tudo em um painel inteligente — enquanto você foca em escalar."
        mockupImage="/nexus_ecommerce_mockup_v2.png"
      />

      {/* Prova social — IA em ação */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Resultados reais
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-foreground">
              A IA vende sozinha enquanto você dorme
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Conversas naturais, respostas instantâneas e fechamento automático — zero operador, zero demora.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
            {chatPrints.map((p) => (
              <figure
                key={p.src}
                className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-card"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="mx-auto h-[520px] w-auto rounded-2xl object-contain"
                />
                <figcaption className="px-2 pb-2 pt-5 text-center">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </figcaption>
              </figure>
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

export default Varejo;
