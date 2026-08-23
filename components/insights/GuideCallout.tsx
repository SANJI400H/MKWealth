import Link from "next/link";

export default function GuideCallout() {
  return (
    <div className="mt-16 border-t border-line pt-10">
      <p className="eyebrow">Next step</p>
      <h2 className="display mt-3 text-2xl text-ink sm:text-3xl">Go deeper</h2>
      <p className="mt-3 max-w-xl text-ink-muted">
        Read more analysis, underwrite a yield scenario, or ask Morgan to review a live opportunity.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/insights" className="btn-ghost-dark justify-center">
          Insights
        </Link>
        <Link href="/calculators/true-yield" className="btn-ghost-dark justify-center">
          True Yield calculator
        </Link>
        <Link href="/analyse" className="btn-primary justify-center">
          Analyse an investment
        </Link>
        <Link href="/guide" className="btn-ghost-dark justify-center">
          Download free guide
        </Link>
      </div>
    </div>
  );
}
