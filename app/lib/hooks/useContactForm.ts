"use client";

import { useState, useCallback } from "react";
import { trackGenerateLead } from "@/app/lib/utils/analytics";

export type ContactFormData = {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
};

export type ContactFormState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

const initialFormData: ContactFormData = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [state, setState] = useState<ContactFormState>({ status: "idle" });

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const submit = useCallback(async () => {
    setState({ status: "loading" });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setState({
          status: "error",
          message:
            (data as { message?: string }).message ||
            "Error al enviar el mensaje. Inténtalo de nuevo.",
        });
        return;
      }

      setState({ status: "success", message: "Mensaje enviado correctamente." });
      setFormData(initialFormData);

      trackGenerateLead("contacto");
    } catch {
      setState({
        status: "error",
        message: "Error de conexión. Inténtalo de nuevo más tarde.",
      });
    }
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setState({ status: "idle" });
  }, []);

  return { formData, updateField, submit, state, reset };
}
