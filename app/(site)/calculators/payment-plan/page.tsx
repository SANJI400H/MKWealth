import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import PaymentPlanCalculator from "@/components/calculators/PaymentPlanCalculator";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Off-Plan Payment Plan Calculator | Morgan Kaiser",
  description:
    "Stress-test construction-linked payment schedules against the cash you can actually deploy.",
  path: "/calculators/payment-plan",
});

export default function PaymentPlanPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "Payment Plan", path: "/calculators/payment-plan" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Off-Plan Payment Plan Calculator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Match SPA instalments to your liquidity. Marketing shorthand is not a cash-flow plan.
        </p>
        <div className="mt-10">
          <PaymentPlanCalculator />
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
