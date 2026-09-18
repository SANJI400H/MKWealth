import type { Metadata } from "next";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import PaymentPlanCalculator from "@/components/calculators/PaymentPlanCalculator";
import { ToolsGateProvider } from "@/components/tools/ToolsGateProvider";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS_ACCESS_COOKIE, verifyToolsAccessCookie } from "@/lib/tools-access";

export const metadata: Metadata = pageMetadata({
  title: "Off-Plan Payment Plan Calculator | Morgan Kaiser",
  description:
    "Stress-test construction-linked payment schedules against the cash you can actually deploy.",
  path: "/calculators/payment-plan",
});

export default async function PaymentPlanPage() {
  const unlocked = await verifyToolsAccessCookie(cookies().get(TOOLS_ACCESS_COOKIE)?.value);

  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "Payment Plan", path: "/calculators/payment-plan" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Off-Plan Payment Plan Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Match SPA instalments to your liquidity. Edit the schedule freely; name and email unlock the liquidity check.
        </p>
        <div className="mt-10">
 <ToolsGateProvider
 initialUnlocked={unlocked}
 source="calculator"
 title="See your results"
 intro="Enter your name and email to unlock this calculation. We'll keep your numbers with your enquiry."
 >
            <PaymentPlanCalculator />
          </ToolsGateProvider>
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
