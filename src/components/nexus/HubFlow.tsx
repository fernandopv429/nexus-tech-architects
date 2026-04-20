import { motion } from "framer-motion";
import { Search, Cpu, TrendingUp } from "lucide-react";
import { DashboardMockup } from "./DashboardMockup";

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
    <section
      id="hub"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Como funciona o Hub</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Três fases.
            <br />
            Uma operação autônoma.
          </h2>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative rounded-3xl border border-border bg-card p-10 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <s.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="font-display text-sm font-medium text-muted-foreground">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
};
