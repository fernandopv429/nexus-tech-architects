import { NicheLanding } from "@/components/nexus/NicheLanding";

const Industria = () => (
  <NicheLanding
    canonicalPath="/industria"
    segmentName="Indústria"
    seoTitle="Monitoramento Industrial com IoT | Evite Falhas e Prejuízos"
    seoDescription="Monitore suas máquinas em tempo real, receba alertas no WhatsApp e evite paradas inesperadas. Diagnóstico gratuito da sua operação."
    seoKeywords="monitoramento industrial, IoT indústria, alertas WhatsApp, manutenção preditiva, redução de paradas, eficiência industrial"
    eyebrow="Indústria · Monitoramento inteligente"
    headline="Pare de perder dinheiro"
    headlineHighlight="com máquinas paradas."
    sub="Monitoramos seus equipamentos 24h por dia e avisamos no seu WhatsApp antes da falha acontecer. Sem técnico parado, sem produção parada, sem prejuízo."
    ctaPrimary="Quero monitorar minha operação"
    bullets={[
      "Sua máquina quebra e você só descobre quando a produção já parou",
      "Manutenção corretiva está custando mais do que deveria",
      "Você não tem visibilidade real do que acontece no chão de fábrica",
      "Decisões importantes são tomadas no “achismo”, sem dados",
      "Falhas recorrentes que ninguém consegue prever a tempo",
      "Energia, tempo e insumos sendo desperdiçados sem você saber",
    ]}
    servicos={[
      {
        title: "1. Diagnóstico gratuito",
        desc: "Visitamos (presencial ou online) sua operação, entendemos seus equipamentos e mostramos exatamente onde está vazando dinheiro.",
      },
      {
        title: "2. Instalação simples",
        desc: "Instalamos sensores nas máquinas críticas. Sem obra, sem parar a produção, sem complicação técnica para sua equipe.",
      },
      {
        title: "3. Monitoramento 24/7",
        desc: "Você acompanha tudo por um painel claro e recebe alertas no WhatsApp no momento em que algo sai do normal.",
      },
      {
        title: "Alertas no WhatsApp",
        desc: "Vibração estranha, temperatura alta, consumo fora do padrão? Você é avisado na hora, direto no celular — antes da quebra.",
      },
      {
        title: "Painel em tempo real",
        desc: "Veja produção, paradas, eficiência e consumo de qualquer lugar. Decisões baseadas em dados, não em suposições.",
      },
      {
        title: "Menos prejuízo, mais controle",
        desc: "Reduza paradas inesperadas, prolongue a vida das máquinas e elimine desperdício de energia e insumos.",
      },
    ]}
    caseTitle="Diagnóstico gratuito da sua operação"
    caseDesc="Em uma conversa de 20 minutos, mostramos onde sua indústria está perdendo dinheiro hoje e quanto você pode economizar nos próximos 6 meses com monitoramento inteligente. Sem compromisso, sem venda forçada — só números reais da sua operação."
    caseMetrics={[
      { label: "Paradas evitadas", value: "27" },
      { label: "Ganho de eficiência", value: "+19%" },
      { label: "Energia economizada", value: "12%" },
    ]}
  />
);

export default Industria;
