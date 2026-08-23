import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { morganProfile } from "@/content/morgan-profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Credentials | Morgan Kaiser",
  description: "Verified professional credentials and proof points for Morgan Kaiser — displayed only when confirmed.",
  path: "/credentials",
});

function Row({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:justify-between">
      <dt className="font-medium text-ink">{label}</dt>
      <dd className="text-ink-muted sm:max-w-md sm:text-right">
        {value ?? <span className="italic">TODO — awaiting verified information</span>}
      </dd>
    </div>
  );
}

export default function CredentialsPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Credentials", path: "/credentials" },
          ]}
        />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Credentials</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Only verified proof is shown publicly. Empty fields are intentional placeholders — not omissions to fill
          with invented numbers.
        </p>

        <dl className="mt-10">
          <Row label="Professional title" value={morganProfile.title} />
          <Row label="Company" value={`${morganProfile.company} (${morganProfile.companyRole})`} />
          <Row label="Location" value={morganProfile.location} />
          <Row label="RERA / DLD credential" value={morganProfile.reraOrDldCredential} />
          <Row label="Transaction volume" value={morganProfile.transactionVolume} />
          <Row
            label="Client geographies"
            value={morganProfile.clientGeographies?.join(", ") ?? null}
          />
          <Row label="Awards" value={morganProfile.awards?.join("; ") ?? null} />
          <Row
            label="Media / speaking"
            value={morganProfile.mediaAppearances?.join("; ") ?? null}
          />
          <Row
            label="Years of experience"
            value={morganProfile.yearsExperience != null ? String(morganProfile.yearsExperience) : null}
          />
        </dl>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <BookMeetingLink className="btn-primary w-full sm:w-auto" />
          <Link href="/about" className="btn-ghost-dark w-full justify-center sm:w-auto">
            About Morgan
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
