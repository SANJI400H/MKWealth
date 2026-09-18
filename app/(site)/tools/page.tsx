import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import CalculatorToolsCarousel from "@/components/calculators/CalculatorToolsCarousel";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { toolsSectionNav } from "@/content/navigation";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Investment Tools | Morgan Kaiser",
  description:
    "UAE property calculators. Explore freely; unlock results with name and email — your numbers ship with your enquiry.",
  path: "/tools",
});

export default function ToolsPage() {
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
          Browse calculators freely and edit inputs without registering. When you calculate results, a short
          name and email unlocks your numbers and sends the snapshot with your enquiry. Current investors use
          the Client Portal for the portfolio dashboard.
        </p>

        <StickySectionNav
          items={toolsSectionNav}
          layoutId="tools-section-pill"
          ariaLabel="Tools sections"
          className="mt-8"
        />

        <section
          id="calculators"
          className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10 space-y-6"
        >
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Calculators</h2>
          <CalculatorToolsCarousel />
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
      </main>
      <SiteFooter />
    </>
  );
}
