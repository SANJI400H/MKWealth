import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import MortgageEstimateCalculator from "@/components/calculators/MortgageEstimateCalculator";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Mortgage Estimate Calculator | Morgan Kaiser",
  description:
    "Illustrative UAE mortgage monthly payment estimate from price, down payment, rate, and term. Educational only.",
  path: "/calculators/mortgage-estimate",
});

export default async function MortgageEstimatePage() {
  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Mortgage Estimate", path: "/calculators/mortgage-estimate" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Mortgage estimate
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Explore an indicative monthly payment. Financing coordination runs through {siteConfig.company} when a
          real application is the next step.
        </p>
        <div className="mt-10">
          <MortgageEstimateCalculator />
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
    </>
  );
}
