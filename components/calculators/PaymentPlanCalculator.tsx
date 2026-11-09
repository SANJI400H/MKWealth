"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GatedResults } from "@/components/tools/GatedResults";
import { trackEvent } from "@/lib/analytics";
import {
  parseDecimal,
  percentsTotal100,
  requireNonNegativeAmount,
  requirePercent,
  requirePositiveAmount,
} from "@/lib/calculators/validate";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-base text-ink focus:border-maroon focus:outline-none";

const PaymentTimelineChart = dynamic(() => import("@/components/charts/PaymentTimelineChart"), {
  ssr: false,
  loading: () => <div className="mt-6 h-40 animate-pulse bg-surface" aria-hidden />,
});

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

type Stage = { label: string; pct: string };

/** Stress-test construction-linked payment schedules against available cash. */
export default function PaymentPlanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("2000000");
  const [availableCash, setAvailableCash] = useState("800000");
  const [includeDld, setIncludeDld] = useState(true);
  const [adminFee, setAdminFee] = useState("580");
  const [stages, setStages] = useState<Stage[]>([
    { label: "Booking / SPA", pct: "10" },
    { label: "During construction", pct: "50" },
    { label: "On handover", pct: "40" },
  ]);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    trackEvent("calculator_start", { calculator: "payment-plan" });
  }, [started]);

  const stageErrors = stages.map((stage) => requirePercent(stage.pct));
  const priceError = requirePositiveAmount(purchasePrice);
  const cashError = requireNonNegativeAmount(availableCash);
  const adminError = requireNonNegativeAmount(adminFee);
  const parsedPercents = stages.map((stage) => parseDecimal(stage.pct));
  const totalPct = parsedPercents.every((value) => value != null)
    ? parsedPercents.reduce((sum, value) => sum + (value ?? 0), 0)
    : null;
  const scheduleReady = totalPct != null && percentsTotal100(parsedPercents as number[]);
  const inputsReady = !priceError && !cashError && !adminError && stageErrors.every((error) => !error);

  const result = useMemo(() => {
    if (!inputsReady || !scheduleReady) return null;
    const price = parseDecimal(purchasePrice) ?? 0;
    const cash = parseDecimal(availableCash) ?? 0;
    const admin = parseDecimal(adminFee) ?? 0;
    const dld = includeDld ? price * 0.04 : 0;
    const rows = stages.map((stage, index) => {
      const pctValue = parseDecimal(stage.pct) ?? 0;
      return { label: stage.label || `Stage ${index + 1}`, pct: pctValue, amount: (price * pctValue) / 100 };
    });
    const stageAmount = rows.reduce((sum, row) => sum + row.amount, 0);
    const dueAtBooking = (rows[0]?.amount ?? 0) + dld + admin;
    const totalAmount = stageAmount + dld + admin;
    const shortfall = Math.max(0, totalAmount - cash);
    const headroom = cash - totalAmount;
    const timeline = [
      ...rows.map((row) => ({ label: row.label, amount: row.amount })),
      ...(dld > 0 ? [{ label: "DLD 4% at booking", amount: dld }] : []),
      ...(admin > 0 ? [{ label: "Admin / registration", amount: admin }] : []),
    ];
    return { price, cash, rows, dld, admin, dueAtBooking, totalAmount, shortfall, headroom, timeline };
  }, [adminFee, availableCash, includeDld, inputsReady, purchasePrice, scheduleReady, stages]);

  useEffect(() => {
    if (completed || !result) return;
    setCompleted(true);
    trackEvent("calculator_complete", { calculator: "payment-plan" });
  }, [completed, result]);

  const updateStage = (index: number, patch: Partial<Stage>) => {
    setStages((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="order-2 space-y-4 lg:order-1">
        <label className="block text-sm">
          <span className="text-ink-muted">Purchase price (AED)</span>
          <input
            className={`${fieldClass} mt-1`}
            inputMode="decimal"
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(e.target.value)}
          />
          {priceError ? <span className="mt-1 block text-xs text-maroon">{priceError}</span> : null}
        </label>
        <label className="block text-sm">
          <span className="text-ink-muted">Cash available for this plan (AED)</span>
          <input
            className={`${fieldClass} mt-1`}
            inputMode="decimal"
            value={availableCash}
            onChange={(e) => setAvailableCash(e.target.value)}
          />
          {cashError ? <span className="mt-1 block text-xs text-maroon">{cashError}</span> : null}
        </label>

        <div className="pt-2">
          <p className="text-sm font-medium text-ink">Schedule (% of price)</p>
          <p className="mt-1 text-xs text-ink-muted">
            Edit labels and percentages to match the SPA. Defaults are illustrative only.
          </p>
          <ul className="mt-4 space-y-3">
            {stages.map((s, i) => (
              <li key={i} className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_5rem_auto]">
                <label className="block text-sm">
                  <span className="sr-only">{`Stage ${i + 1} name`}</span>
                  <input
                    className={fieldClass}
                    value={s.label}
                    onChange={(e) => updateStage(i, { label: e.target.value })}
                  />
                </label>
                <label className="block text-sm">
                  <span className="sr-only">{`Stage ${i + 1} percent of price`}</span>
                  <input
                    className={fieldClass}
                    inputMode="decimal"
                    value={s.pct}
                    onChange={(e) => updateStage(i, { pct: e.target.value })}
                  />
                </label>
                <button
                  type="button"
                  className="px-2 text-lg text-ink-muted hover:text-ink disabled:opacity-30"
                  aria-label={`Remove stage ${i + 1}`}
                  disabled={stages.length === 1}
                  onClick={() => setStages((prev) => prev.filter((_, index) => index !== i))}
                >
                  ×
                </button>
                {stageErrors[i] ? <span className="text-xs text-maroon sm:col-span-3">{stageErrors[i]}</span> : null}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm font-medium text-ink">
            Schedule total: {totalPct == null ? "—" : `${totalPct.toFixed(1)}%`}
          </p>
          {totalPct != null && !scheduleReady ? (
            <p className="mt-2 rounded-sm border border-amber-700/40 bg-amber-50 px-3 py-2 text-sm text-amber-950">
              Stages add up to {totalPct.toFixed(1)}%. They must total 100%.
            </p>
          ) : null}
          <button
            type="button"
            className="mt-3 text-sm font-semibold text-maroon hover:underline"
            onClick={() =>
              setStages((prev) => [...prev, { label: `Stage ${prev.length + 1}`, pct: "0" }])
            }
          >
            Add stage
          </button>
          <label className="mt-4 flex items-start gap-2 text-sm text-ink">
            <input type="checkbox" className="mt-1" checked={includeDld} onChange={(e) => setIncludeDld(e.target.checked)} />
            <span>Include DLD 4% at booking</span>
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Admin / registration fees (AED)</span>
            <input
              className={`${fieldClass} mt-1`}
              inputMode="decimal"
              value={adminFee}
              onChange={(e) => setAdminFee(e.target.value)}
            />
            {adminError ? <span className="mt-1 block text-xs text-maroon">{adminError}</span> : null}
          </label>
        </div>
      </div>

      <GatedResults className="order-1 lg:order-2">
        {!inputsReady || totalPct == null ? (
          <p className="text-sm text-ink-muted">Enter valid inputs to see an estimate.</p>
        ) : !scheduleReady || !result ? (
          <p className="rounded-sm border border-amber-700/40 bg-amber-50 px-3 py-2 text-sm text-amber-950">
            Stages add up to {totalPct.toFixed(1)}%. They must total 100%.
          </p>
        ) : (
        <div className="border border-line bg-ink/[0.02] p-6">
          <h2 className="font-display text-xl font-bold text-ink">Cash outlay</h2>
          <p className="mt-2 font-display text-3xl font-bold text-ink">AED {money(result.totalAmount)}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {result.shortfall > 0
              ? `This plan needs AED ${money(result.shortfall)} more cash than you have set aside.`
              : `You have about AED ${money(Math.max(0, result.headroom))} of headroom against this schedule.`}
          </p>
          <PaymentTimelineChart stages={result.timeline} />
          <dl className="mt-6 space-y-3 text-sm">
            {result.rows.map((r) => (
              <div key={r.label} className="flex justify-between gap-3 border-b border-line/60 py-2 sm:gap-4">
                <dt className="text-ink-muted">
                  {r.label} ({r.pct}%)
                </dt>
                <dd className="font-medium text-ink">AED {money(r.amount)}</dd>
              </div>
            ))}
            {result.dld > 0 ? (
              <div className="flex justify-between gap-3 border-b border-line/60 py-2 sm:gap-4">
                <dt className="text-ink-muted">DLD 4% at booking</dt>
                <dd className="font-medium text-ink">AED {money(result.dld)}</dd>
              </div>
            ) : null}
            {result.admin > 0 ? (
              <div className="flex justify-between gap-3 border-b border-line/60 py-2 sm:gap-4">
                <dt className="text-ink-muted">Admin / registration</dt>
                <dd className="font-medium text-ink">AED {money(result.admin)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-3 pt-2 sm:gap-4">
              <dt className="font-semibold text-ink">Due at booking</dt>
              <dd className="font-semibold text-ink">AED {money(result.dueAtBooking)}</dd>
            </div>
            <div className="flex justify-between gap-3 sm:gap-4">
              <dt className="font-semibold text-ink">Cash outlay</dt>
              <dd className="font-semibold text-ink">AED {money(result.totalAmount)}</dd>
            </div>
            <div className="flex justify-between gap-3 sm:gap-4">
              <dt className="text-ink-muted">Cash available</dt>
              <dd className="text-ink">AED {money(result.cash)}</dd>
            </div>
            <div className="flex justify-between gap-3 sm:gap-4">
              <dt className="text-ink-muted">{result.shortfall > 0 ? "Shortfall" : "Headroom"}</dt>
              <dd className={result.shortfall > 0 ? "font-semibold text-ink" : "text-ink"}>
                AED {money(result.shortfall > 0 ? result.shortfall : result.headroom)}
              </dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-ink-muted">
            DLD and admin fees are illustrative and shown separately from the SPA percentages. Confirm them for your
            transaction.
          </p>
          <Link href="/strategy-session" className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
            {siteConfig.cta.strategySession}
          </Link>
        </div>
        )}
      </GatedResults>
    </div>
  );
}
