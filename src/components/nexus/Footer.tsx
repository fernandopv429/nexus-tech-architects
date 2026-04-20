import logo from "@/assets/nexus-logo.png";

const links = [
  { label: "Atuação", href: "#atuacao" },
  { label: "Como funciona", href: "#hub" },
  { label: "Diferenciais", href: "#valor" },
  { label: "Áreas", href: "#areas" },
  { label: "Contato", href: "#contato" },
];

export const Footer = () => (
  <footer className="bg-background pb-12 pt-24">
    <div className="container">
      {/* Massive wordmark */}
      <div className="border-b border-border pb-16 text-center">
        <h3 className="font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.85] tracking-[-0.05em] text-foreground">
          Nexus.
        </h3>
        <p className="mx-auto mt-6 max-w-md text-base text-muted-foreground">
          Seu departamento de inteligência e tecnologia, sob responsabilidade
          de engenharia.
        </p>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 pt-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Nexus" className="h-8 w-8" />
          <div>
            <div className="font-display text-sm font-semibold text-foreground">
              Nexus Dev Hub
            </div>
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} — Todos os direitos reservados
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>
);
