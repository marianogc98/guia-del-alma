"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  LogOut,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

const CLAVE_PAGINA = "ebook_ultima_pagina";
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 2.5;

/** Descarga el libro cifrado y lo descifra en memoria (ver /api/ebook/libro). */
async function cargarLibro(): Promise<Uint8Array> {
  const res = await fetch("/api/ebook/libro", { cache: "no-store" });
  if (!res.ok) throw new Error(String(res.status));
  const datos = new Uint8Array(await res.arrayBuffer());
  const clave = await crypto.subtle.importKey("raw", datos.slice(0, 32), "AES-GCM", false, [
    "decrypt",
  ]);
  const pdf = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: datos.slice(32, 44) },
    clave,
    datos.slice(44)
  );
  return new Uint8Array(pdf);
}

function leerPaginaGuardada() {
  try {
    return Number(localStorage.getItem(CLAVE_PAGINA)) || 1;
  } catch {
    return 1;
  }
}

/**
 * Visor del ebook con pdf.js: dibuja cada página en un canvas (sin capa de
 * texto), sin botón de descarga ni impresión, y con clic derecho bloqueado.
 */
export default function LectorEbook({ marcaDeAgua }: { marcaDeAgua: string }) {
  const contenedorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef<RenderTask | null>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pagina, setPagina] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [anchoDisponible, setAnchoDisponible] = useState(0);
  const [error, setError] = useState("");
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  // Carga del documento
  useEffect(() => {
    let cancelado = false;
    let tareaCarga: PDFDocumentLoadingTask | null = null;
    (async () => {
      try {
        // Build "legacy": trae polyfills para navegadores de celular (el build
        // moderno usa APIs como Map.getOrInsertComputed y queda en blanco).
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
          import.meta.url
        ).toString();
        const data = await cargarLibro();
        if (cancelado) return;
        tareaCarga = pdfjs.getDocument({ data });
        const documento = await tareaCarga.promise;
        if (cancelado) return;
        setDoc(documento);
        setPagina(Math.min(leerPaginaGuardada(), documento.numPages));
      } catch (err) {
        console.error(err);
        if (!cancelado) setError("No pudimos abrir el libro. Recargá la página para intentar de nuevo.");
      }
    })();
    return () => {
      cancelado = true;
      tareaCarga?.destroy();
    };
  }, []);

  // Ancho disponible para ajustar la página
  useEffect(() => {
    const el = contenedorRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => setAnchoDisponible(entry.contentRect.width));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Dibujo de la página actual
  useEffect(() => {
    if (!doc || !anchoDisponible || !canvasRef.current) return;
    let cancelado = false;
    (async () => {
      const page = await doc.getPage(pagina);
      if (cancelado) return;
      const base = page.getViewport({ scale: 1 });
      const escala = (Math.min(anchoDisponible, 900) / base.width) * zoom;
      const viewport = page.getViewport({ scale: escala });
      // Tope en 2: en celulares con densidad 3 el canvas puede pasar el límite de memoria.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = canvasRef.current!;
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      renderRef.current?.cancel();
      const tarea = page.render({
        canvas,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderRef.current = tarea;
      await tarea.promise.catch((err: Error) => {
        if (err?.name === "RenderingCancelledException" || cancelado) return;
        console.error(err);
        setError("No pudimos mostrar esta página. Recargá la página para intentar de nuevo.");
      });
    })();
    try {
      localStorage.setItem(CLAVE_PAGINA, String(pagina));
    } catch {}
    return () => {
      cancelado = true;
    };
  }, [doc, pagina, zoom, anchoDisponible]);

  const total = doc?.numPages ?? 0;
  const irA = useCallback(
    (n: number) => setPagina((actual) => (total ? Math.min(Math.max(n, 1), total) : actual)),
    [total]
  );

  // Teclado: flechas para pasar página; bloquea guardar e imprimir
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && ["s", "p"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }
      if (e.key === "ArrowRight") irA(pagina + 1);
      if (e.key === "ArrowLeft") irA(pagina - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [irA, pagina]);

  useEffect(() => {
    const onFs = () => setPantallaCompleta(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Deslizar en celular
  const toqueX = useRef<number | null>(null);

  function alternarPantallaCompleta() {
    const raiz = contenedorRef.current?.parentElement;
    if (!document.fullscreenElement) raiz?.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  }

  async function salir() {
    await fetch("/api/ebook/acceso", { method: "DELETE" }).catch(() => {});
    window.location.href = "/ebook";
  }

  const boton =
    "inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-primary-dark)] transition-colors hover:bg-[var(--color-primary)]/10 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div
      className="lector-ebook flex min-h-[80vh] select-none flex-col bg-[var(--color-surface-alt)]"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Barra de herramientas */}
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-[var(--color-primary)]/10 bg-white/95 px-3 py-2 backdrop-blur">
        <div className="flex items-center gap-1">
          <button className={boton} onClick={() => irA(pagina - 1)} disabled={pagina <= 1} aria-label="Página anterior">
            <ChevronLeft size={20} />
          </button>
          <span className="min-w-24 text-center text-sm tabular-nums text-[var(--color-text)]">
            {total ? `${pagina} de ${total}` : "…"}
          </span>
          <button className={boton} onClick={() => irA(pagina + 1)} disabled={!total || pagina >= total} aria-label="Página siguiente">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button className={boton} onClick={() => setZoom((z) => Math.max(ZOOM_MIN, +(z - 0.2).toFixed(1)))} disabled={zoom <= ZOOM_MIN} aria-label="Alejar">
            <ZoomOut size={20} />
          </button>
          <button className={boton} onClick={() => setZoom((z) => Math.min(ZOOM_MAX, +(z + 0.2).toFixed(1)))} disabled={zoom >= ZOOM_MAX} aria-label="Acercar">
            <ZoomIn size={20} />
          </button>
          <button className={boton} onClick={alternarPantallaCompleta} aria-label="Pantalla completa">
            {pantallaCompleta ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          <button className={boton} onClick={salir} aria-label="Salir">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Página */}
      <div
        ref={contenedorRef}
        className="flex flex-1 justify-center overflow-auto p-4"
        onTouchStart={(e) => (toqueX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toqueX.current === null || zoom > 1) return;
          const dx = e.changedTouches[0].clientX - toqueX.current;
          if (Math.abs(dx) > 60) irA(dx < 0 ? pagina + 1 : pagina - 1);
          toqueX.current = null;
        }}
      >
        {error ? (
          <p className="self-center text-center text-[var(--color-text-muted)]">{error}</p>
        ) : (
          <div className="relative h-fit">
            {!doc && (
              <div className="flex h-[60vh] items-center justify-center text-[var(--color-primary)]">
                <Loader2 className="size-8 animate-spin" />
              </div>
            )}
            <canvas ref={canvasRef} className={`bg-white shadow-md ${doc ? "" : "hidden"}`} />
            {doc && (
              <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[10px] tracking-widest text-black/15">
                {marcaDeAgua}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
