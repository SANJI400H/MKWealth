import type { Metadata } from "next";
import CinemaController from "@/components/motion/CinemaController";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Services from "@/components/sections/Services";
import VisionPhilosophy from "@/components/sections/VisionPhilosophy";
import Invest from "@/components/sections/Invest";
import HowMorganWorks from "@/components/sections/HowMorganWorks";
import VideoGuidesPreview from "@/components/sections/VideoGuidesPreview";
import Contact from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/metadata";

/** Refresh homepage data about hourly. */
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
 title: "UAE Property Portfolio Strategist | Morgan Kaiser",
 description:
 "Morgan Kaiser. UAE Property Portfolio Strategist. Vision first, strategy second, property third. Numbers-led guidance for international investors across Dubai, Abu Dhabi and Ras Al Khaimah.",
 path: "/",
});

/** Cinema film (1, 3) → Philosophy → Approach (snap) → free browse */
export default async function HomePage() {
 return (
 <main>
 <CinemaController>
 <Hero />
 <Bio />
 <Services />
 <VisionPhilosophy />
 </CinemaController>
 <div className="relative bg-paper">
 <Invest />
 <HowMorganWorks />
 <VideoGuidesPreview />
 <Contact />
 </div>
 </main>
 );
}
