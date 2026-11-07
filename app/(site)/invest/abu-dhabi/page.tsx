import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import AbuDhabiInvestTabs, { AbuDhabiCompareLinks } from "@/components/invest/AbuDhabiInvestTabs";
import MarketCover from "@/components/invest/MarketCover";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "Abu Dhabi Property Investment | Morgan Kaiser",
 description:
 "How Morgan Kaiser looks at Abu Dhabi property for international investors: islands, ready homes, and the differences from Dubai.",
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
 <main>
 <MarketCover id="abu-dhabi" />
 <div className="page-shell-wide !pt-8 sm:!pt-10">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Invest", path: "/invest" },
 { name: "Abu Dhabi", path: "/invest/abu-dhabi" },
 ]}
 />

 <PageIntro
 title="Abu Dhabi Property Investment"
 lead="An emirate in its own right: island communities, a thinner resale market than Dubai, and a longer hold."
 />

 <AbuDhabiInvestTabs />
 <AbuDhabiCompareLinks />

 <FaqSection items={faqItems} />
 <GuideCallout />
 </div>
 </main>
 </>
 );
}
