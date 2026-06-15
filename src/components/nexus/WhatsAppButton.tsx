import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { trackWhatsAppClick, trackEvent } from "@/lib/analytics";

const PHONE = "5587996487067";

const segmentos = [
  { id: "varejo", label: "Varejo / PDV" },
  { id: "saude", label: "Clínica / Saúde" },
  { id: "servicos", label: "Serviços / Backoffice" },
  { id: "logistica", label: "Logística" },
  { id: "outro", label: "Outro" },
];
const portes = [
  { id: "ate-10", label: "Até 10 colaboradores" },
  { id: "10-50", label: "10 a 50" },
  { id: "50-200", label: "50 a 200" },
  { id: "200+", label: "200+" },
];

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

const buildUrl = (segmento?: string, porte?: string) => {
  const gclid = getGclid();
  let text: string;
  if (gclid && !segmento && !porte) {
    text = `Olá! Gostaria de um orçamento para automação. (Ref: G-${gclid})`;
  } else {
    const seg = segmentos.find((s) => s.id === segmento)?.label ?? "—";
    const por = portes.find((p) => p.id === porte)?.label ?? "—";
    text = `Olá Nexus! Quero um diagnóstico de automação.\n\n• Segmento: ${seg}\n• Porte: ${por}\n\nPodem me chamar?${gclid ? `\n\n(Ref: G-${gclid})` : ""}`;
  }
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
};

// Default URL for direct/header links — capturado no load (gclid persiste em sessionStorage)
export const WHATSAPP_URL: string = buildUrl();

export const WhatsAppFloating = () => {
  const [open, setOpen] = useState(false);
  const [segmento, setSegmento] = useState<string>();
  const [porte, setPorte] = useState<string>();

  const handleSubmit = () => {
    trackWhatsAppClick("qualified", segmento, porte);
    window.open(buildUrl(segmento, porte), "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleOpen = () => {
    trackEvent("whatsapp_modal_open", { source: "floating" });
    setOpen(true);
  };

  return (
    <>
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Vamos qualificar em 10 segundos
            </DialogTitle>
            <DialogDescription>
              Assim nosso time já chega com a proposta certa pra você.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-2">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Segmento
              </Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {segmentos.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSegmento(s.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                      segmento === s.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Porte
              </Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {portes.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPorte(p.id)}
                    className={`rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                      porte === p.id
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card hover:border-foreground/40"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="pill"
              size="pill"
              onClick={handleSubmit}
              className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4" />
              Abrir WhatsApp
            </Button>
            <button
              type="button"
              onClick={() => {
                trackWhatsAppClick("floating");
                window.open(buildUrl(), "_blank", "noopener,noreferrer");
                setOpen(false);
              }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Pular e abrir direto
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
