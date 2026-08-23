import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Abu Dhabi Real Estate Investment vs. Dubai | Morgan Kaiser",
  description:
    "How Abu Dhabi off-plan real estate investment compares to Dubai for foreign buyers, ownership rules, yields, liquidity, and who each market actually suits.",
  path: "/invest/abu-dhabi",
});

const faqItems = [
  {
    question: "Can foreigners buy real estate in Abu Dhabi?",
    answer:
      "Yes. Foreign nationals can own freehold property in Abu Dhabi's designated investment zones, including Saadiyat Island, Yas Island, Al Reem Island, and Al Maryah Island.",
  },
  {
    question: "Is Abu Dhabi real estate a better investment than Dubai?",
    answer:
      "They suit different investors. Abu Dhabi tends toward steadier, lower-volatility pricing. Dubai has deeper off-plan inventory and more resale liquidity. Stability vs deal flow is the real trade-off.",
  },
  {
    question: "What are typical rental yields in Abu Dhabi?",
    answer:
      "Gross rental yields in Abu Dhabi's investment zones are often discussed in a somewhat narrower illustrative band than Dubai's wider marketing range. Treat any citywide figure as a starting filter only — underwrite the specific asset. See the regulatory notes on this site for dated, qualified framing.",
  },
  {
    question: "Does Abu Dhabi property qualify for the UAE Golden Visa?",
    answer:
      "Property investment at or above the commonly cited federal threshold may qualify, subject to current authority rules. Confirm requirements at the time of application — this site does not treat visa eligibility as guaranteed.",
  },
];

export default function AbuDhabiInvestPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/#invest" },
            { name: "Abu Dhabi", path: "/invest/abu-dhabi" },
          ]}
        />

        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Abu Dhabi Real Estate Investment
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Covered as regional context against Dubai, useful for comparison, not presented as equal day-to-day
          deal flow.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Who Abu Dhabi suits</h2>
          <p className="mt-4 text-ink-muted">
            Investors prioritizing government-anchored, lower-volatility assets and a longer hold. The secondary
            market is thinner than Dubai&apos;s, which cuts both speculation and easy early exits.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership & areas</h2>
          <p className="mt-4 text-ink-muted">
            Freehold for foreigners in designated zones including Saadiyat, Yas, Al Reem, and Al Maryah. The
            eligible list is shorter than Dubai&apos;s, and inventory is more institutionally paced.
          </p>
        </section>

        <p className="mt-12 text-ink-muted">
          See also{" "}
          <Link href="/invest/dubai" className="font-semibold text-gold hover:underline">
            Dubai
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
