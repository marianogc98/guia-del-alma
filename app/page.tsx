"use client";

import { motion } from "framer-motion";
import {
  Repeat,
  Heart,
  Sparkles,
  Users,
  Brain,
  BookOpen,
  CheckCircle2,
  User,
  Calendar,
} from "lucide-react";
import { cn } from "@/app/lib/utils/cn";
import TextWithBold from "./components/ui/TextWithBold";
import {
  hero,
  tePasaQue,
  miradaIntegral,
  metodoCrea,
  queSePuedeTrabajar,
  formatosAcompanamiento,
  quienAcompana,
  cierre,
  sectionIds,
} from "./lib/data/content";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const iconByFormato = {
  individuales: User,
  "proceso-crea": Calendar,
  constelaciones: Users,
} as const;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section
        id={sectionIds.hero}
        className="relative overflow-hidden bg-gradient-to-b from-[var(--color-primary)]/5 to-transparent section-padding scroll-mt-20"
      >
        <div className="container-inner">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h1
              variants={fadeUp}
              className="heading-xl mb-6 text-[var(--color-primary-dark)]"
            >
              {hero.headline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mb-2 text-lg text-[var(--color-text-muted)] md:text-xl"
            >
              {hero.subheadline}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mb-2 text-[var(--color-text-muted)]"
            >
              {hero.subheadline2}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="mb-8 text-[var(--color-text-muted)]"
            >
              {hero.ubicacion}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. ¿TE PASA QUE…? (Problema / Identificación) */}
      <section
        id={sectionIds.tePasaQue}
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner">
          <motion.h2
            className="heading-lg mb-10 text-center text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {tePasaQue.title}
          </motion.h2>
          <ul className="mx-auto max-w-2xl space-y-4">
            {tePasaQue.items.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-primary)]/10 bg-white px-6 py-4 text-[var(--color-text)]"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Repeat className="mt-0.5 size-5 shrink-0 text-[var(--color-primary)]" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="mt-10 text-center text-lg font-medium italic text-[var(--color-primary-dark)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {tePasaQue.cierre}
          </motion.p>
        </div>
      </section>

      {/* 3. MÉTODO C.R.E.A. */}
      <section
        id={sectionIds.metodoCrea}
        className="section-padding scroll-mt-20"
      >
        <div className="container-inner">
          <motion.h2
            className="heading-lg mb-6 text-center text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {metodoCrea.title}
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-3xl text-center text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TextWithBold text={metodoCrea.intro} />
          </motion.p>
          <p className="mb-8 text-center font-medium text-[var(--color-primary-dark)]">
            {metodoCrea.subtitle}
          </p>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {[
              { icon: Users, ...metodoCrea.pilares[0] },
              { icon: Brain, ...metodoCrea.pilares[1] },
              { icon: BookOpen, ...metodoCrea.pilares[2] },
            ].map((item, i) => (
              <motion.article
                key={item.title}
                className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mb-4 inline-flex rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                  <item.icon className="size-8" />
                </div>
                <h3 className="heading-md mb-2 text-[var(--color-primary-dark)]">
                  {item.title}
                </h3>
                <p className="text-[var(--color-text-muted)]">{item.text}</p>
              </motion.article>
            ))}
          </div>
          <motion.p
            className="mt-10 text-center italic text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <TextWithBold text={metodoCrea.cierre} />
          </motion.p>
        </div>
      </section>

      {/* 4. CAMBIO POSIBLE (Mirada integral) */}
      <section
        id={sectionIds.miradaIntegral}
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6 text-[var(--color-primary-dark)]">
              {miradaIntegral.title}
            </h2>
            <p className="mb-6 text-lg text-[var(--color-text-muted)]">
              <TextWithBold text={miradaIntegral.parrafo1} />
            </p>
            <p className="mb-8 text-[var(--color-text-muted)]">
              {miradaIntegral.parrafo2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. QUÉ SE PUEDE TRABAJAR (SEO) */}
      <section
        id={sectionIds.queSePuedeTrabajar}
        className="section-padding scroll-mt-20"
      >
        <div className="container-inner">
          <motion.h2
            className="heading-lg mb-4 text-center text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {queSePuedeTrabajar.title}
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-center text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {queSePuedeTrabajar.intro}
          </motion.p>
          <ul className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {queSePuedeTrabajar.items.map((item, i) => (
              <motion.li
                key={item}
                className="flex items-start gap-3 text-[var(--color-text)]"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-primary)]" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <motion.p
            className="mt-10 text-center text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {queSePuedeTrabajar.cierre}
          </motion.p>
        </div>
      </section>

      {/* 6. FORMATOS DE ACOMPAÑAMIENTO */}
      <section
        id={sectionIds.servicios}
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner">
          <motion.h2
            className="heading-lg mb-12 text-center text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {formatosAcompanamiento.title}
          </motion.h2>
          {/* Grid 6 columnas: fila 1 = Sesiones C.R.E.A. (6 cols), fila 2 = Individuales (3) + Constelaciones (3) */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
            {[
              formatosAcompanamiento.bloques[1],
              formatosAcompanamiento.bloques[0],
              formatosAcompanamiento.bloques[2],
            ].map((bloque, i) => {
              const Icon =
                iconByFormato[bloque.id as keyof typeof iconByFormato] ?? Heart;
              const isProcesoCrea = bloque.id === "proceso-crea";
              return (
                <motion.article
                  key={bloque.id}
                  className={cn(
                    "flex flex-col rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm",
                    isProcesoCrea ? "lg:col-span-6" : "lg:col-span-3"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="mb-4 inline-flex rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                    <Icon className="size-8" />
                  </div>
                  <h3 className="heading-md mb-3 text-[var(--color-primary-dark)]">
                    {bloque.titulo}
                  </h3>
                  <p className="mb-4 flex-1 text-[var(--color-text-muted)]">
                    {bloque.descripcion}
                  </p>
                  {"detalle" in bloque && bloque.detalle && (
                    <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                      {bloque.detalle}
                    </p>
                  )}
                  {"nota" in bloque && bloque.nota && (
                    <p className="mb-4 text-sm italic text-[var(--color-text-muted)]">
                      {bloque.nota}
                    </p>
                  )}
                  {"duracion" in bloque && bloque.duracion && (
                    <p className="mb-1 text-sm text-[var(--color-primary)]">
                      {bloque.duracion}
                    </p>
                  )}
                  {"modalidad" in bloque && bloque.modalidad && (
                    <p className="mb-1 text-sm text-[var(--color-primary)]">
                      {bloque.modalidad}
                    </p>
                  )}
                  {"extra" in bloque && bloque.extra && (
                    <p className="mb-4 text-sm font-medium text-[var(--color-primary)]">
                      {bloque.extra}
                    </p>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. QUIÉN ACOMPAÑA (Agenda consciente) */}
      <section
        id={sectionIds.quienAcompana}
        className="section-padding scroll-mt-20"
      >
        <div className="container-inner">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-6 text-[var(--color-primary-dark)]">
              {quienAcompana.title}
            </h2>
            <p className="mb-4 text-lg text-[var(--color-text-muted)]">
              {quienAcompana.parrafo1}
            </p>
            <p className="mb-8 text-[var(--color-text-muted)]">
              {quienAcompana.parrafo2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section
        id={sectionIds.ctaFinal}
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner">
          <motion.div
            className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-10 text-center md:p-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-4 text-[var(--color-primary-dark)]">
              {cierre.title}
            </h2>
            <p className="mb-8 text-[var(--color-text-muted)]">
              {cierre.parrafo}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
