import { createCipheriv, randomBytes } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { codigoDeSesion } from "@/app/lib/ebook/acceso";

const RUTA_PDF = path.join(process.cwd(), "private", "ebook", "autoconstelaciones.pdf");

/**
 * Entrega el PDF cifrado (AES-256-GCM, clave aleatoria por pedido) para que
 * en la pestaña Red no aparezca un PDF descargable. El visor lo descifra en memoria.
 * Formato: clave (32) | iv (12) | texto cifrado + tag (16).
 */
export async function GET() {
  if (!(await codigoDeSesion())) {
    return NextResponse.json({ message: "Acceso no autorizado." }, { status: 401 });
  }

  let pdf: Buffer;
  try {
    pdf = await readFile(RUTA_PDF);
  } catch {
    console.error(`[ebook] No se encontró el PDF en ${RUTA_PDF}`);
    return NextResponse.json({ message: "Libro no disponible." }, { status: 404 });
  }

  const clave = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", clave, iv);
  const cifrado = Buffer.concat([cipher.update(pdf), cipher.final(), cipher.getAuthTag()]);

  return new NextResponse(new Uint8Array(Buffer.concat([clave, iv, cifrado])), {
    headers: {
      "Content-Type": "application/octet-stream",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
