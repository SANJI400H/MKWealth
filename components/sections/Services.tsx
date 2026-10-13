"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { homepageServices, type ServiceItem } from "@/content/services";
import { videoActs } from "@/content/videos";

function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <Link
      href="/work-with-morgan"
      className="service-card group block border-b border-ink/10 py-3.5 transition-opacity duration-300 last:border-b-0 hover:opacity-100 sm:py-4"
    >
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block font-display text-[15px] font-bold text-ink transition-colors group-hover:text-maroon sm:text-base">
            {service.title}
          </span>
          <span className="mt-1.5 block text-[13px] leading-snug text-ink-muted sm:text-sm">
            {service.summary}
          </span>
        </span>
        <ArrowUpRight
          size={16}
          strokeWidth={1.25}
          className="mt-0.5 shrink-0 text-maroon opacity-70 transition group-hover:opacity-100"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export default function Services() {
  const act = videoActs.act3;

  return (
    <section id="services" className="cinema-section relative overflow-hidden bg-paper" aria-label="Services">
      <CinemaPlayScene
        actId="services"
        src={act.src}
        alt={act.alt}
        textRevealAt={act.textRevealAt}
        layout="split"
        panelSide="left"
        mediaSize="narrow"
        objectPosition="center center"
      >
        <p className="eyebrow">Work With Morgan</p>
        <h2 className="display mt-2 max-w-md text-[1.75rem] leading-[1.08] text-ink sm:mt-5 sm:text-5xl">
          Around the deal,
          <br />
          not just the unit.
        </h2>
        <div className="mt-4 border-t border-ink/10">
          {homepageServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <Link href="/work-with-morgan" className="btn-ghost-dark mt-6 w-full justify-center sm:mt-8 sm:w-auto">
          Explore Services →
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
