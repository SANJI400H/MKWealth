"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { siteConfig } from "@/lib/site-config";
import { holdNavForVideo } from "@/components/motion/navPlayback";
import { videoActs } from "@/content/videos";

const proof = [
  { label: "RERA", value: "92787" },
  { label: "Huspy", value: "No.1 Broker" },
  { label: "Client assets", value: "USD 1bn+" },
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setSettled(true);
      return;
    }
    const timer = window.setTimeout(() => setSettled(true), 7000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (settled) return;
    return holdNavForVideo();
  }, [settled]);

  useEffect(() => {
    if (!settled) return;
    videoRef.current?.pause();
  }, [settled]);

  return (
    <section
      id="home"
      className="cinema-section relative overflow-hidden bg-paper"
      aria-label="Introduction"
      data-revealed="true"
    >
      <video
        ref={videoRef}
        src={videoActs.act1.src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setSettled(true)}
        onError={() => setSettled(true)}
        aria-hidden={settled}
        className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
          settled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative z-10 flex h-full flex-col transition-opacity duration-700 ease-out ${
          settled ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mx-auto grid min-h-0 w-full max-w-content flex-1 grid-cols-[minmax(0,1.15fr)_minmax(6.75rem,0.85fr)] items-center gap-3 px-4 pt-20 sm:gap-8 sm:px-8 sm:pt-24">
          <div className="w-full text-left">
            <p className="font-display text-xl font-bold tracking-tight text-maroon sm:text-3xl md:text-4xl">
              {siteConfig.name}
            </p>
            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-ink-muted sm:text-xs">
              {siteConfig.role}
            </p>
            <h1 className="display mt-3 max-w-xl text-[1.35rem] leading-[1.12] text-ink sm:mt-4 sm:text-5xl md:text-[3.15rem]">
              Vision First.
              <br />
              Strategy Second.
              <br />
              Property Third.
            </h1>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted sm:mt-4 sm:text-lg">
              Numbers-led property portfolio strategies that begin with your objectives before any unit.
            </p>
            <div className="cta-row mt-5 w-full md:justify-start">
              <BookMeetingLink href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto" />
              <Link href="/guide" className="btn-ghost-dark w-full justify-center sm:w-auto">
                Watch Free Guide
              </Link>
            </div>
          </div>

          <div className="relative aspect-[1168/1280] w-full self-center overflow-hidden bg-[#a3b1b4] md:aspect-auto md:h-full md:min-h-[70vh]">
            <Image
              src="/images/morgan-hero-white.jpg"
              alt="Morgan Kaiser in a white shirt, holding Huspy awards"
              fill
              priority
              sizes="(min-width: 768px) 42vw, 38vw"
              className={`object-contain object-center transition duration-700 ease-out ${
                settled ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            />
          </div>
        </div>

        <ul className="border-t border-line bg-paper/95">
          <li className="mx-auto grid max-w-content grid-cols-3">
            {proof.map((item) => (
              <div key={item.label} className="border-line px-4 py-3 sm:border-l sm:first:border-l-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{item.label}</p>
                <p className="mt-1 font-display text-sm font-bold text-ink sm:text-base">{item.value}</p>
              </div>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}
