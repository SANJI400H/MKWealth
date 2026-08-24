import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer | Morgan Kaiser",
  description: "Investment and content disclaimer for Morgan Kaiser educational materials and tools.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer" }]} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink">Disclaimer</h1>
        <p className="mt-2 text-sm text-ink-muted">Placeholder — mark for professional legal review.</p>
        <div className="mt-8 space-y-4 text-ink-muted">
          <p>{regulatory.disclaimerShort}</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Market information, fees, visa rules, and yields change and may be incomplete.</li>
            <li>Past performance or illustrative calculations do not guarantee future results.</li>
            <li>Calculators and articles may use examples or assumptions that do not match your deal.</li>
            <li>Investment decisions depend on individual circumstances, including tax in your home country.</li>
            <li>Consult appropriate legal, tax, and financial specialists where needed.</li>
          </ul>
          <p className="text-sm">TODO: Jurisdiction-specific disclaimer language via counsel.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
