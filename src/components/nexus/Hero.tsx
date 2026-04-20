import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./WhatsAppButton";

export const Hero = () => {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-24"
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[500px] rounded-full bg-accent/5 blur-[140px]" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Eyebrow */}
          <p className="text-sm text-muted-foreground md:text-base">
            CTO as a Service · Departamento de Tecnologia Externo
          </p>

          {/* Massive headline — Framer style */}
          <h1 className="mt-6 font-display text-[clamp(3rem,10vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Seu Departamento
            <br />
            de Tecnologia
          </h1>

          {/* Sub */}
          <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            Assumimos a tecnologia do seu negócio para que você foque na
            estratégia. Automação, RPA, IA e IoT em um único Hub de melhoria
            contínua.
          </p>

          {/* Pill buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="pill" size="pill" asChild>
              <a href="#contato">Falar com nosso time</a>
            </Button>
            <Button variant="pill-ghost" size="pill" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                WhatsApp direto
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
