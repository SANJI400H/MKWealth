import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionNavigation from "@/components/ui/SectionNavigation";
import { getAreaBySlug, getPublishedAreas } from "@/content/areas";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { regulatory } from "@/content/regulatory";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedAreas().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const area = getAreaBySlug(params.slug);
  if (!area) return {};
  return pageMetadata({
    title: `${area.name} Property Investment | Morgan Kaiser`,
    description: area.tagline,
    path: `/areas/${area.slug}`,
  });
}

const sectionNav = [
  { id: "view", label: "Morgan's view" },
  { id: "profile", label: "Investor profile" },
  { id: "price", label: "Price" },
  { id: "rental", label: "Rental" },
  { id: "supply", label: "Supply" },
  { id: "infra", label: "Infrastructure" },
  { id: "risks", label: "Risks" },
  { id: "exit", label: "Exit" },
];

export default function AreaPage({ params }: Props) {
  const area = getAreaBySlug(params.slug);
  if (!area) notFound();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Areas", path: "/areas" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]}
        />
        <SectionNavigation items={sectionNav} cta={{ label: siteConfig.cta.analyse, href: "/analyse" }} />

        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{area.name}</h1>
        <p className="mt-4 text-lg text-ink-muted">{area.tagline}</p>
        {area.workingNote ? (
          <p className="mt-6 rounded-sm border border-dashed border-line bg-ink/[0.02] px-4 py-3 text-sm text-ink-muted">
            {area.workingNote}
          </p>
        ) : null}

        <section id="view" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Morgan&apos;s view</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.morganView}</p>
        </section>
        <section id="profile" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Investor profile</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.investorProfile}</p>
        </section>
        <section id="price" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Price context</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.priceContext}</p>
        </section>
        <section id="rental" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Rental context</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.rentalContext}</p>
        </section>
        <section id="supply" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Supply</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.supply}</p>
        </section>
        <section id="infra" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Infrastructure</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.infrastructure}</p>
        </section>
        <section id="risks" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Risks</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
            {area.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
        <section id="exit" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Exit considerations</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{area.exitConsiderations}</p>
        </section>

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
          <Link href="/analyse" className="btn-primary w-full justify-center sm:w-auto">
            {siteConfig.cta.analyse}
          </Link>
          <Link href="/areas" className="btn-ghost-dark w-full justify-center sm:w-auto">
            All areas
          </Link>
        </div>
        <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
