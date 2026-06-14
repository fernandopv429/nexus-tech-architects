import { motion } from "framer-motion";
import { Briefcase, ShoppingCart, Factory } from "lucide-react";

const areas = [
  {
    icon: Briefcase,
    title: "SERVIÇOS E CONSULTORIAS",
    desc: "Agendamento inteligente que reduz no-show e qualifica leads de alto ticket — clínicas, advocacias e prestadores.",
  },
  {
    icon: ShoppingCart,
    title: "VAREJO E E-COMMERCE",
    desc: "Recuperação de carrinhos e retenção de clientes com IA conversacional que escala o faturamento no pós-venda.",
  },
  {
    icon: Factory,
    title: "INDÚSTRIAS E B2B",
    desc: "Gestão de funil complexo e automação de cobrança integrada ao seu ERP para eliminar gargalos operacionais.",
  },
];

export const Areas = () => (
  <section
    id="areas"
    className="relative isolate overflow-hidden bg-background py-32 md:py-40"
  >
    {/* Ambient glow */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute right-1/4 top-1/4 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[160px]" />
    </div>

    <div className="container">
      {/* Editorial header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl"
      >
        <div className="flex items-center gap-3 lg:ml-[4%]">
          <span className="inline-block h-10 w-10 bg-primary/90 shadow-glow md:h-12 md:w-12" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/90 md:text-xs">
            Para quem é a Nexus
          </span>
        </div>
        <h2 className="relative -mt-2 select-none font-display font-bold leading-[0.88] tracking-[-0.05em] text-foreground md:-mt-3">
          <span className="block text-[clamp(2.75rem,9vw,7rem)]">
            Tecnologia
          </span>
          <span className="block text-[clamp(2.75rem,9vw,7rem)] text-muted-foreground/60">
            adaptável.
          </span>
        </h2>
        <div className="mt-4 flex items-center gap-3 pl-1 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground md:pl-[4%]">
          <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/60" />
          <span>Setores atendidos</span>
          <span className="h-px w-24 bg-border" />
        </div>
      </motion.div>

      <div className="mt-16 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {areas.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-sm border border-border/60 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-card/60 md:w-auto md:shrink"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")} / {String(areas.length).padStart(2, "0")}
              </span>
              <a.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              {a.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {a.desc}
            </p>
            <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);
