import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  Calendar,
  RefreshCw,
  Bot,
  Globe,
  LineChart,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/nexus/Navbar";
import { Footer } from "@/components/nexus/Footer";
import { WhatsAppFloating } from "@/components/nexus/WhatsAppButton";
import { ContactForm } from "@/components/nexus/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSEO } from "@/hooks/useSEO";
import iaFace from "@/assets/medico/ia-face.jpg";
import crmFlow from "@/assets/medico/crm-flow.jpg";
import dadosMobile from "@/assets/medico/dados-mobile.jpg";
import parceria from "@/assets/medico/parceria.jpg";

const SITE = "https://go.nexusdevhub.com";

const operacao = [
  {
    icon: MessageCircle,
    title: "Centralização total",
    desc: "Atendimento de WhatsApp e Instagram em um só lugar. Nada de mensagem perdida, nada de cliente esperando.",
  },
  {
    icon: Calendar,
    title: "Gestão de agenda",
    desc: "Sistema de agendamento inteligente, sincronizado com sua rotina e com o time. Confirmações e lembretes no automático.",
  },
  {
    icon: RefreshCw,
    title: "Recuperação de receita",
    desc: "Follow-up diário automático e cobrança ativa de inadimplentes. Receita que ia escapar volta para o seu caixa.",
  },
];

const ia = [
  {
    icon: Bot,
    title: "Agente de IA Autônomo",
    desc: "Não apenas responde — qualifica o lead, faz o agendamento e move o cliente dentro do CRM sem intervenção humana. 24 horas por dia, 7 dias por semana.",
  },
];

const presenca = [
  {
    icon: Globe,
    title: "Site de alta conversão",
    desc: "Desenvolvimento com foco em SEO e velocidade — padrão 2026. Seu site vira ativo de aquisição, não cartão de visita digital.",
  },
  {
    icon: LineChart,
    title: "Rastreamento profissional",
    desc: "Configuração completa de Google Tag Manager e Pixel da Meta. Nenhum centavo de marketing desperdiçado por falta de medição.",
  },
];

const dados = [
  {
    icon: LineChart,
    title: "Tradução de métricas",
    desc: "Analisamos o comportamento do seu cliente e traduzimos dados complexos em relatórios simples. Você decide o próximo passo com clareza, não com achismo.",
  },
];

const comparativo = [
  { interno: "Salário de Gestor de Tráfego + Dev + SDR", externo: "Um único valor acessível (R$ 1.299)" },
  { interno: "Custos com encargos e rescisões", externo: "Modelo de parceria flexível" },
  { interno: "Ferramentas pagas separadamente", externo: "Stack tecnológica completa inclusa" },
  { interno: "Você gerencia as pessoas", externo: "Nós gerenciamos a tecnologia por você" },
];

const faq = [
  {
    q: "Quando o valor sobe?",
    a: "Apenas após relatórios de performance comprovada — redução de custos ou aumento de leads qualificados. Se você não cresce, nós também não.",
  },
  {
    q: "O CRM já está incluso?",
    a: "Sim. Você recebe a estrutura pronta para uso, com integração total ao WhatsApp, Instagram e agenda.",
  },
  {
    q: "Preciso entender de tecnologia?",
    a: "Zero. Nós somos o seu braço direito tecnológico. Você foca no seu negócio, nós focamos no digital.",
  },
];

