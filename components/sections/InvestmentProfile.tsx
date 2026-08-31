"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

const profile = [
 { key: "GOALS", question: "What does the capital need to achieve?" },
 { key: "RISK", question: "What level of downside is acceptable?" },
 { key: "CAPITAL", question: "How much capital should be deployed?" },
 { key: "EXPOSURE", question: "How concentrated should the position become?" },
 { key: "LEVERAGE", question: "How much financing makes strategic sense?" },
 { key: "TIME", question: "What is the intended investment horizon?" },
];

/** Editorial investment-profile grid, not a bullet list. */
export default function InvestmentProfile() {
 return (
 <section id="investment-profile" className="section-pad bg-surface" aria-label="Investment profile">
 <div className="section-inner">
 <RevealOnScroll>
 <p className="eyebrow">Investment profile</p>
 <h2 className="section-title">Six questions before any shortlist.</h2>
 <p className="section-lead">
 These dimensions shape whether UAE property, and which structure, belongs in the portfolio at all.
 </p>
 </RevealOnScroll>

 <div className="section-body border-t border-silver">
 {profile.map((item, i) => (
 <RevealOnScroll key={item.key} delayMs={i * 40}>
 <div className="grid gap-3 border-b border-silver py-7 sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-8">
 <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon">{item.key}</p>
 <p className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">{item.question}</p>
 </div>
 </RevealOnScroll>
 ))}
 </div>
 </div>
 </section>
 );
}
