import { motion } from "framer-motion";
import { Activity, Bot, Clock, TrendingUp, Zap, CheckCircle2 } from "lucide-react";

const metrics = [
  { label: "Horas economizadas", value: "1.284", delta: "+18%", icon: Clock },
  { label: "Processos rodando", value: "47", delta: "+6", icon: Bot },
  { label: "Taxa de sucesso", value: "99.4%", delta: "+0.3%", icon: CheckCircle2 },
  { label: "Execuções/dia", value: "12.7k", delta: "+24%", icon: Zap },
];

const automations = [
  { name: "Reconciliação financeira", status: "active", runs: "2.4k", trend: [40, 55, 48, 70, 65, 82, 78] },
  { name: "Atendimento WhatsApp IA", status: "active", runs: "8.1k", trend: [30, 42, 50, 48, 62, 70, 85] },
  { name: "OCR notas fiscais", status: "active", runs: "1.2k", trend: [60, 50, 65, 58, 72, 68, 80] },
  { name: "Sensor IoT — linha 03", status: "active", runs: "986", trend: [45, 48, 52, 50, 55, 60, 58] },
];

const Sparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-8 w-20">
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DashboardMockup = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-24 max-w-6xl"
    >
      {/* Glow behind */}
      <div className="pointer-events-none absolute -inset-8 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card/80 backdrop-blur-xl shadow-card">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1">
            <Activity className="h-3 w-3 text-primary" />
            <span className="font-mono text-[11px] text-muted-foreground">nexus.hub / operations</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] text-muted-foreground">live</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Operations Hub</p>
              <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Visão geral · últimas 24h
              </h3>
            </div>
            <div className="flex gap-2">
              {["24h", "7d", "30d"].map((p, i) => (
                <span
                  key={p}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    i === 0
                      ? "border-foreground/20 bg-foreground text-background"
                      : "border-border bg-secondary/50 text-muted-foreground"
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Metric cards */}
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="rounded-2xl border border-border bg-background/60 p-4"
              >
                <div className="flex items-center justify-between">
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {m.delta}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {m.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart + List */}
          <div className="mt-4 grid gap-3 lg:grid-cols-5">
            {/* Chart */}
            <div className="rounded-2xl border border-border bg-background/60 p-5 lg:col-span-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Execuções por hora</p>
                  <p className="mt-1 font-display text-xl font-semibold text-foreground">12.748</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-primary">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +24,3%
                </div>
              </div>

              <div className="mt-6 h-40">
                <svg viewBox="0 0 400 160" className="h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Grid */}
                  {[0, 1, 2, 3].map((g) => (
                    <line
                      key={g}
                      x1="0"
                      x2="400"
                      y1={40 * g + 20}
                      y2={40 * g + 20}
                      stroke="hsl(var(--border))"
                      strokeDasharray="2 4"
                    />
                  ))}
                  {/* Area */}
                  <path
                    d="M0,120 L33,100 L66,110 L100,80 L133,90 L166,60 L200,70 L233,40 L266,55 L300,30 L333,45 L366,25 L400,35 L400,160 L0,160 Z"
                    fill="url(#chartFill)"
                  />
                  {/* Line */}
                  <path
                    d="M0,120 L33,100 L66,110 L100,80 L133,90 L166,60 L200,70 L233,40 L266,55 L300,30 L333,45 L366,25 L400,35"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="mt-3 flex justify-between font-mono text-[10px] text-muted-foreground">
                {["00h", "04h", "08h", "12h", "16h", "20h", "24h"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Automations list */}
            <div className="rounded-2xl border border-border bg-background/60 p-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Automações ativas</p>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                  47 total
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {automations.map((a, i) => (
                  <motion.div
                    key={a.name}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                    className="flex items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <p className="truncate text-xs font-medium text-foreground">{a.name}</p>
                      </div>
                      <p className="mt-1 ml-3.5 font-mono text-[10px] text-muted-foreground">
                        {a.runs} runs
                      </p>
                    </div>
                    <Sparkline data={a.trend} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
