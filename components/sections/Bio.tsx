"use client";

import Link from "next/link";
import ActScrollScene from "@/components/motion/ActScrollScene";
import { videoActs } from "@/content/videos";

export default function Bio() {
  const act = videoActs.act2;

  return (
    <section id="about" aria-label="About Morgan">
      <ActScrollScene
        src={act.src}
        poster={act.poster}
        alt={act.alt}
        heightMultiplier={act.heightMultiplier}
        revealAt={act.textRevealAt}
        edge="right"
      >
        <div className="act-overlay mx-auto grid h-full w-full max-w-content items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2">
          <div className="hidden lg:block" aria-hidden />
          <div className="max-w-lg text-legibility lg:ml-auto">
            <p className="eyebrow">About</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
              Numbers first.
              <br />
              Listings second.
            </h2>
            <div className="mt-7 space-y-4 text-base leading-relaxed text-white/75 sm:text-lg">
              <p>
                Morgan Kaiser advises foreign investors on Dubai off-plan — unit selection, payment structure,
                financing, and handover. As a Huspy partner agent, brokerage and mortgage sit under one roof.
              </p>
              <p>Most clients buy from abroad. The first conversation is cash flow and risk — not a sales suite.</p>
            </div>
            <Link href="/about" className="btn-ghost-light mt-10">
              Full biography
            </Link>
          </div>
        </div>
      </ActScrollScene>
    </section>
  );
}
