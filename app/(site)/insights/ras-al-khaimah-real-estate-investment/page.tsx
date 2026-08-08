import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "RAK Property Investment for Foreigners | Morgan Kaiser",
  description:
    "Ras Al Khaimah real estate investment compared to Dubai — lower entry prices, the Wynn resort effect, and the liquidity trade-offs foreign buyers should know.",
  path: "/insights/ras-al-khaimah-real-estate-investment",
});

const faqItems = [
  {
    question: "Can foreigners buy property in Ras Al Khaimah?",
    answer:
      "Yes. RAK permits full foreign freehold ownership in designated zones, most notably Al Marjan Island, Mina Al Arab, and Al Hamra Village. The purchase process is administered by the RAK Municipality and RAK Real Estate Regulatory Authority, following a freehold structure similar to Dubai's.",
  },
  {
    question: "Why is Ras Al Khaimah property investment getting more attention?",
    answer:
      "The main driver is Wynn Al Marjan Island, the region's first licensed casino resort, scheduled to open on Al Marjan Island. It has drawn developer and investor attention to RAK's coastline in a way that wasn't there five years ago, alongside RAK's broader push to grow tourism arrivals. That attention has not yet translated into Dubai-level market depth or liquidity.",
  },
  {
    question: "What is RAK property investment for foreigners like compared to Dubai?",
    answer:
      "Entry prices are meaningfully lower than Dubai for comparable unit types, which is the main draw. In exchange, the resale market is much thinner, the range of developers is smaller, and rental demand is less proven outside a handful of established communities. It suits investors comfortable holding to handover and beyond rather than needing early exit liquidity.",
  },
  {
    question: "Does Ras Al Khaimah real estate qualify for the Golden Visa?",
    answer:
      "Yes, the same federal AED 2 million investment threshold applies to qualifying RAK property as anywhere else in the UAE. The tax treatment — no personal income or capital gains tax — is also identical across all seven emirates.",
  },
];

export default function RakPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: "Ras Al Khaimah Real Estate Investment", path: "/insights/ras-al-khaimah-real-estate-investment" },
        ]}
      />

      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Ras Al Khaimah Real Estate Investment</h1>
      <p className="mt-4 text-lg text-ink-muted">
        Presented here as regional comparison, not a market Morgan has the same on-the-ground deal history in as
        Dubai. If RAK is on your radar because of a specific project, that&apos;s a conversation worth having —
        this page is the honest starting context for it.
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Why RAK is on more investors&apos; radar now</h2>
        <p className="mt-4 text-ink-muted">
          Ras Al Khaimah has spent the past several years building a tourism and hospitality base — most visibly
          through Wynn Al Marjan Island, the region&apos;s first licensed casino resort. That single project has
          pulled developer and investor attention toward RAK&apos;s coastline, particularly Al Marjan Island, in a
          way that simply wasn&apos;t happening a decade ago. It&apos;s a real catalyst, not marketing noise — but
          one project does not make a mature market, and that distinction matters for how you size a RAK
          allocation.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Ownership and freehold zones</h2>
        <p className="mt-4 text-ink-muted">
          Foreign nationals can buy freehold property in designated RAK investment zones, primarily Al Marjan
          Island, Mina Al Arab, and Al Hamra Village. The regulatory structure — administered through the RAK
          Real Estate Regulatory Authority — mirrors the freehold model used in Dubai and Abu Dhabi. No UAE
          residency is required to purchase.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">RAK property investment for foreigners: the honest trade-off</h2>
        <p className="mt-4 text-ink-muted">
          The appeal is straightforward: entry prices in RAK are meaningfully below comparable Dubai stock, which
          means a lower capital commitment for a similar unit size and finish quality. Gross rental yields quoted
          in the 6–8% range are common in developer marketing, though the tenant pool backing those numbers is
          far less established than Dubai&apos;s or even Abu Dhabi&apos;s.
        </p>
        <p className="mt-4 text-ink-muted">
          The trade-off is liquidity and market depth. RAK&apos;s resale market is thin — if you need to exit
          before or shortly after handover, expect a smaller buyer pool and less price discovery than Dubai
          offers. This makes RAK a better fit for patient, buy-and-hold capital than for investors who want the
          option to flip or exit early.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ink sm:text-3xl">Tax and Golden Visa: no different from Dubai</h2>
        <p className="mt-4 text-ink-muted">
          The federal tax-free structure and the AED 2 million Golden Visa investment threshold apply equally to
          RAK. Nothing about RAK&apos;s tax or residency treatment is worse — or better — than Dubai&apos;s;
          the entire comparison comes down to market maturity, liquidity, and how proven the rental demand is in
          your specific building or community.
        </p>
      </section>

      <p className="mt-12 text-ink-muted">
        Back to the{" "}
        <Link href="/insights" className="text-gold hover:underline">
          UAE Real Estate Investment Guide
        </Link>{" "}
        for the full market comparison, or see{" "}
        <Link href="/insights/abu-dhabi-real-estate-investment" className="text-gold hover:underline">
          Abu Dhabi real estate investment
        </Link>
        .
      </p>

      <FaqSection items={faqItems} />
      <GuideCallout />
    </main>
  );
}
