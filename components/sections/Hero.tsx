"use client";

import Link from "next/link";
import HeroAutoplayScene from "@/components/motion/HeroAutoplayScene";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { siteConfig } from "@/lib/site-config";
import { videoActs } from "@/content/videos";

export default function Hero() {
  const act = videoActs.act1;

  return (
    <section id="home" aria-label="Introduction">
      <HeroAutoplayScene src={act.src} poster={act.poster} alt={act.alt} revealAt={act.textRevealAt}>
        <div className="act-overlay mx-auto flex h-full w-full max-w-content flex-col items-start justify-end gap-5 px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
          <p className="font-display text-3xl font-bold tracking-tight text-gold text-legibility sm:text-4xl">
            {siteConfig.name}
          </p>
          <h1 className="display max-w-xl text-4xl leading-[0.98] text-white text-legibility sm:text-5xl lg:text-6xl">
            Dubai off-plan, without the brochure pitch.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/85 text-legibility sm:text-lg">
            Tax-free returns, Golden Visa paths, payment plans that fit your cash flow — from a Huspy partner
            who underwrites the deal first.
          </p>
          <div className="mt-3 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-7">
            <WhatsAppLink
              message="Hi Morgan, I'd like to book a meeting about UAE off-plan investment."
              className="btn-primary w-full sm:w-auto"
            >
              Book a Meeting
            </WhatsAppLink>
            <Link href="/guide" className="btn-ghost-light w-full justify-center sm:w-auto">
              Download Free Guide
            </Link>
          </div>
        </div>
      </HeroAutoplayScene>
    </section>
  );
}
