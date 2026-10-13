"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { GatedResults } from "@/components/tools/GatedResults";
import { useToolsGate } from "@/components/tools/ToolsGateProvider";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";
import type { AmortizationYear } from "@/components/charts/AmortizationChart";

const AmortizationChart = dynamic(() => import("@/components/charts/AmortizationChart"), {
  ssr: false,
  loading: () => <div className="h-48 animate-pulse bg-surface" aria-hidden />,
});

const fieldClass =
  "w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-base text-ink focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/30";

function num(value: string) {
  const cleaned = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(cleaned) ? cleaned : 0;
}

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

type Residency = "resident" | "non-resident";
type PropertyStatus = "ready" | "off-plan";

function typicalLtv(residency: Residency) {
  return residency === "resident" ? 80 : 60;
}

type MonthRow = {
  month: number;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

function buildSchedule(principal: number, annualRate: number, years: number) {
  const months = Math.round(years * 12);
  if (principal <= 0 || months <= 0) return null;
  const r = annualRate / 100 / 12;
  const payment = r === 0 ? principal / months : (principal * r) / (1 - (1 + r) ** -months);
  const yearsOut: AmortizationYear[] = [];
  const monthRows: MonthRow[] = [];
  let balance = principal;
  let equity = 0;
  let yearInterest = 0;
  let yearPrincipal = 0;

  for (let month = 1; month <= months; month += 1) {
    const interest = r === 0 ? 0 : balance * r;
    const principalPaid = Math.min(balance, Math.max(0, payment - interest));
    balance = Math.max(0, balance - principalPaid);
    equity += principalPaid;
    yearInterest += interest;
    yearPrincipal += principalPaid;
    monthRows.push({
      month,
      payment: interest + principalPaid,
      interest,
      principal: principalPaid,
      balance,
    });
    if (month % 12 === 0 || month === months) {
      yearsOut.push({
        year: Math.ceil(month / 12),
        interest: yearInterest,
        principal: yearPrincipal,
        equity,
      });
      yearInterest = 0;
      yearPrincipal = 0;
    }
  }

  const totalInterest = monthRows.reduce((sum, row) => sum + row.interest, 0);
  return { payment, yearsOut, monthRows, totalInterest, totalPaid: payment * months };
}

/**
 * Illustrative UAE amortising mortgage. Educational only, not a lender quote.
 */
export default function MortgageEstimateCalculator() {
  const { unlocked, setCalculatorSnapshot } = useToolsGate();
  const [price, setPrice] = useState("2000000");
  const [depositPct, setDepositPct] = useState("40");
  const [rate, setRate] = useState("4.5");
  const [termYears, setTermYears] = useState("25");
  const [residency, setResidency] = useState<Residency>("non-resident");
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus>("ready");
  const [handoverMonths, setHandoverMonths] = useState("24");
  const [view, setView] = useState<"year" | "month">("year");
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (started) return;
    setStarted(true);
    trackEvent("calculator_start", { calculator: "mortgage-estimate" });
  }, [started]);

  const priceN = num(price);
  const pctN = num(depositPct);
  const downAmount = priceN > 0 ? (priceN * pctN) / 100 : 0;
  const ltv = typicalLtv(residency);
  const errors: string[] = [];
  if (!(priceN > 0)) errors.push("Enter a property price above zero.");
  if (pctN < 0 || pctN > 100) errors.push("Down payment must be between 0 and 100 percent.");
  if (num(rate) < 0 || num(rate) > 20) errors.push("Interest rate should sit between 0 and 20 percent.");
  if (num(termYears) < 1 || num(termYears) > 30) errors.push("Loan term should be between 1 and 30 years.");

  const schedule = useMemo(() => {
    if (errors.length) return null;
    const principal = priceN - downAmount;
    return buildSchedule(principal, num(rate), num(termYears));
  }, [errors.length, priceN, downAmount, rate, termYears]);

  const yearOne = schedule?.yearsOut[0];
  const yearOneInterestShare =
    yearOne && yearOne.interest + yearOne.principal > 0
      ? (yearOne.interest / (yearOne.interest + yearOne.principal)) * 100
      : 0;

  useEffect(() => {
    setCalculatorSnapshot({
      calculator: "mortgage-estimate",
      inputs: { price, depositPct, rate, termYears, residency, propertyStatus, handoverMonths },
      outputs: schedule
        ? {
            monthly: schedule.payment,
            totalInterest: schedule.totalInterest,
            principal: priceN - downAmount,
          }
        : null,
    });
  }, [setCalculatorSnapshot, price, depositPct, rate, termYears, residency, propertyStatus, handoverMonths, schedule, priceN, downAmount]);

  useEffect(() => {
    if (!unlocked || completed || !schedule) return;
    setCompleted(true);
    trackEvent("calculator_complete", { calculator: "mortgage-estimate" });
  }, [unlocked, completed, schedule]);

  const applyTypicalDown = (nextResidency: Residency) => {
    setResidency(nextResidency);
    setDepositPct(String(100 - typicalLtv(nextResidency)));
  };

  const exportCsv = () => {
    if (!schedule) return;
    const header = "Month,Payment,Interest,Principal,Balance";
    const lines = schedule.monthRows.map(
      (row) =>
        `${row.month},${row.payment.toFixed(2)},${row.interest.toFixed(2)},${row.principal.toFixed(2)},${row.balance.toFixed(2)}`,
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "mortgage-schedule.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const startLabel = propertyStatus === "off-plan" ? "from handover" : "from drawdown";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="order-2 space-y-5 lg:order-1">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-ink-muted">Residency</span>
            <select
              className={`${fieldClass} mt-1`}
              value={residency}
              onChange={(e) => applyTypicalDown(e.target.value as Residency)}
            >
              <option value="non-resident">Non-resident</option>
              <option value="resident">UAE resident</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Property status</span>
            <select
              className={`${fieldClass} mt-1`}
              value={propertyStatus}
              onChange={(e) => setPropertyStatus(e.target.value as PropertyStatus)}
            >
              <option value="ready">Ready</option>
              <option value="off-plan">Off-plan</option>
            </select>
          </label>
        </div>

        <aside className="border border-line bg-surface px-4 py-4 text-sm leading-relaxed text-ink-muted">
          <p className="font-medium text-ink">Typical loan to value, subject to bank approval</p>
          <p className="mt-2">
            {residency === "non-resident"
              ? "International investors are often offered about 60% LTV. With fees, cash in before you begin is commonly 40 to 50 percent, and sometimes closer to 60 percent."
              : "UAE residents are often discussed around an 80% LTV ceiling on a first home. Banks still price the actual offer to the profile and the property."}
          </p>
          <p className="mt-2">Suggested down payment for this selection: {100 - ltv}%.</p>
          {propertyStatus === "off-plan" ? (
            <p className="mt-2">
              A mortgage on off-plan stock is typically available at handover, not before. Until then the payment plan is cash.
            </p>
          ) : null}
        </aside>

        <label className="block text-sm">
          <span className="text-ink-muted">Property price (AED)</span>
          <input className={`${fieldClass} mt-1`} value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-ink-muted">Down payment (%)</span>
            <input
              className={`${fieldClass} mt-1`}
              value={depositPct}
              onChange={(e) => setDepositPct(e.target.value)}
              inputMode="decimal"
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Down payment (AED)</span>
            <input
              className={`${fieldClass} mt-1`}
              value={priceN > 0 ? String(Math.round(downAmount)) : ""}
              onChange={(e) => {
                const amount = num(e.target.value);
                if (priceN > 0) setDepositPct(((amount / priceN) * 100).toFixed(1));
              }}
              inputMode="decimal"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-ink-muted">Interest rate (%)</span>
            <input className={`${fieldClass} mt-1`} value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Loan term (years)</span>
            <input
              className={`${fieldClass} mt-1`}
              value={termYears}
              onChange={(e) => setTermYears(e.target.value)}
              inputMode="numeric"
            />
          </label>
        </div>

        {propertyStatus === "off-plan" ? (
          <label className="block text-sm">
            <span className="text-ink-muted">Months until handover</span>
            <input
              className={`${fieldClass} mt-1`}
              value={handoverMonths}
              onChange={(e) => setHandoverMonths(e.target.value)}
              inputMode="numeric"
            />
          </label>
        ) : null}

        {errors.length ? (
          <ul className="space-y-1 text-sm text-maroon">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
        {!errors.length && pctN + 0.05 < 100 - ltv ? (
          <p className="text-sm leading-relaxed text-ink">
            This down payment is below the typical {100 - ltv}% for a {residency === "non-resident" ? "non-resident" : "UAE resident"}. The schedule still runs so you can compare, and a bank may not offer that loan.
          </p>
        ) : null}
      </div>

      <GatedResults className="order-1 lg:order-2">
        {schedule ? (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="border border-line bg-surface p-4">
                <p className="text-xs text-ink-muted">Monthly payment</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">AED {money(schedule.payment)}</p>
              </div>
              <div className="border border-line p-4">
                <p className="text-xs text-ink-muted">Total interest</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">AED {money(schedule.totalInterest)}</p>
              </div>
              <div className="border border-line p-4">
                <p className="text-xs text-ink-muted">Total cost of the loan</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">AED {money(schedule.totalPaid)}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-ink-muted">
              In year 1, about {yearOneInterestShare.toFixed(0)}% of each payment is interest. The rest reduces the balance.
              {propertyStatus === "off-plan"
                ? ` These mortgage payments are modelled to start after handover (${handoverMonths || "0"} months), not during construction.`
                : " These payments are modelled from the day the loan is drawn."}
            </p>

            <AmortizationChart years={schedule.yearsOut} startLabel={startLabel} />

            <div className="flex flex-wrap gap-3">
              <button type="button" className="text-sm font-semibold text-maroon hover:underline" onClick={() => setScheduleOpen((open) => !open)}>
                {scheduleOpen ? "Hide schedule" : "Show amortization schedule"}
              </button>
              <button type="button" className="text-sm font-semibold text-ink hover:text-maroon" onClick={exportCsv}>
                Export CSV
              </button>
              <button type="button" className="text-sm font-semibold text-ink hover:text-maroon" onClick={() => window.print()}>
                Print
              </button>
            </div>

            {scheduleOpen ? (
              <div>
                <div className="mb-3 flex gap-2">
                  <button
                    type="button"
                    className={`rounded-sm border px-3 py-1.5 text-sm ${view === "year" ? "border-ink bg-ink text-paper" : "border-line"}`}
                    onClick={() => setView("year")}
                    aria-pressed={view === "year"}
                  >
                    By year
                  </button>
                  <button
                    type="button"
                    className={`rounded-sm border px-3 py-1.5 text-sm ${view === "month" ? "border-ink bg-ink text-paper" : "border-line"}`}
                    onClick={() => setView("month")}
                    aria-pressed={view === "month"}
                  >
                    By month
                  </button>
                </div>
                <div className="max-h-80 overflow-auto border border-line">
                  <table className="w-full min-w-[32rem] text-left text-sm">
                    <thead className="sticky top-0 bg-paper">
                      <tr className="border-b border-line">
                        <th className="px-3 py-2 font-medium">{view === "year" ? "Year" : "Month"}</th>
                        <th className="px-3 py-2 font-medium">Payment</th>
                        <th className="px-3 py-2 font-medium">Interest</th>
                        <th className="px-3 py-2 font-medium">Principal</th>
                        <th className="px-3 py-2 font-medium">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {view === "year"
                        ? schedule.yearsOut.map((year) => (
                            <tr key={year.year} className="border-b border-line/70">
                              <td className="px-3 py-2">{year.year}</td>
                              <td className="px-3 py-2">AED {money(year.interest + year.principal)}</td>
                              <td className="px-3 py-2">AED {money(year.interest)}</td>
                              <td className="px-3 py-2">AED {money(year.principal)}</td>
                              <td className="px-3 py-2">
                                AED {money(Math.max(0, priceN - downAmount - year.equity))}
                              </td>
                            </tr>
                          ))
                        : schedule.monthRows.map((row) => (
                            <tr key={row.month} className="border-b border-line/70">
                              <td className="px-3 py-2">{row.month}</td>
                              <td className="px-3 py-2">AED {money(row.payment)}</td>
                              <td className="px-3 py-2">AED {money(row.interest)}</td>
                              <td className="px-3 py-2">AED {money(row.principal)}</td>
                              <td className="px-3 py-2">AED {money(row.balance)}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            <p className="text-xs leading-relaxed text-ink-muted">
              Estimates only. This is not financial advice. Rates and loan to value vary by bank and profile.
              Coordination, where relevant, runs through {siteConfig.company}.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
                Discuss financing
              </Link>
              <Link href="/calculators/payment-plan" className="btn-ghost-dark w-full justify-center sm:w-auto">
                Off-plan payment plan
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
