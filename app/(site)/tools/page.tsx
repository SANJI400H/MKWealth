import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import CalculatorToolsCarousel from "@/components/calculators/CalculatorToolsCarousel";
import VideoGuideCard from "@/components/video/VideoGuideCard";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import StickySectionNav from "@/components/ui/StickySectionNav";
import { calculators } from "@/content/calculators";
import { toolsSectionNav } from "@/content/navigation";
import { videoGuides } from "@/content/video-guides";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Investment Tools | Morgan Kaiser",
  description:
    "UAE property calculators. Edit the inputs and read the results on the page.",
  path: "/tools",
});

const sectionAnchor = {
  scrollMarginTop: "calc(4rem + env(safe-area-inset-top, 0px) + 5.75rem)",
};

export default function ToolsPage() {
  const liveCalculators = calculators.filter((tool) => tool.status === "live");

  return (
    <main className="page-shell">
      <Breadcrumbs
        visible={false}
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ]}
      />

      <StickySectionNav
        items={toolsSectionNav}
        layoutId="tools-section-pill"
        ariaLabel="Tools sections"
        className="mt-8"
      />

      <section id="overview" className="pt-10" style={sectionAnchor}>
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Tools</h1>
        <p className="mt-3 text-lg text-ink-muted">Calculators and video guides for working the numbers.</p>
        <p className="body-copy mt-8">
          Browse the calculators and edit the inputs. Results stay on the page. The video guides play when you click.
        </p>
        <dl className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="border border-silver bg-surface px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Calculators</dt>
            <dd className="mt-2 font-display text-lg font-bold text-ink">{liveCalculators.length} open</dd>
          </div>
          <div className="border border-silver bg-surface px-4 py-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Video guides</dt>
            <dd className="mt-2 font-display text-lg font-bold text-ink">{videoGuides.length} films</dd>
          </div>
        </dl>
      </section>

      <section id="calculators" className="page-block space-y-4" style={sectionAnchor}>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Calculators</h2>
        <p className="body-copy">True yield, purchase costs, payment plans, and a mortgage estimate.</p>
        <CalculatorToolsCarousel />
      </section>

      <section id="video-guides" className="page-block space-y-4" style={sectionAnchor}>
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Video guides</h2>
        <p className="body-copy">Short guides. The player starts only when you click play.</p>
        <ul className="grid gap-6 sm:grid-cols-2">
          {videoGuides.map((guide) => (
            <li key={guide.id}>
              <VideoGuideCard guide={guide} />
            </li>
          ))}
        </ul>
      </section>

      <section className="page-block">
        <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Also in tools</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          <li className="card-lift border border-silver bg-paper px-5 py-5">
            <h3 className="font-display text-xl font-bold text-ink">True Cost worksheet</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Buying costs before you reserve.</p>
            <Link href="/true-cost" className="mt-4 inline-flex text-sm font-semibold text-maroon hover:underline">
              Open worksheet
            </Link>
          </li>
          <li className="card-lift border border-silver bg-paper px-5 py-5">
            <h3 className="font-display text-xl font-bold text-ink">Investor Guide</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">Private library. Qualify for access.</p>
            <Link href="/guide" className="mt-4 inline-flex text-sm font-semibold text-maroon hover:underline">
              Watch Free Guide
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-14 flex flex-col gap-3 border-t border-line pt-10 sm:flex-row">
        <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
        <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
          Watch Free Guide
        </Link>
      </div>
    </main>
  );
}
