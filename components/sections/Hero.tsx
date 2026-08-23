"use client";

import Link from "next/link";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { siteConfig } from "@/lib/site-config";
import { videoActs } from "@/content/videos";

export default function Hero() {
  const act = videoActs.act1;

  return (
    <section id="home" className="cinema-section relative overflow-hidden bg-paper" aria-label="Introduction">
      <CinemaPlayScene
        actId="home"
        src="/videos/walk-1.mp4"
        alt={act.alt}
        textRevealAt={0.5}
        layout="bleed"
        solidPanel
        panelCover="full"
        panelSide="left"
        objectPosition="center center"
        priority
      >
        <div>
          <p className="font-display text-2xl font-bold tracking-tight text-gold sm:text-3xl md:text-4xl">
            {siteConfig.name}
          </p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-xs">
            Dubai Real Estate Investment Advisor
          </p>
          <p className="mt-1 text-[11px] font-medium tracking-[0.08em] text-ink-muted sm:text-xs">
            &amp; Property Portfolio Strategist
          </p>
        </div>
        <h1 className="display mt-4 max-w-xl text-[1.7rem] leading-[1.08] text-ink sm:mt-6 sm:text-5xl lg:text-6xl">
          {siteConfig.philosophy}
        </h1>
        <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">
          Morgan helps international investors evaluate and acquire UAE property using investment mathematics,
          market context, risk assessment, and portfolio objectives — not brochure inventory.
        </p>
        <div className="mt-5 flex w-full max-w-md flex-col gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:items-center sm:gap-7">
          <BookMeetingLink href="/strategy-session" className="btn-primary w-full sm:w-auto" />
          <Link href="/analyse" className="btn-ghost-dark w-full justify-center sm:w-auto">
            {siteConfig.cta.analyse}
          </Link>
        </div>
      </CinemaPlayScene>
    </section>
  );
}
