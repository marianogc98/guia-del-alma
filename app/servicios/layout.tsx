import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | Guía del Alma",
  description:
    "Conoce los servicios de Guía del Alma: acompañamiento personal, talleres, grupos y más. Espacio de bienestar y crecimiento.",
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
