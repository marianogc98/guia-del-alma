import { randomInt } from "crypto";
import { eq } from "drizzle-orm";
import { getDb } from "@/app/lib/db";
import { orders, type Order } from "@/app/lib/db/schema";

export type ResultadoConfirmar =
  | { ok: true; yaEstaba: boolean; order: Order }
  | { ok: false; reason: "no_existe" | "otro_pago" | "importe_no_coincide" };

/** Sin 0/O ni 1/I/L para que se pueda tipear sin confusiones. */
const ALFABETO = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

function generarCodigo() {
  const bloque = () =>
    Array.from({ length: 4 }, () => ALFABETO[randomInt(ALFABETO.length)]).join("");
  return `ALMA-${bloque()}-${bloque()}`;
}

/**
 * Marca la orden como pagada. Es idempotente: si llega el mismo pago dos
 * veces (retorno + webhook), la segunda devuelve `yaEstaba: true`.
 */
export async function confirmarPago({
  uid,
  providerRef,
  amountCentavos,
  currency,
}: {
  uid: string;
  providerRef: string;
  amountCentavos: number;
  currency: string;
}): Promise<ResultadoConfirmar> {
  return getDb().transaction(async (tx) => {
    const [order] = await tx
      .select()
      .from(orders)
      .where(eq(orders.uid, uid))
      .for("update");

    if (!order) return { ok: false, reason: "no_existe" };

    if (order.status === "paid") {
      if (order.providerRef === providerRef) {
        return { ok: true, yaEstaba: true, order };
      }
      console.error(
        `[ebook] Posible doble cobro en orden ${uid}: ya pagada con ${order.providerRef}, llegó ${providerRef}`
      );
      return { ok: false, reason: "otro_pago" };
    }

    if (order.amount !== amountCentavos || order.currency !== currency) {
      console.error(
        `[ebook] Importe no coincide en orden ${uid}: esperado ${order.amount} ${order.currency}, recibido ${amountCentavos} ${currency}`
      );
      return { ok: false, reason: "importe_no_coincide" };
    }

    const [actualizada] = await tx
      .update(orders)
      .set({
        status: "paid",
        providerRef,
        paidAt: new Date(),
        accessCode: generarCodigo(),
      })
      .where(eq(orders.uid, uid))
      .returning();

    return { ok: true, yaEstaba: false, order: actualizada };
  });
}
