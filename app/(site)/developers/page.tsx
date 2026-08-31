import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedDevelopers } from "@/content/developers";
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
 <main className="page-shell">
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
 <ul className="mt-12 space-y-6">
 {list.map((d) => (
 <li key={d.slug} className="border-b border-line pb-6">
 <Link href={`/developers/${d.slug}`} className="group block">
 <h2 className="font-display text-xl font-bold text-ink group-hover:text-maroon sm:text-2xl">
 {d.name}
 </h2>
 <p className="mt-2 text-ink-muted">{d.tagline}</p>
 </Link>
 </li>
 ))}
 </ul>
 </main>
 <SiteFooter />
 </>
 );
}
