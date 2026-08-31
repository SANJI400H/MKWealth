import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { calculators } from "@/content/calculators";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Investment Tools | Morgan Kaiser",
  description:
    "Browse UAE property calculators and the investor guide. Register with name, WhatsApp, and email to download files or run live results.",
  path: "/tools",
});

export default function ToolsPage() {
  const liveCalculators = calculators.filter((c) => c.status === "live");

  return (
    <>
      <main className="page-shell">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }]} />

        <h1 className="page-h1">Tools</h1>
        <p className="page-lead">
          Browse freely. When you edit a calculator or download a guide file, a short registration unlocks access on
          this browser for ninety days.
        </p>

        <section id="calculators" className="page-block space-y-6">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Calculators</h2>
          <ul className="space-y-6">
            {liveCalculators.map((c) => (
              <li key={c.slug} className="border-b border-line pb-6">
                <h3 className="font-display text-xl font-bold text-ink">{c.title}</h3>
                <p className="body-copy mt-2">{c.summary}</p>
                <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-maroon hover:underline">
                  Open calculator →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="guide" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investor guide</h2>
          <p className="text-ink-muted">
            Topic videos you can watch immediately. Downloads unlock after name, WhatsApp, and email.
          </p>
          <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Open guide →
          </Link>
        </section>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Work With Morgan
          </Link>
        </div>
        <p className="mt-6 text-xs text-ink-muted">
          Prefer to talk first?{" "}
          <Link href="/strategy-session" className="font-semibold text-maroon hover:underline">
            {siteConfig.cta.strategySession}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
