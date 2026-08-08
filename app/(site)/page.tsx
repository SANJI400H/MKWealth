import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Bio from "@/components/sections/Bio";
import Services from "@/components/sections/Services";
import Invest from "@/components/sections/Invest";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import SiteFooter from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Off-Plan Property Investment Advisor | Morgan Kaiser",
  description:
    "Morgan Kaiser, Dubai off-plan property investment advisor and Huspy partner agent, helps foreign investors buy off-plan property with Golden Visa eligibility.",
  path: "/",
});

/** Hero (walk-1) → About (walk-2) → Services (walk-3) → Invest → Testimonials → Contact */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Bio />
      <Services />
      <Invest />
      <Testimonials />
      <Contact />
      <SiteFooter />
    </main>
  );
}
