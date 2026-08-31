import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { investLocations } from "@/content/invest-locations";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
 title: "Invest in the UAE | Markets Overview | Morgan Kaiser",
 description:
 "UAE property market pillars for international investors: Dubai, Abu Dhabi, and Ras Al Khaimah, underwriting first, brochures second.",
 path: "/invest",
});

export default function InvestHubPage() {
 return (
 <>
 <main className="page-shell">
 <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Invest", path: "/invest" }]} />

 <h1 className="page-h1">Invest in the UAE</h1>
 <p className="mt-4 text-lg text-ink-muted">
 Three markets. Different rules. {siteConfig.name} treats these as intelligence pillars, not inventory
 catalogues.
 </p>

 <ul className="mt-12 space-y-10">
 {investLocations.map((location) => (
 <li key={location.id}>
 <Link href={location.slug} className="group block">
 <div className="relative aspect-[16/9] overflow-hidden bg-ink/5 sm:aspect-[2.2/1]">
 <Image
 src={location.image}
 alt={`${location.name} property investment`}
 fill
 sizes="(min-width: 768px) 720px, 100vw"
 className="object-cover transition duration-500 group-hover:scale-[1.02]"
 />
 </div>
 <p className="eyebrow mt-5">{location.tag}</p>
 <h2 className="mt-2 font-display text-2xl font-bold text-ink transition group-hover:text-maroon sm:text-3xl">
 {location.name}
 </h2>
 <p className="body-copy mt-2">{location.summary}</p>
 </Link>
 </li>
 ))}
 </ul>

 <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row sm:flex-wrap">
 <Link href="/strategy-session" className="btn-primary w-full sm:w-auto">
 {siteConfig.cta.strategySession}
 </Link>
 <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
 Work With Morgan
 </Link>
 </div>
 </main>
 <SiteFooter />
 </>
 );
}
