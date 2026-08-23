import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import AnalyseForm from "@/components/forms/AnalyseForm";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Analyse an Investment | Morgan Kaiser",
  description:
    "Ask Morgan Kaiser to underwrite a UAE property opportunity — off-plan or secondary — using your numbers and objectives.",
  path: "/analyse",
});

export default function AnalysePage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Analyse", path: "/analyse" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          {siteConfig.cta.analyse}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Already looking at a unit, brochure, or payment plan? Share the details. Morgan reviews the investment
          mathematics against your objective — not a listing pitch.
        </p>
        <div className="mt-10">
          <Suspense fallback={<p className="text-ink-muted">Loading form…</p>}>
            <AnalyseForm />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
