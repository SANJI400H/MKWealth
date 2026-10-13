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
            Dubai remains Morgan&apos;s primary day-to-day market for international investors. Off-plan and completed
            stock are both underwritten. The brief, capital and risk profile decide which structure fits. Liquidity and
            marketing volume are not substitutes for unit-level underwriting.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership context</h2>
          <p className="body-copy mt-4">
            Foreign buyers have been permitted freehold ownership in designated areas of the UAE since 2002. You typically
            do not need UAE residency to purchase. You do need clarity on funding, fees, and, if relevant, financing,
            alongside areas, market movements and potential risks.
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
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Off-plan and ready</h2>
        <p className="body-copy mt-4">
          There are pros and cons to both. Off-plan spreads cash and can suit investors who can wait. Ready stock suits
          people who want to live in the residence, take income now, or renovate. The right choice depends on the goal.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="card-lift border border-line bg-surface p-5">
            <h3 className="font-display text-xl font-bold text-ink">Off-plan</h3>
            <p className="mt-4 text-sm font-semibold text-ink">Pros</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Capital allocation is significantly lighter, and cash deployment is slower, spread over the payment plan.</li>
              <li>Greater leverage can be assumed, including developer payment plans.</li>
              <li>Typically bought under market value, so the appreciation curve is more aggressive.</li>
              <li>More accessible to international investors.</li>
              <li>Lets you generate funds significantly faster using the leverage the developer provides.</li>
              <li>Newest calibre asset in the UAE: specs, amenities, building quality.</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-ink">Watch points</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Delivery and construction risk.</li>
              <li>No rent until handover.</li>
              <li>Price discovery depends on the developer.</li>
            </ul>
          </article>
          <article className="card-lift border border-line bg-paper p-5">
            <h3 className="font-display text-xl font-bold text-ink">Ready (secondary)</h3>
            <p className="mt-4 text-sm font-semibold text-ink">Pros</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Useful if you want to live in the residence yourself or want an immediate return.</li>
              <li>Can be lucrative for assets you can renovate.</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-ink">Cons</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Much more aggressive capital deployment upfront.</li>
              <li>
                International investors get a maximum loan to value of around 60%, so including fees you are typically
                50%, sometimes 60%, down before you begin. This makes it inaccessible to many investors and slows your
                cash on cash return.
              </li>
              <li>Renovation opportunities need substantially more cash upfront.</li>
            </ul>
          </article>
        </div>
        <p className="body-copy mt-6">
          In many cases the delayed gratification of off-plan yields significantly better results in the future, but the
          right choice depends on the investor&apos;s goals.
        </p>
        <p className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:gap-6">
          <Link href="/calculators/mortgage-estimate" className="font-semibold text-maroon hover:underline">
            Mortgage calculator
          </Link>
          <Link href="/calculators/payment-plan" className="font-semibold text-maroon hover:underline">
            Off-plan payment calculator
          </Link>
        </p>
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
