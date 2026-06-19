import { motion } from "framer-motion";
import { Bot, BarChart3, ArrowRight, Zap, TrendingUp, MessageSquare } from "lucide-react";
import { Navbar } from "@/components/nexus/Navbar";
import { Calculadora } from "@/components/nexus/Calculadora";
import { Footer } from "@/components/nexus/Footer";
import { WHATSAPP_URL } from "@/components/nexus/WhatsAppButton";
import { ChatWidget } from "@/components/nexus/ChatWidget";
import { CrmAccessButton } from "@/components/nexus/CrmAccessButton";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { getSeo } from "@/config/seo";
import { useLocation } from "react-router-dom";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";


const solutions = [
  {
    icon: MessageSquare,
    title: "Recuperação Automática",
    sub: "Carrinhos Abandonados",
    color: "bg-primary",
  },
  {
    icon: BarChart3,
    title: "Rastreamento de Pix",
    sub: "Pagamentos Pendentes",
    color: "bg-[hsl(42_92%_55%)]",
  },
  {
    icon: TrendingUp,
    title: "Painel de Vendas",
    sub: "Tempo Real",
    color: "bg-[hsl(10_78%_54%)]",
  },
];

const timeline = [
  {
    color: "hsl(var(--primary))",
    side: "right",
    title: "Identificação Inteligente",
    sub: "Carrinho Abandonado",
    desc: "A IA detecta em tempo real quando um cliente abandona o carrinho e dispara uma sequência automática de reativação via WhatsApp e Instagram DM.",
    icon: Zap,
  },
  {
    color: "hsl(10 78% 54%)",
    side: "left",
    title: "Conversação Natural",
    sub: "Agente IA 24/7",
    desc: "Sem scripts robóticos. A IA conversa naturalmente, entende objeções de preço, oferece descontos e finaliza a venda sozinha — enquanto você dorme.",
    icon: Bot,
  },
  {
    color: "hsl(42 92% 55%)",
    side: "right",
    title: "Gestão Centralizada",
    sub: "Painel Unificado",
    desc: "Todas as conversas, pedidos pendentes e Pix em aberto em um único painel. Saiba exatamente qual cliente está próximo de comprar e qual já desistiu.",
    icon: BarChart3,
  },
];

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
  useSEO(getSeo(useLocation().pathname));


  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
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
                E-commerce & Marketplace
              </p>
              <h1 className="mt-5 font-display text-[clamp(2.4rem,6.5vw,4.75rem)] font-bold leading-[0.95] tracking-[-0.035em] text-foreground">
                Recupere até 30% dos
                <br />
                <span className="text-primary">Carrinhos Abandonados</span>
                <br />
                com IA no WhatsApp
              </h1>
              <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
                Cada carrinho abandonado é uma venda perdida. Nossa IA reativa
                clientes no WhatsApp e Instagram DM, rastreia Pix pendentes e
                centraliza tudo em um painel inteligente — enquanto você foca
                em escalar.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CrmAccessButton
                  label="Ver CRM na Prática"
                  source="varejo-hero"
                  sector="varejo"
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
                <span>✓ Integração com Pix</span>
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
                <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[100px]" />
              </div>

              <motion.img
                src="/nexus_ecommerce_mockup_v2.png"
                alt="Painel CRM Nexus para e-commerce, com recuperação de carrinhos e agente de IA no WhatsApp"
                loading="eager"
                fetchPriority="high"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-auto w-full object-contain drop-shadow-[0_30px_60px_hsl(207_45%_11%/0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────── DOR / PROBLEMA ─────────────────── */}
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
                Você sabia que seu e-commerce está deixando dinheiro na mesa?
              </h2>
              <p className="mt-6 text-base text-muted-foreground md:text-lg">
                Uma loja online média perde{" "}
                <strong className="text-foreground">até 30% do faturamento</strong>{" "}
                simplesmente porque clientes abandonam o carrinho ou não
                confirmam o pagamento.
              </p>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Carrinhos esquecidos no WhatsApp, Pix pendentes sem follow-up e
                clientes que desistem por falta de resposta são rasgos diários
                no caixa — e a maior parte deles é 100% evitável.
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
                <div className="relative aspect-[9/16] w-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary mb-2">30%</div>
                    <p className="text-sm text-muted-foreground">
                      de faturamento<br />perdido em carrinhos<br />abandonados
                    </p>
                  </div>
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
                <strong className="text-primary">
                  Agente de Inteligência Artificial
                </strong>{" "}
                atua como seu vendedor 24 horas por dia, recuperando carrinhos
                e fechando vendas.
              </p>

              <ul className="mt-7 space-y-4">
                {[
                  { t: "Detecção de Abandono:", d: "Identifica em tempo real quando um cliente sai sem comprar." },
                  { t: "Reativação Automática:", d: "Dispara mensagens personalizadas via WhatsApp e Instagram DM." },
                  { t: "Negociação Inteligente:", d: "Oferece descontos, responde objeções e fecha a venda." },
                  { t: "Rastreamento de Pix:", d: "Monitora pagamentos pendentes e envia lembretes automáticos." },
                ].map((item) => (
                  <li key={item.t} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    <ArrowRight className="mt-1 h-4 w-4 text-primary" />
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


      {/* ─────────────────── TIMELINE / FLUXO ─────────────────── */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">
              Identifica, Reativa, Vende e Acompanha
            </h2>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Esqueça perder vendas. A IA detecta carrinhos abandonados,
              reativa clientes com mensagens personalizadas, negocia e fecha a
              venda — tudo sem sua intervenção.
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

      {/* ─────────────────── CHAT PROOF / RESULTADOS ─────────────────── */}
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
              Conversas naturais, respostas instantâneas e fechamento automático
              — zero operador, zero demora.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 md:grid-cols-2">
            {chatPrints.map((p, i) => (
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
                  <div className="h-[70%] w-[70%] rounded-full bg-primary/10 blur-[80px]" />
                </div>

                <motion.img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[520px] w-auto object-contain drop-shadow-[0_24px_50px_hsl(207_45%_11%/0.22)]"
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
  );
};

export default Varejo;
