/**
 * Mercado Pago (Checkout Pro) vía API REST, sin SDK.
 * La única fuente de verdad sobre un pago es GET /v1/payments/{id}.
 */

const API = "https://api.mercadopago.com";

export function siteUrl() {
  return (
    process.env.SITE_URL || "https://jessicafrutosguiadelalma.com"
  ).replace(/\/$/, "");
}

export function mpConfigurado() {
  return Boolean(process.env.MP_ACCESS_TOKEN);
}

async function llamar<T>(
  ruta: string,
  init: RequestInit & { idempotencyKey?: string } = {}
): Promise<T> {
  const { idempotencyKey, headers, ...rest } = init;
  const res = await fetch(`${API}${ruta}`, {
    ...rest,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : {}),
      ...headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`MP ${rest.method ?? "GET"} ${ruta} -> ${res.status}: ${body}`);
  }
  return (await res.json()) as T;
}

export async function crearPreferencia({
  uid,
  amountCentavos,
  titulo,
  email,
  nombre,
}: {
  uid: string;
  amountCentavos: number;
  titulo: string;
  email: string;
  nombre: string;
}) {
  const volver = `${siteUrl()}/api/payments/mercadopago/return?uid=${uid}`;
  return llamar<{ id: string; init_point: string }>("/checkout/preferences", {
    method: "POST",
    idempotencyKey: `pref-${uid}`,
    body: JSON.stringify({
      items: [
        {
          id: uid,
          title: titulo,
          quantity: 1,
          unit_price: amountCentavos / 100,
          currency_id: "ARS",
        },
      ],
      external_reference: uid,
      payer: { name: nombre, email },
      back_urls: { success: volver, pending: volver, failure: volver },
      auto_return: "approved",
      notification_url: `${siteUrl()}/api/webhooks/mercadopago`,
      statement_descriptor: "GUIA DEL ALMA",
    }),
  });
}

export type PagoMP = {
  id: number;
  status: string;
  external_reference: string | null;
  transaction_amount: number;
  currency_id: string;
};

export function getPago(id: string) {
  return llamar<PagoMP>(`/v1/payments/${encodeURIComponent(id)}`);
}
