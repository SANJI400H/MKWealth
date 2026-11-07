import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PurchaseCostCalculator from "@/components/calculators/PurchaseCostCalculator";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Dubai Purchase Cost Calculator | Morgan Kaiser",
 description:
 "Estimate total capital deployed for a Dubai freehold purchase. DLD, agency, trustee, and other acquisition costs.",
 path: "/calculators/purchase-cost",
});

export default async function PurchaseCostPage() {
 return (
 <>
 <main className="page-shell-wide">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Tools", path: "/tools" },
 { name: "Purchase Cost", path: "/calculators/purchase-cost" },
 ]}
 />
 <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Dubai Purchase Cost Calculator</h1>
 <p className="mt-4 max-w-2xl text-lg text-ink-muted">
 Ticket price is not capital deployed. Edit the fee assumptions and read the full stack.
 </p>
 <div className="mt-10">
 <PurchaseCostCalculator />
 </div>
 <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
 </main>
 </>
 );
}
