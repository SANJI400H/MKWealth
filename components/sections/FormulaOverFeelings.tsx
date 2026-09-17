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

/** Full-viewport Approach act, snaps one-by-one after Philosophy. */
export default function FormulaOverFeelings() {
 return (
 <section
 id="formula"
 className="cinema-section relative flex items-center overflow-y-auto bg-paper"
 aria-label="Formula over feelings"
 >
 <div className="section-inner w-full py-10 sm:py-16">
 <RevealOnScroll>
 <p className="eyebrow">Approach</p>
 <h2 className="section-title">Formula Over Feelings.</h2>
 <p className="section-lead">Build the strategy before selecting the property.</p>
 <p className="body-copy mt-3 max-w-3xl sm:text-lg">
 Morgan works with international investors to structure and scale UAE property portfolios through a
 considered, numbers-led approach.
 </p>
 </RevealOnScroll>

 <RevealOnScroll delayMs={80} className="mt-8 sm:mt-12">
 <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">Together, we assess</p>
 <ul className="mt-4 grid gap-0 sm:mt-5 sm:grid-cols-2 lg:grid-cols-3">
 {factors.map((f) => (
 <li key={f.label} className="border-t border-silver/80 py-3 pr-4 sm:py-5 sm:pr-6">
 <p className="font-display text-base font-bold text-ink sm:text-lg">{f.label}</p>
 <p className="body-copy-sm mt-1">{f.hint}</p>
 </li>
 ))}
 </ul>
 </RevealOnScroll>

 <RevealOnScroll delayMs={120} className="mt-8 sm:mt-12">
 <blockquote className="max-w-2xl border-l-2 border-maroon pl-4 text-base leading-relaxed text-ink sm:pl-5 sm:text-xl">
 Does the UAE, and this particular opportunity, actually fit your investment goals?
 </blockquote>
 <p className="body-copy mt-5 max-w-3xl">Only then do we move to the property.</p>
 </RevealOnScroll>
 </div>
 </section>
 );
}
