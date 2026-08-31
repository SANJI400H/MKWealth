"use client";

import Link from "next/link";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import EditorialTabs from "@/components/ui/EditorialTabs";
import PageIntro from "@/components/ui/PageIntro";
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

function ServicePanel({
 title,
 who,
 what,
 next,
}: {
 title: string;
 who: string;
 what: string;
 next: string;
}) {
 return (
 <div>
 <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
 <dl className="mt-6 space-y-4">
 <div>
 <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Who it is for</dt>
 <dd className="body-copy mt-2">{who}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">What Morgan contributes</dt>
 <dd className="body-copy mt-2">{what}</dd>
 </div>
 <div>
 <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Expected next step</dt>
 <dd className="body-copy mt-2">{next}</dd>
 </div>
 </dl>
 </div>
 );
}

export default function WorkWithMorganTabs() {
 const panels = Object.fromEntries(
 sections.map((section) => [
 section.id,
 <ServicePanel key={section.id} title={section.title} who={section.who} what={section.what} next={section.next} />,
 ]),
 );

 return (
 <>
 <PageIntro
 title="Work With Morgan"
 lead="The engagement model, from strategy through acquisition and coordination. Where regulated specialists deliver (financing, residency paperwork), Morgan coordinates rather than substitutes."
 />

 <EditorialTabs
 items={workSectionNav}
 layoutId="work-tab-underline"
 ariaLabel="Services"
 cta={{ label: "Book Strategy Session", href: "/strategy-session" }}
 panels={panels}
 />

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
