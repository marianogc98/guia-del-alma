/**
 * Datos del ebook. El precio se usa SOLO del lado del servidor para crear
 * la orden; el cliente nunca lo manda.
 */
export const EBOOK = {
  /** TODO: reemplazar por el título definitivo */
  titulo: "Ebook Guía del Alma",
  /** $29.000 ARS en centavos */
  precioCentavos: 2_900_000,
  moneda: "ARS",
} as const;

export function formatPrecio(centavos: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: EBOOK.moneda,
    maximumFractionDigits: 0,
  }).format(centavos / 100);
}
