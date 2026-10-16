import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { EBOOK, precioMpCentavos } from "@/app/lib/data/ebook";
import { getDb } from "@/app/lib/db";
import { orders } from "@/app/lib/db/schema";
import { crearPreferencia, mpConfigurado } from "@/app/lib/payments/mercadopago";

/**
 * Crea la orden y la preferencia de pago. No pide datos al comprador:
 * nombre y email se toman del pago de Mercado Pago al confirmarlo.
 */
export async function POST() {
  if (!mpConfigurado()) {
    return NextResponse.json(
      { message: "Pagos no configurados." },
      { status: 503 }
    );
  }

  const uid = randomUUID();
  const amount = precioMpCentavos();

  try {
    await getDb().insert(orders).values({
      uid,
      amount,
      currency: EBOOK.moneda,
    });

    const pref = await crearPreferencia({
      uid,
      amountCentavos: amount,
      titulo: EBOOK.titulo,
    });

    return NextResponse.json({ url: pref.init_point });
  } catch (err) {
    console.error("[ebook] Error creando preferencia:", err);
    return NextResponse.json(
      { message: "No pudimos iniciar el pago. Probá de nuevo en unos minutos." },
      { status: 502 }
    );
  }
}
