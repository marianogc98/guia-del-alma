import Link from "next/link";
import { MapPin } from "lucide-react";
import { sectionIds } from "@/app/lib/data/content";

/** Enlaces a secciones de la landing (anclas en home) */
const footerLinks = [
  { href: "/", label: "Inicio" },
  { href: `/#${sectionIds.metodoCrea}`, label: "Método C.R.E.A." },
  { href: `/#${sectionIds.servicios}`, label: "Encuentros" },
  { href: `/#${sectionIds.ctaFinal}`, label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-primary)]/10 bg-[var(--color-primary-dark)] text-white">
      <div className="container-inner section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 font-serif text-xl font-semibold">
              Guía del Alma
            </h3>
            <p className="text-sm text-white/80">
            Método C.R.E.A., Constelaciones Familiares,
             Reprogramación Bioneuroemocional y Biológica, Sanación Akáshica
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Navegación
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              Ubicación
            </h4>
            <p className="flex items-start gap-2 text-sm text-white/80">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              Presencial en Córdoba Capital · Online
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8 text-center text-sm text-white/60">
          © {new Date().getFullYear()} Jessica Frutos | Guía del Alma. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
