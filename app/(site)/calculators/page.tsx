import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import CalculatorToolsCarousel from "@/components/calculators/CalculatorToolsCarousel";
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
          Explore each calculator freely. When you calculate results, a short name and email unlocks your
          numbers and sends the snapshot to Morgan.
        </p>
        <div className="mt-10">
          <CalculatorToolsCarousel />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
