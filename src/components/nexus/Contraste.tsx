import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const evita = [
  { label: "Desenvolvedor", price: "Custo alto" },
  { label: "Gestor de CRM", price: "Custo alto" },
  { label: "Especialista em IA", price: "Custo alto" },
  { label: "Assinaturas de softwares", price: "Custo recorrente" },
];

const ganha = [
  "Setor Digital completo",
  "Softwares próprios inclusos",
  "Inteligência Artificial integrada",
  "Melhoria contínua mensal",
];

export const Contraste = () => {
  return (
    <section
      id="contraste"
      className="relative isolate overflow-hidden bg-background py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/3 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <div className="container">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl"
        >
          <div className="flex items-center gap-3 lg:ml-[4%]">
            <span className="inline-block h-10 w-10 bg-primary/90 shadow-glow md:h-12 md:w-12" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/90 md:text-xs">
              A conta que ninguém te mostra
            </span>
          </div>
          <h2 className="relative -mt-2 select-none font-display font-bold leading-[0.88] tracking-[-0.05em] text-foreground md:-mt-3">
            <span className="block text-[clamp(2.5rem,8vw,6rem)]">
              Por que contratar
            </span>
            <span className="block text-[clamp(2.5rem,8vw,6rem)] text-muted-foreground/60">
              e não montar um time?
            </span>
          </h2>
          <div className="mt-4 flex items-center gap-3 pl-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground md:pl-[4%]">
            <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/60" />
            <span>Comparativo de modelos</span>
            <span className="h-px w-24 bg-border" />
          </div>
        </motion.div>

        <div className="mt-16 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
          {/* Evita */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-sm border border-border/60 bg-card/40 p-8 backdrop-blur-sm md:p-10"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                O que você evita
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                01
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Equipe interna tradicional
            </h3>
            <ul className="mt-8 space-y-4">
              {evita.map((e) => (
                <li
                  key={e.label}
                  className="flex items-center justify-between gap-4 border-b border-border/60 pb-4 last:border-b-0"
                >
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    <X className="h-4 w-4 text-destructive/70" />
                    {e.label}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {e.price}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-baseline justify-between border-t border-border/60 pt-6">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Total
              </span>
              <span className="font-display text-lg font-bold text-foreground">
                Custo mensal elevado
              </span>
            </div>
          </motion.div>

          {/* Ganha */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-sm border border-primary/40 bg-foreground p-8 text-background md:p-10"
          >
            <span className="absolute left-0 top-0 h-1 w-full bg-primary/90" />
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] opacity-70">
                O que você ganha
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
                02
              </span>
            </div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              Nexus DevHub
            </h3>
            <ul className="mt-8 space-y-4">
              {ganha.map((g) => (
                <li
                  key={g}
                  className="flex items-center gap-3 border-b border-background/10 pb-4 text-sm last:border-b-0"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-baseline justify-between border-t border-background/20 pt-6">
              <span className="text-[10px] uppercase tracking-[0.28em] opacity-70">
                Total
              </span>
              <span className="font-display text-lg font-bold">
                Valor após diagnóstico
              </span>
            </div>
          </motion.div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Empresas que centralizam sua tecnologia com a Nexus Hub escalam até 3x
          mais rápido — sem inflar a folha de pagamento.
        </p>
      </div>
    </section>
  );
};
