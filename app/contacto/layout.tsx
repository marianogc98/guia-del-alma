import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto - Guía del Alma",
  description:
    "Contacta con Guía del Alma. Envíanos tu mensaje y te responderemos lo antes posible.",
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
