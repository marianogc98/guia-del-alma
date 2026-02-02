"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function NosotrosPage() {
  return (
    <article className="section-padding">
      <div className="container-inner max-w-3xl">
        <motion.header
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          className="mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]"
          >
            Cómo trabajo
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="heading-xl text-[var(--color-primary-dark)]"
          >
            Un acompañamiento consciente y cuidado
          </motion.h1>
        </motion.header>

        <motion.div
          className="space-y-8 text-[var(--color-text)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg text-[var(--color-text-muted)]">
            Trabajo con una agenda consciente, priorizando la profundidad de
            cada proceso, el respeto por los tiempos personales y la calidad del
            acompañamiento.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Los cupos son limitados para poder ofrecer un espacio presente,
            contenido y personalizado.
          </p>
          <p className="text-[var(--color-text-muted)]">
            Si sentís el llamado, escribime y vemos juntos cuál es el espacio más
            adecuado para vos.
          </p>
          <p className="pt-4 text-sm text-[var(--color-text-muted)]">
            También podés escribirme por{" "}
            <Link
              href="/contacto"
              className="font-medium text-[var(--color-primary)] underline underline-offset-2 hover:text-[var(--color-primary-light)]"
            >
              contacto
            </Link>{" "}
            si preferís el formulario.
          </p>
        </motion.div>
      </div>
    </article>
  );
}
