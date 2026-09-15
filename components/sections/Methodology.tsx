import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/lib/site-config";

/**
 * Temporary proof section while genuine testimonials are unavailable.
 * Never publish fabricated client quotes.
 */
export default function Methodology() {
 return (
 <section id="methodology" className="border-t border-line bg-paper py-24 sm:py-32" aria-label="Methodology">
 <div className="mx-auto max-w-content px-5 sm:px-8">
 <RevealOnScroll>
 <p className="eyebrow">How Morgan works</p>
 <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">
 {siteConfig.philosophy}
 </h2>
 <p className="body-copy mt-6 max-w-3xl sm:text-lg">
 Real estate decisions built on numbers, not sales pitches. Client testimonials and case studies
 appear here only when genuine and approved.
 </p>
 </RevealOnScroll>

 <div className="mt-14 grid gap-8 md:grid-cols-3">
 {[
 {
 title: "Brief first",
 body: "Objective, capital, horizon, liquidity, risk, and exit, before any inventory discussion.",
 },
 {
 title: "Underwrite the deal",
 body: "Price, costs, yield assumptions, payment structure, and delivery risk stress-tested against the brief.",
 },
 {
 title: "Then acquire",
 body: "Off-plan or secondary only when the mathematics and structure fit, coordinated through verified channels.",
 },
 ].map((item) => (
 <RevealOnScroll key={item.title}>
 <h3 className="font-display text-xl font-bold text-ink">{item.title}</h3>
 <p className="body-copy-sm mt-3 sm:text-base">{item.body}</p>
 </RevealOnScroll>
 ))}
 </div>

 <RevealOnScroll className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
 <Link href="/about#credentials" className="btn-ghost-dark w-full justify-center sm:w-auto">
 Credentials
 </Link>
 <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
 Work With Morgan
 </Link>
 <Link href="/strategy-session" className="btn-primary w-full sm:w-auto">
 {siteConfig.cta.strategySession}
 </Link>
 </RevealOnScroll>
 </div>
 </section>
 );
}
