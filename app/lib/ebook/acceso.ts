import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDb } from "@/app/lib/db";
import { orders } from "@/app/lib/db/schema";

/** Cookie httpOnly con el código de acceso; se revalida contra la base en cada uso. */
export const COOKIE_ACCESO = "ebook_acceso";
export const DURACION_SESION_SEG = 60 * 60 * 24 * 90;

/** Acepta el código con o sin guiones, en minúsculas o con espacios. */
export function normalizarCodigo(valor: string) {
  const limpio = valor.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const sinPrefijo = limpio.startsWith("ALMA") ? limpio.slice(4) : limpio;
  if (sinPrefijo.length !== 8) return null;
  return `ALMA-${sinPrefijo.slice(0, 4)}-${sinPrefijo.slice(4)}`;
}

/**
 * Código único compartido para quienes pagan por transferencia (Jessica lo
 * envía por WhatsApp). Si se filtra, se cambia la env y deja de valer el anterior.
 */
function codigoTransferencia() {
  const valor = process.env.EBOOK_CODIGO_TRANSFERENCIA;
  return valor ? normalizarCodigo(valor) : null;
}

export async function codigoValido(codigo: string) {
  if (codigo === codigoTransferencia()) return true;

  const [order] = await getDb()
    .select({ uid: orders.uid })
    .from(orders)
    .where(and(eq(orders.accessCode, codigo), eq(orders.status, "paid")));
  return Boolean(order);
}

/** Devuelve el código de la sesión actual si sigue siendo válido. */
export async function codigoDeSesion() {
  const valor = (await cookies()).get(COOKIE_ACCESO)?.value;
  const codigo = valor ? normalizarCodigo(valor) : null;
  if (!codigo) return null;
  return (await codigoValido(codigo)) ? codigo : null;
}
