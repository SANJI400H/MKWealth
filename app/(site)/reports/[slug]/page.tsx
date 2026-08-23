import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedReports, getReportBySlug } from "@/content/reports";
import { pageMetadata } from "@/lib/metadata";
import { regulatory } from "@/content/regulatory";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedReports().map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = getReportBySlug(params.slug);
  if (!r) return {};
  return pageMetadata({
    title: `${r.title} | Morgan Kaiser`,
    description: r.summary,
    path: `/reports/${r.slug}`,
  });
}

export default function ReportPage({ params }: Props) {
  const r = getReportBySlug(params.slug);
  if (!r) notFound();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Reports", path: "/reports" },
            { name: r.title, path: `/reports/${r.slug}` },
          ]}
        />
        <p className="mt-6 eyebrow">{r.period}</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink sm:text-5xl">{r.title}</h1>
        {r.provisional ? (
          <p className="mt-4 rounded-sm border border-dashed border-line px-4 py-3 text-sm text-ink-muted">
            Provisional working brief — not a forecast. Enrich with sourced period data after Morgan review.
          </p>
        ) : null}
        <p className="mt-6 text-lg text-ink-muted">{r.summary}</p>

        <div className="mt-10 space-y-8">
          {r.blocks.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2 key={i} className="font-display text-2xl font-bold text-ink">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="list-disc space-y-2 pl-5 text-ink-muted">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-ink-muted leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-xl font-bold text-ink">Sources</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-muted">
            {r.sources.map((s) => (
              <li key={s.label}>
                {s.label}
                {s.note ? ` — ${s.note}` : null}
              </li>
            ))}
          </ul>
        </section>

        {r.relatedHref ? (
          <p className="mt-8">
            <Link href={r.relatedHref} className="font-semibold text-gold hover:underline">
              Related market page →
            </Link>
          </p>
        ) : null}

        <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
