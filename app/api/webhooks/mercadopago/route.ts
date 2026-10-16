import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { confirmarPago } from "@/app/lib/orders/confirmar";
import { enviarMailCompra } from "@/app/lib/orders/email";
import { datosComprador, getPago } from "@/app/lib/payments/mercadopago";

function firmaValida(request: NextRequest, dataId: string) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  const header = request.headers.get("x-signature");
  const requestId = request.headers.get("x-request-id") ?? "";
  if (!secret || !header) return false;

  const partes = Object.fromEntries(
    header.split(",").map((p) => {
      const [k, ...v] = p.trim().split("=");
      return [k, v.join("=")];
    })
  );
  const { ts, v1 } = partes;
  if (!ts || !v1) return false;

  // MP pide el data.id en minúsculas si es alfanumérico.
  const manifiesto = `id:${dataId.toLowerCase()};request-id:${requestId};ts:${ts};`;
  const esperado = createHmac("sha256", secret).update(manifiesto).digest("hex");

  const a = Buffer.from(esperado);
  const b = Buffer.from(v1);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Notificaciones de Mercado Pago. Ante errores propios responde siempre 200
 * (con un 500, MP reintenta en bucle).
 */
export async function POST(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const body = (await request.json().catch(() => ({}))) as {
    type?: string;
    data?: { id?: string | number };
  };

  const type = body.type ?? query.get("type");
  const dataId = String(body.data?.id ?? query.get("data.id") ?? "");

  if (type !== "payment" || !dataId) {
    return NextResponse.json({ ignored: true });
  }

  if (!firmaValida(request, dataId)) {
    return NextResponse.json({ message: "Firma inválida" }, { status: 401 });
  }

  try {
    const pago = await getPago(dataId);
    if (pago.status === "approved" && pago.external_reference) {
      const r = await confirmarPago({
        uid: pago.external_reference,
        providerRef: String(pago.id),
        amountCentavos: Math.round(pago.transaction_amount * 100),
        currency: pago.currency_id,
        ...datosComprador(pago),
      });
      if (!r.ok) {
        console.error(`[ebook] Webhook no confirmó pago ${pago.id}: ${r.reason}`);
      } else if (!r.yaEstaba) {
        await enviarMailCompra(r.order).catch((err) =>
          console.error("[ebook] Error enviando mail:", err)
        );
      }
    }
  } catch (err) {
    console.error("[ebook] Error procesando webhook:", err);
  }

  return NextResponse.json({ received: true });
}
