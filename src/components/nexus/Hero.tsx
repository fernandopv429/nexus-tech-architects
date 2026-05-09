import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./WhatsAppButton";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";

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
            Hub de Tecnologia · Automação · IA · IoT
          </p>

          {/* Massive headline — ROI-driven + keyword principal */}
          <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            <span className="sr-only">Nexus DevHub — Automação, IA e IoT para empresas. </span>
            Recupere 20h
            <br />
            da sua semana.
          </h1>

          {/* Sub: dor financeira + prova de tecnologia (com keywords) */}
          <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            Departamento de tecnologia sob demanda para empresas no Brasil.
            Automatizamos processos com <strong className="font-medium text-foreground">RPA, Inteligência Artificial e IoT</strong> —
            sua operação rodando 24/7 sem aumentar a folha. Projetos de automação escaláveis com investimentos a partir de <strong className="font-medium text-foreground">R$ 1.299</strong>.
          </p>

          {/* Pill buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="pill" size="pill" asChild>
              <a
                href="#calculadora"
                onClick={() => trackCTAClick("Calcular minha economia", "hero", "#calculadora")}
              >
                Calcular minha economia
              </a>
            </Button>
            <Button variant="pill-ghost" size="pill" asChild>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("hero")}
              >
                Diagnóstico no WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
            <span>✓ Diagnóstico gratuito em 5 min</span>
            <span>✓ Sem custo de implantação inicial</span>
            <span>✓ Resposta em até 24h úteis</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
