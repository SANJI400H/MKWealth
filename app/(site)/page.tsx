import type { Metadata } from "next";
import CinemaController from "@/components/motion/CinemaController";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Services from "@/components/sections/Services";
import Invest from "@/components/sections/Invest";
import InvestorIntelligence from "@/components/sections/InvestorIntelligence";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Real Estate Investment Advisor | Morgan Kaiser",
  description:
    "Morgan Kaiser helps international investors evaluate and acquire UAE property with numbers-first underwriting across off-plan and secondary markets.",
  path: "/",
});

/** Cinema → Invest → Intelligence → Proof → Conversion */
export default function HomePage() {
  return (
    <main>
      <CinemaController>
        <Hero />
        <Bio />
        <Services />
      </CinemaController>
      <div className="relative bg-paper">
        <Invest />
        <InvestorIntelligence />
        <Proof />
        <Contact />
        <SiteFooter />
      </div>
    </main>
  );
}
