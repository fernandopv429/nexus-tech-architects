import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { WHATSAPP_URL } from "./WhatsAppButton";

const schema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  company: z.string().min(2, "Informe sua empresa"),
  phone: z.string().min(8, "Informe um telefone válido"),
  message: z.string().min(10, "Conte um pouco mais sobre o desafio"),
});

type FormData = z.infer<typeof schema>;

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const text =
      `Olá Nexus! Sou ${data.name} da ${data.company}.%0A` +
      `📧 ${data.email}%0A📱 ${data.phone}%0A%0A${encodeURIComponent(data.message)}`;
    window.open(`https://wa.me/5511942029143?text=${text}`, "_blank");
    toast({
      title: "Mensagem encaminhada",
      description: "Abrimos o WhatsApp com sua solicitação. Em breve retornaremos.",
    });
    reset();
  };

  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-brand-soft opacity-30" />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">Contato</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Leve a Nexus para <span className="text-gradient">dentro do seu negócio</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Conte sobre seu desafio. Nossa engenharia retorna em até 24h úteis.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-2"
          >
            <a
              href="mailto:vendas@nexusdevhub.com"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-primary/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Comercial</div>
                <div className="font-medium group-hover:text-primary-glow transition-colors">vendas@nexusdevhub.com</div>
              </div>
            </a>

            <a
              href="mailto:suporte@nexusdevhub.com"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-primary/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand">
                <Mail className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Suporte & Operações</div>
                <div className="font-medium group-hover:text-primary-glow transition-colors">suporte@nexusdevhub.com</div>
              </div>
            </a>

            <a
              href="tel:+5511942029143"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-all hover:border-primary/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand">
                <Phone className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Central</div>
                <div className="font-medium group-hover:text-primary-glow transition-colors">(11) 94202-9143</div>
              </div>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5 transition-all hover:border-emerald-500/60"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-emerald-400">Resposta rápida</div>
                <div className="font-medium">Falar pelo WhatsApp</div>
              </div>
            </a>
          </motion.div>

          {/* Form column */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="glass space-y-5 rounded-2xl p-6 md:p-8 lg:col-span-3"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name")} placeholder="Seu nome" className="mt-2" />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" {...register("company")} placeholder="Nome da empresa" className="mt-2" />
                {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register("email")} placeholder="voce@empresa.com" className="mt-2" />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input id="phone" {...register("phone")} placeholder="(11) 90000-0000" className="mt-2" />
                {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="message">Conte sobre seu desafio</Label>
              <Textarea
                id="message"
                {...register("message")}
                placeholder="Quais processos você gostaria de automatizar?"
                rows={5}
                className="mt-2"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Enviando..." : "Enviar para a Engenharia"}
              </Button>
              <Button type="button" variant="outline" size="lg" asChild>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
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
