"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Eye,
  Leaf,
  MapPin,
  MessageCircle,
  Sunrise,
  Unlock,
  type LucideIcon,
} from "lucide-react";
import { claveTransformacion as c } from "@/app/lib/data/content";
import { WHATSAPP_URL_CLAVE_TRANSFORMACION } from "@/app/lib/data/site";
import {
  trackReservarClick,
  trackViewPrecio,
} from "@/app/lib/utils/analytics";

const datoIcons: Record<string, LucideIcon> = {
  fecha: CalendarDays,
  horario: Clock,
  lugar: MapPin,
  modalidad: Leaf,
};

const beneficioIcons: Record<string, LucideIcon> = {
  comprender: Eye,
  liberar: Unlock,
  recuperar: Sunrise,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const revealProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
} as const;

function ReservarButton({
  origen,
  className,
}: {
  origen: "hero" | "final";
  className?: string;
}) {
  return (
    <a
      href={WHATSAPP_URL_CLAVE_TRANSFORMACION}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackReservarClick(origen)}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-8 py-4 font-medium tracking-wide text-white shadow-lg shadow-[var(--color-primary)]/20 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${className ?? ""}`}
    >
      <MessageCircle size={20} />
      {c.cta}
    </a>
  );
}

export default function ClaveTransformacionPage() {
  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(178,144,121,0.18),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(139,115,85,0.15),transparent_30%)]">
        <motion.div
          className="container-inner flex min-h-[78vh] flex-col items-center justify-center py-20 text-center"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]"
          >
            {c.eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="heading-xl mt-6 max-w-4xl text-[var(--color-primary-dark)]"
          >
            {c.title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] md:text-xl"
          >
            {c.subtitle}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-8 border-y border-[var(--color-primary)]/40 px-5 py-3 text-sm font-medium uppercase tracking-wider text-[var(--color-primary-dark)]"
          >
            {c.fechaResumen}
          </motion.p>
          <motion.div variants={fadeUp}>
            <ReservarButton origen="hero" className="mt-10" />
          </motion.div>
        </motion.div>
      </header>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-inner">
          <motion.div
            {...revealProps}
            className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm md:p-12"
          >
            <h2 className="heading-lg text-[var(--color-primary-dark)]">
              {c.intro.title}
            </h2>
            {c.intro.parrafos.map((parrafo) => (
              <p key={parrafo} className="mt-6 text-[var(--color-text-muted)]">
                {parrafo}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tal vez te pasa que… */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-inner">
          <h2 className="heading-lg text-center text-[var(--color-primary-dark)]">
            {c.talVezTePasa.title}
          </h2>
          <ul className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {c.talVezTePasa.items.map((item, i) => (
              <motion.li
                key={item}
                {...revealProps}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-6 text-[var(--color-text)]"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Propuesta */}
      <section className="section-padding">
        <div className="container-inner">
          <motion.div
            {...revealProps}
            className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm md:p-12"
          >
            <h2 className="heading-lg text-[var(--color-primary-dark)]">
              {c.propuesta.title}
            </h2>
            <p className="mt-6 text-[var(--color-text-muted)]">
              {c.propuesta.parrafo}
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {c.propuesta.beneficios.map((beneficio, i) => {
                const Icon = beneficioIcons[beneficio.id];
                return (
                  <motion.div
                    key={beneficio.id}
                    {...revealProps}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl border border-[var(--color-primary)]/15 bg-[var(--color-surface)] p-6 text-center"
                  >
                    <div className="mx-auto mb-4 inline-flex rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                      <Icon className="size-7" />
                    </div>
                    <h3 className="heading-md mb-2 text-[var(--color-primary-dark)]">
                      {beneficio.titulo}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">
                      {beneficio.texto}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* La experiencia */}
      <section className="section-padding bg-[var(--color-surface-alt)]">
        <div className="container-inner">
          <h2 className="heading-lg text-center text-[var(--color-primary-dark)]">
            {c.experiencia.title}
          </h2>
          <motion.div
            {...revealProps}
            className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm md:p-12"
          >
            <dl className="grid gap-4 sm:grid-cols-2">
              {c.experiencia.datos.map((dato) => {
                const Icon = datoIcons[dato.id];
                return (
                  <div
                    key={dato.id}
                    className="flex gap-4 rounded-xl bg-[var(--color-surface)] p-5"
                  >
                    <Icon className="mt-0.5 size-5 shrink-0 text-[var(--color-primary)]" />
                    <div>
                      <dt className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">
                        {dato.label}
                      </dt>
                      <dd className="mt-1 text-[var(--color-text)]">
                        {dato.valor}
                        {"detalle" in dato && dato.detalle && (
                          <span className="block text-sm text-[var(--color-text-muted)]">
                            {dato.detalle}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <motion.div
              className="mt-10 border-t border-[var(--color-primary)]/15 pt-8"
              viewport={{ once: true, amount: 0.6 }}
              onViewportEnter={() => trackViewPrecio()}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-[var(--color-primary-dark)]">
                {c.experiencia.inversionLabel}
              </p>
              <p className="mt-2 font-serif text-4xl font-semibold text-[var(--color-primary-dark)]">
                {c.experiencia.precio}
              </p>
              <p className="mt-2 text-[var(--color-text-muted)]">
                {c.experiencia.precioNota}
              </p>
              <p className="mt-4 text-sm italic text-[var(--color-text-muted)]">
                {c.experiencia.cupos}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Reservar */}
      <section id="reservar" className="section-padding scroll-mt-20">
        <div className="container-inner">
          <motion.div
            {...revealProps}
            className="mx-auto max-w-3xl rounded-2xl border border-[var(--color-primary)]/15 bg-[var(--color-primary)]/5 p-8 text-center md:p-12"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
              {c.reservar.eyebrow}
            </p>
            <h2 className="heading-lg mt-4 text-[var(--color-primary-dark)]">
              {c.reservar.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[var(--color-text-muted)]">
              {c.reservar.parrafo}
            </p>
            <ReservarButton origen="final" className="mt-10" />
            <p className="mt-6 text-sm text-[var(--color-text-muted)]">
              {c.reservar.nota}
            </p>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
