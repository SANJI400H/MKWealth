"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GatedResults } from "@/components/tools/GatedResults";
import { useToolsGate } from "@/components/tools/ToolsGateProvider";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-base text-ink focus:border-maroon focus:outline-none";

function num(value: string) {
  const cleaned = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(cleaned) ? cleaned : 0;
}

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

/**
 * Illustrative amortising mortgage estimate (constant rate).
 * Educational only — not a lender quote.
 */
export default function MortgageEstimateCalculator() {
  const { unlocked, requireAccess, setCalculatorSnapshot } = useToolsGate();
  const [price, setPrice] = useState("10000000");
  const [depositPct, setDepositPct] = useState("30");
  const [rate, setRate] = useState("4.5");
  const [termYears, setTermYears] = useState("20");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    trackEvent("calculator_start", { calculator: "mortgage-estimate" });
  }, [started]);

  const guardSet = (set: (v: string) => void) => (value: string) => {
    if (!unlocked) {
      requireAccess();
      return;
    }
    set(value);
  };

  const result = useMemo(() => {
    const t = num(price);
    const s = num(depositPct);
    const l = num(rate);
    const h = num(termYears);
    if (!(t > 0) || s < 0 || s >= 100 || l < 0 || h <= 0) {
      return null;
    }
    const downPayment = (t * s) / 100;
    const principal = t - downPayment;
    const j = h * 12;
    const g = l / 1200;
    const monthly =
      g === 0 ? principal / j : (principal * g) / -Math.expm1(-j * Math.log1p(g));
    const total = monthly * j;
    const interest = Math.max(0, total - principal);
    return { downPayment, principal, monthly, total, interest };
  }, [price, depositPct, rate, termYears]);

  useEffect(() => {
    setCalculatorSnapshot({
      calculator: "mortgage-estimate",
      inputs: { price, depositPct, rate, termYears },
      outputs: result,
    });
  }, [setCalculatorSnapshot, price, depositPct, rate, termYears, result]);

  useEffect(() => {
    if (!unlocked || completed || !result) return;
    setCompleted(true);
    trackEvent("calculator_complete", { calculator: "mortgage-estimate" });
  }, [unlocked, completed, result]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="order-2 space-y-5 lg:order-1">
        <label className="block text-sm">
          <span className="text-ink-muted">Property price (AED)</span>
          <input
            className={`${fieldClass} mt-1`}
            value={price}
            onChange={(e) => guardSet(setPrice)(e.target.value)}
            inputMode="decimal"
          />
          <input
            type="range"
            className="mt-2 w-full accent-[var(--maroon,#7a1f2b)]"
            min={500000}
            max={100000000}
            step={100000}
            value={Math.min(100000000, Math.max(500000, num(price) || 500000))}
            onChange={(e) => guardSet(setPrice)(e.target.value)}
            aria-label="Property price slider"
          />
          <span className="mt-1 block text-xs text-ink-muted">Typical range AED 500,000 – 100,000,000</span>
        </label>

        <label className="block text-sm">
          <span className="text-ink-muted">Down payment (%)</span>
          <input
            className={`${fieldClass} mt-1`}
            value={depositPct}
            onChange={(e) => guardSet(setDepositPct)(e.target.value)}
            inputMode="decimal"
          />
          <input
            type="range"
            className="mt-2 w-full accent-[var(--maroon,#7a1f2b)]"
            min={10}
            max={90}
            step={1}
            value={Math.min(90, Math.max(10, num(depositPct) || 10))}
            onChange={(e) => guardSet(setDepositPct)(e.target.value)}
            aria-label="Down payment slider"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-ink-muted">Interest / year (%)</span>
            <input
              className={`${fieldClass} mt-1`}
              value={rate}
              onChange={(e) => guardSet(setRate)(e.target.value)}
              inputMode="decimal"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Loan term (years)</span>
            <input
              className={`${fieldClass} mt-1`}
              value={termYears}
              onChange={(e) => guardSet(setTermYears)(e.target.value)}
              inputMode="numeric"
            />
          </label>
        </div>
      </div>

      <GatedResults className="order-1 lg:order-2">
        {result ? (
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Estimated monthly payment
              </p>
              <p className="mt-2 font-display text-4xl font-bold text-ink">
                AED {money(result.monthly)}
              </p>
            </div>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-ink-muted">Loan amount</dt>
                <dd className="mt-1 font-semibold text-ink">AED {money(result.principal)}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Down payment</dt>
                <dd className="mt-1 font-semibold text-ink">AED {money(result.downPayment)}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="text-sm font-semibold text-maroon hover:underline"
              onClick={() => setDetailsOpen((v) => !v)}
            >
              {detailsOpen ? "Hide details" : "Details & costs"}
            </button>

            {detailsOpen ? (
              <div className="space-y-2 border-t border-line pt-4 text-sm">
                <div className="flex justify-between gap-3 sm:gap-4">
                  <span className="text-ink-muted">Total loan repayments</span>
                  <strong className="text-ink">AED {money(result.total)}</strong>
                </div>
                <div className="flex justify-between gap-3 sm:gap-4">
                  <span className="text-ink-muted">Total interest</span>
                  <strong className="text-ink">AED {money(result.interest)}</strong>
                </div>
                <p className="pt-2 text-xs text-ink-muted">
                  Down payment and purchase fees are not included in total loan repayments. Illustrative
                  only, using a constant interest rate. Excludes insurance and lender charges. Available
                  rates depend on the property, lender, and applicant. Financing coordination via{" "}
                  {siteConfig.company} where relevant.
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
              <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
                Discuss financing
              </Link>
              <Link href="/work-with-morgan#financing" className="btn-ghost-dark w-full justify-center sm:w-auto">
                How financing works
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-sm text-ink-muted">Enter valid inputs to see an estimate.</p>
        )}
      </GatedResults>
    </div>
  );
}
