import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import SectionNavigation from "@/components/ui/SectionNavigation";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { aboutSectionNav } from "@/content/navigation";
import { morganProfile } from "@/content/morgan-profile";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "About Morgan Kaiser | UAE Property Portfolio Strategist",
  description:
    "About Morgan Kaiser — UAE Property Portfolio Strategist and Associate Director at Huspy. Vision first, strategy second, property third.",
  path: "/about",
});

function Placeholder({ children }: { children: string }) {
  return (
    <p className="rounded-sm border border-dashed border-line bg-ink/[0.02] px-4 py-3 text-sm text-ink-muted">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Morgan", path: "/about" }]} />

        <SectionNavigation
          items={aboutSectionNav}
          cta={{ label: "Client Results", href: "/case-studies" }}
        />

        <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
          <Image
            src="/images/morgan-portrait.jpg"
            alt="Morgan Kaiser"
            fill
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <section id="overview" className="scroll-mt-28 pt-10">
          <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {morganProfile.name}
          </h1>
          <p className="mt-3 text-lg text-ink-muted">{morganProfile.title}</p>
          <p className="mt-1 text-sm text-ink-muted">
            {morganProfile.companyRole} at {morganProfile.company} · {morganProfile.location}
          </p>
          <p className="mt-8 text-ink-muted leading-relaxed">
            Morgan advises international investors who want UAE property exposure without a developer inventory
            pitch. The work begins with vision and strategy — then underwriting and acquisition across off-plan and
            secondary where the brief fits — with coordination of financing and ownership pathways where relevant.
          </p>
          <p className="mt-4 text-ink-muted leading-relaxed">{morganProfile.huspyLine}</p>
        </section>

        <section id="story" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Story</h2>
          <Placeholder>{morganProfile.aboutPlaceholders.careerStory}</Placeholder>
        </section>

        <section id="philosophy" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Investment philosophy</h2>
          <div className="space-y-2">
            {morganProfile.philosophyLines.map((line) => (
              <p key={line} className="font-display text-2xl font-bold text-maroon sm:text-3xl">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 text-ink-muted leading-relaxed">
            Investor objective, capital, time horizon, liquidity, desired return, acceptable risk, and exit strategy
            come before property selection.
          </p>
          <Placeholder>{morganProfile.aboutPlaceholders.whyNumbersFirst}</Placeholder>
        </section>

        <section id="methodology" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Investment methodology</h2>
          <Placeholder>{morganProfile.aboutPlaceholders.methodology}</Placeholder>
          <p className="text-sm text-ink-muted">
            Typical arc: clarify brief → underwrite options → acquire when the maths fits → coordinate financing /
            ownership where needed.
          </p>
          <Placeholder>{morganProfile.aboutPlaceholders.howClientsWork}</Placeholder>
        </section>

        <section id="credentials" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Credentials & recognition</h2>
          <p className="text-ink-muted">
            Only verified proof is listed. Empty fields are intentional until Morgan confirms details.
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-line py-3">
              <dt className="text-ink-muted">Company role</dt>
              <dd className="text-ink">
                {morganProfile.company} · {morganProfile.companyRole}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3">
              <dt className="text-ink-muted">RERA / DLD</dt>
              <dd className="text-ink-muted italic">
                {morganProfile.reraOrDldCredential ?? "TODO — awaiting verified credential"}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3">
              <dt className="text-ink-muted">Awards</dt>
              <dd className="text-ink-muted italic">
                {morganProfile.awards?.join("; ") ?? "TODO — awaiting verified awards"}
              </dd>
            </div>
          </dl>
          <Link href="/credentials" className="text-sm font-semibold text-maroon hover:underline">
            Full credentials page →
          </Link>
        </section>

        <section id="media" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Media & appearances</h2>
          <Placeholder>
            {morganProfile.mediaAppearances?.join("; ") ??
              "TODO: Morgan discovery — media, podcast, and speaking appearances with evidence."}
          </Placeholder>
        </section>

        <section id="results" className="scroll-mt-28 mt-14 space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink">Client results</h2>
          <p className="text-ink-muted">
            Case studies and testimonials publish only when genuine and approved.
          </p>
          <Link href="/case-studies" className="btn-ghost-dark">
            View case studies →
          </Link>
        </section>

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/analyse" className="btn-ghost-dark w-full justify-center sm:w-auto">
            {siteConfig.cta.analyse}
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
