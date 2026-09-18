"use client";

import Link from "next/link";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import { calculators, type CalculatorMeta } from "@/content/calculators";

function sortCalculators(items: CalculatorMeta[]) {
  const live = items.filter((c) => c.status === "live");
  const planned = items.filter((c) => c.status !== "live");
  return [...live, ...planned];
}

function CalculatorCard({ tool }: { tool: CalculatorMeta }) {
  const live = tool.status === "live";

  return (
    <article className="flex h-full min-h-[14rem] flex-col border border-ink/10 bg-paper p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline gap-3">
        <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{tool.title}</h3>
        <span className="text-xs uppercase tracking-wider text-ink-muted">
          {live ? "Live" : "Coming soon"}
        </span>
      </div>
      <p className="mt-3 flex-1 text-ink-muted leading-relaxed">{tool.summary}</p>
      {live ? (
        <Link href={tool.href} className="mt-6 inline-flex text-sm font-semibold text-maroon hover:underline">
          Open calculator →
        </Link>
      ) : (
        <span className="mt-6 inline-flex text-sm font-semibold text-ink-muted/60">Coming soon</span>
      )}
    </article>
  );
}

/** Horizontal peek carousel of investment calculators — live tools first. */
export default function CalculatorToolsCarousel() {
  const sorted = sortCalculators(calculators);

  return (
    <EditorialCarousel ariaLabel="Investment calculators">
      {sorted.map((tool) => (
        <CalculatorCard key={tool.slug} tool={tool} />
      ))}
    </EditorialCarousel>
  );
}