const Medico = () => {
  useSEO({
    title: "Setor Digital Próprio para sua Empresa | A partir de R$ 1.299 | Nexus DevHub",
    description:
      "Assumimos toda sua inteligência tecnológica, automação e marketing de performance. CRM, IA 24/7, site, tráfego e dados — em um único parceiro a partir de R$ 1.299/mês.",
    canonical: "/medico",
    keywords:
      "setor digital terceirizado, CTO terceirizado, automação de marketing, CRM com IA, agente de IA WhatsApp, Google Tag Manager, Pixel da Meta, gestor de tráfego",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Setor Digital Próprio — Nexus DevHub",
        provider: { "@type": "Organization", name: "Nexus DevHub", url: SITE },
        areaServed: { "@type": "Country", name: "Brasil" },
        description:
          "Setor digital terceirizado: CRM, IA 24/7, site de alta conversão, tráfego pago e BI a partir de R$ 1.299/mês.",
        serviceType: "Setor Digital Terceirizado",
        offers: {
          "@type": "Offer",
          price: "1299",
          priceCurrency: "BRL",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Setor Digital", item: `${SITE}/medico` },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero — Padrão Z */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-background pt-24">
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
                <li className="text-foreground" aria-current="page">Setor Digital</li>
              </ol>
            </nav>
            <p className="text-sm text-muted-foreground">
              Tecnologia · Automação · Performance
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.25rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
              Sua empresa agora tem um
              <br />
              <span className="text-muted-foreground">Setor Digital Próprio.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Assumimos toda a sua inteligência tecnológica, automação e marketing de
              performance. Você ganha eficiência, nós ganhamos com o seu crescimento.
            </p>
            <div className="mx-auto mt-8 inline-flex items-baseline gap-2 rounded-full border border-border bg-card px-5 py-2">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                A partir de
              </span>
              <span className="font-display text-2xl font-bold text-foreground">
                R$ 1.299
              </span>
              <span className="text-sm text-muted-foreground">/mês</span>
            </div>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="pill" size="pill" asChild>
                <a href="#contato">Ativar meu Setor Digital</a>
              </Button>
              <Button variant="pill-ghost" size="pill" asChild>
                <a href="#modelo">Como funciona</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inteligência por trás da Clínica */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-background/40" />
                <img
                  src={iaFace}
                  alt="Agente de IA Nexus DevHub atendendo leads em tempo real"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="relative h-full w-full object-cover [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]"
                />
              </div>
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">A inteligência por trás da sua clínica</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Um cérebro digital que <span className="text-muted-foreground">nunca dorme.</span>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                Nosso Agente de IA atende leads de WhatsApp e Instagram <span className="text-foreground font-semibold">24 horas por dia, 7 dias por semana</span>.
                Qualifica em segundos, responde com o tom da sua marca e marca o paciente na agenda
                — sem que ninguém da sua equipe precise digitar uma única palavra.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Enquanto você descansa, ele agenda. Enquanto você atende, ele filtra curiosos.
                A inteligência não substitui você — devolve o seu tempo.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section id="modelo" className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Por que nosso modelo é diferente?</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Não vendemos ferramentas. Entregamos resultados.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Seu investimento de <span className="font-semibold text-foreground">R$ 1.299</span> cobre
              a implementação e a operação da sua estrutura digital completa. Nosso valor só escala
              conforme sua empresa ganha eficiência e reduz custos.
            </p>
            <p className="mx-auto mt-4 max-w-2xl font-display text-xl font-semibold text-foreground md:text-2xl">
              Se você não cresce, nós também não.
            </p>
          </div>
        </div>
      </section>

      {/* Fluxo Estratégico e CRM */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div className="lg:order-2">
              <p className="text-sm text-muted-foreground">Fluxo estratégico · CRM</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Você no comando. <span className="text-muted-foreground">A tecnologia no trabalho pesado.</span>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                A IA não apenas responde — ela <span className="text-foreground font-semibold">move o lead dentro do CRM</span>:
                qualifica, agenda, envia confirmações, dispara lembretes e reativa pacientes inativos.
                Tudo registrado. Tudo rastreável.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Você abre o painel e vê o pipeline inteiro vivo: do primeiro clique no anúncio até o
                paciente sentado na sua cadeira. Sem planilha. Sem WhatsApp espalhado. Sem perda.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative lg:order-1"
            >
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-bl from-background/70 via-transparent to-background/40" />
                <img
                  src={crmFlow}
                  alt="Médico operando o CRM gerenciado pela IA da Nexus DevHub"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="relative h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* O que entrega */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">O que seu novo Setor Digital entrega</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Quatro frentes. Uma operação.
            </h2>
          </div>

          {/* A. Operação Blindada */}
          <div className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">A</span>
              <div className="h-px flex-1 bg-border" />
              <p className="font-display text-lg font-semibold text-foreground">Operação Blindada · CRM & Gestão</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {operacao.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-3xl border border-border bg-card p-7"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                    <s.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* B. IA */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">B</span>
              <div className="h-px flex-1 bg-border" />
              <p className="font-display text-lg font-semibold text-foreground">Inteligência Artificial · 24/7</p>
            </div>
            <div className="grid gap-6 md:grid-cols-1">
              {ia.map((s) => (
                <div key={s.title} className="rounded-3xl border border-border bg-card p-8 md:p-10">
                  <div className="flex items-start gap-5">
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                      <s.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* C. Presença */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">C</span>
              <div className="h-px flex-1 bg-border" />
              <p className="font-display text-lg font-semibold text-foreground">Presença e Aquisição</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {presenca.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-3xl border border-border bg-card p-7"
                >
                  <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                    <s.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* D. Dados */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">D</span>
              <div className="h-px flex-1 bg-border" />
              <p className="font-display text-lg font-semibold text-foreground">Decisões Baseadas em Dados</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
              <div className="flex items-start gap-5">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                  <LineChart className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{dados[0].title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">{dados[0].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Resultados reais</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Clínicas que já operam com Setor Digital próprio.
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3">
            {[
              {
                metric: "+312%",
                label: "agendamentos em 90 dias",
                quote: "Trocamos planilha e WhatsApp espalhado por uma operação centralizada. A IA agenda sozinha durante a madrugada — algo que era impossível antes.",
                author: "Dra. Camila R.",
                role: "Clínica de Estética · São Paulo/SP",
              },
              {
                metric: "−68%",
                label: "no custo por lead qualificado",
                quote: "Antes pagávamos caro por leads frios. Com o rastreamento profissional e o tráfego deles, o custo despencou e o paciente chega pronto para fechar.",
                author: "Dr. Henrique M.",
                role: "Odontologia Especializada · Curitiba/PR",
              },
              {
                metric: "R$ 84k",
                label: "recuperados em inadimplência",
                quote: "A cobrança ativa automática trouxe de volta receita que estava parada há meses. Pagou o serviço várias vezes só no primeiro trimestre.",
                author: "Dra. Letícia A.",
                role: "Clínica Multiespecialidades · Belo Horizonte/MG",
              },
            ].map((c, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-3xl border border-border bg-card p-7"
              >
                <div className="border-b border-border pb-5">
                  <p className="font-display text-4xl font-bold tracking-tight text-foreground">
                    {c.metric}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </p>
                </div>
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                  “{c.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{c.author}</p>
                  <p className="text-xs text-muted-foreground">{c.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativo */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm text-muted-foreground">Comparativo de custo-benefício</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Contratar um time inteiro? Ou ter um setor inteiro?
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-border">
            <div className="grid grid-cols-2">
              <div className="bg-card/50 p-6 md:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Contratar internamente
                </p>
              </div>
              <div className="bg-card p-6 md:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-foreground">
                  Nosso Setor Digital Externo
                </p>
              </div>
            </div>
            {comparativo.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-t border-border"
              >
                <div className="flex items-start gap-3 bg-card/50 p-6 md:p-8">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{row.interno}</p>
                </div>
                <div className="flex items-start gap-3 bg-card p-6 md:p-8">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                  <p className="text-sm text-foreground">{row.externo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Perguntas frequentes</p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                Sem letra miúda.
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {faq.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-display text-base font-semibold text-foreground md:text-lg">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-background py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-card p-10 md:p-16">
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Ative agora
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight tracking-tight text-foreground">
              Seu Setor Digital começa hoje. A partir de R$ 1.299/mês.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Implementação, operação e tecnologia inclusas. Sem contratação, sem encargos,
              sem ferramentas avulsas. Um parceiro técnico que cresce junto com você.
            </p>
            <a
              href="#contato"
              className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              Ativar meu Setor Digital
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

export default Medico;
