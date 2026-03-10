import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "jessicafrutosvidaplena@gmail.com";

function validateBody(body: unknown): {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
} | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (
    typeof b.nombre !== "string" ||
    typeof b.email !== "string" ||
    typeof b.asunto !== "string" ||
    typeof b.mensaje !== "string"
  ) {
    return null;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(b.email)) return null;
  if (!b.nombre.trim() || !b.mensaje.trim()) return null;
  return {
    nombre: b.nombre.trim(),
    email: b.email.trim(),
    asunto: (b.asunto || "Contacto web").trim(),
    mensaje: b.mensaje.trim(),
  };
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { message: "Servicio de email no configurado." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Cuerpo de la petición inválido." },
      { status: 400 }
    );
  }

  const data = validateBody(body);
  if (!data) {
    return NextResponse.json(
      { message: "Datos inválidos. Revisa nombre, email y mensaje." },
      { status: 400 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Guía del Alma <contacto@jessicafrutosguiadelalma.com>",
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `[Guía del Alma] ${data.asunto} - ${data.nombre}`,
      html: `
        <p><strong>Nombre:</strong> ${data.nombre}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Asunto:</strong> ${data.asunto}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.mensaje.replace(/\n/g, "<br>")}</p>
      `,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message || "Error al enviar el email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { message: "Error interno al enviar el mensaje." },
      { status: 500 }
    );
  }
}
