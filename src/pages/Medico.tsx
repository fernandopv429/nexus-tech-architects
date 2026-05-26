import { motion } from "framer-motion";
import { Bot, Calendar, CreditCard, ArrowRight, Workflow, Megaphone, Sparkles } from "lucide-react";
import { Navbar } from "@/components/nexus/Navbar";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { WHATSAPP_URL } from "@/components/nexus/WhatsAppButton";
import { ChatWidget } from "@/components/nexus/ChatWidget";
import { CrmAccessButton } from "@/components/nexus/CrmAccessButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";

const SITE = "https://nexusdevhub.com";

/**
 * Medico page — scoped LIGHT theme (Nexus.ai vibe).
 * Overrides the dark design tokens only within `.medico-theme` so all
 * shared components (Navbar, Calculadora, Footer) inherit the light palette
 * via semantic Tailwind classes.
 */
const themeStyles = `
.medico-theme {
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

const solutions = [
  {
    icon: Bot,
    title: "Atendimento com IA",
    sub: "24/7 Ativo",
    color: "bg-[hsl(162_65%_30%)]",
  },
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    sub: "Por Profissional",
    color: "bg-[hsl(42_92%_55%)]",
  },
  {
    icon: CreditCard,
    title: "Cobrança Automática",
    sub: "Inadimplência Zero",
    color: "bg-[hsl(10_78%_54%)]",
  },
];

const timeline = [
  {
    color: "hsl(162 65% 30%)",
    side: "right",
    title: "Hub Central",
    sub: "Gestão Descomplicada",
    desc: "Visualize facilmente em qual etapa cada paciente ou lead está. Mova cards, agende retornos e saiba exatamente o faturamento projetado.",
    icon: Workflow,
  },
  {
    color: "hsl(10 78% 54%)",
    side: "left",
    title: "Atuação 360º",
    sub: "Agente IA na Prática",
    desc: "Esqueça perder tempo. A IA atende os pacientes, os qualifica, gerencia agendamentos por profissional, dispara follow-ups e faz cobranças ativas sem esquecer de ninguém.",
    icon: Sparkles,
  },
  {
    color: "hsl(42 92% 55%)",
    side: "right",
    title: "Tráfego Pago",
    sub: "Bônus Exclusivo",
    desc: "Nós também entregamos um criativo (vídeo) semanal focado na sua clínica, pronto para você usar em anúncios no Instagram e Facebook.",
    icon: Megaphone,
  },
];

const testimonials = [
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
      "IA que qualifica pacientes, responde dúvidas clínicas e agenda automaticamente no WhatsApp. Gestão de clínicas e consultórios com CRM completo.",
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
      },
    ],
  });

  return (
    <div className="medico-theme">
      <style>{themeStyles}</style>

      <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
        <Navbar />

        {/* ─────────────────── HERO ─────────────────── */}
        <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Esqueça as faltas e os leads perdidos
                </p>
                <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-foreground">
                  O Setor Digital{" "}
                  <span className="text-[hsl(162_65%_30%)]">para sua Clínica</span>
                </h1>
                <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                  Seu novo Agente de IA faz tudo: desde a qualificação e
                  agendamento, até o follow-up de orçamentos e cobranças
                  automáticas. Entregamos um CRM completo e vídeos semanais
                  para seus anúncios.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <CrmAccessButton
                    label="Ver CRM na Prática"
                    source="medico-hero"
                    sector="saude"
                  />
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-foreground/20 bg-transparent px-6 py-6 text-base font-medium text-foreground hover:bg-foreground/5"
                  >
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick("hero")}
                    >
                      Falar no WhatsApp
                    </a>
                  </Button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                  <span>✓ Diagnóstico gratuito</span>
                  <span>✓ Setup completo</span>
                  <span>✓ Vídeos semanais para Ads</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Ambient glow behind mockup */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(162_65%_35%/0.12)] blur-[100px]" />
                  <div className="absolute bottom-0 right-0 h-[60%] w-[60%] rounded-full bg-[hsl(10_78%_54%/0.08)] blur-[80px]" />
                </div>

                <motion.img
                  src="/nexus_medico_mockup.png"
                  alt="Painel CRM Nexus para clínicas, com pipeline de pacientes e agente de IA no WhatsApp"
                  loading="eager"
                  fetchPriority="high"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative h-auto w-full object-contain drop-shadow-[0_30px_60px_hsl(207_45%_11%/0.25)]"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 left-2 flex items-center gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur md:left-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(10_78%_54%)] text-white">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Agendamento
                    </p>
                    <p className="text-sm font-semibold text-[hsl(162_65%_30%)]">
                      Automático por Profissional
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─────────────────── VIDEO + DOR ─────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
                  Você sabia que sua clínica pode estar deixando dinheiro na mesa?
                </h2>
                <p className="mt-6 text-base text-muted-foreground md:text-lg">
                  Uma clínica média perde{" "}
                  <strong className="text-foreground">até 30% do faturamento</strong>{" "}
                  simplesmente porque as mensagens do WhatsApp acumulam ou o
                  paciente esquece da consulta.
                </p>
                <p className="mt-4 text-base text-muted-foreground md:text-lg">
                  Leads que esfriam no WhatsApp e faltas sem aviso são rasgos
                  diários no caixa — e a maior parte deles é 100% evitável.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative mx-auto w-full max-w-[360px]"
              >
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-card">
                  <div className="relative aspect-[9/16] w-full">
                    <iframe
                      src="https://www.youtube.com/embed/BE_HWS8E_vY?rel=0&modestbranding=1"
                      title="Vídeo: como a Nexus ajuda sua clínica a parar de perder dinheiro"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─────────────────── SOLUÇÕES ─────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-card"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white ${s.color}`}>
                      <s.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold text-foreground">
                        {s.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Nossa IA cuida de
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[0.98] tracking-[-0.03em] text-foreground">
                  absolutamente tudo.
                </h2>
                <p className="mt-5 text-base text-muted-foreground md:text-lg">
                  Deixe o trabalho duro com a máquina. Nosso{" "}
                  <strong className="text-[hsl(162_65%_30%)]">
                    Agente de Inteligência Artificial
                  </strong>{" "}
                  atua como seu recepcionista e vendedor 24 horas por dia.
                </p>

                <ul className="mt-7 space-y-4">
                  {[
                    { t: "Qualificação de Leads:", d: "Filtra interessados e entende a necessidade." },
                    { t: "Agendamento Inteligente:", d: "Marca a consulta na agenda do profissional certo." },
                    { t: "Follow-up Implacável:", d: "Vai atrás de orçamentos não fechados e reativa pacientes." },
                    { t: "Cobrança Automática:", d: "Envia lembretes e reduz inadimplência sem esforço da equipe." },
                  ].map((item) => (
                    <li key={item.t} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                      <ArrowRight className="mt-1 h-4 w-4 text-[hsl(10_78%_54%)]" />
                      <div>
                        <p className="font-semibold text-foreground">{item.t}</p>
                        <p className="text-sm text-muted-foreground">{item.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─────────────────── TIMELINE / HUB CENTRAL ─────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
                Qualifica, Agenda, Acompanha e Cobra
              </h2>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                Esqueça perder tempo. A IA atende os pacientes, qualifica,
                gerencia agendamentos por profissional, dispara follow-ups e
                faz cobranças ativas sem esquecer de ninguém.
              </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-5xl">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block" />
              <div className="space-y-14 md:space-y-20">
                {timeline.map((t, i) => (
                  <motion.div
                    key={t.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`relative grid gap-6 md:grid-cols-2 md:gap-12 ${
                      t.side === "left" ? "md:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className={`md:text-${t.side === "right" ? "right" : "left"} text-center md:text-${t.side === "right" ? "right" : "left"}`}>
                      <p className="font-display text-2xl font-bold text-foreground">
                        {t.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{t.sub}</p>
                    </div>
                    <div className="relative">
                      <span
                        className="absolute -left-[7px] top-1.5 hidden h-3.5 w-3.5 rounded-full ring-4 ring-background md:block"
                        style={{
                          background: t.color,
                          [t.side === "left" ? "right" : "left"]: "-1.95rem",
                        } as React.CSSProperties}
                      />
                      <p className="text-base text-muted-foreground">{t.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────── CHAT PROOF ─────────────────── */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
                Clínicas que confiam em nós
              </h2>
              <p className="mt-5 text-base text-muted-foreground md:text-lg">
                Nossa solução já ajudou diversas clínicas a reduzirem o tempo
                gasto com tarefas administrativas e aumentarem seus agendamentos.
              </p>
            </div>

            <div className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-10">
              {testimonials.map((p, i) => (
                <motion.figure
                  key={p.src}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex flex-col items-center"
                >
                  {/* Soft ambient glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-[70%] w-[70%] rounded-full bg-[hsl(162_65%_35%/0.10)] blur-[80px]" />
                  </div>

                  <motion.img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[480px] w-auto object-contain drop-shadow-[0_24px_50px_hsl(207_45%_11%/0.22)]"
                  />
                  <figcaption className="mt-6 max-w-xs text-center">
                    <p className="font-display text-lg font-semibold text-foreground">
                      {p.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <Calculadora />
        <Footer />
        <ChatWidget />
      </main>
    </div>
  );
};

export default Medico;
