"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { VideoGuide } from "@/content/video-guides";
import { trackEvent } from "@/lib/analytics";

/** Click-to-play YouTube embed — thumbnail only until user clicks (keeps LCP light). */
export default function VideoGuideCard({ guide }: { guide: VideoGuide }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(guide.youtubeId);

  return (
    <article className="flex h-full flex-col border border-silver bg-paper">
      <div className="relative aspect-video overflow-hidden bg-ink/5">
        {playing && hasVideo ? (
          <iframe
            title={guide.title}
            src={`https://www.youtube-nocookie.com/embed/${guide.youtubeId}?autoplay=1&rel=0`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="group absolute inset-0"
            onClick={() => {
              if (!hasVideo) return;
              setPlaying(true);
              trackEvent("watch_video", { video_id: guide.id, platform: "youtube" });
            }}
            disabled={!hasVideo}
            aria-label={hasVideo ? `Play ${guide.title}` : `${guide.title} coming soon`}
          >
            {hasVideo ? (
              <Image
                src={`https://i.ytimg.com/vi/${guide.youtubeId}/hqdefault.jpg`}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-ink/[0.06]" />
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-ink/25">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-paper text-maroon shadow-sm">
                <Play size={22} fill="currentColor" aria-hidden />
              </span>
            </span>
            {!hasVideo ? (
              <span className="absolute bottom-3 left-3 rounded-sm bg-paper/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
                Coming soon
              </span>
            ) : null}
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-maroon">{guide.category}</p>
        <h3 className="font-display text-lg font-bold text-ink">{guide.title}</h3>
        <p className="text-sm leading-relaxed text-ink-muted">{guide.description}</p>
        <p className="text-xs text-ink-muted">{guide.durationLabel}</p>
        <Link href={guide.nextHref} className="text-link mt-auto pt-3">
          {guide.nextLabel} →
        </Link>
      </div>
    </article>
  );
}
