"use client";

import Link from "next/link";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { workSectionNav } from "@/content/navigation";

const sections = [
  {
    id: "strategy",
    title: "Investment Strategy",
    who: "Investors clarifying objective, capital, horizon, and risk before any shortlist.",
    what: "A numbers-first brief: liquidity, return targets, off-plan vs secondary fit, and exit logic.",
    next: "Often leads to underwriting a live opportunity or a strategy session.",
  },
  {
    id: "acquisition",
    title: "Property Acquisition",
    who: "Buyers ready to select and secure off-plan or secondary stock that fits the brief.",
    what: "Unit selection and structuring against payment plans, delivery risk, and price discovery.",
    next: "Deal underwriting and, where relevant, financing coordination.",
  },
  {
    id: "underwriting",
    title: "Deal Underwriting",
    who: "Anyone with a brochure, listing, or payment plan who wants the maths stress-tested.",
    what: "Price, costs, yield assumptions, and structure reviewed against your actual liquidity.",
    next: "Proceed, renegotiate assumptions, or walk away with clarity.",
  },
  {
    id: "portfolio",
    title: "Property Portfolio Strategy",
    who: "Investors allocating across assets, markets, or handover timelines.",
    what: "Diversification, concentration risk, and capital preservation in a Dubai-first context.",
    next: "Targeted acquisition or rebalancing recommendations.",
  },
  {
    id: "financing",
    title: "Financing Coordination",
    who: "Buyers considering mortgage or construction-linked drawdowns.",
    what: "Coordination via Huspy and lenders where appetite must match payment schedules, not a personal lending service.",
    next: "Aligned financing path or a clear cash-purchase alternative.",
  },
  {
    id: "coordination",
    title: "Residency / Purchase Coordination",
    who: "Investors needing ownership, banking, or residency pathways tied to property.",
    what: "Coordination of steps and specialists; Golden Visa and banking subject to current rules and third-party process.",
    next: "Documented next steps with the right counterparts.",
  },
] as const;

export default function WorkWithMorganTabs() {
  return (
    <>
      <PageIntro
        title="Work With Morgan"
        lead="The engagement model, from strategy through acquisition and coordination. Where regulated specialists deliver (financing, residency paperwork), Morgan coordinates rather than substitutes."
      />

      <StickySectionNav
        items={workSectionNav}
        layoutId="work-section-pill"
        ariaLabel="Services"
        className="mt-8"
      />

      {sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className={index === 0 ? "scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10" : "page-block"}
        >
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{section.title}</h2>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Who it is for</dt>
              <dd className="body-copy mt-2">{section.who}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">What Morgan contributes</dt>
              <dd className="body-copy mt-2">{section.what}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Expected next step</dt>
              <dd className="body-copy mt-2">{section.next}</dd>
            </div>
          </dl>
        </section>
      ))}

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-display text-2xl font-bold text-ink">Take action</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/invest" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Explore markets
          </Link>
        </div>
      </section>
    </>
  );
}
