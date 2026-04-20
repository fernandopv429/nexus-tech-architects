import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#atuacao", label: "Atuação" },
  { href: "#hub", label: "Como funciona" },
  { href: "#valor", label: "Diferenciais" },
  { href: "#areas", label: "Áreas" },
  { href: "#contato", label: "Contato" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        {/* Minimalist Logo */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 transition-all duration-300 group-hover:bg-secondary group-hover:border-primary/30">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">N</span>
          </div>
          <span className="hidden sm:inline font-display text-xl font-semibold tracking-tight text-foreground">
            Nexus
          </span>
        </a>

        {/* Desktop Nav — minimalist pill style */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-2 py-1.5 backdrop-blur-sm">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground rounded-full hover:bg-secondary"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        {/* CTA — white pill */}
        <div className="hidden md:block">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-white/20 bg-white text-black hover:bg-white/90 hover:text-black font-medium px-6"
            asChild
          >
            <a href="#contato">Falar com Engenharia</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container flex flex-col gap-2 py-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className="px-4 py-3 text-base text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors"
                >
                  {l.label}
                </motion.a>
              ))}
              <Button
                variant="outline"
                className="mt-4 rounded-full border-white/20 bg-white text-black hover:bg-white/90 hover:text-black font-medium"
                asChild
              >
                <a href="#contato" onClick={() => setOpen(false)}>
                  Falar com Engenharia
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
