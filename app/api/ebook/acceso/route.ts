import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_ACCESO,
  DURACION_SESION_SEG,
  codigoValido,
  normalizarCodigo,
} from "@/app/lib/ebook/acceso";

/** Valida el código y abre la sesión de lectura. */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { codigo?: unknown } | null;
  const codigo = typeof body?.codigo === "string" ? normalizarCodigo(body.codigo) : null;

  try {
    if (!codigo || !(await codigoValido(codigo))) {
      return NextResponse.json(
        { message: "El código no es válido. Revisalo e intentá de nuevo." },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("[ebook] Error validando código:", err);
    return NextResponse.json(
      { message: "No pudimos validar el código. Probá en unos minutos." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_ACCESO, codigo, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: DURACION_SESION_SEG,
  });
  return res;
}

/** Cierra la sesión de lectura. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_ACCESO);
  return res;
}
