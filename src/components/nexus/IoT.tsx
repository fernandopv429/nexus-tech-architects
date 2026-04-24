import { motion } from "framer-motion";
import {
  MonitorSmartphone,
  DoorOpen,
  Scale,
  Gauge,
  ScanLine,
  Cpu,
} from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Totens de Autoatendimento",
    desc: "Totens integrados ao check-in e check-out de atendimento, com fila inteligente, impressão de senhas e sincronização em tempo real com o painel da equipe.",
    tag: "Atendimento",
  },
  {
    icon: DoorOpen,
    title: "Controle de Entrada e Saída",
    desc: "Sistemas de catraca, biometria, QR Code e RFID para portaria, vestiários e áreas restritas — com log completo de acessos e alertas automáticos.",
    tag: "Acesso",
  },
  {
    icon: Scale,
    title: "PDV Integrado com Balanças",
    desc: "Frente de caixa conectado a balanças, leitores de código de barras e impressoras fiscais. Pesagem, precificação e emissão sincronizadas em uma única operação.",
    tag: "Varejo",
  },
  {
    icon: Gauge,
    title: "Sensoriamento Industrial",
    desc: "Monitoramento de máquinas, temperatura, vibração, consumo energético e linha de produção — com dashboards ao vivo e alertas preditivos.",
    tag: "Indústria",
  },
  {
    icon: ScanLine,
    title: "Coletores e Inventário",
    desc: "Leitores de código de barras e RFID integrados ao ERP para inventário, expedição e rastreabilidade contínua de produtos e ativos.",
    tag: "Logística",
  },
  {
    icon: Cpu,
    title: "Hub Central de Hardware",
    desc: "Todos os dispositivos físicos conectados a um único painel de controle. Configuração remota, atualizações OTA e monitoramento de saúde do parque.",
    tag: "Hub IoT",
  },
];

export const IoT = () => {
  return (
    <section
      id="iot"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-[500px] w-[600px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">IoT & Hardware</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            O físico e o digital,
            <br />
            no mesmo painel.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Projetamos, instalamos e integramos hardware ao ecossistema da sua
            operação — todos os dispositivos com dashboard de controle em tempo
            real.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 transition-colors hover:border-foreground/20"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary">
                  <s.icon className="h-5 w-5 text-foreground" />
                </div>
                <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.tag}
                </span>
              </div>
              <h3 className="mt-7 font-display text-xl font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>

              <div className="mt-6 flex items-center gap-2 border-t border-border/60 pt-4">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Painel de controle incluso
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
