import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Stethoscope, Radio } from "lucide-react";

const areas = [
  { icon: Briefcase, title: "Administrativo & Financeiro", desc: "Fluxos de caixa, conciliação bancária e gestão documental automatizados." },
  { icon: TrendingUp, title: "Comercial & Vendas", desc: "Gestão inteligente de leads, follow-ups automáticos e fechamento orquestrado." },
  { icon: Stethoscope, title: "Setores Específicos", desc: "Soluções sob medida para Clínicas, Advocacias, Indústrias e Varejo." },
  { icon: Radio, title: "Infraestrutura Física", desc: "Controle, sensoriamento e monitoramento de ativos via IoT em tempo real." },
];

export const Areas = () => (
  <section id="areas" className="container py-24 md:py-32">
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-accent">Áreas de Transformação</span>
      <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Uma única solução para <span className="text-gradient">múltiplos cenários</span>
      </h2>
    </div>

    <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {areas.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <a.icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-lg font-semibold">{a.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
