import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionNavigation from "@/components/ui/SectionNavigation";
import { dubaiSectionNav } from "@/content/navigation";
import { getPublishedInsights } from "@/content/insights";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Property Investment | Off-Plan & Secondary | Morgan Kaiser",
  description:
    "How Morgan Kaiser analyses Dubai property for international investors — off-plan and secondary market — with underwriting first, inventory second.",
  path: "/invest/dubai",
});

const faqItems = [
  {
    question: "How does buying property in Dubai work for foreigners?",
    answer:
      "Foreign nationals can buy freehold property in Dubai's designated areas. Off-plan purchases typically follow reservation → SPA → construction-linked payments → handover registration. Secondary purchases follow a different transfer process with clearer price discovery and, often, immediate rental potential. Exact steps depend on the asset and whether financing is used.",
  },
  {
    question: "What yield should I expect in Dubai?",
    answer: `${regulatory.yields.dubaiGrossIllustrative.value} ${regulatory.yields.dubaiGrossIllustrative.note}`,
  },
  {
    question: "Is Dubai property tax-free for me?",
    answer: regulatory.tax.uaeIndividualPropertyNote,
  },
  {
    question: "How much deposit do I need for off-plan?",
    answer:
      "Many developers require a booking deposit with the remainder staged to construction milestones, often described in marketing as structures such as 60/40 or 70/30. Exact terms vary by project and must be read in the SPA — compare the schedule to your liquidity, not only the headline price.",
  },
];

export default function DubaiInvestPage() {
  const latest = getPublishedInsights().slice(0, 3);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/invest" },
            { name: "Dubai", path: "/invest/dubai" },
          ]}
        />

        <SectionNavigation
          items={dubaiSectionNav}
          cta={{ label: siteConfig.cta.analyse, href: "/analyse" }}
        />

        <section id="overview" className="scroll-mt-28">
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">Dubai Property Investment</h1>
          <p className="mt-4 text-lg text-ink-muted">
            Dubai is Morgan&apos;s primary market. Off-plan and secondary are both analysed — neither is assumed better
            until the brief, capital, and risk profile say so.
          </p>
          <h2 className="mt-12 font-display text-2xl font-bold text-ink sm:text-3xl">Investment thesis (working)</h2>
          <p className="mt-4 text-ink-muted">
            {/* TODO: MORGAN_DISCOVERY — replace with verified thesis after interview */}
            Deepest liquidity and widest inventory in the UAE for many international buyers. Useful for investors who
            need optionality — but liquidity and marketing volume are not substitutes for unit-level underwriting.
          </p>
          <h2 className="mt-12 font-display text-2xl font-bold text-ink sm:text-3xl">Ownership context</h2>
          <p className="mt-4 text-ink-muted">
            Dubai has permitted foreign freehold ownership in designated areas for many years. You typically do not
            need UAE residency to purchase. You do need clarity on funding, fees, and (if relevant) financing.
          </p>
          <h2 className="mt-12 font-display text-2xl font-bold text-ink sm:text-3xl">Golden Visa</h2>
          <p className="mt-4 text-ink-muted">
            Commonly cited threshold: {regulatory.goldenVisa.headlineThresholdAed.value}.{" "}
            {regulatory.goldenVisa.headlineThresholdAed.note}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{regulatory.goldenVisa.offPlanNote}</p>
        </section>

        <section id="off-plan" className="scroll-mt-28 mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Off-plan</h2>
          <p className="mt-4 text-ink-muted">
            Construction-linked acquisitions. Capital is often staged; income is usually delayed until handover and
            lease-up. Price discovery follows developer lists and incentives; delivery timing is a real risk to model.
          </p>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-ink-muted">
            <li>Payment plans must match your liquidity — not only the headline price</li>
            <li>Financing, if used, must align with drawdown schedules</li>
            <li>Exit liquidity depends on project quality and cycle, not marketing volume</li>
          </ul>
        </section>

        <section id="secondary" className="scroll-mt-28 mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Secondary market</h2>
          <p className="mt-4 text-ink-muted">
            Completed and resale stock. Day-one capital is typically higher; rental income can start sooner; the asset
            is inspectable; price discovery comes from comps and negotiation.
          </p>
          <div className="mt-8 overflow-x-auto">
            <p className="mb-4 text-sm font-medium text-ink">Off-plan vs secondary — comparison dimensions</p>
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2 pr-3 text-ink">Factor</th>
                  <th className="py-2 pr-3 text-ink">Off-plan</th>
                  <th className="py-2 text-ink">Secondary</th>
                </tr>
              </thead>
              <tbody className="text-ink-muted">
                {[
                  ["Capital timing", "Often staged; lower day-one cash possible", "Higher day-one capital typical"],
                  ["Income", "Usually delayed until handover + lease-up", "Immediate rental possible"],
                  ["Price discovery", "Developer list + incentives", "Resale comps / negotiation"],
                  ["Delivery risk", "Construction / handover timing", "Physical asset inspectable"],
                  ["Financing", "Must match drawdown schedule", "Often clearer for lenders"],
                  ["Liquidity / exit", "Depends on project & cycle", "Deeper resale in many areas"],
                  ["Payment plans", "Core product feature", "Usually full or mortgage-led"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-line/70">
                    <td className="py-2 pr-3 font-medium text-ink">{row[0]}</td>
                    <td className="py-2 pr-3">{row[1]}</td>
                    <td className="py-2">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="costs-yield" className="scroll-mt-28 mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Costs & yield</h2>
          <p className="mt-4 text-ink-muted">{regulatory.yields.dubaiGrossIllustrative.value}</p>
          <p className="mt-2 text-sm text-ink-muted">{regulatory.yields.dubaiGrossIllustrative.note}</p>
          <p className="mt-4 text-ink-muted">
            Acquisition: {regulatory.dubaiAcquisition.dldTransferFeeTypical.value}.{" "}
            {regulatory.dubaiAcquisition.dldTransferFeeTypical.note}
          </p>
          <p className="mt-4">
            <Link href="/calculators/true-yield" className="font-semibold text-maroon hover:underline">
              Run the True Yield calculator
            </Link>{" "}
            or{" "}
            <Link href="/insights/gross-vs-net-yield-dubai-property" className="font-semibold text-maroon hover:underline">
              read gross vs net yield
            </Link>
            .
          </p>
        </section>

        <section id="latest-analysis" className="scroll-mt-28 mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Latest analysis</h2>
          <ul className="mt-6 space-y-5">
            {latest.map((article) => (
              <li key={article.slug}>
                <Link href={`/insights/${article.slug}`} className="group block">
                  <h3 className="font-display text-xl font-bold text-ink group-hover:text-maroon">{article.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/insights" className="font-semibold text-maroon hover:underline">
              All insights →
            </Link>
          </p>
        </section>

        <p className="mt-12 text-ink-muted">
          Compare with{" "}
          <Link href="/invest/abu-dhabi" className="font-semibold text-maroon hover:underline">
            Abu Dhabi
          </Link>{" "}
          and{" "}
          <Link href="/invest/rak" className="font-semibold text-maroon hover:underline">
            Ras Al Khaimah
          </Link>
          .
        </p>

        <FaqSection items={faqItems} />
        <GuideCallout />
        <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
