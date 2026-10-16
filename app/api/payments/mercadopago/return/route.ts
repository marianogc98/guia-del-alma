import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { orders } from "@/app/lib/db/schema";
import { confirmarPago } from "@/app/lib/orders/confirmar";
import { enviarMailCompra } from "@/app/lib/orders/email";
import { getPago, siteUrl } from "@/app/lib/payments/mercadopago";

/**
 * Vuelta del navegador desde Mercado Pago. El querystring (`status=...`)
 * NO se usa para decidir: se consulta el pago en la API.
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const uid = params.get("uid") ?? "";
  const paymentId = params.get("payment_id") ?? params.get("collection_id");

  const base = siteUrl();
  const gracias = `${base}/ebook/gracias?uid=${encodeURIComponent(uid)}`;
  const volverAPagar = `${base}/ebook?pago=no_completado`;

  if (!uid) return NextResponse.redirect(`${base}/ebook`);

  try {
    const [order] = await getDb()
      .select({ status: orders.status })
      .from(orders)
      .where(eq(orders.uid, uid));
    if (!order) return NextResponse.redirect(`${base}/ebook`);
    if (order.status === "paid") return NextResponse.redirect(gracias);

    if (!paymentId || paymentId === "null") {
      return NextResponse.redirect(volverAPagar);
    }

    const pago = await getPago(paymentId);
    if (pago.external_reference !== uid) {
      console.error(`[ebook] Pago ${paymentId} no corresponde a la orden ${uid}`);
      return NextResponse.redirect(volverAPagar);
    }

    // pending / in_process: lo resuelve el webhook; la página de gracias lo muestra como "procesando".
    if (pago.status === "pending" || pago.status === "in_process") {
      return NextResponse.redirect(gracias);
    }
    if (pago.status !== "approved") {
      return NextResponse.redirect(volverAPagar);
    }

    const r = await confirmarPago({
      uid,
      providerRef: String(pago.id),
      amountCentavos: Math.round(pago.transaction_amount * 100),
      currency: pago.currency_id,
    });
    if (r.ok && !r.yaEstaba) {
      await enviarMailCompra(r.order).catch((err) =>
        console.error("[ebook] Error enviando mail:", err)
      );
    }
  } catch (err) {
    console.error("[ebook] Error en retorno de MP:", err);
  }

  return NextResponse.redirect(gracias);
}
