"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useCinemaCue, type CinemaId } from "@/components/motion/CinemaController";

type Phase = "idle" | "playing" | "done";
type PanelSide = "left" | "right";
type Layout = "bleed" | "split";

interface CinemaPlaySceneProps {
  actId: CinemaId;
  src: string;
  alt: string;
  /** Fraction of duration (0–1) when copy reveals. */
  textRevealAt?: number;
  objectPosition?: string;
  /** bleed: full video + sliding white panel. split: paper page + contained video. */
  layout?: Layout;
  /** Side the white panel slides in from (bleed), or which side holds the video (split). */
  panelSide?: PanelSide;
  /** Contained video width in split layout — default ~half, narrow is smaller. */
  mediaSize?: "half" | "narrow";
  /** bleed only: solid white sliding panel (default) vs text-only fade over video. */
  solidPanel?: boolean;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}

const FALLBACK_MS = 8000;

/**
 * bleed — full-bleed video, white copy panel slides in at textRevealAt.
 * split — white paper + contained video (better when copy needs room).
 */
export default function CinemaPlayScene({
  actId,
  src,
  alt,
  textRevealAt = 0.5,
  objectPosition = "center",
  layout = "bleed",
  panelSide = "left",
  mediaSize = "half",
  solidPanel = true,
  children,
  className = "",
}: CinemaPlaySceneProps) {
  const cinema = useCinemaCue();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const revealArmedRef = useRef(false);
  const homeBootedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>("idle");
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [copyRevealed, setCopyRevealed] = useState(false);
  const isHome = actId === "home";

  const cue = cinema?.cue;
  const cueToken = cue?.token;
  const cueId = cue?.id;
  const cueMode = cue?.mode;

  const setPhaseBoth = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  const clearFallback = () => {
    if (fallbackRef.current) {
      clearTimeout(fallbackRef.current);
      fallbackRef.current = null;
    }
  };

  const freezeLastFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    const duration = video.duration;
    if (Number.isFinite(duration) && duration > 0) {
      try {
        video.currentTime = Math.max(duration - 0.05, 0);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const markPlayed = cinema?.markPlayed;

  const revealCopy = useCallback(() => {
    if (revealArmedRef.current) return;
    revealArmedRef.current = true;
    setCopyRevealed(true);
  }, []);

  const showFinal = useCallback(() => {
    clearFallback();
    freezeLastFrame();
    revealCopy();
    setPhaseBoth("done");
    markPlayed?.(actId);
  }, [actId, markPlayed, freezeLastFrame, revealCopy]);

  const startPlay = useCallback(
    async (opts?: { fromStart?: boolean }) => {
      if (reduced) {
        showFinal();
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      const fromStart = opts?.fromStart !== false;

      if (fromStart || !revealArmedRef.current) {
        revealArmedRef.current = false;
        setCopyRevealed(false);
      }
      setPhaseBoth("playing");

      try {
        video.muted = true;
        if (fromStart) {
          video.pause();
          if (video.readyState >= 1) video.currentTime = 0;
        }
      } catch {
        /* ignore */
      }

      clearFallback();
      fallbackRef.current = setTimeout(() => {
        if (phaseRef.current === "playing") showFinal();
      }, FALLBACK_MS);

      try {
        await video.play();
      } catch {
        showFinal();
      }
    },
    [reduced, showFinal],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setReady(true);
      revealArmedRef.current = true;
      setCopyRevealed(true);
      setPhaseBoth("done");
    }
  }, []);

  // Hero: start walk-1 the moment the page can play — don't wait on scroll cues.
  useEffect(() => {
    if (!isHome || reduced) return;

    let cancelled = false;
    const video = videoRef.current;
    if (!video) return;

    const boot = async () => {
      if (cancelled || homeBootedRef.current) return;
      homeBootedRef.current = true;
      await startPlay({ fromStart: true });
    };

    const onCanPlay = () => {
      video.removeEventListener("canplay", onCanPlay);
      void boot();
    };

    if (video.readyState >= 2) {
      void boot();
    } else {
      video.addEventListener("canplay", onCanPlay);
      void video.play().catch(() => undefined);
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", onCanPlay);
    };
  }, [isHome, reduced, startPlay]);

  useEffect(() => {
    if (cueId !== actId || cueToken == null || !cueMode) return;

    let cancelled = false;

    if (reduced) {
      showFinal();
      return;
    }

    const run = () => {
      if (cancelled) return;
      if (cueMode === "final") {
        showFinal();
        return;
      }
      // Already introduced — stay on final frame / revealed copy.
      if (isHome && homeBootedRef.current && phaseRef.current !== "idle") {
        if (phaseRef.current !== "playing") showFinal();
        return;
      }
      void startPlay({ fromStart: true });
    };

    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      run();
      return () => {
        cancelled = true;
      };
    }

    const onReady = () => {
      video?.removeEventListener("loadedmetadata", onReady);
      run();
    };
    video?.addEventListener("loadedmetadata", onReady);
    const raf = window.requestAnimationFrame(() => {
      if (videoRef.current && videoRef.current.readyState >= 1) {
        video?.removeEventListener("loadedmetadata", onReady);
        run();
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      video?.removeEventListener("loadedmetadata", onReady);
    };
  }, [cueId, cueMode, cueToken, actId, isHome, reduced, showFinal, startPlay]);

  useEffect(() => {
    if (phase === "done" && ready) freezeLastFrame();
  }, [phase, ready, freezeLastFrame]);

  useEffect(() => () => clearFallback(), []);

  const onTimeUpdate = () => {
    if (revealArmedRef.current || phaseRef.current !== "playing") return;
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (video.currentTime / video.duration >= textRevealAt) {
      revealCopy();
    }
  };

  const revealed = copyRevealed || reduced;
  const panelFrom = panelSide === "right" ? "right" : "left";

  const videoEl = !reduced ? (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition }}
      src={src}
      muted
      playsInline
      autoPlay={isHome}
      preload="auto"
      aria-label={alt}
      onLoadedMetadata={(e) => {
        setReady(true);
        if (!isHome) e.currentTarget.pause();
      }}
      onCanPlay={() => setReady(true)}
      onPlaying={() => {
        if (isHome && phaseRef.current === "idle") {
          setPhaseBoth("playing");
          homeBootedRef.current = true;
        }
      }}
      onTimeUpdate={onTimeUpdate}
      onEnded={() => showFinal()}
      onError={() => {
        setReady(true);
        showFinal();
      }}
    />
  ) : null;

  /* Split: white page + inset rectangular video (Services). */
  if (layout === "split") {
    const copyOnLeft = panelSide === "left";
    const frameSize =
      mediaSize === "narrow"
        ? "h-[min(34vh,16rem)] w-auto max-w-[min(100%,14rem)] sm:h-[min(40vh,20rem)] sm:max-w-[18rem] lg:h-[min(78vh,44.1rem)] lg:max-w-[41rem]"
        : "h-[min(36vh,17rem)] w-auto max-w-[min(100%,15rem)] sm:h-[min(42vh,22rem)] sm:max-w-[20rem] lg:h-[min(80vh,46.2rem)] lg:max-w-[43rem]";

    const media = (
      <div className="flex shrink-0 items-center justify-center px-5 pb-4 pt-16 sm:px-8 sm:pb-6 lg:basis-[54%] lg:justify-end lg:px-10 lg:pb-14 lg:pt-28">
        <div className={`relative aspect-[1074/1024] overflow-hidden bg-[#f5f5f7] ${frameSize}`}>
          {!ready && !reduced ? <div className="media-skeleton absolute inset-0" aria-hidden /> : null}
          {videoEl}
        </div>
      </div>
    );

    const copy = children ? (
      <div className="act-overlay flex min-h-0 flex-1 flex-col justify-start overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 sm:px-8 lg:justify-center lg:overflow-visible lg:px-12 lg:pb-16 lg:pt-28">
        <div className="mx-auto w-full max-w-lg lg:mx-0">{children}</div>
      </div>
    ) : null;

    return (
      <div
        className={`relative flex h-full w-full flex-col overflow-hidden bg-paper lg:flex-row lg:items-center ${className}`}
        data-revealed={revealed ? "true" : "false"}
        data-cinema-phase={phase}
        data-cinema-layout="split"
      >
        {/* Mobile: video on top, copy below. Desktop: side-by-side */}
        {copyOnLeft ? (
          <>
            <div className="order-1 shrink-0 lg:order-2">{media}</div>
            <div className="order-2 flex min-h-0 flex-1 flex-col lg:order-1">{copy}</div>
          </>
        ) : (
          <>
            <div className="order-1 shrink-0">{media}</div>
            <div className="order-2 flex min-h-0 flex-1 flex-col">{copy}</div>
          </>
        )}
      </div>
    );
  }

  /* Bleed: full video + copy (solid sliding panel, or text-only fade). */
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-paper ${className}`}
      data-revealed={revealed ? "true" : "false"}
      data-cinema-phase={phase}
      data-panel-side={panelFrom}
      data-solid-panel={solidPanel ? "true" : "false"}
    >
      <div className="absolute inset-0 bg-paper" aria-hidden />
      {!ready && !reduced ? <div className="media-skeleton absolute inset-0 z-0" aria-hidden /> : null}

      <div className="absolute inset-0 z-[1]">{videoEl}</div>

      {children ? (
        solidPanel ? (
          <div
            className={`cinema-copy-panel absolute inset-y-0 z-10 flex w-full max-w-xl items-center bg-paper px-5 pb-16 pt-24 sm:max-w-2xl sm:px-8 sm:pt-28 lg:max-w-[min(36rem,48%)] lg:px-10 xl:max-w-[min(40rem,46%)] ${
              panelFrom === "right" ? "right-0" : "left-0"
            }`}
          >
            <div className="cinema-copy-inner w-full max-w-lg">{children}</div>
          </div>
        ) : (
          <div
            className={`absolute inset-0 z-10 flex items-end px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 sm:pb-24 ${
              panelFrom === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="cinema-text-only w-full max-w-xl">{children}</div>
          </div>
        )
      ) : null}
    </div>
  );
}
