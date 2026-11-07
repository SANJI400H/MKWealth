"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CinemaPlayScene from "@/components/motion/CinemaPlayScene";
import { homepageServices, type ServiceItem } from "@/content/services";
import { videoActs } from "@/content/videos";

const serviceAnchors: Record<string, string> = {
  strategy: "strategy",
  underwriting: "underwriting",
  "off-plan": "acquisition",
  portfolio: "portfolio",
  mortgage: "financing",
  visa: "coordination",
};

const easeOut = [0.16, 1, 0.3, 1] as const;

const glowRest =
  "0 0 0 1px rgba(255, 84, 104, 0.85), 0 0 18px rgba(104, 26, 43, 0.28)";
const glowHot =
  "0 0 0 1.5px rgba(255, 96, 116, 1), 0 0 26px rgba(255, 36, 64, 0.5)";

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.22, delay: 0, ease: easeOut } }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : index * 0.06, ease: easeOut }}
    >
      <Link
        href={`/work-with-morgan#${serviceAnchors[service.id] ?? service.id}`}
        className="service-card group relative block overflow-hidden rounded-2xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_46%,rgba(255,255,255,0.34)_100%)] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl backdrop-saturate-150 sm:px-5 sm:py-4"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent"
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          initial={false}
          animate={reduceMotion ? { boxShadow: glowRest } : { boxShadow: [glowRest, glowHot, glowRest] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
          }
        />
        <span className="relative flex items-start justify-between gap-4">
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
    </motion.div>
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
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          Diligently manages a team of trained professionals across multiple continents.
        </p>
        <h2 className="display mt-2 max-w-md text-[1.75rem] leading-[1.08] text-ink sm:mt-5 sm:text-5xl">
          Strategy through
          <br />
          residency.
        </h2>
        <div className="relative mt-4">
          <div aria-hidden className="pointer-events-none absolute -inset-x-8 -inset-y-6">
            <div className="absolute left-0 top-8 h-44 w-44 rounded-full bg-maroon/40 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-40 w-40 rounded-full bg-[#ff8a9a]/70 blur-3xl" />
            <div className="absolute bottom-6 left-1/4 h-36 w-52 rounded-full bg-silver/90 blur-3xl" />
          </div>
          <div className="relative flex flex-col gap-2.5">
            {homepageServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
        <Link href="/work-with-morgan" className="btn-ghost-dark mt-6 w-full justify-center sm:mt-8 sm:w-auto">
          Explore Services →
        </Link>
      </CinemaPlayScene>
    </section>
  );
}
