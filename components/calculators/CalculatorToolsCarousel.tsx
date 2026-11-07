"use client";

import Link from "next/link";
import EditorialCarousel from "@/components/ui/EditorialCarousel";
import { calculators, type CalculatorMeta } from "@/content/calculators";

function CalculatorCard({ tool }: { tool: CalculatorMeta }) {
  return (
    <article className="flex h-full min-h-[14rem] flex-col border border-ink/10 bg-paper p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{tool.title}</h3>
      <p className="mt-3 flex-1 text-ink-muted leading-relaxed">{tool.summary}</p>
      <Link href={tool.href} className="mt-6 inline-flex text-sm font-semibold text-maroon hover:underline">
        Open calculator →
      </Link>
    </article>
  );
}

/** Horizontal peek carousel of live investment calculators. */
export default function CalculatorToolsCarousel() {
  const live = calculators.filter((tool) => tool.status === "live");

  return (
    <EditorialCarousel ariaLabel="Investment calculators">
      {live.map((tool) => (
        <CalculatorCard key={tool.slug} tool={tool} />
      ))}
    </EditorialCarousel>
  );
}
