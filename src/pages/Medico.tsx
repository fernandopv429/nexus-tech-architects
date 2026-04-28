import { NicheLanding } from "@/components/nexus/NicheLanding";

const Medico = () => (
  <NicheLanding
    seoTitle="Tecnologia para Clínicas e Consultórios | Nexus DevHub"
    seoDescription="Reduza filas, automatize triagem e integre prontuário com totens, IA e dashboards. Hub Nexus para o setor de saúde."
    eyebrow="Hub Nexus · Saúde"
    headline="Menos fila."
    headlineHighlight="Mais atendimento."
    sub="Automatizamos triagem, agendamento e integração com prontuário. Sua clínica atendendo mais pacientes com a mesma equipe."
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
