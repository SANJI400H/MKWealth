import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import StrategySessionForm from "@/components/forms/StrategySessionForm";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
 title: "30-Minute Property Strategy Session | Morgan Kaiser",
 description:
 "Book a 30-minute property strategy session with Morgan Kaiser, vision, investment profile, and strategy before any property shortlist.",
 path: "/strategy-session",
});

const steps = [
 {
 n: "01",
 title: "Your vision",
 body: "What are you trying to accomplish with UAE property?",
 },
 {
 n: "02",
 title: "Your investment profile",
 body: "Available capital, existing property exposure, investment objective, risk tolerance, leverage tolerance, preferred market, and holding period.",
 },
 {
 n: "03",
 title: "Your strategy",
 body: "Which market, property type, acquisition structure and investment approach may fit those objectives.",
 },
 {
 n: "04",
 title: "The property",
 body: "Only after the strategy is clear do we begin evaluating individual opportunities.",
 },
];

export default function StrategySessionPage() {
 return (
 <>
 <main className="page-shell">
 <Breadcrumbs
 items={[
 { name: "Home", path: "/" },
 { name: "Work With Morgan", path: "/work-with-morgan" },
 { name: "Strategy Session", path: "/strategy-session" },
 ]}
 />

 <p className="mt-8 eyebrow">Strategy session</p>
 <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
 Your 30-minute
 <br />
 property strategy session
 </h1>
 <p className="mt-5 text-lg text-ink-muted">
 Before discussing individual properties, we establish what the investment actually needs to achieve.
 </p>

 <ol className="mt-14 space-y-10">
 {steps.map((s) => (
 <li key={s.n} className="border-t border-silver pt-8">
 <p className="text-[11px] font-semibold tracking-[0.2em] text-maroon">{s.n}</p>
 <h2 className="mt-2 font-display text-2xl font-bold text-ink">{s.title}</h2>
 <p className="mt-3 text-ink-muted leading-relaxed">{s.body}</p>
 </li>
 ))}
 </ol>

 <section className="mt-16 border-t border-line pt-12">
 <h2 className="font-display text-2xl font-bold text-ink">Share a few details</h2>
 <p className="mt-3 text-ink-muted">Low friction intake, then book a time that works.</p>
 <div className="mt-8">
 <StrategySessionForm />
 </div>
 </section>

 <section className="mt-14 border-t border-line pt-10">
 <h2 className="font-display text-2xl font-bold text-ink">{siteConfig.cta.strategySession}</h2>
 <p className="mt-3 text-ink-muted">Prefer to jump straight to the calendar.</p>
 <div className="mt-6 flex flex-col gap-3 sm:flex-row">
 <BookMeetingLink className="btn-primary w-full sm:w-auto" />
 <Link href="/work-with-morgan" className="btn-ghost-dark w-full justify-center sm:w-auto">
 See all services
 </Link>
 </div>
 <p className="mt-6 max-w-xl text-sm text-ink-muted">
 After we speak, existing clients use the{" "}
 <Link href="/portal" className="font-semibold text-maroon hover:underline">
 Client Portal
 </Link>{" "}
 (Private Desk) for their portfolio dashboard.
 </p>
 </section>
 </main>
 <SiteFooter />
 </>
 );
}
