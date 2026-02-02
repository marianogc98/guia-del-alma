"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Brain,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const pilares = [
  {
    icon: Users,
    title: "Constelaciones Familiares",
    description:
      "Para comprender los movimientos sistémicos y las dinámicas invisibles que influyen en tu historia, tus vínculos y tus elecciones.",
  },
  {
    icon: Brain,
    title: "Reprogramación Bioneuroemocional y Biológica",
    description:
      "Para liberar memorias emocionales y mentales que condicionan decisiones, relaciones y estados internos.",
  },
  {
    icon: BookOpen,
    title: "Lectura Akáshica y herramientas de acompañamiento consciente",
    description:
      "Que se incorporan según lo que el proceso, el momento y tu sistema necesitan.",
  },
];

const situaciones = [
  "Vínculos familiares, de pareja, hijos, amistades o sociedades",
  "Conflictos laborales, profesión, empresas o negocios",
  "Relación con el dinero y la abundancia",
  "Estados emocionales como ansiedad, angustia o desvalorización",
  "Síntomas físicos o procesos de enfermedad",
  "Duelos no resueltos (reales o simbólicos)",
  "Patrones repetitivos que generan malestar",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function MetodoCreaPage() {
  return (
    <article className="section-padding">
      <div className="container-inner">
        <motion.header
          className="mx-auto mb-16 max-w-3xl text-center"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]"
          >
            El método
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="heading-xl text-[var(--color-primary-dark)]"
          >
            ¿Qué es el Método C.R.E.A.?
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-[var(--color-text-muted)]"
          >
            El Método C.R.E.A. integra distintas herramientas para acompañarte
            de manera profunda, respetuosa y personalizada.
          </motion.p>
        </motion.header>

        <section className="mb-20">
          <h2 className="heading-md mb-10 text-[var(--color-primary-dark)]">
            El Método C.R.E.A. integra:
          </h2>
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {pilares.map((item, i) => (
              <motion.section
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
                <p className="text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              </motion.section>
            ))}
          </div>
          <motion.p
            className="mt-10 text-center italic text-[var(--color-text-muted)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Cada encuentro es único. El abordaje se adapta amorosamente a tu
            historia y a lo que hoy está pidiendo ser mirado.
          </motion.p>
        </section>

        <section className="rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-surface-alt)] p-8 md:p-12">
          <h2 className="heading-md mb-6 text-[var(--color-primary-dark)]">
            ¿Qué situaciones se pueden trabajar?
          </h2>
          <p className="mb-8 text-[var(--color-text-muted)]">
            A través del Método C.R.E.A. se pueden abordar, entre otras:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {situaciones.map((item, i) => (
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
          <p className="mt-8 text-[var(--color-text-muted)]">
            Todo aquello que hoy se manifiesta como bloqueo, conflicto o síntoma
            puede ser una puerta de acceso a una comprensión más profunda.
          </p>
        </section>

        <motion.div
          className="mt-16 flex flex-col items-center gap-6 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 p-8 text-center md:flex-row md:justify-between md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="heading-md mb-2 text-[var(--color-primary-dark)]">
              ¿Querés conocer más?
            </h2>
            <p className="text-[var(--color-text-muted)]">
              Escribime por WhatsApp y coordinamos tu encuentro.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/servicios" className="btn-secondary">
              Ver formas de acompañamiento
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
