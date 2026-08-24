import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import PurchaseCostCalculator from "@/components/calculators/PurchaseCostCalculator";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Purchase Cost Calculator | Morgan Kaiser",
  description:
    "Estimate total capital deployed for a Dubai freehold purchase — DLD, agency, trustee, and other acquisition costs.",
  path: "/calculators/purchase-cost",
});

export default function PurchaseCostPage() {
  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "Purchase Cost", path: "/calculators/purchase-cost" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Dubai Purchase Cost Calculator</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Ticket price is not capital deployed. Adjust fee assumptions to see the full stack before you commit.
        </p>
        <div className="mt-10">
          <PurchaseCostCalculator />
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
