import { motion } from "framer-motion";
import { ShieldCheck, Zap, Target } from "lucide-react";

const props = [
  {
    icon: ShieldCheck,
    title: "SEM LOCK-IN TÉCNICO",
    desc: "Os dados e a propriedade são sempre seus. Nós garantimos que a tecnologia trabalhe para o seu negócio, sem te deixar refém.",
  },
  {
    icon: Zap,
    title: "AGILIDADE NA IMPLEMENTAÇÃO",
    desc: "Expertise consolidada em RPA, IA e marketing de performance permite mudar o patamar da operação em semanas — não em meses.",
  },
  {
    icon: Target,
    title: "FOCO NO CORE BUSINESS",
    desc: "Deixe a complexidade técnica com o nosso Hub e foque no que realmente importa: o crescimento da sua empresa.",
  },
];

export const Valor = () => (
  <section
    id="valor"
    className="relative isolate overflow-hidden bg-background py-32 md:py-40"
  >
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/4 top-1/3 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[160px]" />
    </div>

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative ml-auto max-w-4xl text-right"
      >
        <div className="flex items-center justify-end gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/90 md:text-xs">
            Diferencial Nexus
          </span>
          <span className="inline-block h-10 w-10 bg-primary/90 shadow-glow md:h-12 md:w-12" />
        </div>
        <h2 className="relative -mt-2 select-none font-display font-bold leading-[0.88] tracking-[-0.05em] text-foreground md:-mt-3">
          <span className="block text-[clamp(2.75rem,9vw,7rem)] text-muted-foreground/60">
            Por que
          </span>
          <span className="block text-[clamp(2.75rem,9vw,7rem)]">
            assumimos?
          </span>
        </h2>
        <div className="mt-4 flex items-center justify-end gap-3 pr-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
          <span className="h-px w-24 bg-border" />
          <span>Nossa proposta</span>
          <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/60" />
        </div>
      </motion.div>

      <div className="mt-16 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-sm border border-border/60 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/60 md:w-auto md:shrink"
          >
            <div className="mb-8 flex items-center justify-between">
              <p.icon className="h-5 w-5 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              {p.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.desc}
            </p>
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);
