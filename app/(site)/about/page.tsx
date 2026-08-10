import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Morgan Kaiser | Dubai Off-Plan Investment Advisor",
  description:
    "Full bio of Morgan Kaiser — Huspy partner agent advising foreign investors on Dubai off-plan property, Golden Visa eligibility, and portfolio structuring.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />

        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-ink/5">
          <Image
            src="/images/morgan-portrait.jpg"
            alt="Morgan Kaiser"
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <h1 className="mt-10 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Morgan Kaiser
        </h1>
        <p className="mt-3 text-lg text-ink-muted">
          Off-plan real estate investment advisor · Huspy partner agent · Dubai, UAE
        </p>

        <div className="mt-10 space-y-5 text-ink-muted">
          <p>
            Morgan advises foreign investors who want exposure to UAE real estate without being sold a
            developer&apos;s inventory pitch. The work covers unit selection, payment plan structure,
            financing coordination, Golden Visa eligibility, and the path through to handover and rental
            setup.
          </p>
          <p>
            As a partner agent with Huspy, he sits inside a platform that combines brokerage and mortgage
            advisory — useful for off-plan buyers specifically, where lender appetite and construction-linked
            payment schedules have to line up or the deal breaks.
          </p>
          <p>
            Most clients are based outside the UAE and evaluating Dubai against other global markets. The
            first conversation is about numbers, liquidity, and risk — not a listing tour.
          </p>
          <p>
            For the short version of how an engagement runs: clarify the brief, shortlist units that fit,
            then structure and close with a clear handover plan.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <BookMeetingLink className="btn-primary w-full sm:w-auto" />
          <Link
            href="/#services"
            className="btn-ghost-dark w-full justify-center sm:w-auto"
          >
            See services
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
