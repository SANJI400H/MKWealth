"use client";

import Link from "next/link";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { videoActs } from "@/content/videos";
import { siteConfig } from "@/lib/site-config";

export default function Bio() {
  const act = videoActs.act2;

  return (
    <section id="about" className="cinema-section relative overflow-hidden bg-paper" aria-label="About Morgan">
      <CinemaPlayScene
        actId="about"
        src={act.src}
        alt={act.alt}
        textRevealAt={act.textRevealAt}
        panelSide="right"
        objectPosition="center center"
        priority
      >
        <p className="eyebrow">Morgan</p>
        <h2 className="display mt-3 text-[1.75rem] leading-[1.08] text-ink sm:mt-5 sm:text-5xl lg:text-6xl">
          Numbers first.
          <br />
          Listings second.
        </h2>
        <div className="mt-4 max-w-lg space-y-3 text-[13px] leading-relaxed text-ink-muted sm:mt-7 sm:space-y-4 sm:text-lg">
          <p>
            {siteConfig.name} advises international investors on UAE property strategy: objective, capital, risk,
            and structure — then acquisition across off-plan and secondary where the brief fits.
          </p>
          <p>
            As a {siteConfig.company} {siteConfig.companyRole}, brokerage and mortgage coordination can sit under one
            roof when financing is part of the plan.
          </p>
        </div>
        <Link href="/about" className="btn-ghost-dark mt-5 sm:mt-10">
          Explore Morgan →
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
