import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import TrueYieldCalculator from "@/components/calculators/TrueYieldCalculator";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "True Yield Calculator | Morgan Kaiser",
  description:
    "Calculate gross yield, net rental income, true capital deployed, and net yield for UAE property — with transparent costs.",
  path: "/calculators/true-yield",
});

export default function TrueYieldPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Calculators", path: "/calculators" },
            { name: "True Yield", path: "/calculators/true-yield" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">True Yield Calculator</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Advertised yield is a starting point. This tool shows what happens when acquisition costs and annual
          operating reality enter the maths.
        </p>
        <div className="mt-10">
          <TrueYieldCalculator />
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
