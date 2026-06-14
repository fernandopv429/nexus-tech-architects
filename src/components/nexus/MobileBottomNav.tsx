import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Layers, MessageCircle, Stethoscope, ShoppingBag, Cpu, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { prefetchRoute } from "@/lib/routePrefetch";

const nichePages = [
  { to: "/medico", label: "Clínicas & Saúde", icon: Stethoscope, desc: "Agendamento e atendimento com IA" },
  { to: "/varejo", label: "E-commerce", icon: ShoppingBag, desc: "Recuperação de carrinho e vendas" },
  { to: "/iot", label: "IoT & Indústria", icon: Cpu, desc: "Monitoramento e telemetria em tempo real" },
];

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const MobileBottomNav = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleAnchor = (id: string) => (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      scrollToId(id);
    }
  };

  const itemBase =
    "group relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground transition-colors active:text-primary";

  return (
    <nav
      aria-label="Navegação principal"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-stretch">
        {/* Início */}
        {isHome ? (
          <a href="#top" onClick={handleAnchor("top")} className={itemBase}>
            <Home className="h-5 w-5" />
            <span>Início</span>
          </a>
        ) : (
          <Link to="/" onMouseEnter={() => prefetchRoute("/")} className={itemBase}>
            <Home className="h-5 w-5" />
            <span>Início</span>
          </Link>
        )}

        {/* Soluções (sheet) */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button type="button" className={itemBase}>
              <Layers className="h-5 w-5" />
              <span>Soluções</span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="rounded-t-2xl border-border/60 bg-background/95 backdrop-blur-xl pb-[calc(env(safe-area-inset-bottom)+1rem)]"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-xl tracking-tight">
                Soluções por segmento
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 grid gap-2">
              {nichePages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  onClick={() => setSheetOpen(false)}
                  onMouseEnter={() => prefetchRoute(page.to)}
                  className={`flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-4 transition-colors active:bg-card/80 ${
                    location.pathname === page.to ? "border-primary/40 bg-card/60" : ""
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <page.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-foreground">{page.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{page.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
              {isHome && (
                <button
                  type="button"
                  onClick={() => {
                    setSheetOpen(false);
                    setTimeout(() => scrollToId("areas"), 200);
                  }}
                  className="mt-1 flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-primary"
                >
                  Ver todas as áreas de atuação
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* Simulador */}
        <a
          href={isHome ? "#calculadora" : "/#calculadora"}
          onClick={handleAnchor("calculadora")}
          className={itemBase}
        >
          <span className="relative">
            <BarChart3 className="h-5 w-5" />
          </span>
          <span>Simulador</span>
        </a>

        {/* Contato — primary action */}
        <a
          href={isHome ? "#contato" : "/#contato"}
          onClick={handleAnchor("contato")}
          className="group relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary"
        >
          <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <MessageCircle className="h-5 w-5" />
          <span>Contato</span>
        </a>
      </div>
    </nav>
  );
};
