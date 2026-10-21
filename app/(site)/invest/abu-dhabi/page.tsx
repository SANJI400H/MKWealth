import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import AbuDhabiInvestTabs, { AbuDhabiCompareLinks } from "@/components/invest/AbuDhabiInvestTabs";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Abu Dhabi Real Estate Investment vs. Dubai | Morgan Kaiser",
 description:
 "How Abu Dhabi off-plan real estate investment compares to Dubai for foreign buyers, ownership rules, yields, liquidity, and who each market actually suits.",
 path: "/invest/abu-dhabi",
});

const faqItems = [
 {
 question: "Can foreigners buy real estate in Abu Dhabi?",
 answer:
 "Yes. Foreign nationals can own freehold property in Abu Dhabi's designated investment zones, including Saadiyat Island, Yas Island, Al Reem Island, and Al Maryah Island.",
 },
 {
 question: "Is Abu Dhabi real estate a better investment than Dubai?",
 answer:
 "They suit different investors. Abu Dhabi tends toward steadier, lower-volatility pricing. Dubai has deeper off-plan inventory and more resale liquidity. Stability vs deal flow is the real trade-off.",
 },
 // Yield FAQ stays off the page until a sourced range and month are supplied. Do not invent the band.
 {
 question: "Does Abu Dhabi property qualify for the UAE Golden Visa?",
 // TODO(verify): re-check the property-value threshold, mortgage treatment, and off-plan paid percentage on the official ICP site before stating a number.
 answer:
 "Property investment at or above the commonly cited federal threshold may qualify, subject to current authority rules. Confirm requirements at the time of application, this site does not treat visa eligibility as guaranteed.",
 },
];

export default function AbuDhabiInvestPage() {
 return (
 <>
 <main className="page-shell-wide">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Invest", path: "/invest" },
 { name: "Abu Dhabi", path: "/invest/abu-dhabi" },
 ]}
 />

 <PageIntro
 title="Abu Dhabi Real Estate Investment"
 lead="Covered with real advisory focus alongside Dubai, useful for diversification, not as identical day-to-day deal flow. Morgan reports strong working knowledge across all three emirates."
 />

 <AbuDhabiInvestTabs />
 <AbuDhabiCompareLinks />

 <FaqSection items={faqItems} />
 <GuideCallout />
 </main>
 </>
 );
}
