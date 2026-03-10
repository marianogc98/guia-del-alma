"use client";

import { MessageCircle } from "lucide-react";
import {
  WHATSAPP_URL,
  WHATSAPP_URL_WITH_MESSAGE,
  WHATSAPP_URL_ENCUENTROS,
  WHATSAPP_CTA,
} from "@/app/lib/data/site";
import { cn } from "@/app/lib/utils/cn";

type Props = {
  variant?: "primary" - "secondary" - "footer";
  className?: string;
  label?: string;
  /** Usar mensaje prearmado (recomendado para CTAs principales) */
  usePredefinedMessage?: boolean;
  /** Si es true, usa el mensaje de encuentros (reservar sesión) */
  encuentros?: boolean;
};

export default function WhatsAppButton({
  variant = "primary",
  className,
  label = WHATSAPP_CTA,
  usePredefinedMessage = true,
  encuentros = false,
}: Props) {
  const href = encuentros
    ? WHATSAPP_URL_ENCUENTROS
    : usePredefinedMessage
      ? WHATSAPP_URL_WITH_MESSAGE
      : WHATSAPP_URL;
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary:
      "bg-[#25D366] text-white hover:bg-[#20bd5a] focus:ring-[#25D366] px-6 py-3",
    secondary:
      "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white focus:ring-[#25D366] px-6 py-3",
    footer:
      "bg-[#25D366] text-white hover:bg-[#20bd5a] text-sm px-4 py-2 focus:ring-[#25D366]",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, styles[variant], className)}
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle size={20} />
      {label}
    </a>
  );
}
