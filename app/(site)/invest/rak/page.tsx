import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FaqSection from "@/components/insights/FaqSection";
import GuideCallout from "@/components/insights/GuideCallout";
import SiteFooter from "@/components/sections/SiteFooter";
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
      "Yes, the same commonly cited federal investment threshold may apply, subject to current rules. Tax treatment for typical individual property investment inside the UAE is often discussed separately from home-country tax obligations — confirm both.",
  },
];

export default function RakInvestPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-16">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Invest", path: "/#invest" },
            { name: "Ras Al Khaimah", path: "/invest/rak" },
          ]}
        />

        <h1 className="mt-6 font-display text-4xl font-bold text-ink sm:text-5xl">
          Ras Al Khaimah Real Estate Investment
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          Lower entry point, thinner resale market, what that trade-off means in practice.
        </p>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">The real trade-off</h2>
          <p className="mt-4 text-ink-muted">
            RAK can look attractive on price alone. The decision only holds if you are comfortable with less
            liquidity and a smaller developer set, not if you need Dubai-style exit options.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">Who it suits</h2>
          <p className="mt-4 text-ink-muted">
            Investors with a longer horizon, lower ticket size, and appetite for tourism-led coastal growth , 
            after Dubai (or instead of it) only when the brief actually fits.
          </p>
        </section>

        <p className="mt-12 text-ink-muted">
          Compare with{" "}
          <Link href="/invest/dubai" className="font-semibold text-maroon hover:underline">
            Dubai
          </Link>{" "}
          and{" "}
          <Link href="/invest/abu-dhabi" className="font-semibold text-maroon hover:underline">
            Abu Dhabi
          </Link>
          .
        </p>

        <FaqSection items={faqItems} />
        <GuideCallout />
      </main>
      <SiteFooter />
    </>
  );
}
