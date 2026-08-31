"use client";

import Link from "next/link";
import AreaCarousel from "@/components/invest/AreaCarousel";
import DeveloperCarousel from "@/components/invest/DeveloperCarousel";
import EditorialTabs from "@/components/ui/EditorialTabs";
import { abuDhabiSectionNav } from "@/content/navigation";

export default function AbuDhabiInvestTabs() {
 return (
 <EditorialTabs
 items={abuDhabiSectionNav}
 layoutId="abu-dhabi-tab-underline"
 ariaLabel="Abu Dhabi topics"
 cta={{ label: "Book Strategy Session", href: "/strategy-session" }}
 panels={{
 overview: (
 <div>
 <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Who Abu Dhabi suits</h2>
 <p className="body-copy mt-4">
 Investors prioritizing government-anchored, lower-volatility assets and a longer hold. The secondary
 market is thinner than Dubai&apos;s, which cuts both speculation and easy early exits.
 </p>
 </div>
 ),
 ownership: (
 <div>
 <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Ownership & areas</h2>
 <p className="body-copy mt-4">
 Freehold for foreigners in designated zones including Saadiyat, Yas, Al Reem, and Al Maryah. The eligible
 list is shorter than Dubai&apos;s, and inventory is more institutionally paced.
 </p>
 <p className="body-copy mt-4">
 Covered with real advisory focus alongside Dubai, useful for diversification, not as identical day-to-day
 deal flow.
 </p>
 </div>
 ),
 areas: <AreaCarousel market="abu-dhabi" />,
 developers: <DeveloperCarousel market="abu-dhabi" />,
 }}
 />
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
