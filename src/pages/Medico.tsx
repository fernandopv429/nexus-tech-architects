import { Navbar } from "@/components/nexus/Navbar";
import { Hero } from "@/components/nexus/Hero";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { useSEO } from "@/hooks/useSEO";

const SITE = "https://nexusdevhub.com";

const chatPrints = [
  {
    src: "/whatsapp_clinica_v2_1.png",
    alt: "WhatsApp realizando triagem automática de paciente em clínica",
    title: "Triagem de paciente",
    desc: "A IA acolhe, qualifica e direciona pacientes 24/7, sem fila na recepção.",
  },
  {
    src: "/whatsapp_clinica_v2_2.png",
    alt: "WhatsApp confirmando consulta automaticamente",
    title: "Confirmação automática",
    desc: "Lembretes e confirmações disparados sozinhos — taxa de falta cai drasticamente.",
  },
];

const Medico = () => {
  useSEO({
    title: "Agendamento por IA para Clínicas | Recepção 24/7 | Nexus DevHub",
    description:
      "IA que qualifica pacientes, responde dúvidas clínicas e agenda automaticamente no WhatsApp. Gestão de clínicas e consultórios por R$ 1.299/mês.",
    canonical: "/medico",
    keywords:
      "agendamento por IA, gestão de clínicas, recepção 24/7, WhatsApp para clínica, IA para médicos, redução de faltas, CRM clínica, automação agendamento",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Agendamento por IA para Clínicas — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        serviceType: "Automação de Recepção e Agendamento para Saúde",
        description:
          "IA qualifica leads, responde dúvidas clínicas e agenda pacientes automaticamente, integrado ao painel da recepção.",
        offers: { "@type": "Offer", price: "1299", priceCurrency: "BRL" },
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <Navbar />

      <Hero
        eyebrow="Clínicas & Profissionais de Saúde"
        headline={
          <>
            Sua Clínica com{" "}
            <span className="text-primary">Agendamento por IA</span> e Recepção
            de Elite 24/7.
          </>
        }
        description="Elimine mensagens perdidas na secretaria e reduza as faltas de pacientes. Nossa Inteligência Artificial qualifica leads, sana dúvidas clínicas frequentes e realiza agendamentos automáticos integrados ao painel operacional da sua recepção."
        priceAnchor="Investimento fixo de R$ 1.299/mês — Tecnologia rodando sem pausas."
        mockupImage="/nexus_automation_mockup.png"
      />

      {/* Prova social — Linguagem acolhedora */}
      <section className="bg-background py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">
              Conversas reais
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1] tracking-[-0.03em] text-foreground">
              Linguagem acolhedora e focada em agendamentos
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
              Atendimento humanizado, automatizado e disponível em qualquer
              horário — direto no WhatsApp da sua clínica.
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

export default Medico;
