"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/site-config";

gsap.registerPlugin(ScrollTrigger);

const SESSION_KEY = "mk-loader-seen";

/** First-visit brand loader. Refreshes ScrollTrigger on dismiss so pins measure correctly. */
export default function BrandLoader() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SESSION_KEY)) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    setVisible(true);
    let hideTimer = 0;
    let raf = 0;
    const start = performance.now();
    const duration = 900;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem(SESSION_KEY, "1");
        hideTimer = window.setTimeout(() => {
          setVisible(false);
          ScrollTrigger.refresh();
        }, 180);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-live="polite"
      aria-label={`Loading ${progress}%`}
    >
      <p className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl">{siteConfig.name}</p>
      <p className="mt-6 font-display text-5xl font-bold tabular-nums text-white sm:text-6xl">{progress}%</p>
      <div className="mt-8 h-px w-40 overflow-hidden bg-white/15">
        <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
