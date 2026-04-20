import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { WHATSAPP_URL } from "./WhatsAppButton";

export const Hero = () => {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 bg-grid opacity-50" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            CTO as a Service · Departamento de Tecnologia Externo
          </span>

          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Seu Departamento de{" "}
            <span className="text-gradient">Inteligência e Tecnologia</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Assumimos a tecnologia do seu negócio para que você foque na estratégia.
            Implementamos melhoria contínua e automação de ponta a ponta — transformando
            processos manuais em uma operação autônoma e escalável.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button variant="hero" size="xl" asChild>
              <a href="#contato">
                Falar com nossa Engenharia
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1 h-4 w-4" />
                WhatsApp direto
              </a>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-10">
            {[
              { v: "RPA", l: "Automação Robótica" },
              { v: "IA", l: "Inteligência Artificial" },
              { v: "IoT", l: "Hardware Conectado" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-2xl font-bold text-gradient md:text-3xl">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
