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
            Off-plan and completed stock are both checked. The brief, capital and risk profile decide which
            structure fits. Priority sectors are sea-facing homes, villas, commercial assets and luxury branded
            residences. Liquidity and marketing volume do not decide the unit.
          </p>
        </div>
      </section>

      <section id="compare" className="page-block">
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
              <li>
                Lighter, staged capital, with greater leverage through the developer payment plan, so cash goes out
                over time rather than on day one.
              </li>
              <li>Typically bought under market value, so the appreciation curve is steeper.</li>
              <li>More accessible to international investors.</li>
              <li>Newest calibre asset in the UAE: specs, amenities and building quality.</li>
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
              <li>Useful if you want to live in the residence or want an immediate return.</li>
              <li>Can be lucrative for assets you can renovate.</li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-ink">Cons</p>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              <li>Much heavier capital deployment up front.</li>
              <li>
                Banks typically lend international buyers up to 60% of the value (50% on properties over AED 20m),
                so plan for at least a 40% deposit, plus purchase costs on top.
              </li>
              <li>
                You are usually buying at current market value, so be prepared for volatility. Dubai is a younger,
                smaller market than London or New York.
              </li>
              <li>Renovation opportunities need substantially more cash up front.</li>
            </ul>
          </article>
        </div>
        <p className="body-copy mt-6">
          In many cases the delayed gratification of off-plan yields significantly better results in the future, but the
          right choice depends on the investor&apos;s goals.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
            Book a strategy session
          </Link>
          <Link href="/tools" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Tools
          </Link>
        </div>
      </section>

      <section id="costs-yield" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Costs & yield</h2>
        <p className="body-copy mt-4">{regulatory.yields.dubaiGrossIllustrative.value}</p>
        <p className="body-copy-sm mt-2">{regulatory.yields.dubaiGrossIllustrative.note}</p>
        <p className="body-copy mt-4">
          Off-plan, bought direct from the developer: 4% DLD fee plus about AED 5,250 in admin fees. Resale: 4% DLD
          fee, 2% agency fee plus VAT, plus trustee and title-deed fees.
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
      </section>
    </>
  );
}
