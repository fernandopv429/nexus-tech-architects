import { NicheLanding } from "@/components/nexus/NicheLanding";

const Industria = () => (
  <NicheLanding
    seoTitle="IoT e Automação Industrial | Nexus DevHub"
    seoDescription="Sensoriamento de máquinas, OEE em tempo real e manutenção preditiva. Tecnologia IoT para chão de fábrica."
    eyebrow="Hub Nexus · Indústria"
    headline="Chão de fábrica"
    headlineHighlight="que fala com você."
    sub="Sensoriamos máquinas, energia e produção. Você vê tudo em tempo real e age antes da parada acontecer."
    bullets={[
      "Sensores de temperatura, vibração e consumo energético",
      "OEE em tempo real por linha e turno",
      "Alertas preditivos de manutenção via WhatsApp",
      "Apontamento de produção sem papel",
      "Integração com ERP (Protheus, SAP, Sankhya)",
      "Histórico de paradas com análise de causa-raiz",
    ]}
    servicos={[
      { title: "Sensoriamento IoT", desc: "Hardware industrial robusto, instalação e calibração inclusas." },
      { title: "Dashboard OEE", desc: "Disponibilidade, performance e qualidade em painéis ao vivo." },
      { title: "Manutenção preditiva", desc: "IA detecta anomalias de vibração e temperatura antes da quebra." },
      { title: "MES leve", desc: "Apontamento via tablet/totem no posto de trabalho." },
      { title: "Energia inteligente", desc: "Medição por circuito e identificação de desperdícios." },
      { title: "Integração ERP", desc: "Produção apontada vai direto ao seu sistema, sem digitação." },
    ]}
    caseTitle="Indústria evitou 27 paradas e ganhou 19% de OEE"
    caseDesc="Instalamos sensoriamento em 8 máquinas críticas com alertas de vibração e temperatura. Em 6 meses, a manutenção preditiva evitou 27 paradas não programadas e a eficiência geral subiu 19 pontos percentuais."
    caseMetrics={[
      { label: "Paradas evitadas", value: "27" },
      { label: "Eficiência OEE", value: "+19%" },
      { label: "Energia economizada", value: "12%" },
    ]}
  />
);

export default Industria;
