import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { morganProfile } from "@/content/morgan-profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Credentials | Morgan Kaiser",
 description: "Verified professional credentials and proof points for Morgan Kaiser, displayed only when confirmed.",
 path: "/credentials",
});

function Row({ label, value }: { label: string; value: string | null | undefined }) {
 return (
 <div className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:justify-between">
 <dt className="font-medium text-ink">{label}</dt>
 <dd className="text-ink-muted sm:max-w-md sm:text-right">
 {value ?? <span className="italic">Not published yet</span>}
 </dd>
 </div>
 );
}

export default function CredentialsPage() {
 return (
 <>
 <main className="page-shell">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Credentials", path: "/credentials" },
 ]}
 />
 <h1 className="page-h1">Credentials</h1>
 <p className="page-lead">
 Only verified proof is shown publicly. Brokerage unit-volume is intentionally omitted, results should speak
 through process and permissioned case studies, not sold-sign theatre.
 </p>

 <dl className="mt-10">
 <Row label="Professional title" value={morganProfile.title} />
 <Row label="Entity framing" value={morganProfile.entityLine} />
 <Row label="Company" value={`${morganProfile.company} (${morganProfile.companyRole})`} />
 <Row label="Location" value={morganProfile.location} />
 <Row label="RERA broker number" value={morganProfile.reraOrDldCredential} />
 <Row label="Awards" value={morganProfile.awards.join("; ")} />
 <Row label="Personal portfolio" value={morganProfile.personalPortfolioNote} />
 <Row label="Assets under management (stated)" value={morganProfile.aumNote} />
 <Row label="Earnings framing (stated)" value={morganProfile.earningsNote} />
 <Row label="Brokerage transaction volume" value={morganProfile.transactionVolume} />
 <Row label="Client geographies" value={morganProfile.clientGeographies.join(", ")} />
 <Row
 label="Media / speaking"
 value={morganProfile.mediaAppearances?.join("; ") ?? null}
 />
 <Row
 label="Years of experience"
 value={morganProfile.yearsExperience != null ? String(morganProfile.yearsExperience) : null}
 />
 </dl>

 <div className="mt-12 cta-row">
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
