import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { calculators } from "@/content/calculators";
import { toolsSectionNav } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Investment Tools | Morgan Kaiser",
  description:
    "UAE property calculators. Register with name, WhatsApp, and email to run live results — your numbers ship with your details.",
  path: "/tools",
});

export default function ToolsPage() {
  const liveCalculators = calculators.filter((c) => c.status === "live");

  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]}
        />

        <h1 className="page-h1">Tools</h1>
        <p className="page-lead">
          Browse calculators freely. When you edit inputs or reveal results, a short registration (name,
          WhatsApp, email) unlocks access and sends your calculation snapshot with your details to Morgan.
          Current investors use the Client Portal for the portfolio dashboard.
        </p>

        <StickySectionNav
          items={toolsSectionNav}
          layoutId="tools-section-pill"
          ariaLabel="Tools sections"
          className="mt-8"
        />

        <section id="calculators" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10 space-y-6">
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

        <section id="portal" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Client Portal</h2>
          <p className="body-copy">
            Private Desk for current clients — opens the hosted Private Wealth dashboard.
          </p>
          <Link href="/portal" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Client Portal →
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
