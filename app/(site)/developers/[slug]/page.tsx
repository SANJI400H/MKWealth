import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionNavigation from "@/components/ui/SectionNavigation";
import { getDeveloperBySlug, getPublishedDevelopers } from "@/content/developers";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { regulatory } from "@/content/regulatory";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedDevelopers().map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const d = getDeveloperBySlug(params.slug);
  if (!d) return {};
  return pageMetadata({
    title: `${d.name} | Developer Analysis Framework | Morgan Kaiser`,
    description: d.tagline,
    path: `/developers/${d.slug}`,
  });
}

const sectionNav = [
  { id: "overview", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "track-record", label: "Track record" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment plans" },
  { id: "suitability", label: "Suitability" },
  { id: "risks", label: "Risks" },
];

export default function DeveloperPage({ params }: Props) {
  const d = getDeveloperBySlug(params.slug);
  if (!d) notFound();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Developers", path: "/developers" },
            { name: d.name, path: `/developers/${d.slug}` },
          ]}
        />
        <SectionNavigation items={sectionNav} cta={{ label: siteConfig.cta.analyse, href: "/analyse" }} />

        <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">{d.name}</h1>
        <p className="mt-4 text-lg text-ink-muted">{d.tagline}</p>
        {d.workingNote ? (
          <p className="mt-6 rounded-sm border border-dashed border-line bg-ink/[0.02] px-4 py-3 text-sm text-ink-muted">
            {d.workingNote}
          </p>
        ) : null}

        <section id="overview" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{d.overview}</p>
        </section>
        <section id="experience" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Morgan&apos;s experience</h2>
          <p className="mt-4 rounded-sm border border-dashed border-line px-4 py-3 text-sm text-ink-muted">
            {d.morganExperience}
          </p>
        </section>
        <section id="track-record" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Track record</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{d.trackRecord}</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
            {d.projects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>
        <section id="delivery" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Delivery considerations</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{d.deliveryNotes}</p>
        </section>
        <section id="payment" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Payment-plan analysis</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{d.paymentPlanNotes}</p>
          <p className="mt-4">
            <Link href="/calculators/payment-plan" className="font-semibold text-maroon hover:underline">
              Open payment plan calculator →
            </Link>
          </p>
        </section>
        <section id="suitability" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Investor suitability</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{d.suitability}</p>
        </section>
        <section id="risks" className="scroll-mt-28 mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Risks</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
            {d.risks.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>

        {d.relatedInsightSlugs?.length ? (
          <p className="mt-12 text-ink-muted">
            Related:{" "}
            {d.relatedInsightSlugs.map((slug, i) => (
              <span key={slug}>
                {i > 0 ? " · " : null}
                <Link href={`/insights/${slug}`} className="font-semibold text-maroon hover:underline">
                  {slug.replace(/-/g, " ")}
                </Link>
              </span>
            ))}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/analyse" className="btn-primary w-full justify-center sm:w-auto">
            {siteConfig.cta.analyse}
          </Link>
          <Link href="/developers" className="btn-ghost-dark w-full justify-center sm:w-auto">
            All developers
          </Link>
        </div>
        <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
