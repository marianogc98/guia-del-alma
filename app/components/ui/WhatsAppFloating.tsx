"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL_WITH_MESSAGE } from "@/app/lib/data/site";
import { cn } from "@/app/lib/utils/cn";

type Props = {
  className?: string;
  /** Etiqueta visible (opcional; por defecto solo icono) */
  label?: string;
};

/**
 * Botón WhatsApp flotante (estructura.md: elemento fijo para conversión).
 * Fijo abajo a la derecha, visible en toda la landing.
 */
export default function WhatsAppFloating({
  className,
  label,
}: Props) {
  return (
    <a
      href={WHATSAPP_URL_WITH_MESSAGE}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white shadow-lg transition-all hover:bg-[#20bd5a] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2",
        !label && "p-3",
        className
      )}
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle size={24} />
      {label && <span className="text-sm">{label}</span>}
    </a>
  );
}
