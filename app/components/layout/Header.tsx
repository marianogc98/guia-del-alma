"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils/cn";
import { sectionIds } from "@/app/lib/data/content";

/** Navegación mínima (estructura.md: nada de menú complejo). Anclas a secciones de la landing. */
const navLinks = [
  { href: "/", label: "Inicio" },
  { href: `/#${sectionIds.metodoCrea}`, label: "Método C.R.E.A." },
  { href: `/#${sectionIds.servicios}`, label: "Encuentros" },
  { href: `/#${sectionIds.ctaFinal}`, label: "Contacto" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-primary)]/10 bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="container-inner flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-[var(--color-primary-dark)] transition-colors hover:text-[var(--color-primary)] md:text-2xl"
        >
          Jessica Frutos Guía del Alma
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          className="rounded-lg p-2 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-[var(--color-primary)]/10 bg-[var(--background)] md:hidden"
          >
            <nav className="container-inner flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-3 font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)]"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
