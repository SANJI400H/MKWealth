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
 <div className="w-full text-center md:text-left">
 <p className="font-display text-2xl font-bold tracking-tight text-maroon sm:text-3xl md:text-4xl">
 {siteConfig.name}
 </p>
 <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted sm:text-xs">
 {siteConfig.role}
 </p>
 <p className="mt-1 text-[11px] font-medium tracking-[0.06em] text-ink-muted sm:text-xs">
 {siteConfig.companyRole} at {siteConfig.company}
 </p>
 </div>
 <h1 className="display mt-4 max-w-xl text-center text-[1.55rem] leading-[1.1] text-ink sm:mt-6 sm:text-5xl md:text-left lg:text-[3.25rem]">
 Vision First.
 <br />
 Strategy Second.
 <br />
 Property Third.
 </h1>
 <p className="mt-3 max-w-md text-center text-[13px] leading-relaxed text-ink-muted sm:mt-6 sm:text-lg md:text-left">
 A numbers-led UAE property portfolio strategist who begins with your objectives, before any unit is on the
 table.
 </p>
 <div className="cta-row mt-5 w-full max-w-md sm:mt-8 sm:max-w-none md:justify-start">
 <BookMeetingLink href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto" />
 <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
 Work With Morgan
 </Link>
 </div>
 </CinemaPlayScene>
 </section>
 );
}
