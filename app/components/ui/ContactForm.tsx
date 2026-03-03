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

  const inputClass =
    "w-full rounded-lg border border-[var(--color-primary)]/20 bg-white px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/60 focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20";
  const labelClass = "mb-1 block text-xs font-medium text-[var(--color-text)]";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="nombre" className={labelClass}>
            Nombre *
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={(e) => updateField("nombre", e.target.value)}
            className={inputClass}
            placeholder="Tu nombre"
            disabled={state.status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="telefono" className={labelClass}>
            Teléfono <span className="opacity-60">(opcional)</span>
          </label>
          <input
            id="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => updateField("telefono", e.target.value)}
            className={inputClass}
            placeholder="+54 9 ..."
            disabled={state.status === "loading"}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={inputClass}
          placeholder="tu@email.com"
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="asunto" className={labelClass}>
          Asunto
        </label>
        <input
          id="asunto"
          type="text"
          value={formData.asunto}
          onChange={(e) => updateField("asunto", e.target.value)}
          className={inputClass}
          placeholder="Asunto del mensaje"
          disabled={state.status === "loading"}
        />
      </div>

      <div>
        <label htmlFor="mensaje" className={labelClass}>
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          required
          rows={3}
          value={formData.mensaje}
          onChange={(e) => updateField("mensaje", e.target.value)}
          className={cn(inputClass, "resize-y")}
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
