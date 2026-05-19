import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

const SITE = "https://nexusdevhub.com";

const chatPrints = [
  {
    src: "/whatsapp_ecommerce_v2_1.png",
    alt: "WhatsApp recuperando carrinho abandonado de e-commerce",
    title: "Recuperação de carrinho",
    desc: "A IA aborda o cliente que abandonou a compra e fecha a venda sozinha.",
  },
  {
    src: "/whatsapp_ecommerce_v2_2.png",
    alt: "Automação de Direct Message do Instagram para marketplaces",
    title: "Automação de DM",
    desc: "Respostas instantâneas no Instagram e Mercado Livre — zero pergunta perdida.",
  },
];

const Varejo = () => {
  useSEO({
    title: "CRM com IA para E-commerce | Recuperação de Carrinho e DM | Nexus DevHub",
    description:
      "Conecte Instagram DM e WhatsApp a um CRM com IA. Recupere carrinhos, rastreie Pix abandonados e centralize vendas. Valor apresentado após diagnóstico gratuito.",
    canonical: "/varejo",
    keywords:
      "CRM e-commerce, recuperação de carrinho, automação Instagram DM, IA para vendas, WhatsApp vendas, automação marketplace, recuperação Pix abandonado",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "CRM com IA para E-commerce — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        serviceType: "Automação de Vendas e CRM com IA",
        description:
          "Recuperação de carrinho, automação de DM e WhatsApp, e CRM centralizado para lojas virtuais.",
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <Hero
        eyebrow="E-commerce & Lojas Virtuais"
        headline={
          <>
            Sua Loja com{" "}
            <span className="text-primary">Recuperação e IA</span> de Elite por
            fração do custo.
          </>
        }
        description="Conecte seu Instagram DM e WhatsApp a um CRM inteligente para reativar clientes, rastrear pix abandonados e centralizar dados de vendas automaticamente no painel da sua operação."
        mockupImage="/nexus_ecommerce_mockup_v2.png"
      />

      {/* Prova social — IA em ação */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Prova real
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-foreground">
              A IA agindo em tempo real nos seus canais
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Conversas reais geradas pela nossa automação — sem operador humano,
              sem script engessado.
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
      <WhatsAppFloating />
    </main>
  );
};

export default Varejo;
