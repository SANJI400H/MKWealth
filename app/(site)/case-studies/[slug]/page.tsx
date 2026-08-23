import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedCaseStudies().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.title} | Case Study`,
    description: study.objective ?? study.title,
    path: `/case-studies/${study.slug}`,
  });
}

export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudyBySlug(params.slug);
  if (!study) notFound();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: study.title, path: `/case-studies/${study.slug}` },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink">{study.title}</h1>
        <div className="mt-10 space-y-8 text-ink-muted">
          {study.investorProfile ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Investor profile</h2>
              <p className="mt-2">{study.investorProfile}</p>
            </section>
          ) : null}
          {study.objective ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Objective</h2>
              <p className="mt-2">{study.objective}</p>
            </section>
          ) : null}
          {study.challenge ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Challenge</h2>
              <p className="mt-2">{study.challenge}</p>
            </section>
          ) : null}
          {study.analysis ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Morgan&apos;s analysis</h2>
              <p className="mt-2">{study.analysis}</p>
            </section>
          ) : null}
          {study.decision ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Decision</h2>
              <p className="mt-2">{study.decision}</p>
            </section>
          ) : null}
          {study.outcome ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Outcome</h2>
              <p className="mt-2">{study.outcome}</p>
            </section>
          ) : null}
          {study.keyLesson ? (
            <section>
              <h2 className="font-display text-xl font-bold text-ink">Key lesson</h2>
              <p className="mt-2">{study.keyLesson}</p>
            </section>
          ) : null}
          {study.clientQuote ? (
            <blockquote className="border-l-2 border-gold pl-4 italic">{study.clientQuote}</blockquote>
          ) : null}
          {study.disclaimer ? <p className="text-xs">{study.disclaimer}</p> : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
