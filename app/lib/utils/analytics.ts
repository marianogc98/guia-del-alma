/**
 * Eventos de analítica (Google Analytics 4 + Meta Pixel).
 *
 * Nombres de evento GA4: solo letras, números y guiones bajos.
 * Los parámetros (ej. `origen`) hay que registrarlos una vez en
 * GA4 → Admin → Definiciones personalizadas para poder segmentar por ellos.
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
    fbq?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

function gaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}

function metaEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", name, params);
}

/** Origen del clic a WhatsApp (se registra como dimensión personalizada `origen`) */
export type WhatsappOrigen =
  | "flotante"
  | "home_hero"
  | "home_fechas_constelaciones"
  | "home_fechas_proceso_crea"
  | `servicios_${string}`;

/** Clic en cualquier CTA de WhatsApp del sitio (engagement general) */
export function trackWhatsappClick(origen: WhatsappOrigen) {
  gaEvent("whatsapp_click", { origen });
}

/**
 * Clic en "Quiero reservar mi lugar" de la landing del encuentro.
 * Evento clave / conversión: tiene nombre propio para poder marcarlo
 * como tal en GA4 (los eventos clave se marcan por nombre, no por parámetro).
 */
export function trackReservarClick(origen: "hero" | "final") {
  gaEvent("reservar_click", { origen });
  metaEvent("Lead", { content_name: "La Clave de tu Transformación" });
}

/** El bloque de precio de la landing entró en pantalla (mide drop-off previo) */
export function trackViewPrecio() {
  gaEvent("view_precio", { origen: "clave_transformacion" });
}

/** Clic en "Comprar" del ebook, justo antes de ir a Mercado Pago */
export function trackIniciarCompraEbook(valor: number) {
  gaEvent("begin_checkout", { currency: "ARS", value: valor, items: [{ item_name: "ebook" }] });
  metaEvent("InitiateCheckout", { currency: "ARS", value: valor });
}

/** Envío exitoso del formulario de contacto */
export function trackGenerateLead(formName: string) {
  gaEvent("generate_lead", { form_name: formName });
}
