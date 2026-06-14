import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Stethoscope, ShoppingBag, Home, BarChart3, Layers, Award, MessageCircle, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { prefetchRoute } from "@/lib/routePrefetch";
import { MobileBottomNav } from "./MobileBottomNav";


const anchorLinks = [
  { href: "/#calculadora", label: "Simulador", icon: BarChart3 },
  { href: "/#areas", label: "Soluções", icon: Layers },
  { href: "/#valor", label: "Diferenciais", icon: Award },
  { href: "/#contato", label: "Contato", icon: MessageCircle },
];

const nichePages = [
  { to: "/medico", label: "Clínicas & Saúde", icon: Stethoscope, desc: "Agendamento e atendimento com IA" },
  { to: "/varejo", label: "E-commerce", icon: ShoppingBag, desc: "Recuperação de carrinho e vendas" },
  { to: "/iot", label: "IoT & Indústria", icon: Cpu, desc: "Monitoramento e telemetria em tempo real" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const lastYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Auto-hide on scroll down, reveal on scroll up (mobile-friendly)
      if (y > 120 && y > lastYRef.current + 4) {
        setHidden(true);
      } else if (y < lastYRef.current - 4 || y < 80) {
        setHidden(false);
      }
      lastYRef.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome) {
      e.preventDefault();
      const id = href.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >

      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" onMouseEnter={() => prefetchRoute("/")}>
          <span className="font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Nexus
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center">
          <div className="flex items-center gap-1 rounded-full border border-border bg-secondary/30 px-2 py-1.5 backdrop-blur-sm">
            {/* Home link (shown on non-home pages) */}
            {!isHome && (
              <Link
                to="/"
                onMouseEnter={() => prefetchRoute("/")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground rounded-full hover:bg-secondary"
              >
                <Home className="h-4 w-4" />
                Início
              </Link>
            )}

            {/* Anchor links (only on home) */}
            {isHome &&
              anchorLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleAnchorClick(e, l.href)}
                  onMouseEnter={() => prefetchRoute(l.href)}
                  onFocus={() => prefetchRoute(l.href)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:text-foreground rounded-full hover:bg-secondary"
                >
                  <l.icon className="h-4 w-4" />
                  {l.label}
                </a>
              ))}

            {/* Niche pages dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                onMouseEnter={() => setDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-all duration-200 rounded-full ${
                  dropdownOpen
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Para seu negócio
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {nichePages.map((page) => (
                        <Link
                          key={page.to}
                          to={page.to}
                          onMouseEnter={() => prefetchRoute(page.to)}
                          className={`flex items-start gap-3 rounded-xl p-3 transition-colors ${
                            location.pathname === page.to
                              ? "bg-primary/10"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                            location.pathname === page.to
                              ? "bg-primary text-white"
                              : "bg-secondary text-muted-foreground"
                          }`}>
                            <page.icon className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className={`text-sm font-semibold ${
                              location.pathname === page.to ? "text-primary" : "text-foreground"
                            }`}>
                              {page.label}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{page.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <Button
            variant="default"
            size="sm"
            className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6 shadow-glow"
            asChild
          >
            <a href="#contato" onClick={(e) => handleAnchorClick(e, "/#contato")}>
              Falar com nosso time
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground transition-colors hover:bg-secondary"
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
            className="lg:hidden absolute top-full left-0 right-0 border-b border-border bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="container flex flex-col gap-1 py-6">
              {/* Home link on non-home pages */}
              {!isHome && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0, duration: 0.2 }}
                >
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    Início
                  </Link>
                </motion.div>
              )}

              {/* Anchor links */}
              {isHome &&
                anchorLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => handleAnchorClick(e, l.href)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 text-base text-muted-foreground hover:text-foreground rounded-xl hover:bg-secondary transition-colors"
                  >
                    <l.icon className="h-5 w-5" />
                    {l.label}
                  </motion.a>
                ))}

              {/* Divider */}
              <div className="my-2 h-px bg-border" />

              {/* Niche pages section */}
              <p className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Soluções por segmento
              </p>
              {nichePages.map((page, i) => (
                <motion.div
                  key={page.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (anchorLinks.length + i) * 0.05, duration: 0.2 }}
                >
                  <Link
                    to={page.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location.pathname === page.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <page.icon className="h-5 w-5" />
                    <div>
                      <p className="text-base font-medium">{page.label}</p>
                      <p className="text-xs text-muted-foreground">{page.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <Button
                variant="default"
                className="mt-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-glow"
                asChild
              >
                <a href="#contato" onClick={(e) => { handleAnchorClick(e, "/#contato"); setOpen(false); }}>
                  Falar com nosso time
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    <MobileBottomNav />
    </>
  );
};

