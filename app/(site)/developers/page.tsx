import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { getPublishedDevelopers } from "@/content/developers";
import { developerLogos } from "@/content/editorial-images";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Developers | Evaluation Framework | Morgan Kaiser",
 description:
 "Developer evaluation frameworks for UAE property, delivery, payment plans, and suitability. Not project listings.",
 path: "/developers",
});

export default function DevelopersIndexPage() {
 const list = getPublishedDevelopers();

 return (
 <>
 <main className="page-shell-wide">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Developers", path: "/developers" },
 ]}
 />
 <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Developers</h1>
 <p className="mt-4 text-lg text-ink-muted">
 How to evaluate developers before trusting a brochure. Working frameworks. Morgan experience slots stay
 empty until verified.
 </p>
 <ul className="mt-12 grid gap-5 sm:grid-cols-2">
 {list.map((d) => {
 const logo = developerLogos[d.slug];
 return (
 <li key={d.slug} className="border border-silver bg-paper">
 <Link href={`/developers/${d.slug}`} className="group block">
 <div
 className={`flex h-28 items-center justify-center border-b border-silver px-8 ${
 logo?.onDark ? "bg-ink" : "bg-surface"
 }`}
 >
 {logo ? (
 <img src={logo.src} alt="" className="max-h-12 w-auto max-w-[14rem] object-contain" />
 ) : (
 <span className="font-display text-2xl font-bold text-ink">{d.name}</span>
 )}
 </div>
 <div className="px-5 py-5">
 <h2 className="font-display text-xl font-bold text-ink group-hover:text-maroon sm:text-2xl">
 {d.name}
 </h2>
 <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.tagline}</p>
 </div>
 </Link>
 </li>
 );
 })}
 </ul>
 </main>
 </>
 );
}
