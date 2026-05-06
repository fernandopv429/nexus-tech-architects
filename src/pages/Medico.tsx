import { NicheLanding } from "@/components/nexus/NicheLanding";

const Medico = () => (
  <NicheLanding
    canonicalPath="/medico"
    segmentName="Saúde"
    seoTitle="Tecnologia para Clínicas e Consultórios | Totens, IA e Prontuário | Nexus DevHub"
    seoDescription="Reduza filas em até 52%, automatize triagem e integre o prontuário eletrônico com totens, IA e dashboards. Hub Nexus para clínicas e hospitais."
    seoKeywords="tecnologia para clínicas, totem de autoatendimento clínica, automação consultório, prontuário eletrônico integrado, triagem com IA, agendamento WhatsApp clínica, software para clínica, TISS automação"
    eyebrow="Hub Nexus · Saúde"
    headline="Menos fila."
    headlineHighlight="Mais atendimento."
    sub="Automatizamos triagem, agendamento e integração com prontuário. Sua clínica atendendo mais pacientes com a mesma equipe. Projetos de automação escaláveis com investimentos a partir de R$ 1.299."
    bullets={[
      "Totens de check-in por CPF integrados ao prontuário",
      "Confirmação automática de consultas via WhatsApp",
      "Painel ao vivo de fila por especialidade",
      "Triagem inicial assistida por IA",
      "Relatórios de produtividade por médico e setor",
      "LGPD: dados sensíveis tratados com criptografia",
    ]}
    servicos={[
      { title: "Totens de autoatendimento", desc: "Check-in, atualização cadastral e fila inteligente sem recepcionista." },
      { title: "Agenda + WhatsApp", desc: "Confirmação, reagendamento e lembretes automáticos." },
      { title: "Prontuário integrado", desc: "Conectamos seu sistema atual com novos canais — sem trocar tudo." },
      { title: "Painel da operação", desc: "Tempo médio, no-show, ocupação por sala em tempo real." },
      { title: "IA de triagem", desc: "Pré-anamnese por chat antes da consulta, encaminhando direto à especialidade certa." },
      { title: "Faturamento TISS", desc: "Automação de glosas e envio de guias por convênio." },
    ]}
    caseTitle="Clínica multiespecialidade reduziu fila em 52%"
    caseDesc="Implantamos totens com check-in por CPF, fila inteligente por especialidade e confirmação automática via WhatsApp. Em 90 dias, o tempo médio de espera caiu pela metade e a clínica passou a atender 2x mais pacientes/dia com o mesmo time."
    caseMetrics={[
      { label: "Tempo de espera", value: "-52%" },
      { label: "Atendimentos/dia", value: "+2x" },
      { label: "No-show", value: "-31%" },
    ]}
  />
);

export default Medico;
