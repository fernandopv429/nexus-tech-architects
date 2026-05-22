import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./WhatsAppButton";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";
import { VideoSection } from "./VideoSection";

export type HeroProps = {
  eyebrow?: string;
  headline?: React.ReactNode;
  description?: string;
  priceAnchor?: string;
  mockupImage?: string;
  mockupImages?: string[];
};

const DEFAULT_HEADLINE = (
  <>
    Sua empresa com um
    <br />
    <span className="text-foreground">Setor Digital de Elite</span>
    <br />
    por uma fração do custo
    <br />
    de um funcionário.
  </>
);

export const Hero = ({
  eyebrow = "Setor Digital · CRM Inteligente · IA · Dados · Sites",
  headline = DEFAULT_HEADLINE,
  description = "Assumimos toda a tecnologia do seu negócio: do CRM Inteligente com IA à análise de dados e desenvolvimento de sites. Pare de gerenciar ferramentas e comece a gerenciar lucros.",
  priceAnchor,
  mockupImage,
  mockupImages,
}: HeroProps) => {
  const images = mockupImages && mockupImages.length > 0 ? mockupImages : mockupImage ? [mockupImage] : [];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setImgIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  const currentImage = images[imgIndex];
  return (
    <>
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-accent/5 blur-[140px]" />
        </div>

        <div className="container relative">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center lg:text-left"
            >
              <p className="text-sm text-muted-foreground md:text-base">
                {eyebrow}
              </p>

              <h1 className="mt-6 font-display text-[clamp(2rem,6.5vw,4.75rem)] font-bold leading-[1] tracking-[-0.04em] text-foreground">
                {headline}
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg lg:mx-0">
                {description}
              </p>

              {priceAnchor && (
                <div className="mt-6 flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-foreground md:text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {priceAnchor}
                  </span>
                </div>
              )}

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button variant="pill" size="pill" asChild>
                  <a
                    href="#calculadora"
                    onClick={() =>
                      trackCTAClick(
                        "Quero ativar meu setor digital",
                        "hero",
                        "#calculadora"
                      )
                    }
                  >
                    Quero ativar meu Setor Digital
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

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground lg:justify-start">
                <span>✓ Diagnóstico gratuito</span>
                <span>✓ Sem implantação</span>
                <span>✓ Resposta em 24h</span>
              </div>
            </motion.div>

            {/* Right column — mockup */}
            {currentImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="relative aspect-[16/10]">
                  <AnimatePresence mode="sync">
                    <motion.img
                      key={currentImage}
                      src={currentImage}
                      alt="Painel da plataforma Nexus DevHub"
                      loading="eager"
                      fetchPriority="high"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </AnimatePresence>
                </div>

                {/* Dots indicator */}
                {images.length > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        aria-label={`Mostrar mockup ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          i === imgIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Floating tag */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 shadow-xl backdrop-blur md:-bottom-6 md:-left-6"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                  </span>
                  <span className="text-xs font-medium text-foreground md:text-sm">
                    IA Respondendo Agora
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Vídeo institucional — renderização imediata, sem lazy-load */}
      <section className="bg-background pt-10">
        <div className="container">
          <h2 className="mx-auto max-w-3xl text-center font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Entenda em 1 minuto como funciona o seu Setor Digital
          </h2>
        </div>
      </section>
      <VideoSection />
    </>
  );
};
