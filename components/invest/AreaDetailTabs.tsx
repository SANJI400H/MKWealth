"use client";

import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { areaDetailNav } from "@/content/navigation";
import type { Area } from "@/content/areas";
import { getPublishedAreas } from "@/content/areas";
import { siteConfig } from "@/lib/site-config";
import { areaImages } from "@/content/editorial-images";
import { regulatory } from "@/content/regulatory";

function Metric({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="border border-silver bg-surface px-4 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-lg font-bold text-ink">{value || "Data coming soon"}</p>
    </div>
  );
}

export default function AreaDetailTabs({ area }: { area: Area }) {
  const related = getPublishedAreas()
    .filter((item) => item.market === area.market && item.slug !== area.slug)
    .slice(0, 3);
  const photo = area.image || areaImages[area.slug]?.src || "";
  const photoAlt = area.imageAlt || areaImages[area.slug]?.alt || area.name;

  return (
    <>
      {photo ? (
        <div className="relative mb-8 aspect-[16/7] overflow-hidden bg-surface">
          <img src={photo} alt={photoAlt} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="mb-8 flex aspect-[16/7] items-end justify-between border border-silver bg-ink px-6 py-5">
          <p className="font-display text-2xl font-bold text-white">{area.name}</p>
          <p className="text-xs uppercase tracking-[0.14em] text-white/70">Photograph coming soon</p>
        </div>
      )}
      <PageIntro title={area.name} lead={area.tagline}>
        {area.workingNote ? (
          <p className="mt-6 border border-line bg-surface px-4 py-3 text-sm text-ink-muted">{area.workingNote}</p>
        ) : null}
      </PageIntro>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Average price per sq ft" value={area.pricePerSqft} />
        <Metric label="Typical gross yield" value={area.yieldRange} />
        <Metric label="Typical price band" value={area.priceBand} />
        <Metric label="Supply pipeline" value={area.supplyPipeline} />
        <Metric label="Handover window" value={area.handoverWindow} />
        <Metric label="Who it suits" value={area.suits?.join(", ")} />
      </div>

      {area.strengths?.length ? (
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {area.strengths.map((item) => (
            <li key={item} className="border border-silver bg-paper px-4 py-3 text-sm text-ink">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <figure className="mt-8 border border-silver bg-surface px-4 py-6">
        <svg viewBox="0 0 320 80" className="h-20 w-full" role="img" aria-label="Price and yield chart placeholder">
          <title>Price and yield series</title>
          <desc>No verified series is stored for this area yet.</desc>
          <line x1="8" y1="64" x2="312" y2="64" stroke="#C4C7CB" />
          <text x="16" y="36" fill="#111111" fontSize="14">
            Data coming soon
          </text>
        </svg>
        <figcaption className="mt-2 text-xs text-ink-muted">
          A price or yield chart will draw here when a verified series is added. Nothing is estimated.
        </figcaption>
      </figure>

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

      {related.length ? (
        <section className="page-block">
          <h2 className="font-display text-2xl font-bold text-ink">Related areas</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/areas/${item.slug}`} className="card-lift block border border-silver px-4 py-4 text-sm font-semibold text-ink hover:text-maroon">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

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
