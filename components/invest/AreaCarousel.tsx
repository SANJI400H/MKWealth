"use client";

import Link from "next/link";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import EditorialImage from "@/components/ui/EditorialImage";
import { areaImages } from "@/content/editorial-images";
import { getAreasByMarket, type AreaMarket } from "@/content/areas";

/** Image-led areas rail, only published area routes for the given market. */
export default function AreaCarousel({ market }: { market: AreaMarket }) {
 const areas = getAreasByMarket(market);
 if (areas.length === 0) return null;

 const useGrid = areas.length <= 2;

 const cards = areas.map((area) => {
 const photo = area.image
 ? { src: area.image, alt: area.imageAlt ?? area.name }
 : areaImages[area.slug];

 return (
 <Link
 key={area.slug}
 href={`/areas/${area.slug}`}
 className="group flex h-full flex-col border border-silver bg-paper"
 >
 <EditorialImage
 src={photo?.src}
 alt={photo?.alt ?? `${area.name}. UAE micro-market context`}
 categoryLabel="Area"
 ratio="4:5"
 className="border-0 border-b border-silver"
 />
 <div className="card-pad flex flex-1 flex-col space-y-3">
 <h3 className="card-title transition group-hover:text-maroon">{area.name}</h3>
 <p className="text-sm leading-relaxed text-ink-muted">{area.tagline}</p>
 <span className="text-link mt-auto pt-2 transition group-hover:translate-x-1">Explore →</span>
 </div>
 </Link>
 );
 });

 return (
 <section id="areas" className="page-block" aria-label="Areas to understand">
 <p className="eyebrow">Areas to understand</p>
 <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Micro-markets that matter.</h2>
 <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
 Framework pages for underwriting orientation, not tourism guides.
 </p>

 <div className="mt-8">
 {useGrid ? (
 <div className="grid gap-5 sm:grid-cols-2">{cards}</div>
 ) : (
 <EditorialCarousel
 ariaLabel="Areas to understand"
 previousLabel="Previous area"
 nextLabel="Next area"
 >
 {cards}
 </EditorialCarousel>
 )}
 </div>
 <p className="mt-8">
 <Link href="/areas" className="text-link">
 All areas →
 </Link>
 </p>
 </section>
 );
}
