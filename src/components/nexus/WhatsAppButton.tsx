import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/5511942029143?text=Ol%C3%A1%20Nexus%2C%20gostaria%20de%20conhecer%20o%20Hub%20de%20Tecnologia";

export const WhatsAppFloating = () => (
  <motion.a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Falar no WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.2, type: "spring" }}
    className="fixed bottom-6 right-6 z-50 group"
  >
    <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-pulse-glow" />
    <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-elegant transition-transform group-hover:scale-110">
      <MessageCircle className="h-6 w-6" />
    </span>
    <span className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg glass px-3 py-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
      Falar no WhatsApp
    </span>
  </motion.a>
);

export { WHATSAPP_URL };
