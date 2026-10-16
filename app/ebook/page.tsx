import { BookOpen, KeyRound, Lock } from "lucide-react";
import IngresarCodigo from "@/app/components/ebook/IngresarCodigo";
import MercadoPagoBoton from "@/app/components/ui/MercadoPagoBoton";
import TransferenciaDatos from "@/app/components/ui/TransferenciaDatos";
import {
  DATOS_TRANSFERENCIA,
  EBOOK,
  WHATSAPP_COMPROBANTE,
  formatPrecio,
  precioMpCentavos,
  precioTransferenciaCentavos,
} from "@/app/lib/data/ebook";

const pasos = [
  { icon: BookOpen, texto: "Elegís cómo pagar: transferencia o Mercado Pago." },
  { icon: KeyRound, texto: "Recibís tu código de acceso personal." },
  { icon: Lock, texto: "Con ese código leés el ebook online, cuando quieras." },
];

export default async function EbookPage({
  searchParams,
}: {
  searchParams: Promise<{ pago?: string; acceso?: string }>;
}) {
  const { pago, acceso } = await searchParams;
  const precioMp = precioMpCentavos();
  const precioTransf = precioTransferenciaCentavos();
  const descuento =
    precioTransf < precioMp ? Math.round((1 - precioTransf / precioMp) * 100) : 0;

  const mensajeWhatsapp = `Hola Jessica, hice la transferencia de ${formatPrecio(precioTransf)} por el ebook "${EBOOK.titulo}". Te envío el comprobante.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_COMPROBANTE}?text=${encodeURIComponent(mensajeWhatsapp)}`;

  return (
    <article className="section-padding bg-[radial-gradient(circle_at_15%_20%,rgba(178,144,121,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(139,115,85,0.15),transparent_30%)]">
      <div className="container-inner">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Ebook
          </p>
          <h1 className="heading-xl mt-4 text-[var(--color-primary-dark)]">
            {EBOOK.titulo}
          </h1>
          {/* TODO: descripción del ebook */}
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
            {pasos.map(({ icon: Icon, texto }) => (
              <li key={texto} className="flex items-center gap-3 text-sm text-[var(--color-text)]">
                <span className="inline-flex shrink-0 rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                  <Icon className="size-5" />
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>

        {pago === "no_completado" && (
          <p className="mx-auto mt-10 max-w-4xl rounded-lg bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
            El pago no se completó. Podés intentarlo de nuevo.
          </p>
        )}

        <div className="mx-auto mt-10 grid max-w-4xl items-start gap-6 md:grid-cols-2">
          {/* Transferencia (promo) */}
          <div className="relative rounded-2xl border-2 border-[var(--color-primary)]/40 bg-white p-8 shadow-sm">
            {descuento > 0 && (
              <span className="absolute -top-3 left-8 rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                Promo {descuento}% off
              </span>
            )}
            <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
              Transferencia
            </p>
            <p className="heading-lg mt-1 text-[var(--color-primary-dark)]">
              {formatPrecio(precioTransf)}
              {descuento > 0 && (
                <span className="ml-3 align-middle text-base font-normal text-[var(--color-text-muted)] line-through">
                  {formatPrecio(precioMp)}
                </span>
              )}
            </p>
            <div className="mt-6">
              <TransferenciaDatos
                alias={DATOS_TRANSFERENCIA.alias}
                cvu={DATOS_TRANSFERENCIA.cvu}
                titular={DATOS_TRANSFERENCIA.titular}
                precio={precioTransf / 100}
                whatsappUrl={whatsappUrl}
              />
            </div>
          </div>

          {/* Mercado Pago */}
          <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-wider text-[var(--color-text-muted)]">
              Mercado Pago
            </p>
            <p className="heading-lg mt-1 text-[var(--color-primary-dark)]">
              {formatPrecio(precioMp)}
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-muted)]">
              Tarjeta de crédito, débito o dinero en cuenta. Al confirmarse el pago ves tu
              código de acceso al instante.
            </p>
            <div className="mt-6">
              <MercadoPagoBoton precio={precioMp / 100} />
            </div>
          </div>
        </div>

        {/* Ya compraste */}
        <div
          id="codigo"
          className="mx-auto mt-12 max-w-4xl scroll-mt-24 rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm"
        >
          <h2 className="heading-md text-[var(--color-primary-dark)]">
            ¿Ya compraste? Ingresá tu código
          </h2>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {acceso === "requerido"
              ? "Para leer el libro necesitás tu código de acceso."
              : "Escribí el código que recibiste para empezar a leer."}
          </p>
          <div className="mt-6">
            <IngresarCodigo />
          </div>
        </div>
      </div>
    </article>
  );
}
