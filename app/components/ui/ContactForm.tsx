"use client";

import { useContactForm } from "@/app/lib/hooks/useContactForm";
import { cn } from "@/app/lib/utils/cn";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const { formData, updateField, submit, state } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="nombre"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]"
        >
          Nombre *
        </label>
        <input
          id="nombre"
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => updateField("nombre", e.target.value)}
          className="w-full rounded-lg border border-[var(--color-primary)]/20 bg-white px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="Tu nombre"
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]"
        >
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className="w-full rounded-lg border border-[var(--color-primary)]/20 bg-white px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="tu@email.com"
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label
          htmlFor="asunto"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]"
        >
          Asunto
        </label>
        <input
          id="asunto"
          type="text"
          value={formData.asunto}
          onChange={(e) => updateField("asunto", e.target.value)}
          className="w-full rounded-lg border border-[var(--color-primary)]/20 bg-white px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="Asunto del mensaje"
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]"
        >
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          required
          rows={5}
          value={formData.mensaje}
          onChange={(e) => updateField("mensaje", e.target.value)}
          className="w-full resize-y rounded-lg border border-[var(--color-primary)]/20 bg-white px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
          placeholder="Escribe tu mensaje..."
          disabled={state.status === "loading"}
        />
      </div>

      {state.status === "success" && state.message && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800"
          )}
          role="alert"
        >
          <CheckCircle className="size-5 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      {state.status === "error" && state.message && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800"
          )}
          role="alert"
        >
          <AlertCircle className="size-5 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state.status === "loading"}
        className="btn-primary w-full sm:w-auto disabled:opacity-70"
      >
        {state.status === "loading" ? (
          "Enviando..."
        ) : (
          <>
            Enviar mensaje
            <Send className="ml-2 size-5" />
          </>
        )}
      </button>
    </form>
  );
}
