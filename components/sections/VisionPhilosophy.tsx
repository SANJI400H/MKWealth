"use client";

import { useReducedMotion } from "framer-motion";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { morganProfile } from "@/content/morgan-profile";

/** Full-viewport Philosophy act, snaps one-by-one with the opening sequence. */
export default function VisionPhilosophy() {
 const reduce = useReducedMotion();

 return (
 <section
 id="philosophy"
 className="cinema-section relative flex items-center overflow-y-auto bg-surface"
 aria-label="Brand philosophy"
 >
 <div className="section-inner w-full py-12 sm:py-20">
 <RevealOnScroll>
 <p className="eyebrow">Philosophy</p>
 </RevealOnScroll>
 <div className="mt-8 space-y-3 sm:mt-14 sm:space-y-6">
 {morganProfile.philosophyLines.map((line, i) => (
 <RevealOnScroll key={line} delayMs={reduce ? 0 : i * 120}>
 <p className="display text-[clamp(1.75rem,8vw,2.25rem)] leading-[1.1] text-ink sm:text-5xl lg:text-6xl">{line}</p>
 </RevealOnScroll>
 ))}
 </div>
 <RevealOnScroll delayMs={reduce ? 0 : 400}>
 <p className="body-copy mt-10 max-w-3xl sm:mt-14 sm:text-lg">
 Morgan does not start by selecting a property. He starts by understanding the investor, then shapes the
 strategy, then evaluates whether any opportunity fits.
 </p>
 </RevealOnScroll>
 </div>
 </section>
 );
}
