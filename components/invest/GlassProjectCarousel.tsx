"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { projectMedia, projectPath, type CatalogueProject } from "@/content/invest-catalogue";

const GAP_PX = 20;

type DragState = {
  active: boolean;
  pointerId: number;
  startX: number;
  startScroll: number;
  lastX: number;
  lastT: number;
  velocity: number;
  moved: boolean;
};

function GlassCard({
  project,
  scrollX,
  priority,
  reduce,
  onNavigate,
}: {
  project: CatalogueProject;
  scrollX: MotionValue<number>;
  priority: boolean;
  reduce: boolean;
  onNavigate: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const scale = useTransform(distance, [-640, 0, 640], [0.94, 1, 0.94]);
  const opacity = useTransform(distance, [-640, 0, 640], [0.78, 1, 0.78]);
  const media = projectMedia[project.slug];

  useEffect(() => {
    const el = ref.current;
    const track = el?.parentElement;
    if (!el || !track) return;

    let left = el.offsetLeft;
    let inset = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const update = () => distance.set(left - track.scrollLeft - inset);
    update();

    const onResize = () => {
      left = el.offsetLeft;
      inset = Number.parseFloat(getComputedStyle(track).paddingLeft) || 0;
      update();
    };
    const stop = scrollX.on("change", update);
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
    };
  }, [distance, scrollX]);

  return (
    <motion.div
      ref={ref}
      data-carousel-slide
      style={reduce ? undefined : { scale, opacity }}
      className="aspect-[16/10] w-[min(85%,32rem)] shrink-0 snap-start will-change-transform"
    >
      <Link
        href={projectPath(project)}
        onClick={onNavigate}
        className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-[#161311] shadow-[0_30px_70px_-36px_rgba(21,19,16,0.7)] outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2"
      >
        {media ? (
          <Image
            src={media.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 640px) 512px, 85vw"
            className="object-cover transition duration-700 ease-out motion-reduce:transition-none group-hover:scale-[1.035]"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/10" />
        <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/35 bg-black/40 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_14px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-150 sm:inset-x-4 sm:bottom-4 sm:px-5 sm:py-4">
          <p className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">{project.name}</p>
          <p className="mt-1 text-sm leading-snug text-white/80">{project.product}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function GlassProjectCarousel({
  projects,
  label,
  className = "mt-10 pb-16 sm:pb-20",
}: {
  projects: CatalogueProject[];
  label: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);
  const dragged = useRef(false);
  const drag = useRef<DragState | null>(null);
  const reduceMotion = useReducedMotion();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(projects.length > 1);
  const count = projects.length;

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el || count === 0) return;
    scrollX.set(el.scrollLeft);
    const slide = el.querySelector<HTMLElement>("[data-carousel-slide]");
    const step = (slide?.offsetWidth ?? 1) + GAP_PX;
    const next = Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / step)));
    setIndex((current) => (current === next ? current : next));
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, [count, scrollX]);

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
    const pad = Number.parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({
      left: Math.max(0, slide.offsetLeft - pad),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      lastX: event.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    const el = trackRef.current;
    if (!state?.active || !el) return;
    const dx = event.clientX - state.startX;
    if (!state.moved && Math.abs(dx) < 6) return;
    if (!state.moved) {
      state.moved = true;
      dragged.current = true;
      el.setPointerCapture(state.pointerId);
      el.style.scrollSnapType = "none";
    }
    const now = performance.now();
    const dt = now - state.lastT;
    if (dt > 0) state.velocity = (event.clientX - state.lastX) / dt;
    state.lastX = event.clientX;
    state.lastT = now;
    el.scrollLeft = state.startScroll - dx;
  };

  const finishDrag = () => {
    const state = drag.current;
    const el = trackRef.current;
    drag.current = null;
    if (!state?.moved || !el) return;
    el.style.scrollSnapType = "";
    const slides = el.querySelectorAll<HTMLElement>("[data-carousel-slide]");
    const step = (slides[0]?.offsetWidth ?? 1) + GAP_PX;
    const projected = el.scrollLeft - state.velocity * 180;
    const next = Math.max(0, Math.min(count - 1, Math.round(projected / step)));
    const pad = Number.parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    el.scrollTo({
      left: Math.max(0, (slides[next]?.offsetLeft ?? 0) - pad),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  if (count === 0) return null;

  return (
    <section className={className} aria-labelledby={labelId}>
      <h2 id={labelId} className="sr-only">
        {label}
      </h2>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollToIndex(Math.max(0, index - 1));
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollToIndex(Math.min(count - 1, index + 1));
          }
        }}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-2 active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
      >
        {projects.map((project, i) => (
          <GlassCard
            key={project.slug}
            project={project}
            scrollX={scrollX}
            priority={i === 0}
            reduce={reduceMotion === true}
            onNavigate={(event) => {
              if (!dragged.current) return;
              event.preventDefault();
              dragged.current = false;
            }}
          />
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </div>

      <div className="mt-6 flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Projects">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-label={project.name}
              aria-selected={i === index}
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
            aria-label="Previous project"
            disabled={!canPrev}
            onClick={() => scrollToIndex(Math.max(0, index - 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/60 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_10px_24px_rgba(21,19,16,0.08)] backdrop-blur-2xl enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft size={18} strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next project"
            disabled={!canNext}
            onClick={() => scrollToIndex(Math.min(count - 1, index + 1))}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/60 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.96),0_10px_24px_rgba(21,19,16,0.08)] backdrop-blur-2xl enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
