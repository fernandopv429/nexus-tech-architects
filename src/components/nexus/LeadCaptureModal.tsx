import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackFormSubmit, trackFormStart } from "@/lib/analytics";

const STORAGE_KEY = "nexus_lead_popup_seen_v1";
const DELAY_MS = 1500;

const SECTORS = [
  "Clínica / Saúde",
  "Advocacia / Jurídico",
  "Varejo / E-commerce",
  "Indústria / B2B",
  "Serviços / Consultoria",
  "Tecnologia / SaaS",
  "Educação",
  "Imobiliário",
  "Outro",
] as const;

const schema = z.object({
  sector: z
    .string()
    .min(1, "Selecione o tipo de negócio")
    .refine((v) => (SECTORS as readonly string[]).includes(v), "Tipo inválido"),
  link: z
    .string()
    .trim()
    .max(200, "Link muito longo")
    .optional()
    .or(z.literal("")),
  phone: z.string().trim().min(8, "Informe um telefone válido").max(40),
  email: z.string().trim().email("E-mail inválido").max(254),
});

type FormData = z.infer<typeof schema>;

export const LeadCaptureModal = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;
    const t = window.setTimeout(() => setOpen(true), DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const markSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) markSeen();
  };

  const handleStart = () => {
    trackFormStart("popup");
  };

  const onSubmit = async (data: FormData) => {
    try {
      const link = data.link?.trim();
      const company = link && link.length > 0 ? link : "(não informado)";
      const message = link
        ? `Tipo de negócio: ${data.sector}\nLink: ${link}`
        : `Tipo de negócio: ${data.sector}`;

      const { error } = await supabase.functions.invoke("submit-contact", {
        body: {
          name: "Lead via popup",
          email: data.email,
          phone: data.phone,
          company,
          sector: data.sector,
          message,
          source: "popup",
        },
      });

      if (error) throw error;

      trackFormSubmit("popup", { sector: data.sector });
      toast({
        title: "Recebemos seu contato!",
        description: "Nosso time comercial vai te chamar em breve.",
      });
      reset();
      markSeen();
      setOpen(false);
    } catch (e) {
      console.error(e);
      toast({
        title: "Não foi possível enviar",
        description: "Tente novamente em instantes ou fale pelo WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md overflow-hidden border-border/60 bg-card p-0">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-6 pt-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Diagnóstico gratuito
            </div>
            <DialogHeader className="mt-3 space-y-1.5 text-left">
              <DialogTitle className="font-display text-2xl leading-tight">
                Descubra como escalar seu negócio com IA
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Preencha em 30 segundos e nosso time entra em contato com um plano sob medida.
              </DialogDescription>
            </DialogHeader>
          </motion.div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onFocus={handleStart}
            className="relative space-y-4 px-6 pb-6 pt-5"
            noValidate
          >
            <div className="space-y-1.5">
              <Label htmlFor="popup-sector">Tipo de negócio *</Label>
              <Controller
                control={control}
                name="sector"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="popup-sector" aria-invalid={!!errors.sector}>
                      <SelectValue placeholder="Selecione seu segmento" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.sector && (
                <p className="text-xs text-destructive">{errors.sector.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="popup-link">Site ou rede social (opcional)</Label>
              <Input
                id="popup-link"
                type="text"
                placeholder="instagram.com/seunegocio"
                autoComplete="url"
                {...register("link")}
              />
              {errors.link && (
                <p className="text-xs text-destructive">{errors.link.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="popup-phone">Telefone *</Label>
                <Input
                  id="popup-phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="(11) 99999-9999"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-xs text-destructive">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="popup-email">E-mail *</Label>
                <Input
                  id="popup-email"
                  type="email"
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Quero meu diagnóstico gratuito"
              )}
            </Button>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="block w-full text-center text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Agora não, quero explorar o site
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
