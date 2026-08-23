import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import {
  insightCategories,
  getPublishedInsights,
  getInsightsByCategory,
  type InsightCategoryId,
} from "@/content/insights";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Investment Insights | Morgan Kaiser",
  description:
    "Educational analysis on UAE property investment mathematics, markets, deal underwriting, and portfolio strategy by Morgan Kaiser.",
  path: "/insights",
});

function isCategoryId(value: string | undefined): value is InsightCategoryId {
  return Boolean(value && insightCategories.some((c) => c.id === value));
}

export default function InsightsHubPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryParam = searchParams.category;
  const activeCategory = isCategoryId(categoryParam) ? categoryParam : null;
  const articles = activeCategory ? getInsightsByCategory(activeCategory) : getPublishedInsights();
  const activeLabel = activeCategory
    ? insightCategories.find((c) => c.id === activeCategory)?.label
    : null;

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }]} />

        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Investment Insights</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Public knowledge from {siteConfig.name}: how to read yields, payment plans, markets, and risk — before
          you decide what to buy.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink">Categories</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            <li>
              <Link
                href="/insights"
                className={`inline-block border px-3 py-1.5 text-sm transition ${
                  !activeCategory
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                All
              </Link>
            </li>
            {insightCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/insights?category=${cat.id}`}
                  className={`inline-block border px-3 py-1.5 text-sm transition ${
                    activeCategory === cat.id
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
          {activeCategory ? (
            <p className="mt-4 text-sm text-ink-muted">
              {insightCategories.find((c) => c.id === activeCategory)?.description}
            </p>
          ) : null}
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">
            {activeLabel ? activeLabel : "Latest analysis"}
          </h2>
          {articles.length === 0 ? (
            <p className="mt-6 text-ink-muted">
              No published articles in this category yet.{" "}
              <Link href="/insights" className="font-semibold text-gold hover:underline">
                View all insights
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-6 space-y-6">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link href={`/insights/${article.slug}`} className="group block">
                    <p className="eyebrow">
                      {insightCategories.find((c) => c.id === article.category)?.label}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-gold sm:text-2xl">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{article.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-14 text-sm text-ink-muted">
          Prefer tools? Try the{" "}
          <Link href="/calculators/true-yield" className="font-semibold text-gold hover:underline">
            True Yield calculator
          </Link>{" "}
          or{" "}
          <Link href="/analyse" className="font-semibold text-gold hover:underline">
            ask Morgan to analyse an investment
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
