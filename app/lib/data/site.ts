/**
 * Número de WhatsApp con código de país, sin + ni espacios.
 * Ejemplo Argentina: 5493511234567
 * Se usa para construir el enlace wa.me
 */
const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+5493516130347";

export const WHATSAPP_URL = `https://wa.me/${whatsappNumber}`;

/** Mensaje prearmado para abrir WhatsApp (estructura.md: mensaje predefinido) */
export const WHATSAPP_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
  "Hola, me interesa conocer más sobre el acompañamiento y los espacios que ofrecés.";

/** Mensaje para el CTA de encuentros (reservar / consultar) */
export const WHATSAPP_MESSAGE_ENCUENTROS =
  "Hola, me gustaría consultar por encuentros o reservar una sesión.";

/** URL de WhatsApp con mensaje predefinido (para CTAs principales) */
export const WHATSAPP_URL_WITH_MESSAGE = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** URL de WhatsApp con mensaje de encuentros */
export const WHATSAPP_URL_ENCUENTROS = `${WHATSAPP_URL}?text=${encodeURIComponent(WHATSAPP_MESSAGE_ENCUENTROS)}`;

export const WHATSAPP_CTA = "Escribime por WhatsApp";
