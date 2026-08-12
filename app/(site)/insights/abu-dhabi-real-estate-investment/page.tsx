import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Abu Dhabi Real Estate Investment vs. Dubai | Morgan Kaiser",
  description:
    "How Abu Dhabi off-plan real estate investment compares to Dubai for foreign buyers, ownership rules, yields, liquidity, and who each market actually suits.",
  path: "/insights/abu-dhabi-real-estate-investment",
});

const faqItems = [
  {
    question: "Can foreigners buy real estate in Abu Dhabi?",
    answer:
      "Yes. Foreign nationals can own freehold property in Abu Dhabi's designated investment zones, including Saadiyat Island, Yas Island, Al Reem Island, and Al Maryah Island. The ownership structure mirrors Dubai's freehold system, though the list of eligible areas is shorter.",
  },
  {
    question: "Is Abu Dhabi real estate a better investment than Dubai?",
    answer:
      "Better is the wrong frame, they suit different investors. Abu Dhabi tends to offer more government-anchored, institutionally backed developments with steadier, lower-volatility pricing. Dubai has a larger pool of off-plan inventory, a deeper resale market, and more liquidity if you need to exit before or shortly after handover. Investors prioritizing stability over liquidity often prefer Abu Dhabi; investors prioritizing deal flow and resale flexibility tend to stay in Dubai.",
  },
  {
    question: "What are typical rental yields in Abu Dhabi?",
    answer:
      "Gross rental yields in Abu Dhabi's investment zones generally run in the 5 to 7% range, somewhat lower on average than Dubai's broader range, reflecting a smaller, less transient rental pool and a rental market more anchored to government and semi-government employment.",
  },
  {
    question: "Does Abu Dhabi property qualify for the UAE Golden Visa?",
    answer:
      "Yes, the AED 2 million federal investment threshold for the 10-year Golden Visa applies to qualifying real estate anywhere in the UAE, including Abu Dhabi, not just Dubai. The eligibility mechanics are set at the federal level, though processing runs through the relevant emirate's authority.",
  },
];

export default function AbuDhabiPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: "Abu Dhabi Real Estate Investment", path: "/insights/abu-dhabi-real-estate-investment" },
        ]}
      />

      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Abu Dhabi Real Estate Investment</h1>
      <p className="mt-4 text-lg text-ink-muted">
        A straightforward comparison, not a sales pitch: Morgan&apos;s active deal flow is concentrated in Dubai,
        so this page covers how Abu Dhabi differs for a foreign investor evaluating both markets, not a
        project-by-project breakdown of the kind found on the{" "}
        <Link href="/insights/dubai-off-plan-investment" className="text-gold hover:underline">
          Dubai off-plan investment page
        </Link>
        .
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Ownership rules are nearly identical to Dubai&apos;s</h2>
        <p className="mt-4 text-ink-muted">
          Abu Dhabi permits full foreign freehold ownership in designated investment zones, Saadiyat Island, Yas
          Island, Al Reem Island, and Al Maryah Island are the primary ones for residential investment. The legal
          mechanics of purchase, registration, and title are broadly comparable to Dubai&apos;s system, run
          through the Abu Dhabi Department of Municipalities and Transport rather than the Dubai Land Department.
          Non-residents can purchase without a UAE visa in hand, the same as in Dubai.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Where Abu Dhabi genuinely differs from Dubai</h2>
        <p className="mt-4 text-ink-muted">
          The practical differences that matter to an investor come down to three things:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">
          <li>
            <strong className="text-ink">Inventory depth.</strong> Dubai has a substantially larger volume of
            off-plan projects in active sale at any given time. Abu Dhabi&apos;s pipeline is smaller and more
            concentrated among a handful of master developers, largely government-linked.
          </li>
          <li>
            <strong className="text-ink">Liquidity.</strong> Dubai&apos;s secondary market, the ability to
            resell before or shortly after handover, is deeper and faster-moving. Abu Dhabi resale is thinner,
            which suits buy-and-hold investors better than those wanting flexibility to exit early.
          </li>
          <li>
            <strong className="text-ink">Yield profile.</strong> Abu Dhabi yields tend to run slightly lower
            than Dubai&apos;s upper range, reflecting a rental market more tied to stable government and
            semi-government employment rather than Dubai&apos;s broader, more transient tenant base.
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">The tax and Golden Visa position is the same UAE-wide</h2>
        <p className="mt-4 text-ink-muted">
          There is no personal income tax or capital gains tax on Abu Dhabi property investment, matching Dubai
          and the rest of the UAE. The AED 2 million Golden Visa investment threshold is a federal rule, so a
          qualifying Abu Dhabi purchase gives the same 10-year renewable residency outcome as a qualifying Dubai
          one, the tax and visa case for Abu Dhabi is identical to the case for Dubai; the difference is entirely
          in market depth and liquidity, covered above.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Who Abu Dhabi actually suits</h2>
        <p className="mt-4 text-ink-muted">
          Investors who want lower volatility over deal flow, are comfortable holding to handover and beyond
          rather than needing an early exit option, and value government-anchored development are generally
          better served by Abu Dhabi. Investors who want the widest choice of off-plan projects, the most active
          resale market, and the flexibility to exit early tend to be better served in Dubai. Most of our
          conversations start with a Dubai purchase and a second look at Abu Dhabi once that&apos;s underway,
          rather than the reverse, simply because that&apos;s where the deal flow and comparable data are
          strongest today.
        </p>
      </section>

      <p className="mt-12 text-ink-muted">
        Back to the{" "}
        <Link href="/insights" className="text-gold hover:underline">
          UAE Real Estate Investment Guide
        </Link>{" "}
        for the full market comparison, or see{" "}
        <Link href="/insights/ras-al-khaimah-real-estate-investment" className="text-gold hover:underline">
          Ras Al Khaimah real estate investment
        </Link>
        .
      </p>

      <FaqSection items={faqItems} />
      <GuideCallout />
    </main>
  );
}
