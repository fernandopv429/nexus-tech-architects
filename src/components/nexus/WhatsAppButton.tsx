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
import { trackWhatsAppClick, trackEvent } from "@/lib/analytics";

const PHONE = "5587996487067";
const WEBHOOK_URL = "https://n8n.nexusdevhub.com/webhook/clic";
const DEFAULT_MESSAGE =
  "Olá Nexus! Preenchi o formulário no site e gostaria de um diagnóstico de automação.";

const buildUrl = (text: string) =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;

// URL padrão exibida nos hrefs (clique é interceptado pelo Gate)
export const WHATSAPP_URL: string = buildUrl(DEFAULT_MESSAGE);

// Hook: captura o gclid da URL e persiste em sessionStorage
const useGclid = () => {
  const [gclid, setGclid] = useState<string>("");
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const fromUrl = new URLSearchParams(window.location.search).get("gclid");
      if (fromUrl) {
        window.sessionStorage.setItem("gclid", fromUrl);
        setGclid(fromUrl);
        return;
      }
      const stored = window.sessionStorage.getItem("gclid");
      setGclid(stored ?? "");
    } catch {
      setGclid("");
    }
  }, []);
  return gclid;
};

// Validação: nome + whatsapp (apenas dígitos, com DDD)
const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, { message: "Informe seu nome" })
    .max(100, { message: "Máximo de 100 caracteres" }),
  whatsapp: z
    .string()
    .regex(/^\d{10,13}$/, { message: "Informe DDD + número (somente dígitos)" }),
});

// Evento global para abrir o mini formulário antes do WhatsApp
const OPEN_EVENT = "nexus:open-whatsapp-form";

const dispatchOpen = (source: string) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { source } }));
};

// Formata telefone BR: (11) 99999-9999
const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const WhatsAppGate = () => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<string>("link");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ nome?: string; whatsapp?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const gclid = useGclid();

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
    setNome("");
    setWhatsapp("");
    setErrors({});
    setSubmitting(false);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) reset();
  };

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const onlyDigits = whatsapp.replace(/\D/g, "");
      const parsed = leadSchema.safeParse({ nome, whatsapp: onlyDigits });
      if (!parsed.success) {
        const fieldErrors: { nome?: string; whatsapp?: string } = {};
        for (const issue of parsed.error.issues) {
          const key = issue.path[0] as "nome" | "whatsapp";
          if (!fieldErrors[key]) fieldErrors[key] = issue.message;
        }
        setErrors(fieldErrors);
        return;
      }
      setSubmitting(true);

      const payload = {
        nome: parsed.data.nome,
        whatsapp: parsed.data.whatsapp,
        gclid: gclid || "",
      };

      try {
        await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        // segue o fluxo mesmo se o webhook falhar
      }

      trackWhatsAppClick("qualified", source);
      window.location.href = buildUrl(DEFAULT_MESSAGE);
    },
    [nome, whatsapp, gclid, source],
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md gap-0 overflow-hidden rounded-3xl border border-border/40 bg-background/30 p-0 text-foreground shadow-2xl backdrop-blur-3xl sm:w-full">
        <div className="px-6 pt-8 text-center sm:px-8 sm:pt-10">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Falar com a Nexus
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted-foreground">
            Preencha os dados abaixo
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
          <div className="space-y-2">
            <Label htmlFor="wa-nome" className="text-sm font-medium text-foreground">
              Nome
            </Label>
            <Input
              id="wa-nome"
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              maxLength={100}
              aria-invalid={!!errors.nome}
              className="h-14 border-border/60 bg-input/60 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-offset-0 rounded-xl"
            />
            {errors.nome && (
              <p className="text-xs text-destructive">{errors.nome}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="wa-whatsapp" className="text-sm font-medium text-foreground">
              WhatsApp
            </Label>
            <Input
              id="wa-whatsapp"
              type="tel"
              inputMode="numeric"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatPhone(e.target.value))}
              placeholder="(11) 99999-9999"
              maxLength={16}
              aria-invalid={!!errors.whatsapp}
              className="h-14 border-border/60 bg-input/60 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring/40 focus-visible:ring-offset-0 rounded-xl"
            />
            {errors.whatsapp && (
              <p className="text-xs text-destructive">{errors.whatsapp}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base font-medium transition-colors"
            >
              {submitting ? "Enviando..." : "Abrir WhatsApp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
