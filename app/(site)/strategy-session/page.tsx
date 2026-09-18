import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import SiteFooter from "@/components/sections/SiteFooter";
import StrategySessionForm from "@/components/forms/StrategySessionForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "30-Minute Property Strategy Session | Morgan Kaiser",
  description:
    "Request a 30-minute property strategy session with Morgan Kaiser. After approval, Morgan sends a Google Calendar invite with Meet.",
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
        <div className="flex justify-center">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Work With Morgan", path: "/work-with-morgan" },
              { name: "Strategy Session", path: "/strategy-session" },
            ]}
          />
        </div>

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-[#f7f3ef] via-paper to-[#efe6df] px-6 py-10 text-center sm:px-10 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-maroon/[0.07] blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-ink/[0.04] blur-3xl"
          />

          <p className="eyebrow relative">Strategy session</p>
          <h1 className="relative mx-auto mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl">
            Your 30-minute
            <br />
            property strategy session
          </h1>
          <p className="relative mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
            Share a few details. Morgan reviews each request, then books the session and sends a Google Meet
            invite.
          </p>

          <div className="relative mx-auto mt-10 flex w-full max-w-lg justify-center">
            <StrategySessionForm />
          </div>
        </section>

        <ol className="mx-auto mt-14 max-w-2xl space-y-10 text-center">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-silver pt-8">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-maroon">{s.n}</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-ink">{s.title}</h2>
              <p className="mx-auto mt-3 max-w-xl text-ink-muted leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>

        <section className="mt-14 border-t border-line pt-10 text-center">
          <h2 className="font-display text-2xl font-bold text-ink">How booking works</h2>
          <ol className="mx-auto mt-5 max-w-xl list-none space-y-3 text-ink-muted">
            <li>1. You submit the form above.</li>
            <li>2. Morgan reviews and approves (or declines) by email.</li>
            <li>3. If approved, Morgan sends a Google Calendar invitation with Google Meet.</li>
          </ol>
          <div className="mt-8 flex justify-center">
            <Link href="/portal" className="btn-ghost-dark w-full justify-center sm:w-auto">
              Client Portal
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
