"use client";

import { useState } from "react";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";
import { trackIniciarCompraEbook } from "@/app/lib/utils/analytics";

type Estado = "idle" | "yendo" | "error";

const inputClass =
  "w-full rounded-lg border border-[var(--color-primary)]/20 bg-white px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";
const labelClass = "mb-1 block text-xs font-medium text-[var(--color-text)]";

/** Pide nombre y email, crea la orden y redirige al checkout de Mercado Pago. */
export default function MercadoPagoBoton({ precio }: { precio: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensaje, setMensaje] = useState("");

  async function comprar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("yendo");
    try {
      const res = await fetch("/api/payments/mercadopago/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        message?: string;
      };
      if (!res.ok || !data.url) {
        setMensaje(data.message || "No pudimos iniciar el pago. Probá de nuevo.");
        setEstado("error");
        return;
      }
      trackIniciarCompraEbook(precio);
      window.location.href = data.url;
    } catch {
      setMensaje("Error de conexión. Probá de nuevo en unos minutos.");
      setEstado("error");
    }
  }

  const yendo = estado === "yendo";

  return (
    <form onSubmit={comprar} className="space-y-3 text-left">
      <div>
        <label htmlFor="ebook-nombre" className={labelClass}>
          Nombre *
        </label>
        <input
          id="ebook-nombre"
          type="text"
          required
          maxLength={120}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Tu nombre"
          disabled={yendo}
        />
      </div>
      <div>
        <label htmlFor="ebook-email" className={labelClass}>
          Email * <span className="opacity-60">(ahí te llega tu código de acceso)</span>
        </label>
        <input
          id="ebook-email"
          type="email"
          required
          maxLength={200}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="tu@email.com"
          disabled={yendo}
        />
      </div>

      {estado === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle size={16} /> {mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={yendo}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium tracking-wide text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {yendo ? <Loader2 size={20} className="animate-spin" /> : <ShoppingBag size={20} />}
        {yendo ? "Yendo a Mercado Pago…" : "Comprar con Mercado Pago"}
      </button>
    </form>
  );
}
