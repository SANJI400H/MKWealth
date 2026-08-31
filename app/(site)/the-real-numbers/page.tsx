import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { getPublishedRealNumbers } from "@/content/real-numbers";
import { pageMetadata } from "@/lib/metadata";
import { regulatory } from "@/content/regulatory";

export const metadata: Metadata = pageMetadata({
 title: "The Real Numbers | Morgan Kaiser",
 description:
 "Sourced and illustrative UAE property figures used across Morgan Kaiser’s site, with caveats and review dates.",
 path: "/the-real-numbers",
});

export default function TheRealNumbersPage() {
 const entries = getPublishedRealNumbers();

 return (
 <>
 <main className="page-shell">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "The Real Numbers", path: "/the-real-numbers" },
 ]}
 />
 <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">The Real Numbers</h1>
 <p className="mt-4 text-lg text-ink-muted">
 Figures that appear in underwriting conversations, each with source, caveat, and last-reviewed date. No
 invented transaction volumes or award counts.
 </p>

 <div className="mt-12 overflow-x-auto">
 <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
 <thead>
 <tr className="border-b border-line">
 <th className="py-3 pr-3 text-ink">Claim</th>
 <th className="py-3 pr-3 text-ink">Value</th>
 <th className="py-3 text-ink">As of</th>
 </tr>
 </thead>
 <tbody>
 {entries.map((e) => (
 <tr key={e.id} className="border-b border-line/70 align-top">
 <td className="py-4 pr-3">
 <p className="font-medium text-ink">{e.claim}</p>
 <p className="mt-2 text-xs text-ink-muted">{e.caveat}</p>
 <p className="mt-2 text-xs text-ink-muted">Source: {e.source}</p>
 {e.relatedHref ? (
 <Link href={e.relatedHref} className="mt-2 inline-block text-xs font-semibold text-maroon hover:underline">
 Related →
 </Link>
 ) : null}
 </td>
 <td className="py-4 pr-3 text-ink-muted">{e.value}</td>
 <td className="py-4 text-ink-muted whitespace-nowrap">{e.asOf}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <p className="mt-10 text-sm text-ink-muted">
 Prefer tools?{" "}
 <Link href="/calculators/true-yield" className="font-semibold text-maroon hover:underline">
 True Yield
 </Link>
 {" · "}
 <Link href="/calculators/purchase-cost" className="font-semibold text-maroon hover:underline">
 Purchase cost
 </Link>
 </p>
 <p className="mt-6 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
 </main>
 <SiteFooter />
 </>
 );
}
