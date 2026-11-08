"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type GuideItem = { id: string; title: string; index: number };

/**
 * Ordered private player. The video element points at the same-origin media
 * route, which checks the guide cookie. Storage paths never reach the browser.
 */
export default function GuideExperience() {
  const [guides, setGuides] = useState<GuideItem[] | null>(null);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const started = useRef(new Set<string>());
  const armed = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastProgress = useRef(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const response = await fetch("/api/guide/catalog", { credentials: "same-origin", cache: "no-store" });
      if (cancelled) return;
      if (!response.ok) {
        setError("This browser is not unlocked. Submit your details again.");
        setGuides([]);
        return;
      }
      const data = (await response.json()) as { guides?: GuideItem[] };
      setGuides(data.guides ?? []);
    })().catch(() => {
      if (!cancelled) setError("The guides could not be loaded.");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const current = guides?.[index] ?? null;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !current) return;
    const src = `/api/guide/media/${current.id}`;
    let destroyed = false;
    let hls: { destroy: () => void } | null = null;

    const playIfArmed = () => {
      if (armed.current) void video.play().catch(() => undefined);
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      playIfArmed();
    } else {
      void import("hls.js").then(({ default: Hls }) => {
        if (destroyed || !Hls.isSupported()) return;
        const instance = new Hls({
          xhrSetup: (xhr) => {
            xhr.withCredentials = true;
          },
        });
        if (destroyed) {
          instance.destroy();
          return;
        }
        instance.loadSource(src);
        instance.attachMedia(video);
        instance.on(Hls.Events.MANIFEST_PARSED, playIfArmed);
        hls = instance;
      });
    }

    return () => {
      destroyed = true;
      hls?.destroy();
      video.removeAttribute("src");
      video.load();
    };
  }, [current]);

  const report = useCallback((videoId: string, event: "start" | "progress" | "complete", video: HTMLVideoElement | null) => {
    const positionSec = video && Number.isFinite(video.currentTime) ? video.currentTime : null;
    const durationSec = video && Number.isFinite(video.duration) ? video.duration : null;
    void fetch("/api/guide/watch", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId, event, positionSec, durationSec }),
    }).catch(() => undefined);
  }, []);

  const playIndex = (next: number) => {
    if (!guides || next < 0 || next >= guides.length) return;
    lastProgress.current = 0;
    setIndex(next);
  };

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4 px-6 py-20 text-center">
        <p className="text-ink-muted">{error}</p>
        <Link href="/guide" className="font-semibold text-maroon hover:underline">
          Back to the gate
        </Link>
      </div>
    );
  }

  if (!guides || !current) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-20 text-center text-ink-muted">
        Loading the guides…
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-14">
      <div>
        <p className="eyebrow">Private Investor Guide</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{current.title}</h1>
        <p className="mt-2 text-sm text-ink-muted">
          {index + 1} of {guides.length}. The next guide starts when this one ends.
        </p>
      </div>

      <video
        key={current.id}
        ref={videoRef}
        className="aspect-video w-full bg-ink"
        controls
        playsInline
        preload="metadata"
        onPlay={(event) => {
          armed.current = true;
          if (started.current.has(current.id)) return;
          started.current.add(current.id);
          report(current.id, "start", event.currentTarget);
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          if (!Number.isFinite(video.currentTime) || video.currentTime - lastProgress.current < 30) return;
          lastProgress.current = video.currentTime;
          report(current.id, "progress", video);
        }}
        onEnded={(event) => {
          report(current.id, "complete", event.currentTarget);
          if (index < guides.length - 1) playIndex(index + 1);
        }}
      />

      <ol className="grid gap-2">
        {guides.map((guide) => {
          const active = guide.id === current.id;
          return (
            <li key={guide.id}>
              <button
                type="button"
                onClick={() => playIndex(guide.index)}
                className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left ${
                  active ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper text-ink hover:border-ink/30"
                }`}
                aria-current={active ? "true" : undefined}
              >
                <span className="font-display font-bold">{guide.title}</span>
                <span className={`text-xs ${active ? "text-paper/70" : "text-ink-muted"}`}>
                  {String(guide.index + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
