"use client";

import { useState } from "react";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";
import { trackIniciarCompraEbook } from "@/app/lib/utils/analytics";

type Estado = "idle" | "yendo" | "error";

/** Crea la orden y redirige al checkout de Mercado Pago. */
export default function MercadoPagoBoton({ precio }: { precio: number }) {
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensaje, setMensaje] = useState("");

  async function comprar() {
    setEstado("yendo");
    try {
      const res = await fetch("/api/payments/mercadopago/create", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        message?: string;
      };
      if (!res.ok || !data.url) {
        setMensaje(data.message || "No pudimos iniciar el pago. Probá de nuevo.");
        setEstado("error");
        return;
      }
      trackIniciarCompraEbook(precio, "mercadopago");
      window.location.href = data.url;
    } catch {
      setMensaje("Error de conexión. Probá de nuevo en unos minutos.");
      setEstado("error");
    }
  }

  const yendo = estado === "yendo";

  return (
    <div className="space-y-3">
      {estado === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle size={16} /> {mensaje}
        </p>
      )}
      <button
        type="button"
        onClick={comprar}
        disabled={yendo}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium tracking-wide text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {yendo ? <Loader2 size={20} className="animate-spin" /> : <ShoppingBag size={20} />}
        {yendo ? "Yendo a Mercado Pago…" : "Pagar con Mercado Pago"}
      </button>
    </div>
  );
}
