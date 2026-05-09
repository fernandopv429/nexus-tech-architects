import { motion } from "framer-motion";
import { ShieldCheck, Zap, Target } from "lucide-react";

const props = [
  {
    icon: ShieldCheck,
    title: "Responsabilidade Técnica",
    desc: "Você deixa de se preocupar com ferramentas e softwares. Nós garantimos que a tecnologia trabalhe para o seu negócio.",
  },
  {
    icon: Zap,
    title: "Agilidade na Implementação",
    desc: "Expertise consolidada em RPA, IA e marketing de performance permite mudar o patamar da operação em semanas — não em meses.",
  },
  {
    icon: Target,
    title: "Foco no Core Business",
    desc: "Deixe a complexidade técnica com o nosso Hub e foque no que realmente importa: o crescimento da sua empresa.",
  },
];

export const Valor = () => (
  <section id="valor" className="bg-background py-32 md:py-40">
    <div className="container">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm text-muted-foreground">Diferencial Nexus</p>
        <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
          Por que assumimos
          <br />a sua tecnologia?
        </h2>
      </div>

      <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-3xl border border-border bg-card p-10"
          >
            <div className="mb-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
              <p.icon className="h-5 w-5 text-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {p.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
