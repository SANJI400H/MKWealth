import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import SiteFooter from "@/components/sections/SiteFooter";
import {
  getInsightBySlug,
  getPublishedInsights,
  getRelatedInsights,
  insightCategories,
  type InsightBlock,
} from "@/content/insights";
import { regulatory } from "@/content/regulatory";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getPublishedInsights().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getInsightBySlug(params.slug);
  if (!article) return {};
  return pageMetadata({
    title: `${article.title} | Morgan Kaiser`,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  });
}

function Block({ block }: { block: InsightBlock }) {
  if (block.type === "heading") {
    return <h2 className="mt-12 font-display text-2xl font-bold text-ink sm:text-3xl">{block.text}</h2>;
  }
  if (block.type === "paragraph") {
    return <p className="mt-4 text-ink-muted leading-relaxed">{block.text}</p>;
  }
  if (block.type === "list") {
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className="mt-6 overflow-x-auto">
      {block.caption ? <p className="mb-2 text-sm text-ink-muted">{block.caption}</p> : null}
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {block.headers.map((h) => (
              <th key={h} className="py-2 pr-4 font-semibold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i} className="border-b border-line/70">
              {row.map((cell, j) => (
                <td key={j} className="py-2 pr-4 text-ink-muted">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InsightArticlePage({ params }: Props) {
  const article = getInsightBySlug(params.slug);
  if (!article) notFound();

  const category = insightCategories.find((c) => c.id === article.category);
  const related = getRelatedInsights(article);

  return (
    <>
      <JsonLd data={articleSchema(article)} />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path: `/insights/${article.slug}` },
          ]}
        />

        <p className="eyebrow mt-6">{category?.label}</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">{article.title}</h1>
        <p className="mt-3 text-sm text-ink-muted">
          By {article.author} · Published {article.publishedAt}
          {article.reviewedAt !== article.publishedAt ? ` · Reviewed ${article.reviewedAt}` : ""}
        </p>

        <section className="mt-10 rounded-sm border border-line bg-ink/[0.02] p-5 sm:p-6">
          <p className="eyebrow">Executive takeaway</p>
          <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">{article.keyTakeaway}</p>
        </section>

        {article.keyNumbers?.length ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold text-ink">Key numbers</h2>
            <dl className="mt-4 space-y-3">
              {article.keyNumbers.map((n) => (
                <div key={n.label} className="flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:justify-between">
                  <dt className="font-medium text-ink">{n.label}</dt>
                  <dd className="text-ink-muted sm:text-right">{n.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <section className="mt-4">
          <p className="eyebrow mt-8">Morgan&apos;s analysis</p>
          {article.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>

        {article.risks?.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">Risks & limitations</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
              {article.risks.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Conclusion</h2>
          <p className="mt-4 text-ink-muted leading-relaxed">{article.conclusion}</p>
        </section>

        {article.sources?.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">Sources</h2>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              {article.sources.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} className="text-maroon hover:underline" target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                  {s.note ? ` — ${s.note}` : ""}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold text-ink">Related analysis</h2>
            <ul className="mt-4 space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/insights/${r.slug}`} className="font-medium text-maroon hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:flex-wrap">
          {article.relatedCalculatorSlug ? (
            <Link href={`/calculators/${article.relatedCalculatorSlug}`} className="btn-primary w-full sm:w-auto">
              Open calculator
            </Link>
          ) : null}
          <Link href="/analyse" className="btn-ghost-dark w-full justify-center sm:w-auto">
            {siteConfig.cta.analyse}
          </Link>
          <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
            {siteConfig.cta.strategySession}
          </Link>
        </section>

        {article.showDisclaimer ? (
          <p className="mt-10 text-xs leading-relaxed text-ink-muted">{regulatory.disclaimerShort}</p>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
