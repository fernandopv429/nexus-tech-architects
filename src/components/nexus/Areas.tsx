import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Stethoscope, MessageSquare } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "Administrativo & Financeiro",
    desc: "Fluxos de caixa, conciliação bancária e gestão documental automatizados.",
  },
  {
    icon: TrendingUp,
    title: "Comercial & Vendas",
    desc: "Gestão inteligente de leads, follow-ups automáticos e fechamento orquestrado.",
  },
  {
    icon: Stethoscope,
    title: "Setores Específicos",
    desc: "Soluções sob medida para Clínicas, Advocacias e Varejo.",
  },
  {
    icon: MessageSquare,
    title: "Atendimento & CRM",
    desc: "WhatsApp, Instagram e agenda centralizados, com agente de IA qualificando e agendando 24/7.",
  },
];

export const Areas = () => (
  <section id="areas" className="bg-background py-32 md:py-40">
    <div className="container">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-muted-foreground">Áreas de Transformação</p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
          Uma solução.
          <br />
          Múltiplos cenários.
        </h2>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group bg-background p-8 transition-colors hover:bg-secondary/40"
          >
            <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
              <a.icon className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
              {a.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {a.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
