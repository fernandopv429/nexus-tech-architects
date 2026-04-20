import logo from "@/assets/nexus-logo.png";

export const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Nexus" className="h-8 w-8" />
          <div>
            <div className="font-display font-semibold">Nexus Dev Hub</div>
            <div className="text-xs text-muted-foreground">Departamento de Inteligência e Tecnologia</div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nexus. Todos os direitos reservados.
        </div>
      </div>
    </div>
  </footer>
);
