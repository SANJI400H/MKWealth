"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

const factors = [
  { label: "Goals", hint: "What the capital needs to achieve" },
  { label: "Risk appetite", hint: "Acceptable downside" },
  { label: "Available capital", hint: "What can be deployed" },
  { label: "Capital exposure", hint: "Concentration versus diversification" },
  { label: "Leverage tolerance", hint: "How much financing makes sense" },
  { label: "Investment horizon", hint: "Intended hold period" },
];

/** One philosophy block. Vision First stays in the hero. */
export default function VisionPhilosophy() {
  return (
    <section
      id="philosophy"
      className="cinema-section relative bg-paper !h-auto"
      aria-label="Philosophy"
    >
      <div className="section-inner w-full pb-10 pt-[calc(4.75rem+env(safe-area-inset-top,0px))] sm:pb-16 sm:pt-28">
        <RevealOnScroll>
          <p className="eyebrow">Philosophy</p>
          <h2 className="section-title">Formula over feelings.</h2>
          <p className="section-lead">
            Morgan does not start by selecting a property. He starts with the investor, then the strategy, then whether
            any opportunity fits.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80} className="mt-8 sm:mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">Morgan assesses</p>
          <ul className="mt-4 grid gap-0 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((factor) => (
              <li key={factor.label} className="border-t border-silver/80 py-3 pr-4 sm:py-5 sm:pr-6">
                <p className="font-display text-base font-bold text-ink sm:text-lg">{factor.label}</p>
                <p className="body-copy-sm mt-1">{factor.hint}</p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120} className="mt-8 sm:mt-12">
          <blockquote className="max-w-2xl border-l-2 border-maroon pl-4 text-base leading-relaxed text-ink sm:pl-5 sm:text-xl">
            Does the UAE, and this particular opportunity, actually fit the investment goals?
          </blockquote>
          <p className="body-copy mt-5 max-w-3xl">Only then does the work move to a property.</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
