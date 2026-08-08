"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";

interface HeroAutoplaySceneProps {
  src: string;
  poster: string;
  alt: string;
  revealAt?: number;
  children?: ReactNode;
  className?: string;
}

const AUTOPLAY_FALLBACK_MS = 2000;
const FADE_SPAN = 0.08;

/** Full-viewport hero: muted autoplay once, freeze on last frame, timed overlay reveal. */
export default function HeroAutoplayScene({
  src,
  poster,
  alt,
  revealAt = 0.5,
  children,
  className = "",
}: HeroAutoplaySceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);
  const revealAtRef = useRef(revealAt);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  revealAtRef.current = revealAt;

  const applyFade = (fade: number) => {
    const root = rootRef.current;
    if (!root) return;
    const clamped = Math.min(Math.max(fade, 0), 1);
    root.style.setProperty("--act-fade", String(clamped));
    const shown = clamped > 0.05;
    if (shown !== revealedRef.current) {
      revealedRef.current = shown;
      root.dataset.revealed = shown ? "true" : "false";
    }
  };

  const fadeFromProgress = (p: number) => {
    const at = revealAtRef.current;
    if (p <= at) return 0;
    if (p >= at + FADE_SPAN) return 1;
    const t = (p - at) / FADE_SPAN;
    return t * t * (3 - 2 * t);
  };

  const revealNow = () => applyFade(1);

  const clearFallback = () => {
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setReady(true);
      applyFade(1);
      return;
    }

    applyFade(0);
    root.dataset.revealed = "false";

    fallbackTimerRef.current = setTimeout(() => {
      if (!revealedRef.current) revealNow();
    }, AUTOPLAY_FALLBACK_MS);

    return () => clearFallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only init
  }, []);

  useEffect(() => {
    if (!failed) return;
    clearFallback();
    revealNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [failed]);

  const tryPlay = async (video: HTMLVideoElement) => {
    try {
      await video.play();
    } catch {
      // Autoplay blocked — poster stays; fallback timer reveals overlay.
    }
  };

  const showPoster = !ready || failed || reduced;

  return (
    <div
      ref={rootRef}
      className={`relative h-screen w-full overflow-hidden bg-ink ${className}`}
      data-revealed="false"
      style={{ "--act-fade": 0 } as CSSProperties}
    >
      {!ready && !failed ? <div className="media-skeleton absolute inset-0" aria-hidden /> : null}

      {!failed && !reduced ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover object-[70%_center] ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          muted
          playsInline
          preload="auto"
          poster={poster}
          aria-label={alt}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            setReady(true);
            void tryPlay(v);
          }}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (!v.duration) return;
            applyFade(fadeFromProgress(v.currentTime / v.duration));
            if (revealedRef.current) clearFallback();
          }}
          onEnded={(e) => {
            const v = e.currentTarget;
            v.pause();
            if (v.duration) v.currentTime = Math.max(v.duration - 0.05, 0);
            revealNow();
            clearFallback();
          }}
          onError={() => setFailed(true)}
        />
      ) : null}

      {showPoster ? (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
          priority
        />
      ) : null}

      {/* Studio plate → readable hero: full dim + left text lane */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,48rem)] bg-gradient-to-r from-black/70 via-black/35 to-transparent"
        aria-hidden
      />

      {children ? <div className="pointer-events-none absolute inset-0 z-10">{children}</div> : null}
    </div>
  );
}
