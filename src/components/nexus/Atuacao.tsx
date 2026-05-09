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
    desc: "Jurídico, saúde, comercial e outros setores: mapeamos e automatizamos fluxos repetitivos, eliminando a dependência de tarefas manuais em qualquer área.",
  },
  {
    icon: Network,
    title: "Integração de Ecossistemas",
    desc: "Centralizamos CRM, WhatsApp, site e ferramentas em um único Hub inteligente — todos os dados e ações da empresa conectados.",
  },
  {
    icon: RefreshCw,
    title: "Sustentação e Evolução",
    desc: "Não apenas entregamos: mantemos e evoluímos sua infraestrutura tecnológica para que ela nunca fique obsoleta frente ao mercado.",
  },
];

export const Atuacao = () => {
  return (
    <section id="atuacao" className="bg-background py-32 md:py-40">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Nossa Atuação</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Gestão tecnológica
            <br />
            completa.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Mais que automação — uma operação inteira sob responsabilidade de
            engenharia.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group bg-background p-10 transition-colors hover:bg-secondary/40"
            >
              <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                <it.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                {it.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
