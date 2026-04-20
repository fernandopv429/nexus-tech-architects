import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "./WhatsAppButton";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  company: z.string().min(2, "Informe sua empresa"),
  phone: z.string().min(8, "Informe um telefone válido"),
  message: z.string().min(10, "Conte um pouco mais sobre o desafio"),
});

type FormData = z.infer<typeof schema>;

const contacts = [
  {
    icon: Mail,
    label: "Comercial",
    value: "vendas@nexusdevhub.com",
    href: "mailto:vendas@nexusdevhub.com",
  },
  {
    icon: Mail,
    label: "Suporte & Operações",
    value: "suporte@nexusdevhub.com",
    href: "mailto:suporte@nexusdevhub.com",
  },
  {
    icon: Phone,
    label: "Central",
    value: "(87) 99648-7067",
    href: "tel:+5587996487067",
  },
  {
    icon: MessageCircle,
    label: "Resposta rápida",
    value: "Falar pelo WhatsApp",
    href: WHATSAPP_URL,
    external: true,
  },
];

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const id = crypto.randomUUID();
      const submittedAt = new Date().toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });

      const { error: insertError } = await supabase
        .from("contact_submissions")
        .insert({ id, ...data });

      if (insertError) throw insertError;

      // Notify sales team (internal)
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "new-lead-notification",
          recipientEmail: "vendas@nexusdevhub.com",
          idempotencyKey: `lead-notify-${id}`,
          templateData: { ...data, submittedAt },
        },
      });

      // Confirmation to lead
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: data.email,
          idempotencyKey: `lead-confirm-${id}`,
          templateData: { name: data.name },
        },
      });

      toast({
        title: "Mensagem enviada",
        description:
          "Recebemos seu contato. Nossa engenharia retornará em até 24h úteis.",
      });
      reset();
    } catch (err) {
      console.error(err);
      toast({
        title: "Não foi possível enviar",
        description:
          "Tente novamente em instantes ou fale conosco pelo WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm text-muted-foreground">Contato</p>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground">
            Vamos conversar.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Conte sobre seu desafio. Nossa engenharia retorna em até 24h úteis.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 lg:col-span-2"
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-secondary/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
                    <c.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">
                      {c.label}
                    </div>
                    <div className="font-medium text-foreground">{c.value}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            ))}
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-3xl border border-border bg-card p-8 md:p-10 lg:col-span-3"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-muted-foreground">
                  Nome
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Seu nome"
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="company" className="text-muted-foreground">
                  Empresa
                </Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Nome da empresa"
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-muted-foreground">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="voce@empresa.com"
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-muted-foreground">
                  Telefone / WhatsApp
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="(11) 90000-0000"
                  className="mt-2 h-12 rounded-xl border-border bg-background"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="message" className="text-muted-foreground">
                Conte sobre seu desafio
              </Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Quais processos você gostaria de automatizar?"
                rows={5}
                className="mt-2 rounded-xl border-border bg-background"
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                type="submit"
                variant="pill"
                size="pill"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Enviando..." : "Enviar para nosso time"}
              </Button>
              <Button type="button" variant="pill-ghost" size="pill" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
