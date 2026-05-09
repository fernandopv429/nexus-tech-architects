import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Store, Building2, Truck, Stethoscope, MessageSquare, LineChart } from "lucide-react";

const projects = [
  {
    icon: Stethoscope,
    sector: "Saúde",
    title: "Clínica multiespecialidade",
    desc: "Setor digital próprio: CRM com WhatsApp e Instagram centralizados, agente de IA agendando 24/7 e cobrança ativa de inadimplentes.",
    metrics: [
      { label: "Agendamentos", value: "+312%" },
      { label: "Custo por lead", value: "-68%" },
    ],
    stack: ["CRM", "Agente IA", "Tráfego"],
  },
  {
    icon: Store,
    sector: "Varejo",
    title: "Rede de lojas",
    desc: "Painel de vendas em tempo real, conciliação automática de Pix e cartão, e campanhas de tráfego pago integradas ao CRM.",
    metrics: [
      { label: "Lojas integradas", value: "12" },
      { label: "Ticket médio", value: "+14%" },
    ],
    stack: ["BI", "RPA", "Ads"],
  },
  {
    icon: Bot,
    sector: "Backoffice",
    title: "Automação financeira",
    desc: "Bots de RPA para conciliação bancária, emissão de notas e cobrança automática integrados ao ERP do cliente.",
    metrics: [
      { label: "Horas/mês economizadas", value: "320h" },
      { label: "Erros operacionais", value: "-94%" },
    ],
    stack: ["RPA", "ERP", "IA"],
  },
  {
    icon: MessageSquare,
    sector: "Serviços",
    title: "Agente de IA no WhatsApp",
    desc: "Atendimento 24/7 que qualifica o lead, faz o agendamento e move o cliente dentro do CRM sem intervenção humana.",
    metrics: [
      { label: "Leads qualificados", value: "+220%" },
      { label: "Resposta média", value: "< 30s" },
    ],
    stack: ["IA", "WhatsApp", "CRM"],
  },
  {
    icon: LineChart,
    sector: "Performance",
    title: "Tráfego pago + rastreamento",
    desc: "Configuração completa de Google Tag Manager e Pixel da Meta, com dashboard executivo unificando funil e receita.",
    metrics: [
      { label: "ROAS", value: "4.6x" },
      { label: "CPA", value: "-41%" },
    ],
    stack: ["GTM", "Meta Ads", "BI"],
  },
  {
    icon: Building2,
    sector: "Corporativo",
    title: "Site de alta conversão",
    desc: "Desenvolvimento padrão 2026 com foco em SEO, velocidade e CRO. Site vira ativo de aquisição, não cartão de visita digital.",
    metrics: [
      { label: "Conversão", value: "+38%" },
      { label: "Core Web Vitals", value: "100%" },
    ],
    stack: ["SEO", "CRO", "Analytics"],
  },
];

export const Projetos = () => {
  return (
    <section
      id="projetos"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/4 h-[500px] w-[600px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Projetos realizados</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Casos reais,
            <br />
            resultados medidos.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Uma seleção de operações onde o Hub Nexus assumiu o setor digital
            ponta a ponta — do CRM ao dashboard.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <p.icon className="h-5 w-5 text-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {p.sector}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
              </div>

              <h3 className="mt-7 font-display text-2xl font-semibold tracking-tight text-foreground">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border/60 pt-6">
                {p.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-2xl font-bold tracking-tight text-foreground">
                      {m.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm text-foreground transition-colors hover:bg-secondary"
          >
            Quero um projeto como esses
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
