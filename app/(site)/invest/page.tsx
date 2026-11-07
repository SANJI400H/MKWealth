import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { investLocations } from "@/content/invest-locations";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Invest in the UAE | Markets Overview | Morgan Kaiser",
  description:
    "UAE property market pillars for international investors: Abu Dhabi, Dubai, and Ras Al Khaimah.",
  path: "/invest",
});

const coverOrder = ["abu-dhabi", "dubai", "rak"] as const;

export default function InvestHubPage() {
  const covers = coverOrder.map((id) => investLocations.find((location) => location.id === id)!);

  return (
    <>
      <main>
        <section
          className="mt-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full bg-[#100e0c] sm:mt-[calc(4rem+env(safe-area-inset-top,0px))]"
          aria-label="Abu Dhabi, Dubai, and Ras Al Khaimah"
        >
          {covers.map((location, index) => (
            <Link key={location.id} href={location.slug} className="group relative block w-full">
              <Image
                src={location.cover}
                alt={location.coverAlt}
                width={location.coverWidth}
                height={location.coverHeight}
                priority={index === 0}
                sizes="100vw"
                className="h-auto w-full object-contain"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
              <div className="absolute left-[5%] top-1/2 z-10 -translate-y-1/2 text-left sm:left-[7%]">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/80 sm:text-xs">
                  {location.tag}
                </p>
                <h2
                  className="mt-1 font-display text-[clamp(1.75rem,4vw,4.25rem)] font-bold tracking-tight text-white"
                  style={{ textShadow: "0 2px 16px rgba(0,0,0,0.65)" }}
                >
                  {location.name}
                </h2>
              </div>
              <p
                className="absolute bottom-3 right-4 z-10 max-w-[18rem] text-right text-[10px] leading-snug text-white/80 sm:bottom-4 sm:right-6"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                {location.coverCredit}
              </p>
            </Link>
          ))}
        </section>

        <div className="page-shell !pt-8 sm:!pt-10">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Invest", path: "/invest" }]} />

          <h1 className="page-h1 mt-8">Invest in the UAE</h1>
          <p className="mt-4 text-lg text-ink-muted">
            Part of one three-emirate working set. Different rules in each market.
          </p>
          <section className="mt-10 max-w-3xl space-y-4">
            <h2 className="font-display text-2xl font-bold text-ink">Ownership</h2>
            <p className="body-copy">
              Foreign nationals have been permitted freehold ownership in designated areas of Dubai since 2002, and in
              designated zones of Abu Dhabi and Ras Al Khaimah as well. Residency is not required to buy. What is
              required is clarity on funding, fees and, if relevant, financing, alongside the areas, the market
              movements and the risks.
            </p>
            <h2 className="font-display text-2xl font-bold text-ink">Golden Visa</h2>
            <p className="body-copy">
              Property at or above the commonly cited federal threshold may qualify, subject to current rules, including
              how a mortgage and an off-plan payment are treated. Confirm the requirement at the time of application.
            </p>
          </section>

          <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
            <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
            <Link href="/tools" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Tools
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
