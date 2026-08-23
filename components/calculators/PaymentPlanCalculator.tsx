"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-ink focus:border-gold focus:outline-none";

function num(value: string) {
  const n = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

type Stage = { label: string; pct: string };

/** Stress-test construction-linked payment schedules against available cash. */
export default function PaymentPlanCalculator() {
  const [purchasePrice, setPurchasePrice] = useState("2000000");
  const [availableCash, setAvailableCash] = useState("800000");
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

  const result = useMemo(() => {
    const price = num(purchasePrice);
    const cash = num(availableCash);
    const rows = stages.map((s) => {
      const p = num(s.pct);
      const amount = (price * p) / 100;
      return { label: s.label, pct: p, amount };
    });
    const totalPct = rows.reduce((sum, r) => sum + r.pct, 0);
    const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
    const shortfall = Math.max(0, totalAmount - cash);
    const headroom = cash - totalAmount;
    return { price, cash, rows, totalPct, totalAmount, shortfall, headroom };
  }, [purchasePrice, availableCash, stages]);

  useEffect(() => {
    if (completed || result.price <= 0) return;
    setCompleted(true);
    trackEvent("calculator_complete", { calculator: "payment-plan" });
  }, [completed, result.price]);

  const updateStage = (index: number, patch: Partial<Stage>) => {
    setStages((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <label className="block text-sm">
          <span className="text-ink-muted">Purchase price (AED)</span>
          <input className={`${fieldClass} mt-1`} value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="text-ink-muted">Cash available for this plan (AED)</span>
          <input className={`${fieldClass} mt-1`} value={availableCash} onChange={(e) => setAvailableCash(e.target.value)} />
        </label>

        <div className="pt-2">
          <p className="text-sm font-medium text-ink">Schedule (% of price)</p>
          <p className="mt-1 text-xs text-ink-muted">Edit labels and percentages to match the SPA — defaults are illustrative only.</p>
          <ul className="mt-4 space-y-3">
            {stages.map((s, i) => (
              <li key={i} className="grid grid-cols-[1fr_5rem] gap-2">
                <input
                  className={fieldClass}
                  value={s.label}
                  onChange={(e) => updateStage(i, { label: e.target.value })}
                  aria-label={`Stage ${i + 1} label`}
                />
                <input
                  className={fieldClass}
                  value={s.pct}
                  onChange={(e) => updateStage(i, { pct: e.target.value })}
                  aria-label={`Stage ${i + 1} percent`}
                />
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-3 text-sm font-semibold text-gold hover:underline"
            onClick={() => setStages((prev) => [...prev, { label: `Stage ${prev.length + 1}`, pct: "0" }])}
          >
            Add stage
          </button>
        </div>
      </div>

      <div className="border border-line bg-ink/[0.02] p-6">
        <h2 className="font-display text-xl font-bold text-ink">Liquidity check</h2>
        <dl className="mt-6 space-y-3 text-sm">
          {result.rows.map((r) => (
            <div key={r.label} className="flex justify-between gap-4 border-b border-line/60 py-2">
              <dt className="text-ink-muted">
                {r.label} ({r.pct}%)
              </dt>
              <dd className="font-medium text-ink">AED {money(r.amount)}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-4 pt-2">
            <dt className="font-semibold text-ink">Schedule total ({result.totalPct.toFixed(1)}%)</dt>
            <dd className="font-semibold text-ink">AED {money(result.totalAmount)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-muted">Cash available</dt>
            <dd className="text-ink">AED {money(result.cash)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-muted">{result.shortfall > 0 ? "Shortfall" : "Headroom"}</dt>
            <dd className={result.shortfall > 0 ? "font-semibold text-ink" : "text-ink"}>
              AED {money(result.shortfall > 0 ? result.shortfall : result.headroom)}
            </dd>
          </div>
        </dl>
        {Math.abs(result.totalPct - 100) > 0.05 ? (
          <p className="mt-4 text-xs text-ink-muted">
            Percentages currently sum to {result.totalPct.toFixed(1)}% — SPA schedules usually total 100% of price
            (fees are separate).
          </p>
        ) : null}
        <Link href="/analyse" className="btn-primary mt-8 inline-flex">
          {siteConfig.cta.analyse}
        </Link>
      </div>
    </div>
  );
}
