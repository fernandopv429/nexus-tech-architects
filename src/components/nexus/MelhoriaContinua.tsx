import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const MelhoriaContinua = () => (
  <section id="melhoria" className="relative overflow-hidden bg-background py-32 md:py-40">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[160px]" />
    </div>

    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mb-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
          <ShieldCheck className="h-5 w-5 text-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">Seu seguro contra a obsolescência</p>
        <h2 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
          Melhoria contínua,
          <br />
          sem custo extra.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A tecnologia muda toda semana. Se você contratar um funcionário, ele
          fica obsoleto. Se você contratar a Nexus,{" "}
          <strong className="font-medium text-foreground">
            implementamos as novas tecnologias do mercado no seu negócio sem
            que você pague nada a mais por isso
          </strong>
          . Somos o seu seguro contra a obsolescência digital.
        </p>
      </motion.div>
    </div>
  </section>
);
