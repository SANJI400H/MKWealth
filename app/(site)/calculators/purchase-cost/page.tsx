import type { Metadata } from "next";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import PurchaseCostCalculator from "@/components/calculators/PurchaseCostCalculator";
import { ToolsGateProvider } from "@/components/tools/ToolsGateProvider";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS_ACCESS_COOKIE, verifyToolsAccessCookie } from "@/lib/tools-access";

export const metadata: Metadata = pageMetadata({
 title: "Dubai Purchase Cost Calculator | Morgan Kaiser",
 description:
 "Estimate total capital deployed for a Dubai freehold purchase. DLD, agency, trustee, and other acquisition costs.",
 path: "/calculators/purchase-cost",
});

export default async function PurchaseCostPage() {
 const unlocked = await verifyToolsAccessCookie(cookies().get(TOOLS_ACCESS_COOKIE)?.value);

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
 Ticket price is not capital deployed. Edit fee assumptions freely; name and email unlock the full stack.
 </p>
 <div className="mt-10">
 <ToolsGateProvider
 initialUnlocked={unlocked}
 source="calculator"
 title="See your results"
 intro="Enter your name and email to unlock this calculation. We'll keep your numbers with your enquiry."
 >
 <PurchaseCostCalculator />
 </ToolsGateProvider>
 </div>
 <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
 </main>
 <SiteFooter />
 </>
 );
}
