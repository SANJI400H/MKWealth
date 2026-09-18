import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import TrueCostGate from "@/components/forms/TrueCostLeadForm";
import { trueCostWorksheet } from "@/content/true-cost-worksheet";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "True Cost Worksheet | Dubai Property Buying Costs | Morgan Kaiser",
  description:
    "Unlock Morgan Kaiser’s True Cost of Buying in Dubai checklist — acquisition fees, yield sanity checks, and questions before you reserve.",
  path: "/true-cost",
});

export default function TrueCostPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "True Cost worksheet", path: "/true-cost" },
          ]}
        />

        <p className="mt-8 eyebrow text-center">Lead magnet · Comment COST</p>
        <h1 className="mx-auto mt-4 max-w-2xl text-center font-display text-4xl font-bold leading-[1.1] text-ink sm:text-5xl">
          {trueCostWorksheet.title}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-ink-muted">{trueCostWorksheet.subtitle}</p>

        <div className="mx-auto mt-10 max-w-md">
          <TrueCostGate>
            <section className="mx-auto mt-14 max-w-xl border-t border-line pt-10 text-center">
              <h2 className="font-display text-2xl font-bold text-ink">Next step</h2>
              <p className="mt-3 text-ink-muted">
                Want Morgan to run the numbers on a live unit? Request a 30-minute strategy session — he reviews
                each request and sends a Google Meet invite if approved.
              </p>
              <Link href="/strategy-session" className="btn-primary mt-6 inline-flex w-full justify-center sm:w-auto">
                Request strategy session
              </Link>
              <p className="mt-4 text-sm text-ink-muted">
                <Link href="/video-guides" className="font-semibold text-maroon hover:underline">
                  Watch Video Guides →
                </Link>
              </p>
            </section>
          </TrueCostGate>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
