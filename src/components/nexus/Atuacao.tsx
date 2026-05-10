import { motion } from "framer-motion";
import { MessageSquare, Bot, RotateCcw, BarChart3, Globe } from "lucide-react";

const items = [
  {
    icon: MessageSquare,
    title: "CRM Robusto & Omnichannel",
    desc: "Centralizamos seu WhatsApp, Instagram e Facebook em uma única tela. Não perca nenhum lead por falta de resposta.",
  },
  {
    icon: Bot,
    title: "Agentes de IA 24/7",
    desc: "IAs configuráveis que fazem o pré-atendimento, qualificam o lead e preenchem os dados direto no seu CRM enquanto você dorme.",
  },
  {
    icon: RotateCcw,
    title: "Recuperação de Vendas",
    desc: "Sistemas automáticos de follow-up e cobrança de inadimplentes para resgatar o faturamento perdido.",
  },
  {
    icon: BarChart3,
    title: "Análise e Tradução de Dados",
    desc: "Não entregamos apenas números. Traduzimos métricas em decisões estratégicas para a sua gestão.",
  },
  {
    icon: Globe,
    title: "Site e Infraestrutura",
    desc: "Desenvolvemos sua presença digital com SEO, traqueamento (Pixel/Meta) e foco total em conversão.",
  },
];

export const Atuacao = () => {
  return (
    <section id="atuacao" className="bg-background py-32 md:py-40">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Pilares da operação</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Tudo que sua empresa
            <br />
            precisa, em um só lugar.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Cinco frentes integradas operando juntas — sem ferramentas soltas,
            sem fornecedores desconectados.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
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
