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
    desc: "Expertise consolidada em RPA, IA e IoT permite mudar o patamar da operação em semanas — não em meses.",
  },
  {
    icon: Target,
    title: "Foco no Core Business",
    desc: "Deixe a complexidade técnica com o nosso Hub e foque no que realmente importa: o crescimento da sua empresa.",
  },
];

export const Valor = () => (
  <section id="valor" className="container py-24 md:py-32">
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-wider text-accent">Diferencial Nexus</span>
      <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
        Por que assumimos a<br />
        <span className="text-gradient">tecnologia da sua empresa?</span>
      </h2>
    </div>

    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {props.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative rounded-2xl border border-border bg-card/30 p-8 text-center backdrop-blur-sm"
        >
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <p.icon className="h-7 w-7 text-primary-glow" />
          </div>
          <h3 className="font-display text-xl font-semibold">{p.title}</h3>
          <p className="mt-3 text-muted-foreground">{p.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
