import { motion } from "framer-motion";

export const SplineWidget = () => {
  return (
    <section
      id="widget"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Painel interativo</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Seu setor digital,
            <br />
            ao vivo.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Visualize em tempo real o tipo de inteligência que entregamos —
            métricas, IA e operação no mesmo painel.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-16 aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-3xl border border-border bg-card shadow-card"
        >
          <iframe
            src="https://my.spline.design/widgetlytic-wBD9P5EdDtwrUl7AySSWxT2f-lnr/"
            title="Painel interativo Nexus"
            loading="lazy"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            className="h-full w-full border-0"
          />
        </motion.div>
      </div>
    </section>
  );
};
