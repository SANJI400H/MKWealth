import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { morganProfile } from "@/content/morgan-profile";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "About Huspy | Morgan Kaiser",
  description:
    "Morgan Kaiser works in partnership with Huspy. Financing coordination and a wider platform sit behind the advice.",
  path: "/about-huspy",
});

export default function AboutHuspyPage() {
  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About Huspy", path: "/about-huspy" },
          ]}
        />

        <p className="mt-8 text-sm font-medium text-ink-muted">In partnership with Huspy</p>
        <img src="/images/logos/huspy.svg" alt="Huspy" className="mt-4 h-8 w-auto" />
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          A platform behind the advice
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
          Morgan Kaiser is {morganProfile.companyRole} at {morganProfile.company}. The partnership is there so
          clients are not relying on one person for every part of a UAE property purchase.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="card-lift border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-bold text-ink">Who Huspy is</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Huspy is headquartered in Dubai, with offices in Abu Dhabi, Madrid and Valencia. Its about page says
              the company began in 2019 to simplify home loans and home buying. Huspy states that it is licensed in
              the UAE for real estate and mortgage brokerage, including by the Real Estate Regulatory Agency. Its
              licences page lists Dubai licence 584276, Abu Dhabi branch CN-4671527, RERA 19498, Huspy Mortgage
              Broker FZE licence 2489, Dubai branch licence 898686 and RERA 27102.
            </p>
          </article>
          <article className="card-lift border border-line bg-paper p-5">
            <h2 className="font-display text-xl font-bold text-ink">What it means for you</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Financing can be coordinated through Huspy when a mortgage is part of the plan. Morgan does not lend
              personally. Lender panels still vary by application.
            </p>
          </article>
          <article className="card-lift border border-line bg-surface p-5">
            <h2 className="font-display text-xl font-bold text-ink">How Morgan uses it</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{morganProfile.huspyLine}</p>
          </article>
        </div>

        <section className="mt-12 max-w-2xl border-t border-line pt-8">
          <h2 className="font-display text-2xl font-bold text-ink">Book a strategy session</h2>
          <p className="mt-3 text-ink-muted">
            Start with the 30 minute conversation. Vision and capital come first. Property comes after.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
            <Link href="/about" className="btn-ghost-dark w-full justify-center sm:w-auto">
              About Morgan
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            {siteConfig.companyRole} · {siteConfig.company} · {morganProfile.reraOrDldCredential}
          </p>
        </section>
      </main>
    </>
  );
}
