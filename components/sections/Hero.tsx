"use client";

import Link from "next/link";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { siteConfig } from "@/lib/site-config";
import { videoActs } from "@/content/videos";

export default function Hero() {
  const act = videoActs.act1;

  return (
    <section id="home" className="cinema-section relative h-screen overflow-hidden bg-paper" aria-label="Introduction">
      <CinemaPlayScene
        actId="home"
        src="/videos/walk-1.mp4"
        alt={act.alt}
        textRevealAt={0.5}
        layout="bleed"
        solidPanel={false}
        panelSide="left"
        objectPosition="center center"
        priority
      >
        <p className="font-display text-2xl font-bold tracking-tight text-gold text-legibility-on-media sm:text-3xl md:text-4xl">
          {siteConfig.name}
        </p>
        <h1 className="display mt-3 max-w-xl text-[1.85rem] leading-[1.05] text-white text-legibility-on-media sm:mt-5 sm:text-5xl lg:text-6xl">
          Dubai off-plan, without the brochure pitch.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85 text-legibility-on-media sm:mt-6 sm:text-lg">
          Tax-free returns, Golden Visa paths, payment plans that fit your cash flow — from a Huspy partner who
          underwrites the deal first.
        </p>
        <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:items-center sm:gap-7">
          <BookMeetingLink className="btn-primary w-full sm:w-auto" />
          <Link href="/guide" className="btn-ghost-light w-full justify-center sm:w-auto">
            Download Free Guide
          </Link>
        </div>
      </CinemaPlayScene>
    </section>
  );
}
