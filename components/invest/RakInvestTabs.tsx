"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import DeveloperCarousel from "@/components/invest/DeveloperCarousel";
import EditorialTabs from "@/components/ui/EditorialTabs";
import { rakSectionNav } from "@/content/navigation";

export default function RakInvestTabs() {
  return (
    <EditorialTabs
      items={rakSectionNav}
      layoutId="rak-tab-underline"
      ariaLabel="Ras Al Khaimah topics"
      cta={{ label: "Book Strategy Session", href: "/strategy-session" }}
      panels={{
        overview: (
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">The real trade-off</h2>
            <p className="body-copy mt-4">
              RAK can look attractive on price alone. The decision only holds if you are comfortable with less liquidity
              and a smaller developer set, not if you need Dubai-style exit options.
            </p>
          </div>
        ),
        who: (
          <div>
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Who it suits</h2>
            <p className="body-copy mt-4">
              Investors with a longer horizon, lower ticket size, and appetite for tourism-led coastal growth, after
              Dubai (or instead of it) only when the brief actually fits.
            </p>
          </div>
        ),
        areas: <AreaCarousel market="rak" />,
        developers: <DeveloperCarousel market="rak" />,
      }}
    />
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
