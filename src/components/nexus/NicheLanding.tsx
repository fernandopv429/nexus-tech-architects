import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/nexus/Navbar";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { ContactForm } from "@/components/nexus/ContactForm";
import { useSEO } from "@/hooks/useSEO";

export type NichePageProps = {
  eyebrow: string;
  headline: string;
  headlineHighlight: string;
  sub: string;
  bullets: string[];
  caseTitle: string;
  caseDesc: string;
  caseMetrics: { label: string; value: string }[];
  servicos: { title: string; desc: string }[];
  ctaPrimary?: string;
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  segmentName: string;
};

export const NicheLanding = (props: NichePageProps) => {
  const SITE = "https://go.nexusdevhub.com";
  useSEO({
    title: props.seoTitle,
    description: props.seoDescription,
    canonical: props.canonicalPath,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${props.segmentName} — Nexus DevHub`,
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        description: props.seoDescription,
        serviceType: props.segmentName,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Soluções para ${props.segmentName}`,
          itemListElement: props.servicos.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.desc },
          })),
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: props.segmentName, item: `${SITE}${props.canonicalPath}` },
        ],
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background pt-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="text-sm text-muted-foreground">{props.eyebrow}</p>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              {props.headline}
              <br />
              <span className="text-muted-foreground">
                {props.headlineHighlight}
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              {props.sub}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="pill" size="pill" asChild>
                <a href="#contato">{props.ctaPrimary ?? "Falar com especialista"}</a>
              </Button>
              <Button variant="pill-ghost" size="pill" asChild>
                <a href="/#calculadora">Calcular minha economia</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bullets */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {props.bullets.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <p className="text-sm text-foreground">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">O que fazemos</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Soluções específicas para sua operação.
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {props.servicos.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-card p-7"
              >
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-10 md:p-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Caso real
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground">
              {props.caseTitle}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {props.caseDesc}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 md:grid-cols-3">
              {props.caseMetrics.map((m) => (
                <div key={m.label}>
                  <div className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                    {m.value}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#contato"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              Quero um projeto como esse
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
};
