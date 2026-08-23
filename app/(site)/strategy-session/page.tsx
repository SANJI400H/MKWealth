import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Strategy Session | Morgan Kaiser",
  description:
    "What a Morgan Kaiser strategy session covers, who it is for, how to prepare, and how to book.",
  path: "/strategy-session",
});

export default function StrategySessionPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Work With Morgan", path: "/work-with-morgan" },
            { name: "Strategy Session", path: "/strategy-session" },
          ]}
        />

        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Strategy Session</h1>
        <p className="mt-4 text-lg text-ink-muted">
          A focused conversation on your objective, capital, and risk — before property selection. Not a brochure
          tour.
        </p>

        <section className="mt-12 space-y-4 text-ink-muted">
          <h2 className="font-display text-2xl font-bold text-ink">Who it is for</h2>
          <p>
            International investors evaluating UAE property (off-plan or secondary) who want numbers-first guidance
            before committing capital.
          </p>
        </section>

        <section className="mt-12 space-y-4 text-ink-muted">
          <h2 className="font-display text-2xl font-bold text-ink">What will be discussed</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Whether UAE property fits the brief at all</li>
            <li>Off-plan vs secondary for your cash-flow and risk profile</li>
            <li>How to underwrite yield and capital deployed</li>
            <li>Practical next steps — analysis, shortlist, or coordination</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-ink-muted">
          <h2 className="font-display text-2xl font-bold text-ink">What to prepare</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Investment objective and time horizon</li>
            <li>Approximate capital and whether financing is in scope</li>
            <li>Liquidity constraints and risk tolerance</li>
            <li>Any live brochure, listing, or payment plan you want reviewed</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-ink-muted">
          <h2 className="font-display text-2xl font-bold text-ink">What you get</h2>
          <p>
            Clarity on fit, risks, and recommended next step. Specific deal recommendations depend on what you share
            and what can be responsibly underwritten.
          </p>
          <p className="text-sm">
            {/* TODO: MORGAN_VERIFIED_SESSION_DURATION */}
            Duration: to be confirmed with Morgan (not yet verified).
          </p>
        </section>

        <section className="mt-12 space-y-4 text-ink-muted">
          <h2 className="font-display text-2xl font-bold text-ink">After the call</h2>
          <p>
            Typical next steps include a written analysis request via{" "}
            <Link href="/analyse" className="font-semibold text-gold hover:underline">
              Analyse My Investment
            </Link>
            , a shortlist against your brief, or financing / ownership coordination via verified partners.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink">Book your session</h2>
          <p className="mt-3 text-ink-muted">Choose a time that works. You will receive confirmation from the calendar.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookMeetingLink className="btn-primary w-full sm:w-auto" />
            <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
              See all services
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
