import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Umami from "./components/Umami";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppFloating from "./components/ui/WhatsAppFloating";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guía del Alma | Acompañamiento consciente · Método C.R.E.A.",
  description:
    "Acompañamiento consciente para sanar vínculos, liberar bloqueos y crear nuevas posibilidades. Método C.R.E.A., constelaciones familiares y sanación emocional. Presencial en Córdoba y online.",
  keywords: [
    "acompañamiento consciente",
    "método CREA",
    "constelaciones familiares",
    "sanación emocional",
    "Córdoba",
    "guía del alma",
  ],
  openGraph: {
    title: "Guía del Alma | Acompañamiento consciente · Método C.R.E.A.",
    description:
      "Acompañamiento consciente para sanar vínculos, liberar bloqueos y crear nuevas posibilidades. Presencial en Córdoba y online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Umami />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
