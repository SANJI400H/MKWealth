"use client";

import Link from "next/link";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { workSectionNav } from "@/content/navigation";

const sections = [
  {
    id: "strategy",
    title: "Strategy",
    who: "Investors clarifying objective, capital, horizon, and risk before any shortlist.",
    what: "A numbers-first brief: liquidity, return targets, off-plan versus secondary fit, and exit logic. A full portfolio enhancement.",
    next: "Often leads to underwriting a live opportunity or a strategy session.",
  },
  {
    id: "underwriting",
    title: "Underwriting",
    who: "Anyone with a brochure, listing, or payment plan who wants the maths stress-tested.",
    what: "Price, costs, yield assumptions, and structure reviewed against actual liquidity.",
    next: "Proceed with an acquisition only once the asset clearly fits the investor's vision, goals and direction, or renegotiate the assumptions. At a bare minimum the investor walks away with 100% clarity on what they do and do not want in the market.",
  },
  {
    id: "acquisition",
    title: "Acquisition",
    who: "People with a vision to build wealth and prosperity in the UAE who are looking for high-returning real estate advice, while mitigating downside risk.",
    what: "Unit selection and structuring against payment plans, delivery risk and price discovery, including exactly what to avoid.",
    next: "A shortlist that matches the brief, or a clear decision not to proceed.",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    who: "International investors, family offices and institutional conglomerates that prioritise diversification and empire expansion in the UAE.",
    what: "A UAE-wide overview, not Dubai first, comparing emirates, markets and asset classes at the same time, with a deep understanding of international markets.",
    next: "Targeted acquisition for expansion, or rebalancing and recalibration recommendations for existing assets.",
  },
  {
    id: "financing",
    title: "Financing",
    who: "Buyers considering a mortgage or construction-linked drawdowns, and investors who use leverage to snowball a portfolio and increase cash-on-cash return potential.",
    what: "Clarity on funding, fees and, if relevant, financing. Coordination runs via Huspy and lenders where appetite must match the schedule. This is not a personal lending service.",
    next: "An aligned financing path, or a clear cash purchase alternative.",
  },
  {
    id: "coordination",
    title: "Residency",
    who: "Investors who need ownership, banking, or residency pathways tied to property.",
    what: "Coordination of the steps and the specialists. Golden Visa and banking stay subject to current rules and to the third party who delivers them.",
    next: "Documented next steps with the right counterparts.",
  },
] as const;

export default function WorkWithMorganTabs() {
  return (
    <>
      <PageIntro
        title="Work With Morgan"
        lead="The engagement model, from strategy through acquisition and coordination. We are the beehive of your property purchase. Where regulated specialists deliver, Morgan coordinates rather than substitutes."
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
          <Link href="/areas" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Certified Options
          </Link>
        </div>
      </section>
    </>
  );
}
