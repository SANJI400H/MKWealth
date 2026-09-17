"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { SocialFeed, SocialVideoItem } from "@/lib/social/types";
import { siteConfig } from "@/lib/site-config";

type Mode = "latest" | "mostViewed";

function mergeRow(feed: SocialFeed, mode: Mode): SocialVideoItem[] {
  const yt = feed.youtube[mode].slice(0, 3);
  const ig = feed.instagram[mode].slice(0, 3);
  return [...yt, ...ig];
}

function PlatformMark({ platform }: { platform: SocialVideoItem["platform"] }) {
  return (
    <span className="absolute left-2 top-2 bg-maroon-dark/90 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
      {platform === "youtube" ? "YouTube" : "Instagram"}
    </span>
  );
}

function Tile({
  item,
  onPlay,
}: {
  item: SocialVideoItem;
  onPlay: (item: SocialVideoItem) => void;
}) {
  const isYt = item.platform === "youtube";

  return (
    <button
      type="button"
      onClick={() => {
        if (isYt) onPlay(item);
        else window.open(item.url, "_blank", "noopener,noreferrer");
      }}
      className="group relative w-[72vw] max-w-[17rem] shrink-0 snap-start text-left sm:w-auto sm:max-w-none"
      aria-label={
        isYt ? `Play ${item.title}` : `Open Instagram: ${item.title}`
      }
    >
      <div
        className={`relative overflow-hidden border border-silver bg-surface ${
          isYt ? "aspect-video" : "aspect-[4/5] sm:aspect-video"
        }`}
      >
        <Image
          src={item.thumbnailUrl}
          alt=""
          fill
          sizes="(min-width: 640px) 16rem, 72vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          unoptimized={item.thumbnailUrl.includes("cdninstagram") || item.thumbnailUrl.includes("fbcdn")}
        />
        <PlatformMark platform={item.platform} />
        <span className="absolute inset-0 flex items-center justify-center bg-ink/0 transition group-hover:bg-ink/20">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-white shadow-sm transition group-hover:scale-105">
            <Play size={14} fill="currentColor" aria-hidden />
          </span>
        </span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-ink">{item.title}</p>
    </button>
  );
}

export default function SocialStripClient({ feed }: { feed: SocialFeed }) {
  const [mode, setMode] = useState<Mode>("latest");
  const [active, setActive] = useState<SocialVideoItem | null>(null);
  const titleId = useId();
  const items = mergeRow(feed, mode);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close]);

  if (!items.length) return null;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Social video mode">
        {(
          [
            { id: "latest", label: "Latest" },
            { id: "mostViewed", label: "Most viewed" },
          ] as const
        ).map((tab) => {
          const selected = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMode(tab.id)}
              className={`min-h-10 rounded-full px-4 text-[12px] font-semibold tracking-[-0.01em] transition ${
                selected
                  ? "bg-maroon text-white"
                  : "border border-silver text-ink-muted hover:border-maroon hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="no-scrollbar mt-6 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-6"
        role="tabpanel"
      >
        {items.map((item) => (
          <Tile key={`${mode}-${item.platform}-${item.id}`} item={item} onPlay={setActive} />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:gap-6">
        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          YouTube channel →
        </a>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Instagram →
        </a>
      </div>

      {active?.platform === "youtube" ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/70 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative w-full max-w-3xl border border-silver bg-paper p-3 sm:p-4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 id={titleId} className="min-w-0 flex-1 font-display text-lg font-bold leading-snug text-ink line-clamp-2 sm:text-xl">
                {active.title}
              </h3>
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center text-ink-muted hover:text-ink"
                aria-label="Close video"
                onClick={close}
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden bg-ink">
              <iframe
                title={active.title}
                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
