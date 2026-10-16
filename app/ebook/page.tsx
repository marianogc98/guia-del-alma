import { BookOpen, KeyRound, Lock } from "lucide-react";
import MercadoPagoBoton from "@/app/components/ui/MercadoPagoBoton";
import { EBOOK, formatPrecio } from "@/app/lib/data/ebook";

const pasos = [
  { icon: BookOpen, texto: "Pagás de forma segura con Mercado Pago." },
  { icon: KeyRound, texto: "Te llega a tu email un código de acceso personal." },
  { icon: Lock, texto: "Con ese código leés el ebook online, cuando quieras." },
];

export default async function EbookPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string }>;
}) {
  const { pago } = await searchParams;

  return (
    <article className="section-padding bg-[radial-gradient(circle_at_15%_20%,rgba(178,144,121,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(139,115,85,0.15),transparent_30%)]">
      <div className="container-inner grid items-start gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Ebook
          </p>
          <h1 className="heading-xl mt-4 text-[var(--color-primary-dark)]">
            {EBOOK.titulo}
          </h1>
          {/* TODO: descripción del ebook */}
          <ul className="mt-10 space-y-4">
            {pasos.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-4 text-[var(--color-text)]">
                <span className="inline-flex rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                  <Icon className="size-5" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
            Precio
          </p>
          <p className="heading-lg mt-1 text-[var(--color-primary-dark)]">
            {formatPrecio(EBOOK.precioCentavos)}
          </p>
          {pago === "no_completado" && (
            <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
              El pago no se completó. Podés intentarlo de nuevo.
            </p>
          )}
          <div className="mt-6">
            <MercadoPagoBoton precio={EBOOK.precioCentavos / 100} />
          </div>
        </div>
      </div>
    </article>
  );
}
