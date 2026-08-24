"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { getTestimonials } from "@/lib/testimonials";

export default function Testimonials() {
  const testimonials = getTestimonials();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "12% 0px", threshold: 0 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduced || mobile || !inView) {
      track.style.willChange = "auto";
      return;
    }

    let raf = 0;
    let offset = 0;
    const speed = 0.22;
    track.style.willChange = "transform";

    const loop = () => {
      if (!paused) {
        offset += speed;
        const half = track.scrollWidth / 2;
        if (half > 0 && offset >= half) offset = 0;
        track.style.transform = `translate3d(-${offset}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      track.style.willChange = "auto";
    };
  }, [paused, inView]);

  const looped = [...testimonials, ...testimonials];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="overflow-hidden bg-paper py-24 sm:py-32"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Testimonials</p>
          <h2 className="display mt-5 text-4xl text-ink sm:text-6xl">After closing.</h2>
        </RevealOnScroll>
      </div>

      <div className="mt-14 no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto px-5 pb-2 sm:hidden">
        {testimonials.map((testimonial) => (
          <blockquote
            key={testimonial.id}
            className="w-[82vw] max-w-sm shrink-0 snap-start border-t border-line pt-8"
          >
            <p className="text-xl leading-relaxed text-ink-muted">&ldquo;{testimonial.quote}&rdquo;</p>
            <footer className="mt-8">
              <p className="font-display text-base font-bold text-ink">{testimonial.name}</p>
              <p className="mt-1 text-sm text-ink-muted">{testimonial.location}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon">
                {testimonial.result}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>

      <div
        className="mt-16 hidden sm:block"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div ref={trackRef} className="flex w-max gap-16 px-8">
          {looped.map((testimonial, index) => (
            <blockquote
              key={`${testimonial.id}-${index}`}
              className="w-[400px] shrink-0 border-t border-line pt-8"
            >
              <p className="text-2xl leading-relaxed text-ink-muted">&ldquo;{testimonial.quote}&rdquo;</p>
              <footer className="mt-8">
                <p className="font-display text-base font-bold text-ink">{testimonial.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{testimonial.location}</p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-maroon">
                  {testimonial.result}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
