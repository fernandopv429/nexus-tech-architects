import { motion } from "framer-motion";
import { Search, Cpu, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Diagnóstico",
    desc: "Imersão profunda na sua operação. Mapeamos processos, identificamos gargalos e desenhamos a arquitetura ideal.",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Implementação",
    desc: "Construímos automações com RPA, IA e IoT — integrando software e hardware em um único Hub inteligente.",
  },
  {
    n: "03",
    icon: TrendingUp,
    title: "Melhoria Contínua",
    desc: "Sustentamos, evoluímos e otimizamos constantemente para que a sua tecnologia nunca pare de gerar valor.",
  },
];

export const HubFlow = () => {
  return (
    <section id="hub" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-brand-soft opacity-40" />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Como funciona o Hub</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Três fases.<br />
            <span className="text-gradient">Uma operação autônoma.</span>
          </h2>
        </div>

        <div className="relative mt-20">
          {/* connecting line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />

          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass relative rounded-2xl p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div className="font-display text-5xl font-bold text-gradient opacity-90">{s.n}</div>
                  <h3 className="mt-2 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
