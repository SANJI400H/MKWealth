"use client";

import Link from "next/link";
import EditorialTabs from "@/components/ui/EditorialTabs";
import PageIntro from "@/components/ui/PageIntro";
import { areaDetailNav } from "@/content/navigation";
import type { Area } from "@/content/areas";
import { siteConfig } from "@/lib/site-config";
import { regulatory } from "@/content/regulatory";

export default function AreaDetailTabs({ area }: { area: Area }) {
  return (
    <>
      <PageIntro title={area.name} lead={area.tagline}>
        {area.workingNote ? (
          <p className="mt-6 border border-dashed border-line bg-surface px-4 py-3 text-sm text-ink-muted">
            {area.workingNote}
          </p>
        ) : null}
      </PageIntro>

      <EditorialTabs
        items={areaDetailNav}
        layoutId={`area-tab-${area.slug}`}
        ariaLabel={`${area.name} topics`}
        cta={{ label: "Book Strategy Session", href: "/strategy-session" }}
        panels={{
          view: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Morgan&apos;s view</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.morganView}</p>
            </div>
          ),
          profile: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investor profile</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.investorProfile}</p>
            </div>
          ),
          price: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Price context</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.priceContext}</p>
            </div>
          ),
          rental: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Rental context</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.rentalContext}</p>
            </div>
          ),
          supply: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Supply</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.supply}</p>
            </div>
          ),
          infra: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Infrastructure</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.infrastructure}</p>
            </div>
          ),
          risks: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Risks</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
                {area.risks.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          ),
          exit: (
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Exit considerations</h2>
              <p className="mt-4 leading-relaxed text-ink-muted">{area.exitConsiderations}</p>
            </div>
          ),
        }}
      />

      <p className="mt-12 text-ink-muted">
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
      <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
    </>
  );
}
