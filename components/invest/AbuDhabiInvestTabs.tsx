"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import DeveloperCarousel from "@/components/invest/DeveloperCarousel";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { abuDhabiSectionNav } from "@/content/navigation";

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
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Who Abu Dhabi suits</h2>
        <p className="body-copy mt-4">
          Investors prioritizing government-anchored, lower-volatility assets and a longer hold. The secondary market is
          thinner than Dubai&apos;s, which cuts both speculation and easy early exits.
        </p>
      </section>

      <section id="ownership" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership & areas</h2>
        <p className="body-copy mt-4">
          Freehold for foreigners in designated zones including Saadiyat, Yas, Al Reem, and Al Maryah. The eligible list
          is shorter than Dubai&apos;s, and inventory is more institutionally paced.
        </p>
        <p className="body-copy mt-4">
          Covered with real advisory focus alongside Dubai, useful for diversification, not as identical day-to-day deal
          flow.
        </p>
      </section>

      <section id="areas" className="page-block">
        <AreaCarousel market="abu-dhabi" />
      </section>

      <section id="developers" className="page-block">
        <DeveloperCarousel market="abu-dhabi" />
      </section>

      <p className="mt-10 text-center">
        <Link href="/strategy-session" className="text-[12px] font-semibold text-maroon hover:underline">
          Book Strategy Session →
        </Link>
      </p>
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
