"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { trackIniciarCompraEbook } from "@/app/lib/utils/analytics";

type Props = {
  alias: string;
  cvu: string;
  titular: string;
  precio: number;
  whatsappUrl: string;
};

function CopiarDato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(valor);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Sin permiso de portapapeles: el dato igual está visible para copiar a mano.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-[var(--color-surface)] px-4 py-3">
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
          {etiqueta}
        </dt>
        <dd className="break-all font-mono text-sm text-[var(--color-text)]">{valor}</dd>
      </div>
      <button
        type="button"
        onClick={copiar}
        aria-label={`Copiar ${etiqueta}`}
        className="shrink-0 rounded-lg p-2 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10"
      >
        {copiado ? <Check size={18} /> : <Copy size={18} />}
      </button>
    </div>
  );
}

/** Datos para pagar por transferencia y botón para mandar el comprobante. */
export default function TransferenciaDatos({ alias, cvu, titular, precio, whatsappUrl }: Props) {
  return (
    <div className="space-y-3">
      <dl className="space-y-2">
        <CopiarDato etiqueta="Alias" valor={alias} />
        <CopiarDato etiqueta="CVU" valor={cvu} />
        <div className="rounded-lg bg-[var(--color-surface)] px-4 py-3">
          <dt className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
            Titular
          </dt>
          <dd className="text-sm text-[var(--color-text)]">{titular}</dd>
        </div>
      </dl>
      <p className="text-sm text-[var(--color-text-muted)]">
        Una vez hecha la transferencia, enviá el comprobante por WhatsApp y te mandamos tu
        código de acceso.
      </p>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackIniciarCompraEbook(precio, "transferencia")}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--color-primary)] px-8 py-3 font-medium tracking-wide text-[var(--color-primary-dark)] transition-all hover:-translate-y-0.5 hover:bg-[var(--color-primary)]/5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
      >
        <MessageCircle size={20} />
        Enviar comprobante por WhatsApp
      </a>
    </div>
  );
}
