"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, BookOpen, Loader2 } from "lucide-react";

type Estado = "idle" | "validando" | "error";

/** Formulario para ingresar el código de acceso y abrir el lector. */
export default function IngresarCodigo({ codigoInicial = "" }: { codigoInicial?: string }) {
  const router = useRouter();
  const [codigo, setCodigo] = useState(codigoInicial);
  const [estado, setEstado] = useState<Estado>("idle");
  const [mensaje, setMensaje] = useState("");

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setEstado("validando");
    try {
      const res = await fetch("/api/ebook/acceso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        setMensaje(data.message || "El código no es válido.");
        setEstado("error");
        return;
      }
      router.push("/ebook/leer");
    } catch {
      setMensaje("Error de conexión. Probá de nuevo en unos minutos.");
      setEstado("error");
    }
  }

  const validando = estado === "validando";

  return (
    <form onSubmit={entrar} className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="ebook-codigo" className="sr-only">
          Código de acceso
        </label>
        <input
          id="ebook-codigo"
          type="text"
          required
          autoComplete="off"
          spellCheck={false}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="ALMA-XXXX-XXXX"
          disabled={validando}
          className="w-full rounded-full border border-[var(--color-primary)]/20 bg-white px-5 py-3 font-mono uppercase tracking-widest text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/50 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
        />
        <button
          type="submit"
          disabled={validando}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-3 font-medium tracking-wide text-white transition-all hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {validando ? <Loader2 size={18} className="animate-spin" /> : <BookOpen size={18} />}
          Leer el libro
        </button>
      </div>
      {estado === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-700">
          <AlertCircle size={16} /> {mensaje}
        </p>
      )}
    </form>
  );
}
