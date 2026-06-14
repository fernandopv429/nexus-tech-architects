import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./WhatsAppButton";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/analytics";
import { VideoSection } from "./VideoSection";
import heroBg from "@/assets/hero-editorial-bg.jpg";

export type HeroProps = {
  eyebrow?: string;
  headline?: React.ReactNode;
  description?: string;
  priceAnchor?: string;
  /** Mantido por compatibilidade — ignorado no novo layout editorial. */
  mockupImage?: string;
  mockupImages?: string[];
};

export const Hero = ({
  eyebrow = "CRM · IA · Automação · Dados",
  description = "Conectando o mundo físico ao digital através de inteligência, automação e dados em tempo real para acelerar decisões com precisão.",
  priceAnchor,
}: HeroProps) => {
  return (
    <>
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24"
      >
        {/* Background image — right side, fades to black on the left */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
          {/* Left-to-right fade to background */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
          {/* Subtle ambient glow */}
          <div className="absolute left-1/4 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
        </div>

        {/* Left side rail — small dots */}
        <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
          <span className="h-12 w-px bg-primary" />
          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="h-1 w-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Right side rail — social initials */}
        <div className="pointer-events-none absolute right-6 top-1/3 hidden flex-col items-end gap-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70 md:flex">
          <span>Vk</span>
          <span>Tw</span>
          <span>Fb</span>
          <span>In</span>
        </div>

        <div className="container relative">
          {/* Top markers — eyebrow tags floating */}
          <div className="relative mb-2 hidden items-center justify-end lg:flex">
            <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-px w-16 bg-border" />
              <span className="h-1.5 w-1.5 rounded-full border border-primary" />
              <span>Setor Digital</span>
            </div>
          </div>

          {/* GIANT HEADLINE BLOCK */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Eyebrow on top-left of the word */}
            <div className="relative ml-0 flex items-center gap-3 lg:ml-[8%]">
              {/* Accent square */}
              <span className="relative inline-block h-10 w-10 bg-primary/90 shadow-glow md:h-14 md:w-14" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/90 md:text-xs">
                {eyebrow}
              </span>
            </div>

            {/* The giant word */}
            <h1 className="relative -mt-3 select-none font-display font-bold leading-[0.85] tracking-[-0.06em] text-foreground md:-mt-5">
              <span className="block text-[clamp(4.5rem,18vw,17rem)]">NEXUS</span>
            </h1>

            {/* Small marker line under the word */}
            <div className="mt-3 flex items-center gap-3 pl-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground md:pl-[8%]">
              <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/60" />
              <span>Hub de tecnologia</span>
              <span className="h-px w-24 bg-border" />
            </div>
          </motion.div>

          {/* Bottom row — description + 2 mini cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-8"
          >
            {/* Description with vertical accent line */}
            <div className="lg:col-span-5">
              <div className="flex gap-4">
                <span className="mt-1 inline-block h-16 w-px shrink-0 bg-primary/70" />
                <div>
                  <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                    {description}
                  </p>

                  {priceAnchor && (
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-medium text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {priceAnchor}
                    </span>
                  )}

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Button variant="pill" size="pill" asChild>
                      <a
                        href="#calculadora"
                        onClick={() =>
                          trackCTAClick(
                            "Começar",
                            "hero",
                            "#calculadora"
                          )
                        }
                      >
                        Começar
                      </a>
                    </Button>
                    <Button variant="pill-ghost" size="pill" asChild>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick("hero")}
                      >
                        Falar com especialista
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty middle spacer */}
            <div className="hidden lg:col-span-1 lg:block" />

            {/* Two mini cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
              {[
                {
                  title: "CONECTIVIDADE",
                  desc: "Integração fluida de sistemas, CRM e WhatsApp para atendimento em tempo real com resposta adaptativa.",
                },
                {
                  title: "INTELIGÊNCIA",
                  desc: "Agentes de IA e análise de dados para detecção de oportunidades e automação completa da operação.",
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="group relative overflow-hidden rounded-sm border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/60"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
                    {c.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vídeo institucional */}
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
