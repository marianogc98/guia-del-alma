import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import Umami from "./components/Umami";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import WhatsAppFloating from "./components/ui/WhatsAppFloating";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Guía del Alma - Acompañamiento consciente - Método C.R.E.A.",
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
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "Guía del Alma - Acompañamiento consciente - Método C.R.E.A.",
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
    <html lang="es" className={`${plusJakarta.variable} ${lora.variable}`}>
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
