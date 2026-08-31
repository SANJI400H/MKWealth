import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedAreas } from "@/content/areas";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Areas | UAE Property Micro-Markets | Morgan Kaiser",
 description:
 "Area underwriting frameworks for Dubai, Abu Dhabi, and Ras Al Khaimah, orientation, not inventory listings.",
 path: "/areas",
});

const marketLabel = {
 dubai: "Dubai",
 "abu-dhabi": "Abu Dhabi",
 rak: "Ras Al Khaimah",
} as const;

export default function AreasIndexPage() {
 const areas = getPublishedAreas();
 const markets = ["dubai", "abu-dhabi", "rak"] as const;

 return (
 <>
 <main className="page-shell">
 <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }]} />
 <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Areas</h1>
 <p className="mt-4 text-lg text-ink-muted">
 Micro-market frameworks for underwriting conversations. Working analysis only, not rankings or forecasts.
 </p>

 {markets.map((market) => {
 const group = areas.filter((a) => a.market === market);
 if (!group.length) return null;
 return (
 <section key={market} className="mt-14">
 <h2 className="font-display text-2xl font-bold text-ink">{marketLabel[market]}</h2>
 <ul className="mt-6 space-y-5">
 {group.map((a) => (
 <li key={a.slug} className="border-b border-line pb-5">
 <Link href={`/areas/${a.slug}`} className="group block">
 <h3 className="font-display text-xl font-bold text-ink group-hover:text-maroon">{a.name}</h3>
 <p className="mt-2 text-sm text-ink-muted">{a.tagline}</p>
 </Link>
 </li>
 ))}
 </ul>
 </section>
 );
 })}
 </main>
 <SiteFooter />
 </>
 );
}
