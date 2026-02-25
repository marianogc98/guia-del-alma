"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/app/lib/utils/cn";
import { reviews as reviewsData } from "@/app/lib/data/content";

type Review = (typeof reviewsData)[number];

export default function ReviewsSlider({
  reviews,
}: {
  reviews: readonly Review[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(reviews.length - 1, i + 1));

  if (reviews.length === 0) return null;

  const r = reviews[currentIndex];

  return (
    <div className="w-full">
      {/* Review activa */}
      <blockquote
        key={r.id}
        className="mx-auto max-w-4xl text-center px-4 md:px-4"
      >
        {/* Estrellas */}
        <div className="mb-5 flex justify-center gap-0.5" aria-label={`${r.rating} de 5 estrellas`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "size-5",
                star <= r.rating
                  ? "fill-[var(--color-primary)] text-[var(--color-primary)]"
                  : "fill-transparent text-[var(--color-text-muted)]/30"
              )}
            />
          ))}
        </div>
        <p className="font-serif text-lg leading-relaxed text-[var(--color-text)] md:text-xl">
          &ldquo;{r.message}&rdquo;
        </p>
        <footer className="mt-6 flex flex-col items-center gap-1">
          <cite className="font-semibold not-italic text-[var(--color-text)]">
            {r.name}
          </cite>
          {"subtitle" in r && r.subtitle && (
            <p className="text-sm text-[var(--color-text-muted)]">{r.subtitle as string}</p>
          )}
        </footer>
      </blockquote>

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={currentIndex === 0}
          className="rounded-full p-2 text-[var(--color-primary)] transition hover:bg-[var(--color-surface-alt)] disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Anterior"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === currentIndex
                  ? "w-6 bg-[var(--color-primary)]"
                  : "w-2 bg-[var(--color-primary)]/30 hover:bg-[var(--color-primary)]/50"
              )}
              aria-label={`Ir a experiencia ${i + 1}`}
              aria-current={i === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={currentIndex === reviews.length - 1}
          className="rounded-full p-2 text-[var(--color-primary)] transition hover:bg-[var(--color-surface-alt)] disabled:opacity-40 disabled:hover:bg-transparent"
          aria-label="Siguiente"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
