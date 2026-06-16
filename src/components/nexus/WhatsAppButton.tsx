import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackWhatsAppClick, trackEvent, forwardLeadToWebhook } from "@/lib/analytics";

const PHONE = "5587996487067";

// Captura e persiste o gclid (Google Ads) na primeira visita
const getGclid = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("gclid");
    if (fromUrl) {
      window.sessionStorage.setItem("gclid", fromUrl);
      return fromUrl;
    }
    return window.sessionStorage.getItem("gclid");
  } catch {
    return null;
  }
};

const buildDefaultText = () => {
  const gclid = getGclid();
  return gclid
    ? `Olá! Gostaria de um orçamento para automação. (Ref: G-${gclid})`
    : `Olá Nexus! Quero um diagnóstico de automação. Podem me chamar?`;
};

const buildUrl = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// URL padrão exibida nos hrefs (clique é interceptado pelo Gate)
export const WHATSAPP_URL: string = buildUrl(buildDefaultText());

// Validação dos campos do mini formulário
const leadSchema = z.object({
  empresa: z
    .string()
    .trim()
    .min(2, { message: "Informe o nome da empresa" })
    .max(100, { message: "Máximo de 100 caracteres" }),
  telefone: z
    .string()
    .trim()
    .min(8, { message: "Telefone inválido" })
    .max(20, { message: "Máximo de 20 caracteres" })
    .regex(/^[\d\s()+\-.]+$/, { message: "Use apenas números e ( ) + -" }),
});

// Evento global para abrir o mini formulário antes do WhatsApp
const OPEN_EVENT = "nexus:open-whatsapp-form";

const dispatchOpen = (source: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { source } }));
};

/**
 * Mounted once globally. Intercepts cliques em qualquer <a href="wa.me/...">
 * e abre um mini formulário (Empresa + Telefone) antes de redirecionar.
 */
export const WhatsAppGate = () => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("link");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [errors, setErrors] = useState<{ empresa?: string; telefone?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  // Intercepta cliques em anchors do WhatsApp
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href*="wa.me/"]');
      if (!anchor) return;
      e.preventDefault();
      const src = anchor.dataset.waSource || "link";
      setSource(src);
      setOpen(true);
      trackEvent("whatsapp_modal_open", { source: src });
    };
    document.addEventListener("click", handler);
    const openListener = (e: Event) => {
      const detail = (e as CustomEvent).detail as { source?: string } | undefined;
      setSource(detail?.source || "floating");
      setOpen(true);
      trackEvent("whatsapp_modal_open", { source: detail?.source || "floating" });
    };
    window.addEventListener(OPEN_EVENT, openListener);
    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener(OPEN_EVENT, openListener);
    };
  }, []);

  const reset = () => {
    setEmpresa("");
    setTelefone("");
    setErrors({});
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const parsed = leadSchema.safeParse({ empresa, telefone });
      if (!parsed.success) {
        const fieldErrors: { empresa?: string; telefone?: string } = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as "empresa" | "telefone";
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }
      setSubmitting(true);
      const gclid = getGclid();
      const text = `Olá Nexus! Quero um diagnóstico de automação.\n\n• Empresa: ${parsed.data.empresa}\n• Telefone: ${parsed.data.telefone}${gclid ? `\n\n(Ref: G-${gclid})` : ""}`;

      trackWhatsAppClick("qualified", source);
      forwardLeadToWebhook("popup", {
        empresa: parsed.data.empresa,
        telefone: parsed.data.telefone,
        source,
        gclid,
      });

      window.open(buildUrl(text), "_blank", "noopener,noreferrer");
      setOpen(false);
      reset();
    },
    [empresa, telefone, source],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-sm gap-0 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/95 p-0 text-slate-100 shadow-2xl backdrop-blur-sm sm:rounded-2xl">
        {/* Header minimal */}
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-emerald-400 ring-1 ring-slate-700/50">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold tracking-tight text-slate-50">
                Falar com a Nexus
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Preencha para abrir o WhatsApp
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Formulário simples */}
        <form onSubmit={handleSubmit} className="space-y-3.5 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
          <div className="space-y-1">
            <Label htmlFor="wa-empresa" className="text-xs font-medium text-slate-400">
              Empresa ou negócio
            </Label>
            <Input
              id="wa-empresa"
              autoFocus
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ex.: Padaria do João"
              maxLength={100}
              aria-invalid={!!errors.empresa}
              className="h-11 border-slate-700/60 bg-slate-800/60 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 rounded-lg"
            />
            {errors.empresa && (
              <p className="text-xs text-red-400">{errors.empresa}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="wa-telefone" className="text-xs font-medium text-slate-400">
              Telefone (WhatsApp)
            </Label>
            <Input
              id="wa-telefone"
              type="tel"
              inputMode="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-9999"
              maxLength={20}
              aria-invalid={!!errors.telefone}
              className="h-11 border-slate-700/60 bg-slate-800/60 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-0 rounded-lg"
            />
            {errors.telefone && (
              <p className="text-xs text-red-400">{errors.telefone}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-11 rounded-lg bg-slate-100 text-slate-900 hover:bg-white text-sm font-medium gap-2 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            {submitting ? "Abrindo..." : "Abrir WhatsApp"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const WhatsAppFloating = () => {
  const handleOpen = () => dispatchOpen("floating");

  return (
    <motion.button
      type="button"
      aria-label="Falar no WhatsApp"
      onClick={handleOpen}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-pulse-glow" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-elegant transition-transform group-hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg glass px-3 py-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
        Diagnóstico no WhatsApp
      </span>
    </motion.button>
  );
};
