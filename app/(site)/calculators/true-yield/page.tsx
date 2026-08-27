import type { Metadata } from "next";
import { cookies } from "next/headers";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import TrueYieldCalculator from "@/components/calculators/TrueYieldCalculator";
import { ToolsGateProvider } from "@/components/tools/ToolsGateProvider";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS_ACCESS_COOKIE, verifyToolsAccessCookie } from "@/lib/tools-access";

export const metadata: Metadata = pageMetadata({
  title: "True Yield Calculator | Morgan Kaiser",
  description:
    "Calculate gross yield, net rental income, true capital deployed, and net yield for UAE property — with transparent costs.",
  path: "/calculators/true-yield",
});

export default async function TrueYieldPage() {
  const unlocked = await verifyToolsAccessCookie(cookies().get(TOOLS_ACCESS_COOKIE)?.value);

  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: "True Yield", path: "/calculators/true-yield" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">True Yield Calculator</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">
          Advertised yield is a starting point. This tool shows what happens when acquisition costs and annual
          operating reality enter the maths. Register once to edit inputs and reveal live results.
        </p>
        <div className="mt-10">
          <ToolsGateProvider
            initialUnlocked={unlocked}
            title="Unlock calculator results"
            intro="Enter your name, WhatsApp number, and email to edit assumptions and see your numbers."
          >
            <TrueYieldCalculator />
          </ToolsGateProvider>
        </div>
        <p className="mt-10 max-w-3xl text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
