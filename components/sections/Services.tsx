"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { services, type ServiceItem } from "@/content/services";
import { videoActs } from "@/content/videos";

const STEP_MS = 1000;

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <WhatsAppLink
      message={service.whatsappMessage}
      className="service-card group block border-b border-ink/10 py-3.5 transition-opacity duration-300 last:border-b-0 hover:opacity-100 sm:py-4"
    >
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block font-display text-[15px] font-bold text-ink transition-colors group-hover:text-gold sm:text-base">
            {service.title}
          </span>
          <span className="mt-1.5 block text-[13px] leading-snug text-ink-muted sm:text-sm">
            {service.summary}
          </span>
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.25}
          className="mt-0.5 shrink-0 text-gold opacity-70 transition group-hover:opacity-100"
          aria-hidden
        />
      </span>
    </WhatsAppLink>
  );
}

function ServiceCarousel({ items }: { items: ServiceItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

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
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const cards = scroller.querySelectorAll<HTMLElement>("[data-service-card]");
      if (!cards.length) return;

      const next = (indexRef.current + 1) % cards.length;
      indexRef.current = next;
      scroller.scrollTo({ top: cards[next].offsetTop, behavior: "smooth" });
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [reduceMotion, paused, inView, items.length]);

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
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto relative mt-5 w-full max-w-md sm:mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
      aria-label="Services list"
    >
      <div
        ref={scrollerRef}
        className="service-scroller no-scrollbar flex max-h-[min(28vh,220px)] flex-col overflow-y-auto overscroll-contain scroll-smooth border-t border-ink/10 pr-1 sm:max-h-[min(40vh,360px)]"
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        {items.map((service) => (
          <div key={service.id} data-service-card className="shrink-0 scroll-mt-2">
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const act = videoActs.act3;

  return (
    <section id="services" className="cinema-section relative h-screen overflow-hidden bg-paper" aria-label="Services">
      <CinemaPlayScene
        actId="services"
        src={act.src}
        alt={act.alt}
        textRevealAt={act.textRevealAt}
        layout="split"
        panelSide="left"
        mediaSize="narrow"
        objectPosition="center center"
        priority
      >
        <p className="eyebrow">Services</p>
        <h2 className="display mt-3 max-w-md text-3xl text-ink sm:mt-5 sm:text-5xl">
          Around the deal —
          <br />
          not just the unit.
        </h2>
        <ServiceCarousel items={services} />
      </CinemaPlayScene>
    </section>
  );
}
