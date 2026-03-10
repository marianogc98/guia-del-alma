import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Método C.R.E.A. - Guía del Alma",
  description:
    "Qué es el Método C.R.E.A.: Constelaciones Familiares, Reprogramación Bioneuroemocional y Lectura Akáshica. Situaciones que se pueden trabajar.",
};

export default function MetodoCreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
