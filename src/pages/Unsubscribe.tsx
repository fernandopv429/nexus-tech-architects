import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";


type State =
  | { status: "loading" }
  | { status: "valid" }
  | { status: "already" }
  | { status: "invalid" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const Unsubscribe = () => {
  useSEO({
    title: "Cancelar inscrição | Nexus DevHub",
    description: "Página para confirmar o cancelamento de inscrição em comunicações da Nexus DevHub.",
    canonical: "/unsubscribe",
  });

  const [state, setState] = useState<State>({ status: "loading" });
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  useEffect(() => {
    if (!token) {
      setState({ status: "invalid" });
      return;
    }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`;
    fetch(url, {
      headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
    })
      .then(async (r) => {
        const data = await r.json();
        if (data?.valid) setState({ status: "valid" });
        else if (data?.reason === "already_unsubscribed")
          setState({ status: "already" });
        else setState({ status: "invalid" });
      })
      .catch(() => setState({ status: "invalid" }));
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ status: "submitting" });
    const { data, error } = await supabase.functions.invoke(
      "handle-email-unsubscribe",
      { body: { token } }
    );
    if (error) {
      console.error("Unsubscribe error", error);
      setState({
        status: "error",
        message: "Não foi possível processar. Tente novamente mais tarde.",
      });
      return;
    }
    if (data?.success) setState({ status: "success" });
    else if (data?.reason === "already_unsubscribed")
      setState({ status: "already" });
    else
      setState({
        status: "error",
        message: "Não foi possível processar. Tente novamente mais tarde.",
      });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Cancelar inscrição
        </h1>

        {state.status === "loading" && (
          <div className="mt-6 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Validando seu link...
          </div>
        )}

        {state.status === "valid" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Confirme abaixo para parar de receber e-mails da Nexus DevHub.
            </p>
            <Button
              onClick={confirm}
              variant="pill"
              size="pill"
              className="mt-8 w-full"
            >
              Confirmar cancelamento
            </Button>
          </>
        )}

        {state.status === "submitting" && (
          <div className="mt-6 flex items-center justify-center text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </div>
        )}

        {state.status === "success" && (
          <p className="mt-6 text-foreground">
            Pronto. Você não receberá mais e-mails nossos.
          </p>
        )}

        {state.status === "already" && (
          <p className="mt-6 text-muted-foreground">
            Este endereço já estava cancelado.
          </p>
        )}

        {state.status === "invalid" && (
          <p className="mt-6 text-destructive">
            Link inválido ou expirado.
          </p>
        )}

        {state.status === "error" && (
          <p className="mt-6 text-destructive">{state.message}</p>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
