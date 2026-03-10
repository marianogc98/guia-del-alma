import Link from "next/link";
import Image from "next/image";
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
      <div className="container-inner py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-2">
              <Image
                src="/logoFooter.png"
                alt="Jessica Frutos - Guía del Alma"
                width={144}
                height={144}
                className="h-36 w-auto brightness-0 invert"
              />
            </div>
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
              Presencial en Córdoba Capital - Online
            </p>
            <p className="mt-4 text-sm text-white/80">
              Método C.R.E.A., Constelaciones Familiares,
              Reprogramación Bioneuroemocional y Biológica, Sanación Akáshica
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/20 pt-5 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} Jessica Frutos - Guía del Alma. Todos los derechos reservados.</p>
          <p className="mt-1">
            Desarrollo y diseño por{" "}
            <a
              href="https://kudev.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors"
            >
              kudev.com.ar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
