import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import HubVideoPlayer from "@/components/videos/HubVideoPlayer";
import { getPublishedIntelligenceVideos } from "@/content/intelligence-videos";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Videos | Morgan Kaiser",
  description: "Watch Morgan Kaiser orientation clips — positioning, process, and investor education.",
  path: "/videos",
});

export default function VideosHubPage() {
  const videos = getPublishedIntelligenceVideos();

  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Videos", path: "/videos" }]} />
        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">Videos</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Orientation clips from the site experience. No view counts, no hype metrics — watch for framing, then use
          the tools.
        </p>

        <ul className="mt-12 space-y-14">
          {videos.map((v) => (
            <li key={v.slug}>
              <p className="eyebrow capitalize">{v.category}</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">{v.title}</h2>
              <p className="mt-2 text-ink-muted">{v.description}</p>
              {v.src ? (
                <div className="mt-5 overflow-hidden border border-line">
                  <HubVideoPlayer src={v.src} title={v.title} slug={v.slug} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="mt-14 text-sm text-ink-muted">
          Prefer numbers? Open{" "}
          <Link href="/the-real-numbers" className="font-semibold text-maroon hover:underline">
            The Real Numbers
          </Link>{" "}
          or{" "}
          <Link href="/calculators" className="font-semibold text-maroon hover:underline">
            calculators
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
