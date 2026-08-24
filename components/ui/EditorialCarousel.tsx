"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const SLIDE_GAP_PX = 20;

type EditorialCarouselProps = {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
};

/**
 * Native scroll-snap carousel — no autoplay.
 * Mobile ~88% + peek; desktop ~1.2–1.3 cards visible.
 */
export default function EditorialCarousel({
  children,
  ariaLabel,
  className = "",
  previousLabel = "Previous",
  nextLabel = "Next",
}: EditorialCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const reduceMotion = useReducedMotion();
  const labelId = useId();
  const count = children.length;

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el || count === 0) return;
    const slides = el.querySelectorAll<HTMLElement>("[data-carousel-slide]");
    const slide = slides[0];
    if (!slide) return;
    const slideW = slide.offsetWidth + SLIDE_GAP_PX;
    const i = Math.round(el.scrollLeft / Math.max(slideW, 1));
    setIndex(Math.max(0, Math.min(count - 1, i)));
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, [count]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelectorAll<HTMLElement>("[data-carousel-slide]")[i];
    if (!slide) return;
    slide.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  const go = (dir: -1 | 1) => {
    scrollToIndex(Math.max(0, Math.min(count - 1, index + dir)));
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  if (count === 0) return null;

  return (
    <div className={`relative ${className}`} role="region" aria-roledescription="carousel" aria-labelledby={labelId}>
      <span id={labelId} className="sr-only">
        {ariaLabel}
      </span>

      <div
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            data-carousel-slide
            className="w-[88%] shrink-0 snap-start sm:w-[82%] md:w-[min(76%,32rem)] lg:w-[min(70%,34rem)]"
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-8 flex min-h-11 items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-maroon" : "w-1.5 bg-silver hover:bg-ink-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={previousLabel}
            disabled={!canPrev}
            onClick={() => go(-1)}
            className="carousel-btn"
          >
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            disabled={!canNext}
            onClick={() => go(1)}
            className="carousel-btn"
          >
            <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
