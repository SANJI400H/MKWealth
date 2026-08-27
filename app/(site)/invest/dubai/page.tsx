import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
import DubaiInvestTabs from "@/components/invest/DubaiInvestTabs";
import PageIntro from "@/components/ui/PageIntro";
import { getPublishedInsights } from "@/content/insights";
import { regulatory } from "@/content/regulatory";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Dubai Property Investment | Off-Plan & Secondary | Morgan Kaiser",
  description:
    "How Morgan Kaiser analyses Dubai property for international investors — off-plan and secondary market — with underwriting first, inventory second.",
  path: "/invest/dubai",
});

const faqItems = [
  {
    question: "How does buying property in Dubai work for foreigners?",
    answer:
      "Foreign nationals can buy freehold property in Dubai's designated areas. Off-plan purchases typically follow reservation → SPA → construction-linked payments → handover registration. Secondary purchases follow a different transfer process with clearer price discovery and, often, immediate rental potential. Exact steps depend on the asset and whether financing is used.",
  },
  {
    question: "What yield should I expect in Dubai?",
    answer: `${regulatory.yields.dubaiGrossIllustrative.value} ${regulatory.yields.dubaiGrossIllustrative.note}`,
  },
  {
    question: "Is Dubai property tax-free for me?",
    answer: regulatory.tax.uaeIndividualPropertyNote,
  },
  {
    question: "How much deposit do I need for off-plan?",
    answer:
      "Many developers require a booking deposit with the remainder staged to construction milestones, often described in marketing as structures such as 60/40 or 70/30. Exact terms vary by project and must be read in the SPA — compare the schedule to your liquidity, not only the headline price.",
  },
];

export default function DubaiInvestPage() {
  const latest = getPublishedInsights()
    .slice(0, 3)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
    }));

  return (
    <>
      <main className="page-shell-wide">
        <Breadcrumbs
          visible={false}
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/invest" },
            { name: "Dubai", path: "/invest/dubai" },
          ]}
        />

        <PageIntro
          title="Dubai Property Investment"
          lead="Dubai is Morgan's primary market. Off-plan and secondary are both analysed — neither is assumed better until the brief, capital, and risk profile say so."
        />
        <DubaiInvestTabs latest={latest} />

        <p className="mt-12 text-ink-muted">
          Compare with{" "}
          <Link href="/invest/abu-dhabi" className="font-semibold text-maroon hover:underline">
            Abu Dhabi
          </Link>{" "}
          and{" "}
          <Link href="/invest/rak" className="font-semibold text-maroon hover:underline">
            Ras Al Khaimah
          </Link>
          .
        </p>

        <FaqSection items={faqItems} />
        <GuideCallout />
        <p className="mt-10 text-xs text-ink-muted">{regulatory.disclaimerShort}</p>
      </main>
      <SiteFooter />
    </>
  );
}
