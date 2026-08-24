"use client";

import Link from "next/link";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { videoActs } from "@/content/videos";
import { siteConfig } from "@/lib/site-config";
import { morganProfile } from "@/content/morgan-profile";

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
          The investor.
          <br />
          Then the strategy.
          <br />
          Then the property.
        </h2>
        <div className="mt-4 max-w-lg space-y-3 text-[13px] leading-relaxed text-ink-muted sm:mt-7 sm:space-y-4 sm:text-lg">
          <p>
            {siteConfig.name} is a {siteConfig.role} — structuring and scaling UAE property portfolios with a
            considered, numbers-led approach.
          </p>
          <p>{morganProfile.huspyLine}</p>
        </div>
        <Link href="/about" className="btn-ghost-dark mt-5 sm:mt-10">
          Explore Morgan →
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
