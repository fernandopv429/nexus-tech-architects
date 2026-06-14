import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { WHATSAPP_URL } from "./WhatsAppButton";

const faqs = [
  {
    q: "O valor aumenta quando?",
    a: "Quando sua demanda e seu faturamento crescerem, nossa parceria evolui junto. É um modelo ganha-ganha: o investimento se ajusta conforme a operação escala — você nunca paga por capacidade que não está usando. O valor exato é apresentado após o diagnóstico gratuito.",
  },
  {
    q: "Já tenho um sistema, posso usar?",
    a: "Sim. Fazemos a integração completa com a sua infraestrutura atual — ERP, CRM, planilhas, e-commerce, gateways de pagamento e qualquer ferramenta legada. Você não precisa jogar nada fora para começar com a gente.",
  },
  {
    q: "O que é o modelo de Setor Digital da Nexus?",
    a: "Assumimos integralmente o setor digital da sua empresa. Você passa a contar com um time de engenharia sênior — arquitetos, devs, especialistas em RPA, IA e marketing de performance — sem precisar contratar, treinar ou manter estrutura interna. Atuamos como seu CTO e seu time, em um único contrato.",
  },
  {
    q: "Como funciona a contratação? É por projeto ou mensal?",
    a: "Trabalhamos no modelo de parceria mensal recorrente, com escopo dimensionado para a sua operação. Não vendemos projetos pontuais — vendemos sustentação e melhoria contínua. Após o diagnóstico inicial gratuito, definimos juntos o pacote ideal de horas e squad dedicado.",
  },
  {
    q: "Qual o SLA de atendimento e resposta?",
    a: "Incidentes críticos: resposta em até 1h, 24/7. Demandas de alta prioridade: até 4h em horário comercial. Evolução e novas automações: planejadas em sprints quinzenais. Todos os SLAs são formalizados em contrato e monitorados em dashboard transparente.",
  },
  {
    q: "Em quanto tempo vejo os primeiros resultados?",
    a: "Diagnóstico completo em 7 a 14 dias. Primeira automação em produção em 30 dias. Ganhos mensuráveis (horas economizadas, redução de erros, ROI) tipicamente a partir do segundo mês. Cada sprint entrega valor incremental — você não espera 6 meses para ver retorno.",
  },
  {
    q: "Quais tecnologias vocês dominam?",
    a: "RPA (n8n, Make, UiPath, automações custom em Python/Node), IA (OpenAI, Anthropic, modelos open-source, agentes autônomos, RAG), Marketing de Performance (Google Ads, Meta Ads, GTM, Pixel), Cloud (AWS, GCP, Supabase) e integrações com qualquer ERP, CRM ou sistema legado.",
  },
  {
    q: "Vocês fazem coleta e análise de dados para tomada de decisão?",
    a: "Sim. Estruturamos o ciclo completo: coleta automatizada (APIs, ERPs, CRMs, planilhas, web scraping), centralização em data warehouse (BigQuery, Postgres, Supabase), tratamento e modelagem (ETL/ELT em Python e dbt) e visualização em dashboards executivos (Metabase, Looker, Power BI). Aplicamos IA para detectar padrões, prever cenários e gerar alertas automáticos — transformando dado bruto em decisão acionável em tempo real.",
  },
  {
    q: "Vocês substituem meu time interno de TI?",
    a: "Não necessariamente. Atuamos de duas formas: como departamento de tecnologia completo para empresas que não possuem time interno, ou como extensão estratégica do time existente — assumindo automação, IA e infraestrutura enquanto seu time foca no core.",
  },
  {
    q: "E a propriedade do código e dos dados?",
    a: "Tudo é seu. Código-fonte, documentação, credenciais, infraestrutura e dados pertencem 100% à sua empresa. Entregamos repositórios versionados, documentação técnica e handover completo a qualquer momento, sem lock-in.",
  },
  {
    q: "Como começar?",
    a: "Agende uma conversa de diagnóstico gratuita. Em 45 minutos mapeamos seus principais gargalos, identificamos oportunidades de automação e desenhamos uma proposta sob medida. Sem compromisso, sem pressão comercial.",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/3 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[160px]" />
      </div>

      <div className="container">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-3">
              <span className="inline-block h-10 w-10 bg-primary/90 shadow-glow md:h-12 md:w-12" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/90 md:text-xs">
                FAQ
              </span>
            </div>
            <h2 className="relative -mt-2 select-none font-display font-bold leading-[0.88] tracking-[-0.05em] text-foreground md:-mt-3">
              <span className="block text-[clamp(2.5rem,7vw,5rem)]">
                Perguntas
              </span>
              <span className="block text-[clamp(2.5rem,7vw,5rem)] text-muted-foreground/60">
                frequentes.
              </span>
            </h2>
            <div className="mt-4 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full border border-muted-foreground/60" />
              <span>Dúvidas comuns</span>
              <span className="h-px w-16 bg-border" />
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Tudo que você precisa saber sobre o modelo CTO as a Service,
              prazos, SLA e como começar com a Nexus.
            </p>


            <div className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
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

          {/* Right — accordion */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="w-full"
            >
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="group py-6 text-left font-display text-lg font-medium tracking-tight text-foreground hover:no-underline md:text-xl">
                    <span className="flex items-start gap-4 pr-4">
                      <span className="mt-1 font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-colors group-hover:text-primary">
                        {f.q}
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 pr-4 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
