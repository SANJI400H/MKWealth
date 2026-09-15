"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Download, FileText, Play } from "lucide-react";
import {
  guideCategories,
  reportsForCategories,
  videosForCategories,
  type GuideCategoryId,
  type GuideVideo,
} from "@/content/guide-library";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

type Step = "categories" | "library";

const WATCH_THRESHOLD = 0.75;

function GuideVideoPlayer({
  video,
  onWatched,
  onDownloadClick,
  watched,
  downloaded,
}: {
  video: GuideVideo;
  onWatched: () => void;
  onDownloadClick: () => void;
  watched: boolean;
  downloaded: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const armedRef = useRef(false);

  const markWatched = () => {
    if (armedRef.current) return;
    armedRef.current = true;
    onWatched();
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="eyebrow">Video</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{video.title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">{video.summary}</p>
      </div>

      {failed ? (
        <div className="relative aspect-video overflow-hidden bg-ink/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.poster} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/35 px-6 text-center">
            <p className="text-sm font-semibold text-paper">Video coming soon</p>
          </div>
        </div>
      ) : (
        <video
          key={video.id}
          controls
          playsInline
          poster={video.poster}
          className="w-full bg-ink/5"
          preload="metadata"
          onError={() => setFailed(true)}
          onEnded={markWatched}
          onTimeUpdate={(e) => {
            const el = e.currentTarget;
            if (!el.duration || !Number.isFinite(el.duration)) return;
            if (el.currentTime / el.duration >= WATCH_THRESHOLD) markWatched();
          }}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          {watched ? (
            <span className="inline-flex items-center gap-1.5 text-ink">
              <Check size={14} strokeWidth={1.75} aria-hidden /> Watched
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5">
              <Play size={14} strokeWidth={1.75} aria-hidden /> Watch to progress
            </span>
          )}
          {downloaded ? (
            <span className="inline-flex items-center gap-1.5 text-ink">
              <Check size={14} strokeWidth={1.75} aria-hidden /> Downloaded
            </span>
          ) : null}
        </div>

        <a
          href={video.src}
          download={video.downloadName}
          onClick={onDownloadClick}
          className="btn-ghost-dark inline-flex items-center justify-center gap-2"
        >
          <Download size={16} strokeWidth={1.5} aria-hidden />
          Download video
        </a>
      </div>
    </div>
  );
}

/** Library only — rendered after guide access is approved. */
export default function GuideExperience() {
  const [step, setStep] = useState<Step>("categories");
  const [selected, setSelected] = useState<GuideCategoryId[]>([]);
  const [videoIndex, setVideoIndex] = useState(0);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);
  const [downloadedIds, setDownloadedIds] = useState<string[]>([]);

  const videos = useMemo(() => videosForCategories(selected), [selected]);
  const reports = useMemo(() => reportsForCategories(selected), [selected]);
  const activeVideo = videos[videoIndex] ?? null;

  const engagementCount = useMemo(() => {
    const ids = new Set([...watchedIds, ...downloadedIds]);
    return videos.filter((video) => ids.has(video.id)).length;
  }, [videos, watchedIds, downloadedIds]);

  const toggleCategory = (id: GuideCategoryId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const markWatched = (id: string) => {
    setWatchedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    trackEvent("watch_video", { video_id: id, threshold: "75pct" });
  };

  const markDownloaded = (id: string) => {
    setDownloadedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    trackEvent("guide_download", { asset: "video", id });
  };

  if (step === "categories") {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-14">
        <div className="text-center">
          <p className="eyebrow">Private library</p>
          <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">What do you want to cover?</h1>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">Pick topics to open your videos and PDF briefings.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {guideCategories.map((category) => {
            const active = selected.includes(category.id);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`rounded-md border px-4 py-4 text-left transition ${
                  active ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper text-ink hover:border-ink/30"
                }`}
                aria-pressed={active}
              >
                <span className="block font-display text-base font-bold">{category.label}</span>
                <span className={`mt-1.5 block text-sm leading-snug ${active ? "text-paper/75" : "text-ink-muted"}`}>
                  {category.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="btn-primary disabled:opacity-50"
            disabled={selected.length === 0}
            onClick={() => {
              setVideoIndex(0);
              setStep("library");
            }}
          >
            Continue to videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-12 px-6 py-12">
      <div className="text-center">
        <p className="eyebrow">Your library</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">Your videos & reports</h1>
        <p className="mx-auto mt-3 max-w-lg text-ink-muted">
          Private access for approved investors. Existing clients use the Client Portal for portfolios.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {selected.map((id) => {
            const label = guideCategories.find((category) => category.id === id)?.label ?? id;
            return (
              <span key={id} className="rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink-muted">
                {label}
              </span>
            );
          })}
          <button
            type="button"
            onClick={() => setStep("categories")}
            className="text-xs font-medium text-maroon underline-offset-2 hover:underline"
          >
            Edit topics
          </button>
        </div>
      </div>

      <section aria-label="Guide videos" className="border-t border-line pt-10">
        {activeVideo ? (
          <>
            <div className="mb-6 flex items-center justify-between gap-3 text-sm text-ink-muted">
              <p>
                Video {videoIndex + 1} of {videos.length}
              </p>
              <p>
                {engagementCount} video{engagementCount === 1 ? "" : "s"} engaged
              </p>
            </div>

            <GuideVideoPlayer
              video={activeVideo}
              watched={watchedIds.includes(activeVideo.id)}
              downloaded={downloadedIds.includes(activeVideo.id)}
              onWatched={() => markWatched(activeVideo.id)}
              onDownloadClick={() => markDownloaded(activeVideo.id)}
            />

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                type="button"
                className="btn-ghost-dark inline-flex items-center gap-1.5 disabled:opacity-40"
                disabled={videoIndex <= 0}
                onClick={() => setVideoIndex((index) => Math.max(0, index - 1))}
              >
                <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
                Previous
              </button>
              <button
                type="button"
                className="btn-ghost-dark inline-flex items-center gap-1.5 disabled:opacity-40"
                disabled={videoIndex >= videos.length - 1}
                onClick={() => setVideoIndex((index) => Math.min(videos.length - 1, index + 1))}
              >
                Next
                <ChevronRight size={16} strokeWidth={1.5} aria-hidden />
              </button>
            </div>
          </>
        ) : (
          <p className="text-ink-muted">No videos for the selected topics yet.</p>
        )}
      </section>

      <section aria-label="PDF reports" className="border-t border-line pt-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">PDF reports</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink">Downloadable briefings</h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1 text-xs text-ink">
            <Check size={13} strokeWidth={1.75} aria-hidden />
            Unlocked
          </span>
        </div>

        <ul className="mt-6 grid gap-3">
          {reports.map((report) => (
            <li
              key={report.id}
              className="flex flex-col gap-3 border border-ink/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <FileText size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-maroon" aria-hidden />
                <div>
                  <p className="font-display text-base font-bold text-ink">{report.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{report.summary}</p>
                </div>
              </div>
              <a
                href={report.href}
                download={report.fileName}
                onClick={() => trackEvent("guide_download", { asset: "pdf", id: report.id })}
                className="btn-ghost-dark inline-flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                <Download size={15} strokeWidth={1.5} aria-hidden />
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line pt-10 text-center">
        <p className="text-sm text-ink-muted">
          Already investing with Morgan?{" "}
          <Link href={siteConfig.clientPortalUrl || "/portal"} className="font-semibold text-maroon hover:underline">
            Open Client Portal
          </Link>
        </p>
      </section>
    </div>
  );
}
