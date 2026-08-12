import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "UAE Real Estate Investment Guide 2026 | Morgan Kaiser",
  description:
    "A practical UAE real estate investment guide covering tax, Golden Visa eligibility, and how Dubai, Abu Dhabi, and Ras Al Khaimah compare for foreign investors.",
  path: "/insights",
});

const faqItems = [
  {
    question: "Is UAE real estate a good investment for foreigners?",
    answer:
      "The UAE allows full foreign ownership in designated freehold areas across Dubai, Abu Dhabi, and Ras Al Khaimah, charges no personal income or capital gains tax on property returns, and offers a path to a long-term Golden Visa above set investment thresholds. Whether it's a good investment for you depends on your entry price, developer track record, and how well the payment plan matches your cash flow, not the market alone.",
  },
  {
    question: "Which emirate should I invest in, Dubai, Abu Dhabi, or Ras Al Khaimah?",
    answer:
      "Dubai has the deepest secondary market, the widest range of off-plan inventory, and the most liquidity if you need to exit early. Abu Dhabi suits investors prioritizing government-anchored, lower-volatility assets. Ras Al Khaimah offers a lower entry price and a fast-growing tourism and casino-resort economy, at the cost of a thinner resale market. Most of our clients start in Dubai and evaluate Abu Dhabi or RAK once their first Dubai investment is performing.",
  },
  {
    question: "Do I need to be a UAE resident to buy property here?",
    answer:
      "No. Freehold property in designated areas can be purchased by non-residents of any nationality. Many buyers complete the transaction remotely and only travel to the UAE for handover or to open the bank account tied to a mortgage, if financing is used.",
  },
  {
    question: "How does the Golden Visa work through real estate investment?",
    answer:
      "A property investment of AED 2 million or more (net of any mortgage, in most cases) can qualify the owner for a 10-year renewable Golden Visa, which also covers a spouse and children. Off-plan purchases are generally eligible once a set percentage of the purchase price has been paid, though exact requirements are set by the relevant Land Department and can change, always confirm current thresholds before relying on this for visa planning.",
  },
];

export default function InsightsPillarPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }]} />

      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">UAE Real Estate Investment Guide</h1>
      <p className="mt-4 text-lg text-ink-muted">
        A working guide to buying real estate in the UAE as a foreign investor, what the tax position actually
        means, how the Golden Visa threshold works, and how Dubai, Abu Dhabi, and Ras Al Khaimah differ once you
        get past the marketing.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Why investors look at the UAE</h2>
        <p className="mt-4 text-ink-muted">
          Three things bring most foreign buyers to the table: no personal income tax or capital gains tax on
          property, freehold ownership open to non-residents in designated zones, and a currency pegged to the US
          dollar, which removes a layer of exchange-rate risk that trips up investors in some other emerging
          markets. None of that guarantees a good deal, it just sets the baseline conditions that make the UAE
          worth evaluating in the first place.
        </p>
        <p className="mt-4 text-ink-muted">
          What actually determines your return is the same everywhere: entry price relative to comparable
          completed stock, the developer&apos;s handover track record, the payment plan structure, and realistic
          rental demand in that specific micro-location, not the emirate-wide average everyone quotes.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">The Golden Visa threshold</h2>
        <p className="mt-4 text-ink-muted">
          Real estate investment of AED 2 million or more is the standard route to a 10-year Golden Visa,
          renewable and extending to immediate family. This is one of the most common reasons foreign buyers move
          from &ldquo;considering Dubai&rdquo; to actually transacting, it converts a property purchase into a
          long-term residency decision. Requirements around financing, off-plan payment percentages, and
          qualifying property types are set by government authorities and are updated periodically, so treat any
          number you read (including this one) as a starting point for a conversation, not a guarantee.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">
          How Dubai, Abu Dhabi, and Ras Al Khaimah actually compare
        </h2>
        <p className="mt-4 text-ink-muted">
          These three markets get grouped together constantly, and it does investors a disservice. They have
          different buyer profiles, different liquidity, and different risk levels. Dubai is where the bulk of
          our deal flow and on-the-ground data lives, so that&apos;s the deepest guide of the three below. Abu
          Dhabi and Ras Al Khaimah are covered honestly as regional context, useful for comparison, not
          presented as markets we have equal day-to-day exposure to.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Link
            href="/insights/dubai-off-plan-investment"
            className="rounded-lg bg-paper p-6 ring-1 ring-ink/10 transition hover:ring-gold"
          >
            <p className="eyebrow">Primary Market</p>
            <h3 className="mt-2 font-display text-xl text-ink">Dubai Off-Plan Investment</h3>
            <p className="mt-2 text-sm text-ink-muted">
              Payment plans, ROI ranges, and how Morgan actually evaluates a project before recommending it.
            </p>
          </Link>
          <Link
            href="/insights/abu-dhabi-real-estate-investment"
            className="rounded-lg bg-paper p-6 ring-1 ring-ink/10 transition hover:ring-gold"
          >
            <p className="eyebrow">Regional Comparison</p>
            <h3 className="mt-2 font-display text-xl text-ink">Abu Dhabi Real Estate Investment</h3>
            <p className="mt-2 text-sm text-ink-muted">
              How Abu Dhabi differs from Dubai for foreign investors, and who it actually suits.
            </p>
          </Link>
          <Link
            href="/insights/ras-al-khaimah-real-estate-investment"
            className="rounded-lg bg-paper p-6 ring-1 ring-ink/10 transition hover:ring-gold"
          >
            <p className="eyebrow">Regional Comparison</p>
            <h3 className="mt-2 font-display text-xl text-ink">Ras Al Khaimah Real Estate Investment</h3>
            <p className="mt-2 text-sm text-ink-muted">
              A lower entry point with a thinner resale market, what that trade-off means in practice.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">How financing works</h2>
        <p className="mt-4 text-ink-muted">
          Morgan works as a partner agent within Huspy, which combines brokerage and mortgage advisory in one
          platform. That matters for off-plan buyers specifically: financing options, lender appetite, and
          the interplay between a developer&apos;s payment plan and a mortgage drawdown schedule are easy to get
          wrong if the person selling you the unit isn&apos;t also the one structuring the financing.
        </p>
      </section>

      <FaqSection items={faqItems} />
      <GuideCallout />
    </main>
  );
}
