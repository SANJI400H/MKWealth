"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import DeveloperCarousel from "@/components/invest/DeveloperCarousel";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { dubaiSectionNav } from "@/content/navigation";
import { regulatory } from "@/content/regulatory";

type InsightTeaser = {
  slug: string;
  title: string;
  excerpt: string;
};

/** Dubai invest page — sticky scroll sections (same pattern as About). */
export default function DubaiInvestTabs({ latest }: { latest: InsightTeaser[] }) {
  return (
    <>
      <StickySectionNav
        items={dubaiSectionNav}
        layoutId="dubai-section-pill"
        ariaLabel="Dubai topics"
        className="mt-8"
      />

      <section id="overview" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10 space-y-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investment thesis</h2>
          <p className="body-copy mt-4">
            Dubai remains Morgan&apos;s primary day-to-day market for international investors. Current acquisition work
            is focused on off-plan, still only when the brief, capital and risk profile fit. Liquidity and marketing
            volume are not substitutes for unit-level underwriting.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership context</h2>
          <p className="body-copy mt-4">
            Dubai has permitted foreign freehold ownership in designated areas for many years. You typically do not need
            UAE residency to purchase. You do need clarity on funding, fees, and (if relevant) financing.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Golden Visa</h2>
          <p className="body-copy mt-4">
            Commonly cited threshold: {regulatory.goldenVisa.headlineThresholdAed.value}.{" "}
            {regulatory.goldenVisa.headlineThresholdAed.note}
          </p>
          <p className="body-copy-sm mt-2">{regulatory.goldenVisa.offPlanNote}</p>
        </div>
      </section>

      <section id="off-plan" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Off-plan</h2>
        <p className="body-copy mt-4">
          Construction-linked acquisitions. Capital is often staged; income is usually delayed until handover and
          lease-up. Price discovery follows developer lists and incentives; delivery timing is a real risk to model.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-ink-muted">
          <li>Payment plans must match your liquidity, not only the headline price</li>
          <li>Financing, if used, must align with drawdown schedules</li>
          <li>Exit liquidity depends on project quality and cycle, not marketing volume</li>
        </ul>
      </section>

      <section id="secondary" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Secondary market</h2>
        <p className="body-copy mt-4">
          Completed and resale stock. Day-one capital is typically higher; rental income can start sooner; the asset is
          inspectable; price discovery comes from comps and negotiation.
        </p>
        <div className="mt-8 overflow-x-auto">
          <p className="mb-4 text-sm font-medium text-ink">Off-plan vs secondary, comparison dimensions</p>
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

      <section id="costs-yield" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Costs & yield</h2>
        <p className="body-copy mt-4">{regulatory.yields.dubaiGrossIllustrative.value}</p>
        <p className="body-copy-sm mt-2">{regulatory.yields.dubaiGrossIllustrative.note}</p>
        <p className="body-copy mt-4">
          Acquisition: {regulatory.dubaiAcquisition.dldTransferFeeTypical.value}.{" "}
          {regulatory.dubaiAcquisition.dldTransferFeeTypical.note}
        </p>
        <p className="mt-4">
          <Link href="/calculators/true-yield" className="font-semibold text-maroon hover:underline">
            Run the True Yield calculator
          </Link>{" "}
          or{" "}
          <Link
            href="/insights/gross-vs-net-yield-dubai-property"
            className="font-semibold text-maroon hover:underline"
          >
            read gross vs net yield
          </Link>
          .
        </p>
      </section>

      <section id="areas" className="page-block">
        <AreaCarousel market="dubai" />
      </section>

      <section id="developers" className="page-block">
        <DeveloperCarousel market="dubai" />
      </section>

      <section id="latest-analysis" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Latest analysis</h2>
        <ul className="mt-6 space-y-5">
          {latest.map((article) => (
            <li key={article.slug}>
              <Link href={`/insights/${article.slug}`} className="group block">
                <h3 className="font-display text-xl font-bold text-ink group-hover:text-maroon">{article.title}</h3>
                <p className="body-copy-sm mt-1">{article.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/strategy-session" className="font-semibold text-maroon hover:underline">
            Book a strategy session →
          </Link>
        </p>
      </section>
    </>
  );
}
