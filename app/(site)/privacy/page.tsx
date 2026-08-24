import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Morgan Kaiser",
  description: "Privacy policy placeholder for Morgan Kaiser website and lead forms.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }]} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink">Privacy Policy</h1>
        <p className="mt-2 text-sm text-ink-muted">Placeholder — mark for professional legal review.</p>
        <div className="mt-8 space-y-4 text-ink-muted">
          <p>
            {siteConfig.name} (&quot;we&quot;) collects personal information you submit through forms (such as name,
            email, phone, and investment details) to respond to enquiries and provide requested services.
          </p>
          <p>
            We may use email and messaging providers to notify us of leads. Analytics tools (such as Meta Pixel or
            Google Analytics) may collect usage data when configured. We do not sell your personal information.
          </p>
          <p>
            Contact: use the WhatsApp or email channels published on this site to request access, correction, or
            deletion where applicable under relevant law.
          </p>
          <p className="text-sm">TODO: Replace with counsel-approved privacy policy for UAE / target jurisdictions.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
