import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, TrendingUp, DollarSign, Sparkles } from "lucide-react";
import { trackFormSubmit, trackFormStart } from "@/lib/analytics";
import { useRef as useReactRef } from "react";

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

const captureSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  company: z.string().trim().min(2, "Informe sua empresa").max(120),
  phone: z.string().trim().min(8, "Informe um telefone").max(30),
});
type CaptureData = z.infer<typeof captureSchema>;

export const Calculadora = () => {
  const [people, setPeople] = useState(5);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [automationRate] = useState(0.7);

  const result = useMemo(() => {
    const weeklyHours = people * hoursPerWeek;
    const monthlyHours = weeklyHours * 4.33;
    const monthlySaved = monthlyHours * automationRate;
    const monthlyMoney = monthlySaved * hourlyCost;
    const annualMoney = monthlyMoney * 12;
    return {
      monthlyHours: Math.round(monthlyHours),
      monthlySavedHours: Math.round(monthlySaved),
      monthlyMoney,
      annualMoney,
    };
  }, [people, hoursPerWeek, hourlyCost, automationRate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CaptureData>({ resolver: zodResolver(captureSchema) });

  const onSubmit = async (data: CaptureData) => {
    try {
      const id = crypto.randomUUID();
      const message = `[Calculadora ROI] ${people} pessoas · ${hoursPerWeek}h/sem · custo R$ ${hourlyCost}/h · economia est. mensal ${fmtBRL(result.monthlyMoney)} (${result.monthlySavedHours}h)`;

      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({ id, ...data, message });
      if (insertError) throw insertError;

      const submittedAt = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-lead-notification",
          recipientEmail: "vendas@nexusdevhub.com",
          idempotencyKey: `roi-notify-${id}`,
          templateData: { ...data, message, submittedAt },
        },
      });
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: data.email,
          idempotencyKey: `roi-confirm-${id}`,
          templateData: { name: data.name },
        },
      });

      toast({
        title: "Plano enviado!",
        description:
          "Em até 24h úteis nossa engenharia envia seu plano de automação personalizado.",
      });
      trackFormSubmit("calculator_roi", {
        people,
        hours_per_week: hoursPerWeek,
        hourly_cost: hourlyCost,
        estimated_monthly_savings: Math.round(result.monthlyMoney),
        estimated_annual_savings: Math.round(result.annualMoney),
        value: Math.round(result.annualMoney),
        currency: "BRL",
      });
      reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Não foi possível enviar",
        description: "Tente novamente ou fale conosco pelo WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="calculadora"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 h-[500px] w-[600px] rounded-full bg-primary/5 blur-[140px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">
            Diagnóstico gratuito · Calculadora de ROI
          </p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Quanto sua empresa
            <br />
            pode economizar?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Em 30 segundos descubra quanto tempo e dinheiro você está deixando
            na mesa com tarefas manuais.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-5">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 rounded-3xl border border-border bg-card p-8 md:p-10 lg:col-span-3"
          >
            <SliderField
              label="Quantas pessoas executam tarefas repetitivas?"
              value={people}
              onChange={setPeople}
              min={1}
              max={50}
              suffix={people === 1 ? "pessoa" : "pessoas"}
            />
            <SliderField
              label="Horas por semana gastas em tarefas manuais (por pessoa)"
              value={hoursPerWeek}
              onChange={setHoursPerWeek}
              min={1}
              max={40}
              suffix="h/semana"
            />
            <SliderField
              label="Custo médio da hora trabalhada"
              value={hourlyCost}
              onChange={setHourlyCost}
              min={20}
              max={300}
              step={5}
              prefix="R$"
              suffix="/h"
            />

            <div className="rounded-2xl border border-border/60 bg-secondary/30 p-5 text-xs text-muted-foreground">
              💡 Cálculo conservador considerando 70% de automação possível
              em processos repetitivos com RPA + IA.
            </div>
          </motion.div>

          {/* Result + capture */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="rounded-3xl border border-foreground/20 bg-foreground p-8 text-background">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
                <Sparkles className="h-3.5 w-3.5" />
                Sua economia estimada
              </div>
              <div className="mt-6 space-y-5">
                <Stat
                  icon={Clock}
                  label="Horas/mês recuperadas"
                  value={`${result.monthlySavedHours}h`}
                />
                <Stat
                  icon={DollarSign}
                  label="Economia mensal"
                  value={fmtBRL(result.monthlyMoney)}
                />
                <Stat
                  icon={TrendingUp}
                  label="Economia anual"
                  value={fmtBRL(result.annualMoney)}
                  highlight
                />
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 rounded-3xl border border-border bg-card p-6"
            >
              <p className="text-sm font-medium text-foreground">
                Receba seu plano personalizado
              </p>
              <p className="text-xs text-muted-foreground">
                Enviamos por e-mail um plano de automação para o seu cenário.
              </p>
              <div className="space-y-2 pt-2">
                <Label htmlFor="roi-name" className="sr-only">Nome</Label>
                <Input id="roi-name" {...register("name")} placeholder="Nome" className="h-11 rounded-xl bg-background" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                <Input {...register("email")} type="email" placeholder="E-mail corporativo" className="h-11 rounded-xl bg-background" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                <Input {...register("company")} placeholder="Empresa" className="h-11 rounded-xl bg-background" />
                {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
                <Input {...register("phone")} placeholder="WhatsApp" className="h-11 rounded-xl bg-background" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <Button type="submit" variant="pill" size="pill" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Enviando..." : "Quero meu plano gratuito"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SliderField = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) => (
  <div>
    <div className="flex items-baseline justify-between gap-4">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <span className="font-display text-2xl font-semibold text-foreground">
        {prefix} {value}
        <span className="ml-1 text-xs font-normal text-muted-foreground">
          {suffix}
        </span>
      </span>
    </div>
    <Slider
      className="mt-4"
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(v) => onChange(v[0])}
    />
  </div>
);

const Stat = ({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className={highlight ? "border-t border-background/20 pt-5" : ""}>
    <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-60">
      <Icon className="h-3.5 w-3.5" />
      {label}
    </div>
    <div
      className={`mt-1 font-display font-bold tracking-tight ${
        highlight ? "text-4xl" : "text-2xl"
      }`}
    >
      {value}
    </div>
  </div>
);
