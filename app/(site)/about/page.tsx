import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import PageContents from "@/components/ui/PageContents";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { aboutSectionNav } from "@/content/navigation";
import { morganProfile } from "@/content/morgan-profile";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About Morgan Kaiser | UAE Property Portfolio Strategist",
  description:
    "About Morgan Kaiser — UAE Property Portfolio Strategist and Associate Director at Huspy. Vision first, strategy second, property third.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <main className="page-shell">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Morgan", path: "/about" }]} />

        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-surface sm:mt-10">
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
          <p className="mt-8 leading-relaxed text-ink-muted">
            Morgan advises international investors who want UAE property exposure without a developer inventory
            pitch. The work begins with vision and strategy — then underwriting and acquisition — with coordination of
            financing and ownership pathways where relevant.
          </p>
          <p className="mt-4 leading-relaxed text-ink-muted">{morganProfile.huspyLine}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{morganProfile.idealClientFilter}</p>

          <PageContents
            items={aboutSectionNav.filter((item) => item.id !== "overview")}
            label="In this page"
          />
        </section>

        <section id="story" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Story</h2>
          <p className="leading-relaxed text-ink-muted">{morganProfile.about.careerStory}</p>
          <p className="leading-relaxed text-ink-muted">{morganProfile.about.internationalExperience}</p>
        </section>

        <section id="philosophy" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investment philosophy</h2>
          <div className="space-y-2">
            {morganProfile.philosophyLines.map((line) => (
              <p key={line} className="font-display text-2xl font-bold text-maroon sm:text-3xl">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-ink-muted">
            Investor objective, capital, time horizon, liquidity, desired return, acceptable risk, and exit strategy
            come before property selection.
          </p>
          <p className="leading-relaxed text-ink-muted">{morganProfile.about.whyNumbersFirst}</p>
        </section>

        <section id="methodology" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Investment methodology</h2>
          <p className="leading-relaxed text-ink-muted">{morganProfile.about.methodology}</p>
          <p className="leading-relaxed text-ink-muted">{morganProfile.about.howClientsWork}</p>
          <p className="text-sm leading-relaxed text-ink-muted">{morganProfile.currentMixNote}</p>
        </section>

        <section id="credentials" className="page-block space-y-4">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Credentials & recognition</h2>
          <p className="leading-relaxed text-ink-muted">
            Only verified proof is listed. Brokerage unit-volume is intentionally not used as a public proof device.
          </p>
          <dl className="mt-2 space-y-0 text-sm">
            <div className="flex justify-between gap-4 border-b border-line py-3.5">
              <dt className="text-ink-muted">Company role</dt>
              <dd className="text-right text-ink">
                {morganProfile.company} · {morganProfile.companyRole}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3.5">
              <dt className="text-ink-muted">RERA</dt>
              <dd className="text-right text-ink">{morganProfile.reraOrDldCredential}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3.5">
              <dt className="text-ink-muted">Awards</dt>
              <dd className="text-right text-ink">{morganProfile.awards.join("; ")}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line py-3.5">
              <dt className="text-ink-muted">Personal portfolio</dt>
              <dd className="max-w-sm text-right text-ink">{morganProfile.personalPortfolioNote}</dd>
            </div>
          </dl>
          <Link href="/credentials" className="inline-block text-sm font-semibold text-maroon hover:underline">
            Full credentials page →
          </Link>
        </section>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Work With Morgan
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
