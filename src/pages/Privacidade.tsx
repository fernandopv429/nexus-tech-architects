import { Navbar } from "@/components/nexus/Navbar";
import { Footer } from "@/components/nexus/Footer";

const Privacidade = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-primary">Política de Privacidade</h1>
        
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            A <strong>Nexus Hub</strong> valoriza a sua privacidade. Esta política descreve como coletamos e utilizamos seus dados através de nossos formulários de contato e anúncios.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">1. Coleta de Dados</h2>
            <p>
              Coletamos informações básicas como <strong>Nome Completo, E-mail e Telefone</strong> quando você preenche voluntariamente nossos formulários de cadastro ou interage com nossos anúncios de geração de leads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">2. Finalidade do Tratamento</h2>
            <p>
              Seus dados são utilizados exclusivamente para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Entrar em contato para oferecer a consultoria de automação ou marketing solicitada;</li>
              <li>Enviar informações técnicas relevantes sobre nossos serviços de RPA, IA e Indústria 4.0;</li>
              <li>Personalizar sua experiência com nossas soluções de tecnologia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">3. Proteção e Compartilhamento</h2>
            <p>
              Não compartilhamos, vendemos ou alugamos seus dados para terceiros. Todas as informações são armazenadas em ambientes seguros e utilizadas apenas por nossa equipe interna.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">4. Seus Direitos</h2>
            <p>
              Você pode solicitar a exclusão, correção ou acesso aos seus dados a qualquer momento enviando um e-mail para <a href="mailto:comercial@nexusdevhub.com" className="text-primary hover:underline">comercial@nexusdevhub.com</a>.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm">
              Última atualização: 25 de Maio de 2026.
              <br />
              <strong>Nexus Dev Hub — Setor Digital de Elite.</strong>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;
