import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionNavigation from "@/components/ui/SectionNavigation";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { workSectionNav } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Work With Morgan | Services & Engagement",
  description:
    "How Morgan Kaiser works with international investors: strategy, acquisition, underwriting, portfolio, financing and purchase coordination.",
  path: "/work-with-morgan",
});

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
    what: "Coordination via Huspy and lenders where appetite must match payment schedules — not a personal lending service.",
    next: "Aligned financing path or a clear cash-purchase alternative.",
  },
  {
    id: "coordination",
    title: "Residency / Purchase Coordination",
    who: "Investors needing ownership, banking, or residency pathways tied to property.",
    what: "Coordination of steps and specialists; Golden Visa and banking subject to current rules and third-party process.",
    next: "Documented next steps with the right counterparts.",
  },
];

export default function WorkWithMorganPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work With Morgan", path: "/work-with-morgan" },
          ]}
        />

        <h1 className="page-h1">Work With Morgan</h1>
        <p className="page-lead">
          The engagement model — from strategy through acquisition and coordination. Where regulated specialists
          deliver (financing, residency paperwork), Morgan coordinates rather than substitutes.
        </p>

        <div className="mt-10">
          <SectionNavigation
            items={workSectionNav}
            cta={{ label: siteConfig.cta.analyse, href: "/analyse" }}
          />
        </div>

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="page-block">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{section.title}</h2>
            <dl className="mt-6 space-y-4 text-ink-muted">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Who it is for</dt>
                <dd className="mt-2">{section.who}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">What Morgan contributes</dt>
                <dd className="mt-2">{section.what}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">Expected next step</dt>
                <dd className="mt-2">{section.next}</dd>
              </div>
            </dl>
          </section>
        ))}

        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink">Take action</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
            <Link href="/analyse" className="btn-ghost-dark w-full justify-center sm:w-auto">
              {siteConfig.cta.analyse}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
