import { motion } from "framer-motion";
import { Activity, Workflow, Network, RefreshCw } from "lucide-react";

const items = [
  {
    icon: Activity,
    title: "Melhoria Contínua Operacional",
    desc: "Analisamos sua operação constantemente para identificar gargalos e implementar otimizações que reduzem custos e aumentam a velocidade de entrega.",
  },
  {
    icon: Workflow,
    title: "Engenharia de Processos Transversal",
    desc: "Jurídico, saúde, comercial ou industrial: mapeamos e automatizamos fluxos repetitivos, eliminando a dependência de tarefas manuais em qualquer setor.",
  },
  {
    icon: Network,
    title: "Integração de Ecossistemas",
    desc: "Centralizamos suas ferramentas e dispositivos IoT em um único Hub inteligente — todos os dados e ações da empresa conectados.",
  },
  {
    icon: RefreshCw,
    title: "Sustentação e Evolução",
    desc: "Não apenas entregamos: mantemos e evoluímos sua infraestrutura tecnológica para que ela nunca fique obsoleta frente ao mercado.",
  },
];

export const Atuacao = () => {
  return (
    <section id="atuacao" className="container py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-accent">Nossa Atuação</span>
        <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Mais que automação:<br />
          <span className="text-gradient">Gestão Tecnológica Completa</span>
        </h2>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-elegant"
          >
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />
            <div className="relative">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
                <it.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
