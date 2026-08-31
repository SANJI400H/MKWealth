import Link from "next/link";

/** Neutral calculator preview, no fake computed results. */
export default function CalculatorPreviewCard({
 title,
 href,
 advertisedDemo = "6.3%",
 netLabel = "Estimated Net Yield",
}: {
 title: string;
 href: string;
 advertisedDemo?: string;
 netLabel?: string;
}) {
 return (
 <Link
 href={href}
 className="group flex h-full flex-col border border-silver bg-paper transition hover:border-maroon"
 >
 <div className="card-pad flex flex-1 flex-col">
 <p className="eyebrow">Calculator</p>
 <h3 className="card-title-lg mt-3 transition group-hover:text-maroon">{title}</h3>
 <div className="mt-8 space-y-4 border-t border-silver pt-6">
 <div className="flex items-baseline justify-between gap-4">
 <span className="text-sm text-ink-muted">Advertised Yield</span>
 <span className="font-display text-2xl font-bold text-ink">{advertisedDemo}</span>
 </div>
 <div className="flex items-baseline justify-between gap-4">
 <span className="text-sm text-ink-muted">{netLabel}</span>
 <span className="font-display text-2xl font-bold text-ink-muted">, </span>
 </div>
 <p className="text-xs leading-relaxed text-ink-muted">
 Demonstration state, calculate with your figures on the tool page.
 </p>
 </div>
 <span className="text-link mt-auto pt-8 transition group-hover:translate-x-1">
 Calculate Your Real Return →
 </span>
 </div>
 </Link>
 );
}
