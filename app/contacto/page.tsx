"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/app/components/ui/ContactForm";

export default function ContactoPage() {
  return (
    <article className="section-padding">
      <div className="container-inner">
        <div className="mx-auto max-w-4xl">
          <motion.header
            className="mb-12 text-center md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[var(--color-primary)]">
              Contacto
            </p>
            <h1 className="heading-xl text-[var(--color-primary-dark)]">
              Escribime
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-muted)]">
              La forma más rápida es por WhatsApp. También podés usar el
              formulario o los datos de contacto.
            </p>
          </motion.header>

          <div className="grid gap-12 lg:grid-cols-5">
            <motion.aside
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm">
                <h2 className="heading-md mb-6 text-[var(--color-primary-dark)]">
                  Otros datos de contacto
                </h2>
                <ul className="space-y-6 text-[var(--color-text-muted)]">
                  <li className="flex items-start gap-4">
                    <Mail className="mt-1 size-5 shrink-0 text-[var(--color-primary)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        Email
                      </p>
                      <a
                        href="mailto:contacto@guiadelalma.com"
                        className="hover:text-[var(--color-primary)]"
                      >
                        contacto@guiadelalma.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <Phone className="mt-1 size-5 shrink-0 text-[var(--color-primary)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        Teléfono / WhatsApp
                      </p>
                      <span>Consultar por WhatsApp</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="mt-1 size-5 shrink-0 text-[var(--color-primary)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--color-text)]">
                        Ubicación
                      </p>
                      <span>Presencial en Córdoba Capital · Online</span>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.aside>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-white p-8 shadow-sm md:p-10">
                <h2 className="heading-md mb-6 text-[var(--color-primary-dark)]">
                  Enviame un mensaje por formulario
                </h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}
