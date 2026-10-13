import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getPublishedAreas } from "@/content/areas";
import { areaImages } from "@/content/editorial-images";
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
 <main className="page-shell-wide">
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
 <ul className="mt-6 grid gap-5 sm:grid-cols-2">
 {group.map((a) => {
 const photo = a.image || areaImages[a.slug]?.src || "";
 return (
 <li key={a.slug} className="border border-silver bg-paper">
 <Link href={`/areas/${a.slug}`} className="group block">
 {photo ? (
 <img src={photo} alt="" className="aspect-[16/9] w-full object-cover" />
 ) : (
 <div className="flex aspect-[16/9] items-end bg-ink px-4 py-4 text-xs uppercase tracking-[0.14em] text-white/70">
 Photograph coming soon
 </div>
 )}
 <div className="px-5 py-5">
 <h3 className="font-display text-xl font-bold text-ink group-hover:text-maroon">{a.name}</h3>
 <p className="mt-2 text-sm leading-relaxed text-ink-muted">{a.tagline}</p>
 </div>
 </Link>
 </li>
 );
 })}
 </ul>
 </section>
 );
 })}
 </main>
 </>
 );
}
