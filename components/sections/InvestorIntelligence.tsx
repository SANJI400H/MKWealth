import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { siteConfig } from "@/lib/site-config";

const entries = [
  {
    eyebrow: "Latest analysis",
    title: "Gross Yield vs Net Yield in Dubai Property",
    href: "/insights/gross-vs-net-yield-dubai-property",
    summary: "Why advertised yield is not the return that hits your account.",
  },
  {
    eyebrow: "True Yield calculator",
    title: "Calculate the real return behind advertised yield",
    href: "/calculators/true-yield",
    summary: "Gross, net, capital deployed — with transparent cost assumptions.",
  },
  {
    eyebrow: "Market intelligence",
    title: "Dubai, Abu Dhabi, Ras Al Khaimah",
    href: "/invest",
    summary: "Market pillars for international investors — underwriting first.",
  },
  {
    eyebrow: "Investor resources",
    title: "Guides, briefings, and checklists",
    href: "/guide",
    summary: "Gated resources for deeper preparation.",
  },
];

/** Post-cinema editorial entry points into Intelligence. */
export default function InvestorIntelligence() {
  return (
    <section
      id="intelligence"
      className="border-t border-line bg-paper py-24 sm:py-32"
      aria-label="Investor Intelligence"
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <RevealOnScroll>
          <p className="eyebrow">Investor Intelligence</p>
          <h2 className="display mt-5 max-w-3xl text-4xl text-ink sm:text-6xl">
            Numbers that survive underwriting.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Analysis, tools, and market context — the public knowledge layer behind Morgan&apos;s work.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {entries.map((entry, i) => (
            <RevealOnScroll key={entry.href} delayMs={i * 60}>
              <Link href={entry.href} className="group block border-t border-line pt-6">
                <p className="eyebrow">{entry.eyebrow}</p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink transition group-hover:text-maroon sm:text-3xl">
                  {entry.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{entry.summary}</p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll className="mt-12">
          <Link href="/insights" className="btn-ghost-dark">
            {siteConfig.cta.insights} →
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
