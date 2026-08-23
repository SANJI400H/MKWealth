import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use | Morgan Kaiser",
  description: "Terms of use placeholder for the Morgan Kaiser website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }]} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink">Terms of Use</h1>
        <p className="mt-2 text-sm text-ink-muted">Placeholder — mark for professional legal review.</p>
        <div className="mt-8 space-y-4 text-ink-muted">
          <p>
            By using {siteConfig.siteUrl}, you agree to these terms. Content is provided for general information
            about UAE property investment concepts and {siteConfig.name}&apos;s services.
          </p>
          <p>
            Nothing on this site constitutes an offer to sell property, investment advice, tax advice, or legal
            advice. You are responsible for independent due diligence and professional advice relevant to your
            situation.
          </p>
          <p className="text-sm">TODO: Replace with counsel-approved terms.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
