import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Client Portal | Morgan Kaiser",
  description:
    "Secure access for current investors. Portfolio maintenance and private property dashboard.",
  path: "/portal",
  noIndex: true,
});

/**
 * Private Desk and Client Portal share this entry.
 * When the hosted dashboard URL is set, send investors straight there.
 */
export default function PortalPage() {
  const portalUrl = siteConfig.clientPortalUrl;
  if (portalUrl) {
    redirect(portalUrl);
  }

  return (
    <>
      <main className="page-shell">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Client Portal", path: "/portal" },
          ]}
        />

        <p className="eyebrow">Current investors · Private Desk</p>
        <h1 className="page-h1">Client Portal</h1>
        <p className="page-lead">
          Restricted access for investors who already work with Morgan. When the hosted dashboard URL
          is configured, this page opens it directly. Until then, message Morgan for your login link.
        </p>

        <section className="mt-12 max-w-xl space-y-6 border-t border-line pt-10">
          <div className="rounded-md border border-line bg-ink/[0.03] px-5 py-6">
            <p className="font-display text-lg font-bold text-ink">Portal link pending</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Set <code className="text-xs">NEXT_PUBLIC_CLIENT_PORTAL_URL</code> to your Private Wealth
              Dashboard host. Nav items Portal and Private Desk will then open that URL.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <WhatsAppLink
                message="Hi Morgan — I'm an existing client and need my Client Portal login link."
                className="btn-primary w-full justify-center sm:w-auto"
              >
                WhatsApp Morgan
              </WhatsAppLink>
            </div>
          </div>
        </section>

        <section className="mt-14 max-w-xl space-y-4 border-t border-line pt-10">
          <h2 className="font-display text-xl font-bold text-ink">Not a client yet?</h2>
          <p className="text-sm text-ink-muted">
            Complete the Investor Guide qualification to unlock videos and briefings, then book a
            strategy session.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Investor Guide
            </Link>
            <Link href="/strategy-session" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Strategy session
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
