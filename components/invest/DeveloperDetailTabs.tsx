"use client";

import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { developerDetailNav } from "@/content/navigation";
import type { Developer } from "@/content/developers";
import { siteConfig } from "@/lib/site-config";
import { regulatory } from "@/content/regulatory";

export default function DeveloperDetailTabs({ developer }: { developer: Developer }) {
  const d = developer;

  return (
    <>
      <PageIntro title={d.name} lead={d.tagline}>
        {d.workingNote ? (
          <p className="mt-6 border border-line bg-surface px-4 py-3 text-sm text-ink-muted">{d.workingNote}</p>
        ) : null}
      </PageIntro>

      <StickySectionNav
        items={developerDetailNav}
        layoutId={`developer-section-${d.slug}`}
        ariaLabel={`${d.name} topics`}
        className="mt-8"
      />

      <section id="overview" className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)] mt-10">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Overview</h2>
        <p className="body-copy mt-4">{d.overview}</p>
      </section>

      <section id="experience" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Morgan&apos;s experience</h2>
        <p className="mt-4 rounded-sm border border-line px-4 py-3 text-sm text-ink-muted">{d.morganExperience}</p>
      </section>

      <section id="track-record" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Track record</h2>
        <p className="body-copy mt-4">{d.trackRecord}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
          {d.projects.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="delivery" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Delivery considerations</h2>
        <p className="body-copy mt-4">{d.deliveryNotes}</p>
      </section>

      <section id="payment" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Payment-plan analysis</h2>
        <p className="body-copy mt-4">{d.paymentPlanNotes}</p>
        <p className="mt-4">
          <Link href="/calculators/payment-plan" className="font-semibold text-maroon hover:underline">
            Open payment plan calculator →
          </Link>
        </p>
      </section>

      <section id="suitability" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Investor suitability</h2>
        <p className="body-copy mt-4">{d.suitability}</p>
      </section>

      <section id="risks" className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink">Risks</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink-muted">
          {d.risks.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      {d.relatedInsightSlugs?.length ? (
        <p className="body-copy mt-12">
          Related:{" "}
          {d.relatedInsightSlugs.map((slug, i) => (
            <span key={slug}>
              {i > 0 ? " · " : null}
              <Link href={`/insights/${slug}`} className="font-semibold text-maroon hover:underline">
                {slug.replace(/-/g, " ")}
              </Link>
            </span>
          ))}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
          {siteConfig.cta.strategySession}
        </Link>
        <Link href="/developers" className="btn-ghost-dark w-full justify-center sm:w-auto">
          All developers
        </Link>
      </div>
      <p className="body-copy-sm mt-10">{regulatory.disclaimerShort}</p>
    </>
  );
}
