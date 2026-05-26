import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const WEBHOOK_URL =
  "https://autowebhook.nexusdevhub.com/webhook/06079874-0bc8-412a-9c0d-f264bba35947";

type Msg = { role: "bot" | "user"; text: string };

const getSectorFromPath = (path: string): string => {
  if (path.startsWith("/medico")) return "saude";
  if (path.startsWith("/varejo")) return "varejo";
  return "geral";
};

const SESSION_KEY = "nexus_chat_session_id";
const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
};

export const ChatWidget = () => {
  const { pathname } = useLocation();
  const sector = getSectorFromPath(pathname);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Olá! Muito obrigado pelo interesse. Como posso te ajudar hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, sending]);

  const handleOpen = () => {
    setOpen(true);
    trackEvent("chat_open", { sector, path: pathname });
  };

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    setSending(true);
    trackEvent("chat_message_sent", { sector, path: pathname });

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sector,
          session_id: getSessionId(),
          page: {
            path: pathname,
            url: typeof window !== "undefined" ? window.location.href : "",
            title: typeof document !== "undefined" ? document.title : "",
          },
          history: next.map((m) => ({ role: m.role, text: m.text })),
          ts: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      const pick = (v: unknown): string | null => {
        if (!v) return null;
        if (typeof v === "string") return v;
        if (Array.isArray(v)) {
          for (const item of v) {
            const r = pick(item);
            if (r) return r;
          }
          return null;
        }
        if (typeof v === "object") {
          const o = v as Record<string, unknown>;
          return (
            pick(o.output) ||
            pick(o.reply) ||
            pick(o.message) ||
            pick(o.text) ||
            pick(o.response) ||
            pick(o.answer) ||
            pick(o.data)
          );
        }
        return null;
      };
      const reply =
        pick(data) ||
        "Obrigado! Em instantes um especialista entra em contato.";
      setMessages((m) => [...m, { role: "bot", text: String(reply) }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Tive um problema pra responder agora. Tente novamente em instantes.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        type="button"
        aria-label="Abrir chat com a Nexus IA"
        onClick={handleOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-pulse-glow" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-elegant transition-transform group-hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed bottom-6 right-6 z-50 flex h-[560px] max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-emerald-500 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="leading-tight">
                  <p className="font-display text-base font-semibold">Nexus IA</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/85">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-200" />
                    Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fechar chat"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-white/90 transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-background/40 px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "rounded-br-md bg-emerald-500 text-white"
                        : "rounded-bl-md bg-card text-foreground border border-border"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {sending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground shadow-sm">
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-center gap-2 border-t border-border bg-card px-3 py-3"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                disabled={sending}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-emerald-500 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Enviar mensagem"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <p className="bg-card pb-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground">
              Power by Nexus.ai
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
