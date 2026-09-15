"use client";

import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { areaDetailNav } from "@/content/navigation";
import type { Area } from "@/content/areas";
import { siteConfig } from "@/lib/site-config";
import { regulatory } from "@/content/regulatory";

export default function AreaDetailTabs({ area }: { area: Area }) {
  return (
    <>
      <PageIntro title={area.name} lead={area.tagline}>
        {area.workingNote ? (
          <p className="mt-6 border border-line bg-surface px-4 py-3 text-sm text-ink-muted">{area.workingNote}</p>
        ) : null}
      </PageIntro>

      <StickySectionNav
        items={areaDetailNav}
        layoutId={`area-section-${area.slug}`}
        ariaLabel={`${area.name} topics`}
        className="mt-8"
      />

      <section id="view" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Morgan&apos;s view</h2>
        <p className="body-copy mt-4">{area.morganView}</p>
      </section>

      <section id="profile" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investor profile</h2>
        <p className="body-copy mt-4">{area.investorProfile}</p>
      </section>

      <section id="price" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Price context</h2>
        <p className="body-copy mt-4">{area.priceContext}</p>
      </section>

      <section id="rental" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Rental context</h2>
        <p className="body-copy mt-4">{area.rentalContext}</p>
      </section>

      <section id="supply" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Supply</h2>
        <p className="body-copy mt-4">{area.supply}</p>
      </section>

      <section id="infra" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Infrastructure</h2>
        <p className="body-copy mt-4">{area.infrastructure}</p>
      </section>

      <section id="risks" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Risks</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
          {area.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section id="exit" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Exit considerations</h2>
        <p className="body-copy mt-4">{area.exitConsiderations}</p>
      </section>

      <p className="body-copy mt-12">
        Market pillar:{" "}
        <Link href={area.relatedMarketHref} className="font-semibold text-maroon hover:underline">
          Open market page
        </Link>
        {area.relatedInsightSlugs?.length ? (
          <>
            {" · "}
            {area.relatedInsightSlugs.map((slug, i) => (
              <span key={slug}>
                {i > 0 ? " · " : null}
                <Link href={`/insights/${slug}`} className="font-semibold text-maroon hover:underline">
                  Related insight
                </Link>
              </span>
            ))}
          </>
        ) : null}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
          {siteConfig.cta.strategySession}
        </Link>
        <Link href="/areas" className="btn-ghost-dark w-full justify-center sm:w-auto">
          All areas
        </Link>
      </div>
      <p className="body-copy-sm mt-10">{regulatory.disclaimerShort}</p>
    </>
  );
}
