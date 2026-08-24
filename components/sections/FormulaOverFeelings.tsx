"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

const factors = [
  { label: "Your goals", hint: "What the capital needs to achieve" },
  { label: "Risk appetite", hint: "Acceptable downside" },
  { label: "Available capital", hint: "What can be deployed" },
  { label: "Capital exposure", hint: "Concentration vs diversification" },
  { label: "Leverage tolerance", hint: "How much financing makes sense" },
  { label: "Investment horizon", hint: "Intended hold period" },
];

export default function FormulaOverFeelings() {
  return (
    <section
      id="formula"
      className="border-t border-line bg-paper py-24 sm:py-32"
      aria-label="Formula over feelings"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Approach</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">Formula Over Feelings.</h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Build the strategy before selecting the property.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Morgan works with international investors to structure and scale UAE property portfolios through a
            considered, numbers-led approach.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delayMs={80}>
          <p className="mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-maroon">Together, we assess</p>
          <ul className="mt-6 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((f) => (
              <li key={f.label} className="border-t border-silver/80 py-5 pr-6">
                <p className="font-display text-lg font-bold text-ink">{f.label}</p>
                <p className="mt-1 text-sm text-ink-muted">{f.hint}</p>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll delayMs={120}>
          <blockquote className="mt-14 max-w-2xl border-l-2 border-maroon pl-5 text-lg leading-relaxed text-ink sm:text-xl">
            Does the UAE — and this particular opportunity — actually fit your investment goals?
          </blockquote>
          <p className="mt-6 max-w-xl text-ink-muted">Only then do we move to the property.</p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
