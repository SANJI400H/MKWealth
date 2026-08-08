"use client";

import { useState } from "react";
import GateForm from "./GateForm";

const modules = [
  {
    id: "module-1",
    title: "Why Dubai off-plan, right now",
    poster: "/images/morgan-hero.jpg",
    src: "/videos/guide-module-1.mp4",
  },
  {
    id: "module-2",
    title: "Payment plans and handover risk",
    poster: "/images/morgan-offer.jpg",
    src: "/videos/guide-module-2.mp4",
  },
  {
    id: "module-3",
    title: "Golden Visa eligibility, step by step",
    poster: "/images/morgan-portrait.jpg",
    src: "/videos/guide-module-3.mp4",
  },
];

function GuideVideo({
  title,
  poster,
  src,
}: {
  title: string;
  poster: string;
  src: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      {failed ? (
        <div className="relative aspect-video overflow-hidden bg-ink/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-ink/35 px-6 text-center">
            <p className="text-sm font-semibold text-paper">Video coming soon</p>
          </div>
        </div>
      ) : (
        <video
          controls
          playsInline
          poster={poster}
          className="w-full bg-ink/5"
          preload="none"
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default function GuideExperience() {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
        <h1 className="max-w-md font-display text-3xl font-bold text-ink sm:text-4xl">
          Your Dubai off-plan investment guide is ready.
        </h1>
        <p className="max-w-sm text-ink-muted">
          Enter your details for instant access to Morgan&apos;s video breakdown of how off-plan investment
          actually works.
        </p>
        <GateForm onUnlock={() => setUnlocked(true)} />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-10 px-6 py-12">
      <h1 className="text-center font-display text-3xl font-bold text-ink sm:text-4xl">
        The Dubai Off-Plan Investment Guide
      </h1>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        {modules.map((videoModule) => (
          <GuideVideo key={videoModule.id} {...videoModule} />
        ))}
      </div>
    </div>
  );
}
