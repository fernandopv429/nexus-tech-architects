import { NicheLanding } from "@/components/nexus/NicheLanding";

const Varejo = () => (
  <NicheLanding
    canonicalPath="/varejo"
    segmentName="Varejo"
    seoTitle="PDV Integrado, Totens e Automação para Varejo | Nexus DevHub"
    seoDescription="PDV integrado com balanças, totens de autoatendimento, controle de estoque multi-loja e dashboard de vendas em tempo real. Tecnologia para supermercados, lojas e franquias."
    seoKeywords="PDV integrado, totem de autoatendimento varejo, automação supermercado, controle de estoque multi-loja, NFCe SAT, conciliação Pix, BI varejo, sistema para franquia"
    eyebrow="Hub Nexus · Varejo"
    headline="Loja vendendo"
    headlineHighlight="enquanto você dorme."
    sub="PDV, totens e estoque conectados. Você acompanha cada loja em tempo real, do celular, sem depender de relatório do gerente. Projetos de automação escaláveis com investimentos a partir de R$ 1.299."
    bullets={[
      "PDV integrado com balanças, leitores e impressoras fiscais",
      "Totens de autoatendimento e fila virtual",
      "Estoque em tempo real entre lojas e e-commerce",
      "Dashboard de vendas por loja, hora e categoria",
      "Pix integrado e conciliação automática",
      "Programa de fidelidade com IA de recomendação",
    ]}
    servicos={[
      { title: "PDV completo", desc: "Hardware, software e integração com SAT/NFCe e meios de pagamento." },
      { title: "Totens de autoatendimento", desc: "Pedido e pagamento direto pelo cliente, com chamada por painel." },
      { title: "Controle de estoque", desc: "Multi-loja, multi-depósito, com alerta de ruptura." },
      { title: "BI de vendas", desc: "Curva ABC, sell-through e ticket médio em tempo real." },
      { title: "Fidelidade + IA", desc: "Recomendações personalizadas e cashback automatizado." },
      { title: "Conciliação financeira", desc: "Pix, cartão e dinheiro batidos com o ERP automaticamente." },
    ]}
    caseTitle="Rede de supermercados reduziu fila em 38% em 12 lojas"
    caseDesc="Padronizamos o PDV em 12 unidades com integração de balanças e impressoras fiscais, somado a totens de autoatendimento nas filiais movimentadas. O resultado: menos fila no caixa, mais ticket médio e visão única da operação."
    caseMetrics={[
      { label: "Lojas integradas", value: "12" },
      { label: "Redução de filas", value: "38%" },
      { label: "Ticket médio", value: "+14%" },
    ]}
  />
);

export default Varejo;
