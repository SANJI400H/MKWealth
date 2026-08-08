import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Off-Plan Property Investment Guide | Morgan Kaiser",
  description:
    "How to buy off-plan property in Dubai as a foreigner: payment plans, ROI ranges, Golden Visa eligibility, and Dubai's tax-free investment structure.",
  path: "/invest/dubai",
});

const faqItems = [
  {
    question: "How does buying off-plan property in Dubai work for foreigners?",
    answer:
      "Foreign nationals of any residency status can buy off-plan property directly from developers in Dubai's designated freehold areas. The process is: reserve the unit with a booking fee, sign the Sales and Purchase Agreement (SPA), pay according to the developer's construction-linked payment plan, then register at handover through the Dubai Land Department. No UAE residency is required to start or complete the purchase.",
  },
  {
    question: "What is a realistic ROI on Dubai off-plan property?",
    answer:
      "Gross rental yields across Dubai typically range from 5% to 9%, with newer areas and smaller unit types (studios, 1BRs) often at the higher end due to lower absolute purchase prices relative to achievable rent. Off-plan buyers also target capital appreciation between booking and handover, which varies significantly by developer, location, and market cycle — it is not guaranteed and should never be the sole basis for a purchase decision.",
  },
  {
    question: "Is Dubai real estate really tax-free?",
    answer:
      "There is no personal income tax and no capital gains tax on individual property investment in Dubai. Buyers do pay a one-time Dubai Land Department transfer fee (typically 4% of the purchase price) plus standard administrative and registration fees. There is no ongoing property or rental income tax for individual, non-corporate ownership.",
  },
  {
    question: "How much deposit do I need to buy off-plan in Dubai?",
    answer:
      "Most developers require 5–20% at booking, with the remainder spread across construction-linked milestones through to handover — commonly structured as 60/40 or 70/30 splits between pre-handover and post-handover payments. Exact terms vary by developer and project, which is exactly why comparing the payment plan matters as much as comparing the price per square foot.",
  },
];

export default function DubaiInvestPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/#invest" },
            { name: "Dubai", path: "/invest/dubai" },
          ]}
        />

        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Dubai Off-Plan Property Investment
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          This is the market Morgan works in daily. Everything below is drawn from active deal flow — specific
          projects, not a citywide average.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">What off-plan actually means</h2>
          <p className="mt-4 text-ink-muted">
            Off-plan property is sold before or during construction, usually at a lower entry price than
            completed stock, with payments staged to construction milestones. The advantage is lower capital
            committed on day one. The trade-off is handover risk — which is why developer delivery history
            matters more than the brochure.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Buying as a foreigner</h2>
          <p className="mt-4 text-ink-muted">
            Dubai has permitted 100% foreign freehold ownership in designated areas since 2002. You do not need
            UAE residency or a local company to purchase. You do need a valid passport, a funding source, and a
            clear read on the payment plan structure.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">ROI: what to actually expect</h2>
          <p className="mt-4 text-ink-muted">
            Gross rental yields generally sit between 5% and 9%, depending on unit type, area, and entry price
            versus achievable rent. Capital appreciation between booking and handover is the other half of
            off-plan ROI — and the part most marketing overstates.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Golden Visa</h2>
          <p className="mt-4 text-ink-muted">
            A property investment of AED 2 million or more can qualify for a 10-year renewable Golden Visa.
            Off-plan eligibility usually depends on a minimum percentage paid — confirm current thresholds before
            treating this as settled.
          </p>
        </section>

        <p className="mt-12 text-ink-muted">
          Compare with{" "}
          <Link href="/invest/abu-dhabi" className="font-semibold text-gold hover:underline">
            Abu Dhabi
          </Link>{" "}
          and{" "}
          <Link href="/invest/rak" className="font-semibold text-gold hover:underline">
            Ras Al Khaimah
          </Link>
          .
        </p>

        <FaqSection items={faqItems} />
        <GuideCallout />
      </main>
      <SiteFooter />
    </>
  );
}
