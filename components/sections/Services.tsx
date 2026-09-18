"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { homepageServices, type ServiceItem } from "@/content/services";
import { videoActs } from "@/content/videos";

const STEP_MS = 1000;
const MANUAL_PAUSE_MS = 5000;

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href="/work-with-morgan"
      className="service-card group block border-b border-ink/10 py-3.5 transition-opacity duration-300 last:border-b-0 hover:opacity-100 sm:py-4"
    >
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block font-display text-[15px] font-bold text-ink transition-colors group-hover:text-maroon sm:text-base">
            {service.title}
          </span>
          <span className="mt-1.5 block text-[13px] leading-snug text-ink-muted sm:text-sm">
            {service.summary}
          </span>
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.25}
          className="mt-0.5 shrink-0 text-maroon opacity-70 transition group-hover:opacity-100"
          aria-hidden
        />
      </span>
    </Link>
  );
}

function ServiceCarousel({ items }: { items: ServiceItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  const clearResumeTimer = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  };

  const pauseForManual = useCallback(() => {
    setPaused(true);
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => setPaused(false), MANUAL_PAUSE_MS);
  }, []);

  const goTo = useCallback(
    (next: number, opts?: { manual?: boolean }) => {
      const scroller = scrollerRef.current;
      if (!scroller || items.length < 1) return;

      const cards = scroller.querySelectorAll<HTMLElement>("[data-service-card]");
      if (!cards.length) return;

      const clamped = ((next % cards.length) + cards.length) % cards.length;
      indexRef.current = clamped;
      setActive(clamped);
      scroller.scrollTo({
        top: cards[clamped].offsetTop,
        behavior: reduceMotion ? "auto" : "smooth",
      });

      if (opts?.manual) pauseForManual();
    },
    [items.length, pauseForManual, reduceMotion],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || !inView || items.length < 2) return;

    const id = window.setInterval(() => {
      goTo(indexRef.current + 1);
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, inView, items.length, goTo]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const cards = scroller.querySelectorAll<HTMLElement>("[data-service-card]");
      if (!cards.length) return;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetTop - scroller.scrollTop);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      indexRef.current = best;
      setActive(best);
    };

    const onPointerDown = () => pauseForManual();

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("pointerdown", onPointerDown);
    };
  }, [pauseForManual]);

  useEffect(() => () => clearResumeTimer(), []);

  const atStart = active <= 0;
  const atEnd = active >= items.length - 1;

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto relative mt-5 w-full max-w-md sm:mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!resumeTimerRef.current) setPaused(false);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null) && !resumeTimerRef.current) {
          setPaused(false);
        }
      }}
      aria-label="Services list"
    >
      <div
        ref={scrollerRef}
        className="service-scroller no-scrollbar flex max-h-[min(34vh,250px)] flex-col overflow-y-auto overscroll-contain scroll-smooth border-t border-ink/10 pr-1 sm:max-h-[min(38vh,320px)] md:max-h-[min(42vh,380px)]"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Services"
        onWheel={(e) => {
          e.stopPropagation();
          pauseForManual();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          pauseForManual();
        }}
        onTouchEnd={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "PageDown") {
            e.preventDefault();
            e.stopPropagation();
            goTo(active + 1, { manual: true });
          } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            e.preventDefault();
            e.stopPropagation();
            goTo(active - 1, { manual: true });
          }
        }}
      >
        {items.map((service) => (
          <div key={service.id} data-service-card className="shrink-0 scroll-mt-2">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-ink/10 pt-3">
        <p className="text-[11px] font-medium tracking-wide text-ink-muted tabular-nums">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => goTo(active - 1, { manual: true })}
            disabled={atStart}
            aria-label="Previous service"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink/15 text-ink transition enabled:hover:border-ink/40 enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronUp size={18} strokeWidth={1.5} aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1, { manual: true })}
            disabled={atEnd}
            aria-label="Next service"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink/15 text-ink transition enabled:hover:border-ink/40 enabled:hover:text-maroon disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronDown size={18} strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const act = videoActs.act3;

  return (
    <section id="services" className="cinema-section relative overflow-hidden bg-paper" aria-label="Services">
      <CinemaPlayScene
        actId="services"
        src={act.src}
        alt={act.alt}
        textRevealAt={act.textRevealAt}
        layout="split"
        panelSide="left"
        mediaSize="narrow"
        objectPosition="center center"
      >
        <p className="eyebrow">Work With Morgan</p>
        <h2 className="display mt-2 max-w-md text-[1.75rem] leading-[1.08] text-ink sm:mt-5 sm:text-5xl">
          Around the deal,
          <br />
          not just the unit.
        </h2>
        <ServiceCarousel items={homepageServices} />
        <Link href="/work-with-morgan" className="btn-ghost-dark mt-6 w-full justify-center sm:mt-8 sm:w-auto">
          Explore Services →
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
