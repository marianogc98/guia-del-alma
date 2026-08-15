import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Clave de tu Transformación - Jessica Frutos | Guía del Alma",
  description:
    "Encuentro presencial vivencial para liberarte de las heridas del pasado que siguen condicionando tu presente y recuperar tu poder personal. 29 de agosto, Córdoba Capital.",
  openGraph: {
    title: "La Clave de tu Transformación - Jessica Frutos",
    description:
      "Encuentro presencial y vivencial en Córdoba Capital. 29 de agosto, 18 a 20 hs. Cupos limitados.",
    type: "website",
  },
};

export default function ClaveTransformacionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
