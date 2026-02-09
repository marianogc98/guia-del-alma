"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/app/lib/utils/cn";
import { reviews as reviewsData } from "@/app/lib/data/content";

type Review = (typeof reviewsData)[number];

export default function ReviewsSlider({
  reviews,
}: {
  reviews: readonly Review[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;

      const i = Math.max(0, Math.min(index, reviews.length - 1));
      const width = el.offsetWidth;

      el.scrollTo({
        left: i * width,
        behavior: "smooth",
      });

      setCurrentIndex(i);
    },
    [reviews.length]
  );

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const width = el.offsetWidth;
    const index = Math.round(el.scrollLeft / width);

    if (index >= 0 && index < reviews.length) {
      setCurrentIndex(index);
    }
  }, [reviews.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (reviews.length === 0) return null;

  return (
    <div className="w-full">
      {/* Slider */}
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <blockquote
            key={r.id}
            className="min-w-full snap-center px-4 md:px-8 flex-shrink-0 border-l-4 border-[var(--color-primary)]/40 pl-6"
          >
            {/* Estrellas + fecha (estructura reviews.md) */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="flex gap-0.5" aria-label={`${r.rating} de 5 estrellas`}>
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
              <span className="text-sm text-[var(--color-text-muted)]">{r.date}</span>
            </div>
            <p className="font-serif text-lg leading-relaxed text-[var(--color-text)] md:text-xl">
              asdfasdf
            </p>
            <footer className="mt-4 flex items-center gap-4">
              <div
                className={cn(
                  "size-12 rounded-full border-2 border-[var(--color-primary)]/20",
                  i % 3 === 2
                    ? "bg-[var(--color-primary)]/20"
                    : "bg-[var(--color-surface-alt)]"
                )}
              />
              <div>
                <cite className="font-semibold not-italic text-[var(--color-text)]">
                  {r.name}
                </cite>
                {r.subtitle && (
                  <p className="text-sm text-[var(--color-text-muted)]">{r.subtitle}</p>
                )}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>

      {/* Navegación */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scrollToIndex(currentIndex - 1)}
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
              onClick={() => scrollToIndex(i)}
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
          onClick={() => scrollToIndex(currentIndex + 1)}
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
