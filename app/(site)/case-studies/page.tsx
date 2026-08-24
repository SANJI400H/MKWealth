import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedCaseStudies } from "@/content/case-studies";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies | Morgan Kaiser",
  description: "Verified client case studies from Morgan Kaiser — published only when genuine and approved.",
  path: "/case-studies",
});

export default function CaseStudiesIndexPage() {
  const published = getPublishedCaseStudies();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Case studies</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Detailed underwriting stories will live here. None are published until they are real, permissioned, and
          reviewed.
        </p>

        {published.length === 0 ? (
          <div className="mt-10 rounded-sm border border-dashed border-line p-6 text-ink-muted">
            <p>No published case studies yet.</p>
            <p className="mt-3 text-sm">
              Meanwhile, explore{" "}
              <Link href="/insights" className="text-maroon hover:underline">
                insights
              </Link>
              , the{" "}
              <Link href="/calculators/true-yield" className="text-maroon hover:underline">
                True Yield calculator
              </Link>
              , or{" "}
              <Link href="/analyse" className="text-maroon hover:underline">
                {siteConfig.cta.analyse.toLowerCase()}
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="mt-10 space-y-6">
            {published.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="font-display text-xl font-bold text-ink hover:text-maroon">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
