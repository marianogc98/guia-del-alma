import { Resend } from "resend";
import { EBOOK } from "@/app/lib/data/ebook";
import type { Order } from "@/app/lib/db/schema";

function escapar(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** Mail al comprador con su código de acceso. */
export async function enviarMailCompra(order: Order) {
  if (!process.env.RESEND_API_KEY || !order.accessCode) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Guía del Alma <contacto@jessicafrutosguiadelalma.com>",
    to: order.email,
    subject: `Tu código de acceso a "${EBOOK.titulo}"`,
    html: `
      <p>Hola ${escapar(order.name)},</p>
      <p>¡Gracias por tu compra! Tu pago de <strong>${EBOOK.titulo}</strong> fue confirmado.</p>
      <p>Este es tu código de acceso personal:</p>
      <p style="font-size:22px;font-weight:bold;letter-spacing:2px">${order.accessCode}</p>
      <p>Guardalo: lo vas a necesitar para leer el ebook en el sitio.</p>
      <p>Con cariño,<br>Jessica Frutos · Guía del Alma</p>
    `,
  });
  if (error) throw new Error(error.message);
}
