"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import DeveloperCarousel from "@/components/invest/DeveloperCarousel";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { abuDhabiSectionNav } from "@/content/navigation";
import { regulatory } from "@/content/regulatory";

export default function AbuDhabiInvestTabs() {
  return (
    <>
      <StickySectionNav
        items={abuDhabiSectionNav}
        layoutId="abu-dhabi-section-pill"
        ariaLabel="Abu Dhabi topics"
        className="mt-8"
      />

      <section id="overview" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investment thesis</h2>
        <p className="body-copy mt-4">
          Abu Dhabi suits investors who want a government-anchored market and a longer hold. The resale market is
          thinner than Dubai&apos;s. That limits quick exits and it also limits speculation.
        </p>
      </section>

      <section id="compare" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Off-plan and ready</h2>
        <p className="body-copy mt-4">
          Off-plan on the islands stages the cash and waits for handover. Ready homes on Saadiyat, Yas and Reem can be
          lived in or let sooner, with a larger cheque on day one. The brief decides which one fits.
        </p>
      </section>

      <section id="costs-yield" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Costs and yield</h2>
        <p className="body-copy mt-4">
          Fee stacks and lender rules differ from Dubai. Confirm the transfer costs and any mortgage against the
          emirate of the unit, not against a Dubai headline.
        </p>
        <p className="body-copy-sm mt-2">{regulatory.disclaimerShort}</p>
      </section>

      <section id="areas" className="page-block">
        <AreaCarousel market="abu-dhabi" />
      </section>

      <section id="developers" className="page-block">
        <DeveloperCarousel market="abu-dhabi" />
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

export function AbuDhabiCompareLinks() {
  return (
    <p className="body-copy mt-12">
      Compare with{" "}
      <Link href="/invest/dubai" className="font-semibold text-maroon hover:underline">
        Dubai
      </Link>{" "}
      and{" "}
      <Link href="/invest/rak" className="font-semibold text-maroon hover:underline">
        Ras Al Khaimah
      </Link>
      .
    </p>
  );
}
