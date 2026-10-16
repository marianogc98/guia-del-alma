/**
 * Datos del ebook. Los precios se leen de variables de entorno en el
 * servidor (en pesos, sin centavos) y nunca los manda el cliente.
 */
export const EBOOK = {
  titulo: "Autoconstelaciones",
  moneda: "ARS",
} as const;

function pesosDeEnv(nombre: string): number | null {
  const valor = Number(process.env[nombre]);
  return Number.isFinite(valor) && valor > 0 ? valor : null;
}

/** Precio con Mercado Pago, en centavos. Env: EBOOK_PRECIO_MP (default 29000). */
export function precioMpCentavos() {
  return Math.round((pesosDeEnv("EBOOK_PRECIO_MP") ?? 29000) * 100);
}

/** Precio promo por transferencia, en centavos. Env: EBOOK_PRECIO_TRANSFERENCIA (default: igual al de MP). */
export function precioTransferenciaCentavos() {
  const pesos = pesosDeEnv("EBOOK_PRECIO_TRANSFERENCIA");
  return pesos ? Math.round(pesos * 100) : precioMpCentavos();
}

export const DATOS_TRANSFERENCIA = {
  alias: "vidaplena.jessica",
  cvu: "0000003100008486839325",
  titular: "Jessica Frutos",
} as const;

/** WhatsApp para enviar el comprobante (+54 351 613-0347; wa.me usa el 9 de celular). */
export const WHATSAPP_COMPROBANTE = "5493516130347";

export function formatPrecio(centavos: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: EBOOK.moneda,
    maximumFractionDigits: 0,
  }).format(centavos / 100);
}
