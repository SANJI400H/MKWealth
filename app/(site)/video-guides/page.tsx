import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import VideoGuideCard from "@/components/video/VideoGuideCard";
import { videoGuides } from "@/content/video-guides";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Video Guides | UAE Property Education | Morgan Kaiser",
  description:
    "Watch Morgan Kaiser’s UAE property video guides — True Cost, off-plan, yield, and strategy. Click to play; next steps on every guide.",
  path: "/video-guides",
});

function videoJsonLd() {
  const published = videoGuides.filter((g) => g.youtubeId);
  if (published.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@graph": published.map((g) => ({
      "@type": "VideoObject",
      name: g.title,
      description: g.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${g.youtubeId}/hqdefault.jpg`,
      uploadDate: new Date().toISOString().slice(0, 10),
      duration: g.durationIso,
      contentUrl: `https://www.youtube.com/watch?v=${g.youtubeId}`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${g.youtubeId}`,
      publisher: {
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.siteUrl,
      },
    })),
  };
}

export default function VideoGuidesPage() {
  const jsonLd = videoJsonLd();

  return (
    <>
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      ) : null}
      <main className="page-shell">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Video Guides", path: "/video-guides" },
          ]}
        />

        <p className="mt-8 eyebrow">Education</p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold text-ink sm:text-5xl">Video Guides</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-muted">
          Short, numbers-led guides for international investors. Thumbnails load instantly — the player starts
          only when you click play.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {videoGuides.map((guide) => (
            <li key={guide.id}>
              <VideoGuideCard guide={guide} />
            </li>
          ))}
        </ul>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-display text-2xl font-bold text-ink">Keep going</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/true-cost" className="btn-primary w-full justify-center sm:w-auto">
              True Cost worksheet
            </Link>
            <Link href="/strategy-session" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Request strategy session
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink-muted">
            Prefer the private Investor Guide library?{" "}
            <Link href="/guide" className="font-semibold text-maroon hover:underline">
              Qualify for access →
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
