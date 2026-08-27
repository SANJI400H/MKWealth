import type { Metadata } from "next";
import CinemaController from "@/components/motion/CinemaController";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Services from "@/components/sections/Services";
import VisionPhilosophy from "@/components/sections/VisionPhilosophy";
import FormulaOverFeelings from "@/components/sections/FormulaOverFeelings";
import InvestmentProfile from "@/components/sections/InvestmentProfile";
import Invest from "@/components/sections/Invest";
import HowMorganWorks from "@/components/sections/HowMorganWorks";
import Proof from "@/components/sections/Proof";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "UAE Property Portfolio Strategist | Morgan Kaiser",
  description:
    "Morgan Kaiser — UAE Property Portfolio Strategist. Vision first, strategy second, property third. Numbers-led guidance for international investors across Dubai, Abu Dhabi and Ras Al Khaimah.",
  path: "/",
});

/** Cinema film (1–3) → Philosophy → Approach (snap) → free browse */
export default function HomePage() {
  return (
    <main>
      <CinemaController>
        <Hero />
        <Bio />
        <Services />
        <VisionPhilosophy />
        <FormulaOverFeelings />
      </CinemaController>
      <div className="relative bg-paper">
        <InvestmentProfile />
        <Invest />
        <HowMorganWorks />
        <Proof />
        <Contact />
        <SiteFooter />
      </div>
    </main>
  );
}
