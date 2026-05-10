import { motion } from "framer-motion";
import { Briefcase, ShoppingCart, Factory } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "Serviços e Consultorias",
    desc: "Agendamento inteligente e qualificação de leads de alto ticket — clínicas, advocacias, escritórios e prestadores.",
  },
  {
    icon: ShoppingCart,
    title: "Varejo e E-commerce",
    desc: "Recuperação de carrinhos, automações de pós-venda e retenção de clientes com IA conversacional.",
  },
  {
    icon: Factory,
    title: "Indústrias e B2B",
    desc: "Gestão de funil de vendas complexo, automação de cobrança e integração com ERPs e sistemas legados.",
  },
];

export const Areas = () => (
  <section id="areas" className="bg-background py-32 md:py-40">
    <div className="container">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-muted-foreground">Para quem é a Nexus</p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
          Tecnologia adaptável
          <br />
          para qualquer negócio.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
          Independente do segmento, se a sua empresa vende, a nossa estrutura
          acelera o resultado.
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-3xl border border-border bg-card p-10 transition-colors hover:border-foreground/20"
          >
            <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
              <a.icon className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {a.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
