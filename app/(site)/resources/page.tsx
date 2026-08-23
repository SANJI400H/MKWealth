import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedResources } from "@/content/resources";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Investor Resources | Morgan Kaiser",
  description:
    "Public primers and gated worksheets for UAE property underwriting — yield, payment plans, and due diligence.",
  path: "/resources",
});

export default function ResourcesHubPage() {
  const all = getPublishedResources();
  const publicItems = all.filter((r) => !r.gated);
  const gatedItems = all.filter((r) => r.gated);

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Investor Resources</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Public knowledge stays open. Deeper checklists and worksheets unlock after a light lead — not instead of
          teaching the maths.
        </p>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">Public</h2>
          <ul className="mt-6 space-y-6">
            {publicItems.map((r) => (
              <li key={r.slug} className="border-b border-line pb-6">
                <p className="eyebrow capitalize">{r.type}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-ink-muted">{r.excerpt}</p>
                {r.body ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-muted">
                    {r.body.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                ) : null}
                <Link href={r.ctaHref} className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
                  {r.ctaLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-ink">Gated</h2>
          <p className="mt-3 text-sm text-ink-muted">
            Unlock via the{" "}
            <Link href="/guide" className="font-semibold text-gold hover:underline">
              investor guide
            </Link>{" "}
            after sharing contact details.
          </p>
          <ul className="mt-6 space-y-6">
            {gatedItems.map((r) => (
              <li key={r.slug} className="border-b border-line pb-6">
                <p className="eyebrow capitalize">{r.type}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-ink-muted">{r.excerpt}</p>
                <Link href={r.ctaHref} className="mt-4 inline-block text-sm font-semibold text-gold hover:underline">
                  {r.ctaLabel} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
