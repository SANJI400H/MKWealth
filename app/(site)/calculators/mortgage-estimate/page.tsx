import type { Metadata } from "next";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import MortgageEstimateCalculator from "@/components/calculators/MortgageEstimateCalculator";
import { ToolsGateProvider } from "@/components/tools/ToolsGateProvider";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { TOOLS_ACCESS_COOKIE, verifyToolsAccessCookie } from "@/lib/tools-access";

export const metadata: Metadata = pageMetadata({
  title: "Mortgage Estimate Calculator | Morgan Kaiser",
  description:
    "Illustrative UAE mortgage monthly payment estimate from price, down payment, rate, and term. Educational only.",
  path: "/calculators/mortgage-estimate",
});

export default async function MortgageEstimatePage() {
  const unlocked = await verifyToolsAccessCookie(cookies().get(TOOLS_ACCESS_COOKIE)?.value);

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
          Explore an indicative monthly payment. Edit assumptions freely; name and email unlock
          results. Financing coordination runs through {siteConfig.company} when a real application
          is the next step.
        </p>
        <div className="mt-10">
          <ToolsGateProvider
            initialUnlocked={unlocked}
            source="calculator"
            title="See your results"
            intro="Enter your name and email to unlock this calculation. We'll keep your numbers with your enquiry."
          >
            <MortgageEstimateCalculator />
          </ToolsGateProvider>
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
