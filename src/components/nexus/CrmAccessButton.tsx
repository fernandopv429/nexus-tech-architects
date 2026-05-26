import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Mail, MessageCircle, X, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  trackCTAClick,
  trackFormStart,
  trackFormSubmit,
  forwardLeadToWebhook,
} from "@/lib/analytics";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(254),
  phone: z
    .string()
    .trim()
    .min(10, "WhatsApp inválido")
    .max(20)
    .regex(/^[\d\s()+\-]+$/, "Use apenas números"),
});

type Props = {
  label?: string;
  source?: string;
  sector?: string;
};

export const CrmAccessButton = ({
  label = "Ver CRM na Prática",
  source = "medico-hero",
  sector = "saude",
}: Props) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleOpen = () => {
    trackCTAClick(label, source, "#crm-access");
    trackFormStart("popup");
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setErrors({});
    }, 300);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, phone });
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      setErrors({ email: f.email?.[0], phone: f.phone?.[0] });
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-contact", {
        body: {
          source: "popup",
          email: parsed.data.email,
          phone: parsed.data.phone,
          sector,
          message: `Solicitou acesso à demonstração do CRM (${sector}).`,
        },
      });
      if (error || !(data as { success?: boolean })?.success) {
        throw new Error("submit failed");
      }
      trackFormSubmit("popup", { email: parsed.data.email, sector, cta: label });
      forwardLeadToWebhook("popup", {
        email: parsed.data.email,
        phone: parsed.data.phone,
        sector,
        cta: label,
      });
      setDone(true);
    } catch {
      toast.error("Não conseguimos enviar agora. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center gap-2 rounded-full bg-[hsl(10_78%_54%)] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[hsl(10_78%_54%/0.25)] transition hover:bg-[hsl(10_78%_48%)]"
      >
        {label} <ArrowRight className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 px-4 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-elegant"
            >
              <button
                type="button"
                aria-label="Fechar"
                onClick={close}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-foreground/5 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              {!done ? (
                <>
                  <div className="mb-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">
                      Acesso à demonstração
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-foreground">
                      Receba o acesso ao CRM no seu WhatsApp
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Deixe seus contatos abaixo e te enviamos a demonstração em
                      até 5 minutos.
                    </p>
                  </div>

                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <Mail className="h-3.5 w-3.5" /> E-mail
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@empresa.com"
                        required
                        maxLength={254}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(87) 99999-9999"
                        required
                        maxLength={20}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[hsl(10_78%_54%)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[hsl(10_78%_54%/0.25)] transition hover:bg-[hsl(10_78%_48%)] disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Enviando...
                        </>
                      ) : (
                        <>
                          Receber acesso <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground">
                      Sem spam. Usamos seus dados apenas para liberar o acesso.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-4 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                    Tudo certo!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Em instantes você recebe o acesso ao CRM no WhatsApp informado.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-6 rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-foreground/5"
                  >
                    Fechar
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
