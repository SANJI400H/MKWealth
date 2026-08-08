"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Edge = "left" | "right" | "bottom" | "none";

interface ActScrollSceneProps {
  src: string;
  poster: string;
  alt: string;
  heightMultiplier?: number;
  revealAt?: number;
  edge?: Edge;
  children?: ReactNode;
  className?: string;
  priority?: boolean;
}

/** One pinned video scrubbed 1:1 with native scroll. */
export default function ActScrollScene({
  src,
  poster,
  alt,
  heightMultiplier = 3,
  revealAt = 0.45,
  edge = "left",
  children,
  className = "",
  priority = false,
}: ActScrollSceneProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
  const durationRef = useRef(0);
  const seekingRef = useRef(false);
  const targetRef = useRef(0);
  const revealedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [mountVideo, setMountVideo] = useState(priority);

  const seekLatest = () => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration) {
      seekingRef.current = false;
      return;
    }
    const next = Math.min(Math.max(targetRef.current, 0), Math.max(duration - 0.05, 0));
    if (Math.abs(video.currentTime - next) < 0.02) {
      seekingRef.current = false;
      return;
    }
    seekingRef.current = true;
    try {
      video.currentTime = next;
    } catch {
      seekingRef.current = false;
    }
  };

  useEffect(() => {
    if (mountVideo) return;
    const pin = pinRef.current;
    if (!pin) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMountVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    io.observe(pin);
    return () => io.disconnect();
  }, [mountVideo]);

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fadeSpan = 0.08;

    const applyFade = (p: number) => {
      let fade = 0;
      if (reduced) fade = 1;
      else if (p <= revealAt) fade = 0;
      else if (p >= revealAt + fadeSpan) fade = 1;
      else {
        const t = (p - revealAt) / fadeSpan;
        fade = t * t * (3 - 2 * t);
      }
      pin.style.setProperty("--act-fade", String(fade));
      const shown = fade > 0.05;
      if (shown !== revealedRef.current) {
        revealedRef.current = shown;
        pin.dataset.revealed = shown ? "true" : "false";
      }
    };

    pin.style.setProperty("--act-fade", reduced ? "1" : "0");
    pin.dataset.revealed = reduced ? "true" : "false";

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${Math.round(window.innerHeight * Math.max(heightMultiplier - 1, 0.5))}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          if (durationRef.current > 0) {
            targetRef.current = self.progress * Math.max(durationRef.current - 0.05, 0);
            if (!seekingRef.current) seekLatest();
          }
          applyFade(self.progress);
        },
      });
    }, pin);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [heightMultiplier, revealAt]);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    if (!video?.duration) return;
    durationRef.current = video.duration;
    targetRef.current = progressRef.current * Math.max(video.duration - 0.05, 0);
    video.currentTime = targetRef.current;
    ScrollTrigger.refresh();
  }, [ready]);

  const edgeClass =
    edge === "left"
      ? "inset-y-0 left-0 w-[min(100%,42rem)] bg-gradient-to-r from-black/55 via-black/18 to-transparent"
      : edge === "right"
        ? "inset-y-0 right-0 w-[min(100%,42rem)] bg-gradient-to-l from-black/55 via-black/18 to-transparent"
        : edge === "bottom"
          ? "inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/50 via-black/12 to-transparent"
          : "";

  return (
    <div
      ref={pinRef}
      className={`relative h-screen w-full overflow-hidden bg-ink ${className}`}
      data-revealed="false"
      style={{ "--act-fade": 0 } as CSSProperties}
    >
      {!ready && !failed ? <div className="media-skeleton absolute inset-0" aria-hidden /> : null}

      {mountVideo && !failed ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          muted
          playsInline
          preload="auto"
          poster={poster}
          aria-label={alt}
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            v.pause();
            durationRef.current = v.duration || 0;
            setReady(true);
          }}
          onSeeked={() => {
            if (Math.abs((videoRef.current?.currentTime ?? 0) - targetRef.current) > 0.04) {
              seekLatest();
            } else {
              seekingRef.current = false;
            }
          }}
          onError={() => setFailed(true)}
        />
      ) : null}

      {(!ready || failed) && (
        <Image src={poster} alt={alt} fill sizes="100vw" className="object-cover" priority={priority} />
      )}

      {edge !== "none" ? <div className={`pointer-events-none absolute ${edgeClass}`} aria-hidden /> : null}

      {children ? <div className="pointer-events-none absolute inset-0 z-10">{children}</div> : null}
    </div>
  );
}
