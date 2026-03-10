import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros - Guía del Alma",
  description:
    "Conoce la historia, misión y valores de Guía del Alma. Un espacio dedicado al bienestar y al crecimiento personal.",
};

export default function NosotrosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
