"use client";

import RevealOnScroll from "@/components/ui/RevealOnScroll";

const profile = [
  {
    key: "GOALS",
    question: "What does the capital need to achieve?",
  },
  {
    key: "RISK",
    question: "What level of downside is acceptable?",
  },
  {
    key: "CAPITAL",
    question: "How much capital should be deployed?",
  },
  {
    key: "EXPOSURE",
    question: "How concentrated should the position become?",
  },
  {
    key: "LEVERAGE",
    question: "How much financing makes strategic sense?",
  },
  {
    key: "TIME",
    question: "What is the intended investment horizon?",
  },
];

/** Editorial investment-profile grid — not a bullet list. */
export default function InvestmentProfile() {
  return (
    <section
      id="investment-profile"
      className="border-t border-line bg-surface py-24 sm:py-32"
      aria-label="Investment profile"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Investment profile</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">
            Six questions before any shortlist.
          </h2>
          <p className="mt-6 max-w-xl text-base text-ink-muted sm:text-lg">
            These dimensions shape whether UAE property — and which structure — belongs in the portfolio at all.
          </p>
        </RevealOnScroll>

        <div className="mt-14 border-t border-silver">
          {profile.map((item, i) => (
            <RevealOnScroll key={item.key} delayMs={i * 40}>
              <div className="grid gap-3 border-b border-silver py-7 sm:grid-cols-[8rem_1fr] sm:gap-10 sm:py-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon">{item.key}</p>
                <p className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">{item.question}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
