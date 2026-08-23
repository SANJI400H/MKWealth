"use client";

import { useRef } from "react";
import { trackEvent } from "@/lib/analytics";

export default function HubVideoPlayer({
  src,
  title,
  slug,
}: {
  src: string;
  title: string;
  slug: string;
}) {
  const fired = useRef(false);

  return (
    <video
      className="aspect-video w-full bg-ink object-cover"
      controls
      playsInline
      preload="metadata"
      aria-label={title}
      onPlay={() => {
        if (fired.current) return;
        fired.current = true;
        trackEvent("watch_video", { content_name: slug });
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
