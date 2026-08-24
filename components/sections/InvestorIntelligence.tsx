import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import EditorialImagePlaceholder from "@/components/ui/EditorialImagePlaceholder";
import CalculatorPreviewCard from "@/components/ui/CalculatorPreviewCard";
import VideoThumbnailCard from "@/components/ui/VideoThumbnailCard";
import { getPublishedInsights } from "@/content/insights";
import { calculators } from "@/content/calculators";
import { getPublishedIntelligenceVideos } from "@/content/intelligence-videos";
import { siteConfig } from "@/lib/site-config";

type RailCard = {
  key: string;
  kind: "analysis" | "calculator" | "video" | "data";
  node: ReactNode;
};

/** Post-cinema intelligence — featured editorial + carousel of real published items only. */
export default function InvestorIntelligence() {
  const insights = getPublishedInsights();
  const featured = insights[0];
  const restInsights = insights.slice(1);
  const liveCalculators = calculators.filter((c) => c.status === "live");
  const videos = getPublishedIntelligenceVideos().slice(0, 2);

  const rail: RailCard[] = [];

  for (const article of restInsights) {
    rail.push({
      key: article.slug,
      kind: "analysis",
      node: (
        <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col border border-silver bg-paper">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            {article.heroImage ? (
              <Image
                src={article.heroImage}
                alt=""
                fill
                sizes="(min-width: 1024px) 34rem, 88vw"
                className="object-cover transition duration-700 group-hover:scale-[1.025]"
              />
            ) : (
              <EditorialImagePlaceholder assetId="intelligence-yield" categoryLabel="Analysis" ratio="16:10" />
            )}
          </div>
          <div className="card-pad flex flex-1 flex-col space-y-3">
            <p className="eyebrow">Analysis</p>
            <h3 className="card-title transition group-hover:text-maroon">{article.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{article.excerpt}</p>
            <span className="text-link mt-auto pt-2">Read Analysis →</span>
          </div>
        </Link>
      ),
    });
  }

  for (const calc of liveCalculators) {
    if (calc.slug === "true-yield") {
      rail.push({
        key: calc.slug,
        kind: "calculator",
        node: <CalculatorPreviewCard title={calc.title} href={calc.href} />,
      });
    } else {
      rail.push({
        key: calc.slug,
        kind: "calculator",
        node: (
          <Link href={calc.href} className="group flex h-full flex-col border border-silver bg-paper">
            <div className="relative aspect-[16/10] overflow-hidden">
              <EditorialImagePlaceholder assetId="intelligence-yield" categoryLabel="Calculator" ratio="16:10" />
            </div>
            <div className="card-pad flex flex-1 flex-col space-y-3">
              <p className="eyebrow">Calculator</p>
              <h3 className="card-title transition group-hover:text-maroon">{calc.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-ink-muted">{calc.summary}</p>
              <span className="text-link mt-auto pt-2">Open Calculator →</span>
            </div>
          </Link>
        ),
      });
    }
  }

  rail.push({
    key: "real-numbers",
    kind: "data",
    node: (
      <Link href="/the-real-numbers" className="group flex h-full flex-col border border-silver bg-paper">
        <EditorialImagePlaceholder assetId="intelligence-market-data" categoryLabel="Data" ratio="16:10" />
        <div className="card-pad flex flex-1 flex-col space-y-3">
          <p className="eyebrow">Data</p>
          <h3 className="card-title transition group-hover:text-maroon">The Real Numbers</h3>
          <p className="text-sm leading-relaxed text-ink-muted">
            Sourced, dated figures used on this site — with caveats attached.
          </p>
          <span className="text-link mt-auto pt-2">View Briefing →</span>
        </div>
      </Link>
    ),
  });

  for (const video of videos) {
    rail.push({
      key: video.slug,
      kind: "video",
      node: (
        <VideoThumbnailCard
          href="/videos"
          title={video.title}
          description={video.description}
          category="Video"
          duration={video.durationHint}
        />
      ),
    });
  }

  return (
    <section id="intelligence" className="section-pad bg-paper" aria-label="Investor Intelligence">
      <div className="section-inner">
        <RevealOnScroll>
          <p className="eyebrow">Investor Intelligence</p>
          <h2 className="section-title">
            Numbers that
            <br />
            survive underwriting.
          </h2>
          <p className="section-lead">
            Analysis, tools, and market context — the public knowledge layer behind Morgan&apos;s work.
          </p>
        </RevealOnScroll>

        {featured ? (
          <RevealOnScroll className="section-body">
            <Link
              href={`/insights/${featured.slug}`}
              className="group grid overflow-hidden border border-silver bg-paper lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] bg-surface lg:aspect-auto lg:min-h-[22rem]">
                {featured.heroImage ? (
                  <Image
                    src={featured.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    priority={false}
                  />
                ) : (
                  <EditorialImagePlaceholder assetId="intelligence-yield" categoryLabel="Latest analysis" ratio="16:10" />
                )}
              </div>
              <div className="flex flex-col justify-center space-y-4 p-8 sm:p-10 lg:p-12">
                <p className="eyebrow">Latest analysis</p>
                <h3 className="font-display text-3xl font-bold tracking-tight text-ink transition group-hover:text-maroon sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="max-w-md text-base leading-relaxed text-ink-muted sm:text-lg">{featured.excerpt}</p>
                <span className="pt-2 text-sm font-semibold text-maroon transition group-hover:translate-x-1">
                  Read Analysis →
                </span>
              </div>
            </Link>
          </RevealOnScroll>
        ) : null}

        {rail.length > 0 ? (
          <div className="section-body">
            <RevealOnScroll>
              <p className="eyebrow">Explore further</p>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Tools and intelligence.
              </h3>
            </RevealOnScroll>
            <div className="mt-8">
              {rail.length <= 2 ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {rail.map((item) => (
                    <div key={item.key}>{item.node}</div>
                  ))}
                </div>
              ) : (
                <EditorialCarousel
                  ariaLabel="Investor intelligence collection"
                  previousLabel="Previous intelligence item"
                  nextLabel="Next intelligence item"
                >
                  {rail.map((item) => (
                    <div key={item.key} className="h-full">
                      {item.node}
                    </div>
                  ))}
                </EditorialCarousel>
              )}
            </div>
          </div>
        ) : null}

        <RevealOnScroll className="section-body">
          <div className="bg-maroon-dark px-8 py-12 text-white sm:px-12 sm:py-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-silver">True Yield</p>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Advertised yield is not investor return.
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
              Run the numbers with transparent cost assumptions — then decide whether the deal survives.
            </p>
            <Link
              href="/calculators/true-yield"
              className="mt-8 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              Open True Yield Calculator →
            </Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-8">
          <Link href="/insights" className="btn-ghost-dark">
            {siteConfig.cta.insights} →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
