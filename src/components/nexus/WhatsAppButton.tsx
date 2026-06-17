import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md gap-0 overflow-hidden rounded-3xl border border-border/60 bg-background/70 p-0 text-foreground shadow-2xl backdrop-blur-2xl sm:w-full">
        {/* Header centralizado */}
        <div className="px-6 pt-8 text-center sm:px-8 sm:pt-10">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Falar com a Nexus
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            Preencha os dados abaixo
          </DialogDescription>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
          <div className="space-y-2">
            <Label htmlFor="wa-empresa" className="text-sm font-medium text-foreground">
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
              className="h-14 border-border/60 bg-input/60 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-offset-0 rounded-xl"
            />
            {errors.empresa && (
              <p className="text-xs text-destructive">{errors.empresa}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wa-telefone" className="text-sm font-medium text-foreground">
              Telefone
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
              className="h-14 border-border/60 bg-input/60 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-offset-0 rounded-xl"
            />
            {errors.telefone && (
              <p className="text-xs text-destructive">{errors.telefone}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium transition-colors"
            >
              {submitting ? "Abrindo..." : "Abrir WhatsApp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

