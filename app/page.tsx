"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Repeat,
  Heart,
  Sparkles,
  Users,
  Brain,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { cn } from "@/app/lib/utils/cn";
import TextWithBold from "./components/ui/TextWithBold";
import ContactForm from "./components/ui/ContactForm";
import {
  hero,
  tePasaQue,
  metodoCrea,
  formatosAcompanamiento,
  sectionIds,
  reviews,
} from "./lib/data/content";
import ReviewsSlider from "./components/ui/ReviewsSlider";
import { WHATSAPP_URL_WITH_MESSAGE, WHATSAPP_URL_ENCUENTROS } from "./lib/data/site";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const iconByFormato = {
  intensivo: Sparkles,
  individuales: User,
  "proceso-crea": Calendar,
  constelaciones: Users,
} as const;

export default function HomePage() {
  return (
    <>
      {/* 1. HERO (estructura tipo newLanding, colores e info actuales) */}
      <section
        id={sectionIds.hero}
        className="relative overflow-hidden bg-[var(--color-surface)] section-padding scroll-mt-20"
      >
        <div className="container-inner grid gap-12 lg:grid-cols-[60%_40%] lg:gap-16 lg:items-center">
          {/* Columna texto 60% (en móvil va segundo; en desktop a la izquierda) */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div
                variants={fadeUp}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]"
              >
                <span className="size-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                Guia del Alma
              </motion.div>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-3xl font-bold leading-[1.2] text-[var(--color-primary-dark)] md:text-4xl lg:text-5xl xl:text-6xl"
              >
                {hero.headline.endsWith("crear nuevas posibilidades")
                  ? (
                    <>
                      {hero.headline.slice(0, -"crear nuevas posibilidades".length)}
                      <span className="font-serif text-[var(--color-primary)]">
                        crear nuevas posibilidades
                      </span>
                    </>
                  )
                  : hero.headline}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] leading-relaxed"
              >
                {hero.subheadline}
              </motion.p>
              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
              >
                <a
                  href={WHATSAPP_URL_WITH_MESSAGE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-8 py-4 text-lg font-bold text-white shadow-lg shadow-[var(--color-primary)]/25 transition-transform hover:-translate-y-0.5 hover:bg-[var(--color-primary-light)]"
                >
                  {hero.cta}
                  <ArrowRight className="size-5" />
                </a>
                <a
                  href={`#${sectionIds.servicios}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[var(--color-primary)]/20 px-8 py-4 text-lg font-bold text-[var(--color-primary-dark)] transition-colors hover:border-[var(--color-primary)]/40"
                >
                  Ver encuentros
                </a>
              </motion.div>
            </motion.div>
          </div>
          {/* Columna visual 40%, imagen ~20% más grande */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[510px]">
              <div className="absolute -right-6 -top-6 size-40 rounded-full bg-[var(--color-primary)]/5 blur-3xl" />
              <div className="absolute -bottom-6 -left-6 size-40 rounded-full bg-[var(--color-surface-alt)] blur-3xl" />
              <div className="relative z-10 aspect-[4/5] max-h-[570px] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/Hero.jpg"
                  alt=""
                  width={510}
                  height={638}
                  className="h-full w-full object-cover"
                  priority
                  sizes="(max-width: 1024px) 480px, 510px"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 z-20 max-w-[200px] rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-surface)] p-4 shadow-xl lg:-right-2">
              <p className="font-serif text-xs font-semibold text-[var(--color-primary-dark)]">
                «Cada encuentro es un espacio de apertura y transformación, donde trabajamos desde una mirada integral del ser (mente, cuerpo y alma)»
              </p>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE SOUL PATH (debajo del hero, texto placeholder en español) */}
      <section
        id="soul-path"
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/about-1.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  style={{ objectPosition: "70% 100%" }}
                  sizes="(max-width: 1024px) 50vw, 400px"
                />
              </div>
              <div className="flex h-48 items-center justify-center rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-surface)] p-8 text-center">
                <p className="font-serif text-xl font-bold text-[var(--color-primary)]">
                  &ldquo;Las respuestas que buscás ya están dentro de vos.&rdquo;
                </p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-[var(--color-primary)]/10 p-6 text-center">
                <span className="text-3xl font-bold text-[var(--color-primary)]">+10</span>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Años de experiencia</p>
              </div>
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/about-2.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 400px"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Mi Camino</h2>
            <h3 className="heading-lg mb-8 leading-tight">Uniendo la intuición con un acompañamiento práctico.</h3>
            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              <p>Soy Jessica, facilitadora en Constelaciones Familiares, Terapeuta Akáshica y de Reprogramación Bioneuroemocional y Biológica, Maestra de Reiki y Médium.</p>
              <p>Desde pequeña crecí en un entorno donde la metafísica y la mediumnidad formaban parte de mi vida. Con el tiempo comprendí que esas experiencias eran el impulso necesario para comenzar mi propio camino de transformación y aprendizaje.</p>
              <p>Mi recorrido personal, incluyendo los momentos difíciles, me llevó a descubrir las Constelaciones Familiares y a integrar la conexión entre mente, alma y cuerpo como eje de mi trabajo.</p> 
              <p>Hoy acompaño procesos desde un enfoque cercano y humano, combinando herramientas terapéuticas con la experiencia de haber transitado mis propios desafíos. Creo en el poder de tomar conciencia, accionar y abrirnos a un presente y futuro más pleno.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ¿TE PASA QUE…? (oculto por ahora) */}
      <section
        id={sectionIds.tePasaQue}
        className="hidden section-padding bg-[var(--color-surface)] scroll-mt-20"
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
          <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
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
            className="mt-10 text-center text-lg font-medium font-serif text-[var(--color-primary-dark)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {tePasaQue.cierre}
          </motion.p>
        </div>
      </section>

      {/* 5. FORMATOS DE ACOMPAÑAMIENTO (encuentros, bloques horizontales) */}
      <section
        id={sectionIds.servicios}
        className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20"
      >
        <div className="container-inner">
          <motion.h2
            className="heading-lg mb-4 text-center text-[var(--color-primary-dark)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {formatosAcompanamiento.title}
          </motion.h2>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-center text-[var(--color-text-muted)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {formatosAcompanamiento.subtitle}
          </motion.p>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              formatosAcompanamiento.bloques[1],
              formatosAcompanamiento.bloques[3],
              formatosAcompanamiento.bloques[2],
            ].map((bloque, i) => {
              const Icon =
                iconByFormato[bloque.id as keyof typeof iconByFormato] ?? Heart;
              const isProcesoCrea = bloque.id === "proceso-crea";
              const isIntensivo = bloque.id === "intensivo";
              const colSpan =
                isIntensivo || isProcesoCrea ? "lg:col-span-2" : "";
              const whatsappHref =
                bloque.id === "intensivo"
                  ? WHATSAPP_URL_ENCUENTROS
                  : WHATSAPP_URL_WITH_MESSAGE;
              return (
                <motion.article
                  key={bloque.id}
                  className={cn(
                    "group relative flex flex-col rounded-3xl border bg-[var(--color-surface)] p-8 transition-all hover:shadow-2xl hover:shadow-[var(--color-primary)]/5",
                    colSpan,
                    isIntensivo
                      ? "border-2 border-[var(--color-primary)]/40 shadow-xl shadow-[var(--color-primary)]/10"
                      : "border border-[var(--color-primary)]/10 hover:border-[var(--color-primary)]/30"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {isIntensivo && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 rounded-full bg-[var(--color-primary)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Destacado
                    </div>
                  )}
                  <div
                    className={cn(
                      "mb-6 flex size-14 shrink-0 items-center justify-center rounded-2xl transition-transform",
                      isIntensivo
                        ? "bg-[var(--color-primary)] text-white group-hover:rotate-6"
                        : "bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:scale-110"
                    )}
                  >
                    <Icon className="size-7" />
                  </div>
                  <h3 className="heading-md mb-3 text-[var(--color-primary-dark)]">
                    {bloque.titulo}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {bloque.descripcion}
                  </p>
                  {"detalle" in bloque && bloque.detalle && (
                    <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                      {bloque.detalle}
                    </p>
                  )}
                  {"nota" in bloque && bloque.nota && (
                    <p className="mb-4 text-sm font-serif text-[var(--color-text-muted)]">
                      {bloque.nota}
                    </p>
                  )}
                  {"duracion" in bloque && bloque.duracion && (
                    <p className="mb-1 text-xs font-medium text-[var(--color-primary)]">
                      {bloque.duracion}
                    </p>
                  )}
                  {"modalidad" in bloque && bloque.modalidad && (
                    <p className="mb-2 text-xs text-[var(--color-text-muted)]">
                      {bloque.modalidad}
                    </p>
                  )}
                  {"extra" in bloque && bloque.extra && (
                    <p className="mb-4 text-xs font-semibold text-[var(--color-primary)]">
                      {bloque.extra}
                    </p>
                  )}
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "mt-auto block w-full rounded-lg py-3 text-center text-sm font-bold transition-all",
                      isIntensivo
                        ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-xl"
                        : "border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
                    )}
                  >
                    {bloque.cta}
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MÉTODO C.R.E.A. (triada / metodología - estructura newLanding) */}
      <section
        id={sectionIds.metodoCrea}
        className="section-padding overflow-hidden bg-[var(--color-surface)] scroll-mt-20"
      >
        <div className="container-inner">
          <div className="mb-16 text-center">
            <motion.p
              className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Método C.R.E.A. - Un camino consciente hacia tu nueva versión
            </motion.p>
            <motion.h2
              className="heading-lg mb-6 text-[var(--color-primary-dark)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {metodoCrea.title}
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-[var(--color-text-muted)]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <TextWithBold text={metodoCrea.intro} />
            </motion.p>
          </div>

          <div className="relative mx-auto max-w-6xl">
            {/* Triada: círculos + líneas detrás (z-0), tarjetas encima (z-10) */}
            <div className="flex flex-col items-center gap-8 lg:relative lg:min-h-[760px]">
              {/* Círculos concéntricos (solo desktop, detrás) */}
              <div className="absolute inset-0 z-0 hidden items-center justify-center lg:flex" aria-hidden>
                <div className="absolute size-[450px] rounded-full border border-[var(--color-primary)]/20 animate-pulse" style={{ animationDuration: "8s" }} />
                <div className="absolute size-[300px] rounded-full border border-[var(--color-primary)]/10" />
                <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                  <Sparkles className="size-8" />
                </div>
              </div>

              {/* Líneas punteadas (dentro del mismo contenedor, z-0, para quedar detrás de las 3 tarjetas) */}
              <svg className="absolute inset-0 z-0 hidden h-full w-full pointer-events-none opacity-20 lg:block" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" aria-hidden>
                <path d="M400,120 L180,420" fill="none" stroke="var(--color-primary)" strokeDasharray="8,8" strokeWidth="2" />
                <path d="M400,120 L620,420" fill="none" stroke="var(--color-primary)" strokeDasharray="8,8" strokeWidth="2" />
                <path d="M180,420 L620,420" fill="none" stroke="var(--color-primary)" strokeDasharray="8,8" strokeWidth="2" />
              </svg>

              {/* Tarjeta 1: arriba centro (Constelaciones) */}
              <motion.article
                className="relative z-10 w-full max-w-sm lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2 lg:-translate-y-2"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-3xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 text-center shadow-xl transition-transform hover:-translate-y-2">
                  <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm">
                    <Users className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-dark)] mb-4">
                    {metodoCrea.pilares[0].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {metodoCrea.pilares[0].text}
                  </p>
                </div>
              </motion.article>

              {/* Tarjeta 2: abajo izquierda */}
              <motion.article
                className="relative z-10 w-full max-w-sm lg:absolute lg:bottom-12 lg:left-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="rounded-3xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 text-center shadow-xl transition-transform hover:-translate-y-2">
                  <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm">
                    <Brain className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-dark)] mb-4">
                    {metodoCrea.pilares[1].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {metodoCrea.pilares[1].text}
                  </p>
                </div>
              </motion.article>

              {/* Tarjeta 3: abajo derecha (Lectura Akáshica) */}
              <motion.article
                className="relative z-10 w-full max-w-sm lg:absolute lg:bottom-12 lg:right-0"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="rounded-3xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-8 text-center shadow-xl transition-transform hover:-translate-y-2">
                  <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-[var(--color-surface)] text-[var(--color-primary)] shadow-sm">
                    <BookOpen className="size-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-primary-dark)] mb-4">
                    {metodoCrea.pilares[2].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
                    {metodoCrea.pilares[2].text}
                  </p>
                </div>
              </motion.article>
            </div>
          </div>

          <motion.p
            className="mt-20 max-w-xl mx-auto text-center font-serif text-xl font-medium text-[var(--color-primary)]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <TextWithBold text={metodoCrea.cierre} />
          </motion.p>
        </div>
      </section>

      {/* 9. EXPERIENCIAS (slider solo de reviews) */}
      <section id="experiencias" className="section-padding bg-[var(--color-surface)] scroll-mt-20">
        <div className="container-inner">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Experiencias</p>
            <h2 className="heading-lg text-[var(--color-primary-dark)]">Lo que dicen quienes transitaron el proceso</h2>
          </div>
          <ReviewsSlider reviews={reviews} />
        </div>
      </section>

      {/* 8. PRÓXIMOS ENCUENTROS + CONTACTO */}
      <section id="events" className="section-padding bg-[var(--color-surface-alt)] scroll-mt-20">
        <div className="container-inner">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-primary)]">Encuentros y espacios</h2>
              <h3 className="heading-lg leading-tight">Próximos encuentros</h3>
            </div>
          </div>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            {/* Formulario de contacto */}
            <div className="rounded-[2rem] bg-[var(--color-primary)] p-8 shadow-xl lg:col-span-5 lg:sticky lg:top-24">
              <h4 className="font-serif text-2xl font-bold text-white mb-2">¿Damos el primer paso?</h4>
              <p className="mb-6 text-sm leading-relaxed text-white/85">Escribime por el formulario o por WhatsApp y coordinamos tu espacio.</p>
              <div className="pt-6 border-t border-white/20 [&_label]:text-white [&_input]:border-white/30 [&_input]:bg-white/95 [&_textarea]:border-white/30 [&_textarea]:bg-white/95 [&_button]:bg-white [&_button]:text-[var(--color-primary)] [&_button]:hover:bg-white/90">
                <ContactForm />
              </div>
            </div>
            {/* Tarjetas de próximas fechas */}
            <div className="space-y-6 lg:col-span-7">
              <a href={WHATSAPP_URL_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" className="flex flex-col rounded-2xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-primary)]/30 md:flex-row md:gap-6">
                <div className="flex flex-row items-center gap-3 md:flex-col md:shrink-0">
                  <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] md:size-16">
                    <span className="text-lg font-bold md:text-xl"></span>
                    <span className="text-[8px] font-bold uppercase tracking-widest">Miércoles</span>
                  </div>
                  <h4 className="min-w-0 flex-1 font-serif text-lg font-bold text-[var(--color-primary-dark)] md:hidden">Constelaciones Familiares Exclusivas</h4>
                </div>
                <div className="mt-3 flex min-w-0 flex-1 flex-col gap-2 md:mt-0">
                  <h4 className="hidden font-serif text-xl font-bold text-[var(--color-primary-dark)] md:block">Constelaciones Familiares Exclusivas</h4>
                  <p className="w-full text-sm text-[var(--color-text-muted)]">Grupos reducidos de hasta 4 o 5 personas. Un espacio íntimo y consciente para constelar y profundizar en el sistema familiar.</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><Clock className="size-4" /> 18:00 - 20:00hs</span>
                    <span className="flex items-center gap-1"><MapPin className="size-4" /> Presencial</span>
                  </div>
                </div>
              </a>
              <a href={WHATSAPP_URL_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" className="flex flex-col rounded-2xl border border-[var(--color-surface-alt)] bg-[var(--color-surface)] p-6 transition-all hover:border-[var(--color-primary)]/30 md:flex-row md:gap-6">
                <div className="flex flex-row items-center gap-3 md:flex-col md:shrink-0">
                  <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] md:size-16">
                    <span className="text-lg font-bold md:text-xl"></span>
                    <span className="text-[8px] font-bold uppercase tracking-widest">A acordar</span>
                  </div>
                  <h4 className="min-w-0 flex-1 font-serif text-lg font-bold text-[var(--color-primary-dark)] md:hidden">Proceso profundo C.R.E.A. - Sesiones individuales de 4 encuentros consecutivos</h4>
                </div>
                <div className="mt-3 flex min-w-0 flex-1 flex-col gap-2 md:mt-0">
                  <h4 className="hidden font-serif text-xl font-bold text-[var(--color-primary-dark)] md:block">Sesiones individuales de 4 encuentros consecutivos - "Proceso profundo C.R.E.A."</h4>
                  <p className="w-full text-sm text-[var(--color-text-muted)]">Inicio de proceso personalizado con el Método C.R.E.A. Consultá disponibilidad para coordinar fechas y frecuencia.</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><Clock className="size-4" />Inscripciones Abiertas</span>
                    <span className="flex items-center gap-1"><MapPin className="size-4" /> Presencial u online</span>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>

    </>
  );
}
