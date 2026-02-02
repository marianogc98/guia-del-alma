"use client";

import { motion } from "framer-motion";
import { User, Users, Calendar, MapPin, Clock } from "lucide-react";

const formas = [
  {
    icon: User,
    title: "Encuentros Individuales (1:1)",
    description:
      "Un espacio terapéutico íntimo y profundo, creado para acompañarte de manera personalizada. Exploramos el origen de lo que hoy se expresa en tu vida y realizamos un trabajo de integración, liberación y reprogramación consciente.",
    ubicacion: "Presencial en Córdoba Capital u online",
    duracion: "Duración: 1 hora",
    cta: "Consultar disponibilidad por WhatsApp",
  },
  {
    icon: Users,
    title: "Constelaciones Familiares Exclusivas",
    description:
      "Grupos reducidos de hasta 4 personas. Un espacio cuidado, íntimo y consciente, donde cada participante constela dentro de un campo de resonancia que potencia los movimientos de sanación individuales y colectivos. Se integran constelaciones, ejercicios y meditaciones sistémicas para profundizar el proceso.",
    ubicacion: "Presencial",
    extra: "Cupos muy limitados",
    cta: "Consultar próximos encuentros por WhatsApp",
  },
  {
    icon: Calendar,
    title: "Proceso C.R.E.A. – Acompañamiento de 4 encuentros",
    description:
      "Un proceso profundo y sostenido en el tiempo, diseñado para quienes desean un trabajo de transformación personal con continuidad y seguimiento. Cada sesión se adapta a la evolución del proceso, integrando distintas herramientas según lo que el momento requiera.",
    cta: "Solicitar información por WhatsApp",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function ServiciosPage() {
  return (
    <article className="section-padding">
      <div className="container-inner">
        <motion.header
          className="mx-auto mb-16 max-w-2xl text-center"
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]"
          >
            Formas de acompañamiento
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="heading-xl text-[var(--color-primary-dark)]"
          >
            Encuentros individuales y procesos personalizados
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg text-[var(--color-text-muted)]"
          >
            Presencial en Córdoba y online. Cada espacio está pensado para
            acompañarte con profundidad y cuidado.
          </motion.p>
        </motion.header>

        <div className="space-y-12">
          {formas.map((forma, i) => (
            <motion.section
              key={forma.title}
              className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm md:p-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="inline-flex rounded-xl bg-[var(--color-primary)]/10 p-3 text-[var(--color-primary)]">
                    <forma.icon className="size-8" />
                  </div>
                  <div>
                    <h2 className="heading-md text-[var(--color-primary-dark)]">
                      {forma.title}
                    </h2>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                      {forma.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-6 border-t border-[var(--color-primary)]/10 pt-6">
                {(forma as { ubicacion?: string }).ubicacion && (
                  <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <MapPin size={18} />
                    {(forma as { ubicacion?: string }).ubicacion}
                  </span>
                )}
                {(forma as { duracion?: string }).duracion && (
                  <span className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <Clock size={18} />
                    {(forma as { duracion?: string }).duracion}
                  </span>
                )}
                {(forma as { extra?: string }).extra && (
                  <span className="text-sm font-medium text-[var(--color-primary)]">
                    {(forma as { extra?: string }).extra}
                  </span>
                )}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          className="mt-16 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-md mb-4 text-[var(--color-primary-dark)]">
            ¿Querés más información?
          </h2>
          <p className="mb-6 text-[var(--color-text-muted)]">
            Escribime por WhatsApp y vemos juntos cuál es el espacio más adecuado
            para vos.
          </p>
        </motion.div>
      </div>
    </article>
  );
}
