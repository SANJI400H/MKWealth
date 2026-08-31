"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import { investLocations } from "@/content/invest-locations";

function MarketCard({
 location,
}: {
 location: (typeof investLocations)[number];
}) {
 return (
 <article className="group flex h-full flex-col border border-silver bg-paper">
 <div className="relative aspect-[4/5] overflow-hidden bg-surface">
 <Image
 src={location.image}
 alt={`${location.name}. UAE property investment context`}
 fill
 sizes="(min-width: 1024px) 34rem, (min-width: 768px) 32rem, 88vw"
 className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
 />
 </div>
 <div className="card-pad flex flex-1 flex-col space-y-4">
 <p className="eyebrow">{location.tag}</p>
 <h3 className="card-title-lg">{location.name}</h3>
 <p className="body-copy">{location.summary}</p>
 <ul className="space-y-2 border-t border-silver pt-4 text-sm text-ink-muted">
 {location.factors.map((f) => (
 <li key={f} className="flex gap-2">
 <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon" aria-hidden />
 <span>{f}</span>
 </li>
 ))}
 </ul>
 <div className="cta-row mt-auto pt-2 !gap-3 sm:!gap-5">
 <Link href={location.slug} className="text-link">
 Morgan&apos;s View →
 </Link>
 <Link href={location.slug} className="text-link-muted">
 Explore {location.name} →
 </Link>
 </div>
 </div>
 </article>
 );
}

/** Post-cinema interactive markets. Apple-inspired exploration, no autoplay. */
export default function Invest() {
 return (
 <section id="invest" className="section-pad bg-paper" aria-label="Invest in the UAE">
 <div className="section-inner">
 <RevealOnScroll>
 <p className="eyebrow">Invest in the UAE</p>
 <h2 className="section-title">
 Three markets.
 <br />
 Different rules.
 </h2>
 <p className="section-lead">
 The right market depends on what the capital needs to achieve, not which brochure arrives first.
 </p>
 </RevealOnScroll>

 <div className="section-body">
 <EditorialCarousel
 ariaLabel="Explore UAE investment markets"
 previousLabel="Previous market"
 nextLabel="Next market"
 >
 {investLocations.map((location) => (
 <MarketCard key={location.id} location={location} />
 ))}
 </EditorialCarousel>
 </div>

 <RevealOnScroll className="mt-8">
 <Link href="/invest" className="btn-ghost-dark">
 Explore All Markets →
 </Link>
 </RevealOnScroll>
 </div>
 </section>
 );
}
