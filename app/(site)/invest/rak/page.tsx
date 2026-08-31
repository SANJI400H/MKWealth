import type { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
import RakInvestTabs, { RakCompareLinks } from "@/components/invest/RakInvestTabs";
import PageIntro from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
 title: "RAK Property Investment for Foreigners | Morgan Kaiser",
 description:
 "Ras Al Khaimah real estate investment compared to Dubai, lower entry prices, tourism growth, and the liquidity trade-offs foreign buyers should know.",
 path: "/invest/rak",
});

const faqItems = [
 {
 question: "Can foreigners buy property in Ras Al Khaimah?",
 answer:
 "Yes. RAK permits full foreign freehold ownership in designated zones, most notably Al Marjan Island, Mina Al Arab, and Al Hamra Village.",
 },
 {
 question: "Why is Ras Al Khaimah getting more attention?",
 answer:
 "Tourism growth and major resort development on Al Marjan Island have drawn investor attention. That has not yet translated into Dubai-level market depth or liquidity.",
 },
 {
 question: "How does RAK compare to Dubai for foreigners?",
 answer:
 "Entry prices are meaningfully lower. In exchange, the resale market is thinner and rental demand is less proven outside a handful of communities. Better for investors comfortable holding through handover.",
 },
 {
 question: "Does RAK property qualify for the Golden Visa?",
 answer:
 "Yes, the same commonly cited federal investment threshold may apply, subject to current rules. Tax treatment for typical individual property investment inside the UAE is often discussed separately from home-country tax obligations, confirm both.",
 },
];

export default function RakInvestPage() {
 return (
 <>
 <main className="page-shell-wide">
 <Breadcrumbs
 visible={false}
 items={[
 { name: "Home", path: "/" },
 { name: "Invest", path: "/invest" },
 { name: "Ras Al Khaimah", path: "/invest/rak" },
 ]}
 />

 <PageIntro
 title="Ras Al Khaimah Real Estate Investment"
 lead="Lower entry point, thinner resale market, what that trade-off means in practice."
 />

 <RakInvestTabs />
 <RakCompareLinks />

 <FaqSection items={faqItems} />
 <GuideCallout />
 </main>
 <SiteFooter />
 </>
 );
}
