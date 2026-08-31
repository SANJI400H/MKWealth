import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { calculators } from "@/content/calculators";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Investment Calculators | Morgan Kaiser",
 description: "Transparent UAE property investment calculators, starting with True Yield.",
 path: "/calculators",
});

export default function CalculatorsIndexPage() {
 return (
 <>
 <main className="page-shell">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Tools", path: "/tools" },
 { name: "Calculators", path: "/calculators" },
 ]}
 />
 <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Investment tools</h1>
 <p className="mt-4 text-lg text-ink-muted">
 Browse the tools below. Editing inputs or revealing live results asks for a quick registration.
 </p>
 <ul className="mt-10 space-y-6">
 {calculators.map((c) => (
 <li key={c.slug} className="border-b border-line pb-6">
 <div className="flex flex-wrap items-baseline gap-3">
 <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{c.title}</h2>
 <span className="text-xs uppercase tracking-wider text-ink-muted">
 {c.status === "live" ? "Live" : "Coming soon"}
 </span>
 </div>
 <p className="mt-2 text-ink-muted">{c.summary}</p>
 {c.status === "live" ? (
 <Link href={c.href} className="mt-4 inline-block text-sm font-semibold text-maroon hover:underline">
 Open calculator
 </Link>
 ) : null}
 </li>
 ))}
 </ul>
 </main>
 <SiteFooter />
 </>
 );
}
