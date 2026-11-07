"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { rakSectionNav } from "@/content/navigation";

export default function RakInvestTabs() {
  return (
    <>
      <StickySectionNav
        items={rakSectionNav}
        layoutId="rak-section-pill"
        ariaLabel="Ras Al Khaimah topics"
        className="mt-8"
      />

      <section id="overview" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investment thesis</h2>
        <p className="body-copy mt-4">
          Ras Al Khaimah is the lower-entry emirate in this set, and it is among the highest yielding markets in the
          UAE. The resale market is thinner than Dubai. That is the trade.
        </p>
      </section>

      <section id="compare" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Off-plan and ready</h2>
        <p className="body-copy mt-4">
          Most of the current conversation is off-plan on Al Marjan, with cash staged to construction. Ready stock is
          limited. Where it exists, it can be let sooner and it needs more cash on day one.
        </p>
      </section>

      <section id="costs-yield" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Costs and yield</h2>
        <p className="body-copy mt-4">
          Among the highest rental yields in the UAE, with a smaller tenant pool and a thinner exit than Dubai. Model the
          void and the fees before treating a headline yield as income.
        </p>
      </section>

      <section id="areas" className="page-block">
        <AreaCarousel market="rak" />
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
          Book a strategy session
        </Link>
        <Link href="/tools" className="btn-ghost-dark w-full justify-center sm:w-auto">
          Tools
        </Link>
      </div>
    </>
  );
}

export function RakCompareLinks() {
  return (
    <p className="body-copy mt-12">
      Compare with{" "}
      <Link href="/invest/dubai" className="font-semibold text-maroon hover:underline">
        Dubai
      </Link>{" "}
      and{" "}
      <Link href="/invest/abu-dhabi" className="font-semibold text-maroon hover:underline">
        Abu Dhabi
      </Link>
      .
    </p>
  );
}
