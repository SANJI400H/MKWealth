import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedReports } from "@/content/reports";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Market Reports | Morgan Kaiser",
  description: "Working market briefs for UAE property investors — provisional until Morgan-verified data is added.",
  path: "/reports",
});

export default function ReportsIndexPage() {
  const list = getPublishedReports();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Market Reports</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Working briefs for orientation. Marked provisional until period data and Morgan review land.
        </p>
        <ul className="mt-12 space-y-6">
          {list.map((r) => (
            <li key={r.slug} className="border-b border-line pb-6">
              <Link href={`/reports/${r.slug}`} className="group block">
                <p className="eyebrow">{r.period}</p>
                <h2 className="mt-2 font-display text-xl font-bold text-ink group-hover:text-gold sm:text-2xl">
                  {r.title}
                </h2>
                <p className="mt-2 text-ink-muted">{r.summary}</p>
                {r.provisional ? (
                  <p className="mt-2 text-xs uppercase tracking-wider text-ink-muted">Provisional</p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
