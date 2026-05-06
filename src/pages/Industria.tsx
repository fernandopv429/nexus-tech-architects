import { motion } from "framer-motion";
import { ArrowUpRight, Check, Cpu, ShieldCheck, Wifi, Activity, Home, Zap, Bell, Gauge, Lock, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/nexus/Navbar";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { ContactForm } from "@/components/nexus/ContactForm";
import { useSEO } from "@/hooks/useSEO";

const SITE = "https://go.nexusdevhub.com";

const diferenciais = [
  {
    icon: Cpu,
    title: "Hardware próprio, sob medida",
    desc: "Nada de gadgets de prateleira que travam no primeiro update. Projetamos sensores e controladores específicos para a sua operação — com a precisão que a engenharia industrial exige.",
  },
  {
    icon: Workflow,
    title: "Um ecossistema. Um painel.",
    desc: "Esqueça 10 aplicativos diferentes brigando entre si. Tudo centralizado em um único dashboard — ou direto no seu WhatsApp, do jeito que você já usa.",
  },
  {
    icon: Lock,
    title: "Privacidade e estabilidade reais",
    desc: "Sistemas que rodam offline, sem depender da nuvem de terceiros. Seus dados ficam com você, e a automação continua funcionando mesmo quando a internet cai.",
  },
];

const industrial = [
  {
    icon: Activity,
    title: "Monitoramento de ativos",
    desc: "A saúde das suas máquinas em tempo real. Vibração, temperatura, corrente e consumo — tudo visível, tudo rastreado, tudo acionável.",
  },
  {
    icon: Gauge,
    title: "Redução de custos com dados",
    desc: "Gestão de energia e insumos baseada em medição, não em achismo. Identifique desperdícios invisíveis e corte custos onde realmente dói.",
  },
  {
    icon: Bell,
    title: "Manutenção preditiva",
    desc: "Alertas automáticos antes da máquina parar. A produção continua, o prejuízo não acontece, e a equipe age com tempo — não com pressa.",
  },
];

const residencial = [
  {
    icon: Home,
    title: "Cenas inteligentes",
    desc: "Iluminação, climatização e áudio que se ajustam à sua rotina automaticamente. Você chega, a casa responde — sem apertar nada.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança preditiva com IA",
    desc: "Câmeras com inteligência que diferenciam o gato do vizinho de uma ameaça real. Menos alarme falso, mais resposta no momento certo.",
  },
  {
    icon: Zap,
    title: "Gestão energética",
    desc: "Dispositivos automatizados para reduzir consumo sem abrir mão do conforto. Economia mensal mensurável, sem trocar seu padrão de vida.",
  },
];

const fluxo = [
  {
    n: "01",
    title: "Mapeamento de necessidades",
    desc: "Analisamos sua planta industrial ou sua rotina doméstica e identificamos os pontos de maior impacto — onde cada real investido devolve mais.",
  },
  {
    n: "02",
    title: "Desenvolvimento e implementação",
    desc: "Instalamos sensores, configuramos integrações e entregamos um ecossistema personalizado. Sem obra pesada, sem parar a operação, sem dor de cabeça.",
  },
  {
    n: "03",
    title: "Gestão na palma da mão",
    desc: "Você recebe um dashboard exclusivo e alertas inteligentes via WhatsApp ou Telegram. Controle total, no canal que você já usa todo dia.",
  },
];

const bullets = [
  "Máquinas que quebram sem aviso e param a produção inteira",
  "Manutenção corretiva custando mais do que deveria, todo mês",
  "Zero visibilidade do que realmente acontece no chão de fábrica",
  "Decisões críticas tomadas no “achismo”, sem dado nenhum",
  "Falhas recorrentes que ninguém prevê a tempo de evitar",
  "Energia, tempo e insumos vazando sem você nem perceber",
];

const Industria = () => {
  useSEO({
    title: "Automação Industrial e Residencial com IoT | Nexus DevHub",
    description:
      "Da fábrica ao seu living: monitoramento industrial 24/7 e automação residencial com a robustez da engenharia de software. Alertas no WhatsApp e investimento a partir de R$ 1.299.",
    canonical: "/industria",
    keywords:
      "automação industrial, automação residencial, IoT, monitoramento de máquinas, manutenção preditiva, casa inteligente, alertas WhatsApp",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Indústria & Residencial — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        description:
          "Automação industrial e residencial com hardware próprio, IoT e integração via WhatsApp.",
        serviceType: "Automação IoT Industrial e Residencial",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Indústria", item: `${SITE}/industria` },
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
            <nav aria-label="Breadcrumb" className="mb-4 flex justify-center">
              <ol className="flex items-center gap-2 text-xs text-muted-foreground">
                <li><a href="/" className="hover:text-foreground">Início</a></li>
                <li aria-hidden="true">/</li>
                <li className="text-foreground" aria-current="page">Indústria & Residencial</li>
              </ol>
            </nav>
            <p className="text-sm text-muted-foreground">
              Indústria · Residencial · Automação inteligente
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Inteligência Operacional e
              <br />
              <span className="text-muted-foreground">Conforto de Alto Padrão.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground md:text-xl">
              Da fábrica ao seu living.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
              Sua operação industrial rodando 24/7 sem falhas. Sua residência automatizada com a
              robustez da engenharia de software. Projetos escaláveis a partir de R$ 1.299.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="pill" size="pill" asChild>
                <a href="#contato">Quero um diagnóstico gratuito</a>
              </Button>
              <Button variant="pill-ghost" size="pill" asChild>
                <a href="/#calculadora">Calcular minha economia</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dores / Bullets */}
      <section className="bg-background py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Soa familiar?</p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Os custos invisíveis que corroem sua operação.
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
            {bullets.map((b, i) => (
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

      {/* Diferenciação */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Por que a Nexus?</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Confiabilidade industrial, agora dentro de casa.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Muita solução de automação trava, depende de app instável e some quando a internet
              cai. A gente faz o caminho inverso: traz a robustez da automação industrial para o
              ambiente residencial — e mantém o padrão profissional na fábrica.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
            {diferenciais.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-3xl border border-border bg-card p-8"
              >
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <d.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Áreas de atuação */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Onde atuamos</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Duas frentes. Uma engenharia.
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2">
            {/* Indústria */}
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <Wifi className="h-5 w-5 text-foreground" />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Nexus Indústria
                </p>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
                Sua linha de produção, sob controle.
              </h3>
              <ul className="mt-8 space-y-6">
                {industrial.map((s) => (
                  <li key={s.title} className="flex gap-4">
                    <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                      <s.icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Residencial */}
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <Home className="h-5 w-5 text-foreground" />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Nexus Residencial
                </p>
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
                Sua casa, no padrão de quem entende de tecnologia.
              </h3>
              <ul className="mt-8 space-y-6">
                {residencial.map((s) => (
                  <li key={s.title} className="flex gap-4">
                    <div className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background">
                      <s.icon className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxo de entrega */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Como entregamos</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Do diagnóstico ao controle total — em três etapas.
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
            {fluxo.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-border bg-card p-8"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {f.n}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case / CTA final */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-10 md:p-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Diagnóstico gratuito
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground">
              20 minutos. Números reais. Zero compromisso.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Em uma conversa rápida, mostramos onde sua operação — industrial ou residencial —
              está perdendo dinheiro hoje e quanto você pode economizar nos próximos 6 meses com
              automação inteligente. Sem venda forçada, só dados da sua realidade.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 md:grid-cols-3">
              <div>
                <div className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">27</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Paradas evitadas</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">+19%</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ganho de eficiência</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">12%</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Energia economizada</div>
              </div>
            </div>
            <a
              href="#contato"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              Quero um projeto como esse
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted-foreground">
            Nexus — Departamento de tecnologia sob demanda. Especialistas em RPA, Inteligência
            Artificial e IoT Industrial e Residencial.
          </p>
        </div>
      </section>

      <ContactForm />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
};

export default Industria;
