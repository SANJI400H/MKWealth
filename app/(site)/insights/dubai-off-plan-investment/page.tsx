import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Off-Plan Property Investment Guide | Morgan Kaiser",
  description:
    "How to buy off-plan property in Dubai as a foreigner: payment plans, ROI ranges, Golden Visa eligibility, and Dubai's tax-free investment structure.",
  path: "/insights/dubai-off-plan-investment",
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
      "Gross rental yields across Dubai typically range from 5% to 9%, with newer areas and smaller unit types (studios, 1BRs) often at the higher end due to lower absolute purchase prices relative to achievable rent. Off-plan buyers also target capital appreciation between booking and handover, which varies significantly by developer, location, and market cycle, it is not guaranteed and should never be the sole basis for a purchase decision.",
  },
  {
    question: "Is Dubai real estate really tax-free?",
    answer:
      "There is no personal income tax and no capital gains tax on individual property investment in Dubai. Buyers do pay a one-time Dubai Land Department transfer fee (typically 4% of the purchase price) plus standard administrative and registration fees. There is no ongoing property or rental income tax for individual, non-corporate ownership.",
  },
  {
    question: "How much deposit do I need to buy off-plan in Dubai?",
    answer:
      "Most developers require 5 to 20% at booking, with the remainder spread across construction-linked milestones through to handover, commonly structured as 60/40 or 70/30 splits between pre-handover and post-handover payments. Exact terms vary by developer and project, which is exactly why comparing the payment plan matters as much as comparing the price per square foot.",
  },
];

export default function DubaiOffPlanPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: "Dubai Off-Plan Investment", path: "/insights/dubai-off-plan-investment" },
        ]}
      />

      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Dubai Off-Plan Property Investment</h1>
      <p className="mt-4 text-lg text-ink-muted">
        This is the market Morgan works in daily. Everything below is drawn from active deal flow, not a
        market-wide summary, if a number here doesn&apos;t match a headline you&apos;ve read elsewhere, it&apos;s
        because it reflects specific projects, not a citywide average.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">What &ldquo;off-plan&rdquo; actually means</h2>
        <p className="mt-4 text-ink-muted">
          Off-plan property is sold by the developer before or during construction, at a lower entry price than
          equivalent completed stock. Buyers pay in stages tied to construction milestones rather than the full
          amount upfront, which is the main structural advantage over buying a completed resale unit: less capital
          committed on day one, with the balance due over the build period.
        </p>
        <p className="mt-4 text-ink-muted">
          The trade-off is handover risk. Not every developer delivers on schedule, and unit quality on completion
          can vary from the sales materials. This is the single biggest reason to buy off-plan through someone who
          tracks developer delivery history, rather than from a listing site or a single project&apos;s sales
          team.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Buying off-plan property in Dubai as a foreigner</h2>
        <p className="mt-4 text-ink-muted">
          Dubai has permitted 100% foreign freehold ownership in designated areas since 2002, and the list of
          eligible areas has expanded steadily since, Dubai Marina, Downtown Dubai, Dubai Creek Harbour, Jumeirah
          Village Circle, and Business Bay among them. You do not need UAE residency, a local bank account, or a
          local company to purchase. What you do need is:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">
          <li>A valid passport for identity verification with the developer and the Dubai Land Department.</li>
          <li>A funding source for the booking deposit and staged payments, cash, or mortgage financing.</li>
          <li>
            A clear read on the payment plan structure, since post-handover payment plans (increasingly common)
            change the cash-flow math significantly versus construction-linked-only plans.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Dubai property ROI: what to actually expect</h2>
        <p className="mt-4 text-ink-muted">
          Gross rental yields in Dubai generally sit between 5% and 9%, depending on unit type, area, and how the
          purchase price compares to prevailing rents at handover. Studios and 1-bedroom units in newer
          communities tend to post higher percentage yields because entry prices are lower relative to achievable
          rent; larger units in established, amenity-rich areas tend to appreciate more steadily but yield a lower
          percentage.
        </p>
        <p className="mt-4 text-ink-muted">
          Capital appreciation between booking and handover is the other half of off-plan ROI, and it is the part
          most marketing overstates. It depends on the specific project&apos;s pricing versus comparable
          completed stock, the developer&apos;s brand premium, and broader market conditions at handover, none of
          which can be responsibly quoted as a fixed percentage before a project is selected.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Golden Visa eligibility through Dubai real estate</h2>
        <p className="mt-4 text-ink-muted">
          A property investment of AED 2 million or more can qualify an owner for a 10-year, renewable Golden
          Visa, extending to a spouse and children. For off-plan purchases, eligibility is generally tied to a
          minimum percentage of the purchase price being paid rather than requiring full completion, but the
          exact rules are set by the General Directorate of Residency and Foreign Affairs (GDRFA) and Dubai Land
          Department, and have been adjusted before. Confirm current thresholds against your specific purchase
          before treating this as settled.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">The tax-free structure, precisely</h2>
        <p className="mt-4 text-ink-muted">
          Individual investors pay no personal income tax on rental income and no capital gains tax on resale
          profit. The one-time cost at purchase is the Dubai Land Department transfer fee, typically 4% of the
          property value, plus a smaller registration fee. There is no annual property tax. This is a genuine
          structural advantage over most Western markets, not a marketing exaggeration, but it doesn&apos;t
          substitute for underwriting the deal itself.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">How Morgan evaluates a project before recommending it</h2>
        <p className="mt-4 text-ink-muted">
          Every project on the{" "}
          <Link href="/#projects" className="text-gold hover:underline">
            current opportunities list
          </Link>{" "}
          is screened against the developer&apos;s delivery track record, the payment plan structure relative to
          the buyer&apos;s cash flow, and realistic rent comparables in that specific building or cluster, not
          just the area&apos;s average. If you want the same screening applied to a project you&apos;re already
          considering, that&apos;s a five-minute WhatsApp conversation.
        </p>
      </section>

      <p className="mt-12 text-ink-muted">
        For how Dubai compares to the other two UAE markets we cover, see the{" "}
        <Link href="/insights" className="text-gold hover:underline">
          UAE Real Estate Investment Guide
        </Link>
        , or go directly to the{" "}
        <Link href="/insights/abu-dhabi-real-estate-investment" className="text-gold hover:underline">
          Abu Dhabi
        </Link>{" "}
        and{" "}
        <Link href="/insights/ras-al-khaimah-real-estate-investment" className="text-gold hover:underline">
          Ras Al Khaimah
        </Link>{" "}
        comparisons.
      </p>

      <FaqSection items={faqItems} />
      <GuideCallout />
    </main>
  );
}
