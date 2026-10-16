import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LectorEbook from "@/app/components/ebook/LectorEbook";
import { codigoDeSesion } from "@/app/lib/ebook/acceso";

export const metadata: Metadata = {
  title: "Leer ebook | Guía del Alma",
  robots: { index: false },
};

export default async function LeerPage() {
  const codigo = await codigoDeSesion();
  if (!codigo) redirect("/ebook?acceso=requerido#codigo");

  return <LectorEbook marcaDeAgua={codigo} />;
}
