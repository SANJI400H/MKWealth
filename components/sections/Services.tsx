"use client";

import { ArrowUpRight } from "lucide-react";
import ActScrollScene from "@/components/motion/ActScrollScene";
import WhatsAppLink from "@/components/ui/WhatsAppLink";
import { services } from "@/content/services";
import { videoActs } from "@/content/videos";

export default function Services() {
  const act = videoActs.act3;

  return (
    <section id="services" aria-label="Services">
      <ActScrollScene
        src={act.src}
        poster={act.poster}
        alt={act.alt}
        heightMultiplier={act.heightMultiplier}
        revealAt={act.textRevealAt}
        edge="right"
      >
        <div className="act-overlay mx-auto flex h-full w-full max-w-content flex-col justify-end gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <div className="max-w-sm shrink-0 text-legibility">
            <p className="eyebrow">Services</p>
            <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
              Around the deal —
              <br />
              not just the unit.
            </h2>
          </div>

          <ul className="w-full max-w-md border-t border-white/30">
            {services.map((service) => (
              <li key={service.id} className="border-b border-white/20">
                <WhatsAppLink
                  message={service.whatsappMessage}
                  className="group flex items-start justify-between gap-4 py-3 sm:py-3.5"
                >
                  <span>
                    <span className="block font-display text-[15px] font-bold text-white transition group-hover:text-gold sm:text-base">
                      {service.title}
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-white/60 sm:text-sm">
                      {service.summary}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.25}
                    className="mt-1 shrink-0 text-gold opacity-70 transition group-hover:opacity-100"
                  />
                </WhatsAppLink>
              </li>
            ))}
          </ul>
        </div>
      </ActScrollScene>
    </section>
  );
}
