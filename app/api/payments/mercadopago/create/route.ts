import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { EBOOK } from "@/app/lib/data/ebook";
import { getDb } from "@/app/lib/db";
import { orders } from "@/app/lib/db/schema";
import { crearPreferencia, mpConfigurado } from "@/app/lib/payments/mercadopago";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  if (!mpConfigurado()) {
    return NextResponse.json(
      { message: "Pagos no configurados." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    email?: unknown;
    name?: unknown;
  } | null;
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name || name.length > 120 || !emailRegex.test(email) || email.length > 200) {
    return NextResponse.json(
      { message: "Revisá tu nombre y email." },
      { status: 400 }
    );
  }

  const uid = randomUUID();

  try {
    await getDb().insert(orders).values({
      uid,
      email,
      name,
      amount: EBOOK.precioCentavos,
      currency: EBOOK.moneda,
    });

    const pref = await crearPreferencia({
      uid,
      amountCentavos: EBOOK.precioCentavos,
      titulo: EBOOK.titulo,
      email,
      nombre: name,
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
