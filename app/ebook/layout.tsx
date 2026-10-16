import type { Metadata } from "next";
import { EBOOK } from "@/app/lib/data/ebook";

export const metadata: Metadata = {
  title: `${EBOOK.titulo} - Jessica Frutos | Guía del Alma`,
  description: `Comprá ${EBOOK.titulo} y leelo online con tu código de acceso personal.`,
};

export default function EbookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
