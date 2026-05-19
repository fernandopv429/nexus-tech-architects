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
    <section id="contraste" className="bg-background py-32 md:py-40">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">A conta que ninguém te mostra</p>
          <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Por que contratar a Nexus
            <br />
            e não montar uma equipe interna?
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
          {/* Evita */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-border bg-card p-8 md:p-10"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              O que você evita
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
              Equipe interna tradicional
            </h3>
            <ul className="mt-8 space-y-4">
              {evita.map((e) => (
                <li key={e.label} className="flex items-center justify-between gap-4 border-b border-border pb-4 last:border-b-0">
                  <span className="flex items-center gap-3 text-muted-foreground">
                    <X className="h-4 w-4 text-destructive/70" />
                    {e.label}
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">{e.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-baseline justify-between border-t border-border pt-6">
              <span className="text-sm uppercase tracking-widest text-muted-foreground">Total</span>
              <span className="font-display text-xl font-bold text-foreground">Custo mensal elevado</span>
            </div>
          </motion.div>

          {/* Ganha */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-foreground/20 bg-foreground p-8 text-background md:p-10"
          >
            <p className="text-xs uppercase tracking-widest opacity-60">
              O que você ganha
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold">
              Nexus DevHub
            </h3>
            <ul className="mt-8 space-y-4">
              {ganha.map((g) => (
                <li key={g} className="flex items-center gap-3 border-b border-background/10 pb-4 last:border-b-0">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-baseline justify-between border-t border-background/20 pt-6">
              <span className="text-sm uppercase tracking-widest opacity-60">Total</span>
              <span className="font-display text-xl font-bold">Valor após diagnóstico</span>
            </div>
          </motion.div>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          Empresas que centralizam sua tecnologia com a Nexus Hub escalam até 3x mais rápido — sem inflar a folha de pagamento.
        </p>
      </div>
    </section>
  );
};
