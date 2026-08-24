"use client";

import { useReducedMotion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { morganProfile } from "@/content/morgan-profile";

/** Progressive reveal of the core brand philosophy lines. */
export default function VisionPhilosophy() {
  const reduce = useReducedMotion();

  return (
    <section
      id="philosophy"
      className="border-t border-line bg-surface py-28 sm:py-36"
      aria-label="Brand philosophy"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Philosophy</p>
        </RevealOnScroll>
        <div className="mt-10 space-y-4 sm:mt-14 sm:space-y-6">
          {morganProfile.philosophyLines.map((line, i) => (
            <RevealOnScroll key={line} delayMs={reduce ? 0 : i * 120}>
              <p className="display text-4xl text-ink sm:text-6xl lg:text-7xl">{line}</p>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delayMs={reduce ? 0 : 400}>
          <p className="mt-12 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-16 sm:text-lg">
            Morgan does not start by selecting a property. He starts by understanding the investor — then shapes the
            strategy — then evaluates whether any opportunity fits.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
