"use client";

import Link from "next/link";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { videoActs } from "@/content/videos";

export default function Bio() {
  const act = videoActs.act2;

  return (
    <section id="about" className="cinema-section relative h-screen overflow-hidden bg-paper" aria-label="About Morgan">
      <CinemaPlayScene
        actId="about"
        src={act.src}
        alt={act.alt}
        textRevealAt={act.textRevealAt}
        panelSide="right"
        objectPosition="center center"
        priority
      >
        <p className="eyebrow">About</p>
        <h2 className="display mt-3 text-3xl text-ink sm:mt-5 sm:text-5xl lg:text-6xl">
          Numbers first.
          <br />
          Listings second.
        </h2>
        <div className="mt-4 max-w-lg space-y-3 text-sm leading-relaxed text-ink-muted sm:mt-7 sm:space-y-4 sm:text-lg">
          <p>
            Morgan Kaiser advises foreign investors on Dubai off-plan — unit selection, payment structure,
            financing, and handover. As a Huspy partner agent, brokerage and mortgage sit under one roof.
          </p>
          <p className="hidden sm:block">
            Most clients buy from abroad. The first conversation is cash flow and risk — not a sales suite.
          </p>
        </div>
        <Link href="/about" className="btn-ghost-dark mt-6 sm:mt-10">
          Full biography
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
