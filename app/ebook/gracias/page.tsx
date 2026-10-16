import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { CheckCircle, Clock } from "lucide-react";
import { EBOOK } from "@/app/lib/data/ebook";
import { getDb } from "@/app/lib/db";
import { orders } from "@/app/lib/db/schema";

export const metadata: Metadata = {
  title: "¡Gracias por tu compra! | Guía del Alma",
  robots: { index: false },
};

const uuidRegex = /^[0-9a-f-]{36}$/i;

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<{ uid?: string }>;
}) {
  const { uid = "" } = await searchParams;
  const [order] = uuidRegex.test(uid)
    ? await getDb()
        .select({ status: orders.status, accessCode: orders.accessCode, email: orders.email })
        .from(orders)
        .where(eq(orders.uid, uid))
    : [];

  const pagado = order?.status === "paid" && order.accessCode;

  return (
    <section className="section-padding">
      <div className="container-inner">
        <div className="mx-auto max-w-xl rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 text-center shadow-sm md:p-12">
          {pagado ? (
            <>
              <CheckCircle className="mx-auto size-12 text-[var(--color-primary)]" />
              <h1 className="heading-lg mt-4 text-[var(--color-primary-dark)]">
                ¡Gracias por tu compra!
              </h1>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Este es tu código de acceso a <strong>{EBOOK.titulo}</strong>.{" "}
                {order.email ? (
                  <>
                    También te lo enviamos a <strong>{order.email}</strong>.
                  </>
                ) : (
                  "Guardalo, lo vas a necesitar para leer el ebook."
                )}
              </p>
              <p className="mt-6 rounded-xl border border-dashed border-[var(--color-primary)]/40 bg-[var(--color-surface)] px-6 py-4 font-mono text-2xl font-bold tracking-widest text-[var(--color-primary-dark)]">
                {order.accessCode}
              </p>
            </>
          ) : order ? (
            <>
              <Clock className="mx-auto size-12 text-[var(--color-primary)]" />
              <h1 className="heading-lg mt-4 text-[var(--color-primary-dark)]">
                Estamos confirmando tu pago
              </h1>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Apenas Mercado Pago lo acredite, te enviamos tu código de acceso al email de
                tu cuenta de Mercado Pago. Puede tardar unos minutos.
              </p>
            </>
          ) : (
            <>
              <h1 className="heading-lg text-[var(--color-primary-dark)]">
                No encontramos tu compra
              </h1>
              <p className="mt-4 text-[var(--color-text-muted)]">
                Si ya pagaste, revisá tu email o escribinos.
              </p>
              <Link href="/ebook" className="mt-6 inline-block text-[var(--color-primary)] underline">
                Volver al ebook
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
