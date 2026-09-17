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
 const n = Number(String(value).replace(/,/g, ""));
 return Number.isFinite(n) ? n : 0;
}

function pct(value: string) {
 return num(value) / 100;
}

function money(n: number) {
 return n.toLocaleString("en-AE", { maximumFractionDigits: 0 });
}

/** Dubai freehold acquisition cost stack, editable assumptions. */
export default function PurchaseCostCalculator() {
 const { unlocked, requireAccess, setCalculatorSnapshot } = useToolsGate();
 const [purchasePrice, setPurchasePrice] = useState("2000000");
 const [dldPct, setDldPct] = useState("4");
 const [agencyPct, setAgencyPct] = useState("2");
 const [trusteeFee, setTrusteeFee] = useState("4000");
 const [adminFees, setAdminFees] = useState("0");
 const [furniture, setFurniture] = useState("0");
 const [other, setOther] = useState("0");
 const [started, setStarted] = useState(false);
 const [completed, setCompleted] = useState(false);

 useEffect(() => {
 if (started) return;
 setStarted(true);
 trackEvent("calculator_start", { calculator: "purchase-cost" });
 }, [started]);

 const guardSet = (set: (v: string) => void) => (value: string) => {
 if (!unlocked) {
 requireAccess();
 return;
 }
 set(value);
 };

 const result = useMemo(() => {
 const price = num(purchasePrice);
 const dld = price * pct(dldPct);
 const agency = price * pct(agencyPct);
 const trustee = num(trusteeFee);
 const admin = num(adminFees);
 const furn = num(furniture);
 const oth = num(other);
 const acquisition = dld + agency + trustee + admin + furn + oth;
 const total = price + acquisition;
 const acquisitionPct = price > 0 ? acquisition / price : 0;
 return { price, dld, agency, trustee, admin, furn, oth, acquisition, total, acquisitionPct };
 }, [purchasePrice, dldPct, agencyPct, trusteeFee, adminFees, furniture, other]);

 useEffect(() => {
 setCalculatorSnapshot({
 calculator: "purchase-cost",
 inputs: { purchasePrice, dldPct, agencyPct, trusteeFee, adminFees, furniture, other },
 outputs: result,
 });
 }, [setCalculatorSnapshot, purchasePrice, dldPct, agencyPct, trusteeFee, adminFees, furniture, other, result]);

 useEffect(() => {
 if (!unlocked || completed || result.price <= 0) return;
 setCompleted(true);
 trackEvent("calculator_complete", { calculator: "purchase-cost" });
 }, [unlocked, completed, result.price]);

 return (
 <div className="grid gap-10 lg:grid-cols-2">
 <div className="order-2 space-y-4 lg:order-1">
 <label className="block text-sm">
 <span className="text-ink-muted">Purchase price (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={purchasePrice}
 onChange={(e) => guardSet(setPurchasePrice)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">DLD transfer fee (%)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={dldPct}
 onChange={(e) => guardSet(setDldPct)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Agency commission (%)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={agencyPct}
 onChange={(e) => guardSet(setAgencyPct)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Trustee / registration (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={trusteeFee}
 onChange={(e) => guardSet(setTrusteeFee)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Admin / NOC / misc (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={adminFees}
 onChange={(e) => guardSet(setAdminFees)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Furniture / fit-out (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={furniture}
 onChange={(e) => guardSet(setFurniture)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Other acquisition (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 value={other}
 onChange={(e) => guardSet(setOther)(e.target.value)}
 onFocus={() => {
 if (!unlocked) requireAccess();
 }}
 />
 </label>
 <p className="text-xs text-ink-muted">
 Defaults are illustrative (e.g. ~4% DLD framing). Confirm actual fees for your transaction, buyer/seller
 splits can vary.
 </p>
 </div>

 <GatedResults className="order-1 lg:order-2">
 <div className="border border-line bg-ink/[0.02] p-6">
 <h2 className="font-display text-xl font-bold text-ink">Cost stack</h2>
 <dl className="mt-6 space-y-3 text-sm">
 {[
 ["Purchase price", result.price],
 ["DLD", result.dld],
 ["Agency", result.agency],
 ["Trustee", result.trustee],
 ["Admin / misc", result.admin],
 ["Furniture", result.furn],
 ["Other", result.oth],
 ].map(([label, value]) => (
 <div key={String(label)} className="flex justify-between gap-3 sm:gap-4 border-b border-line/60 py-2">
 <dt className="text-ink-muted">{label}</dt>
 <dd className="font-medium text-ink">AED {money(Number(value))}</dd>
 </div>
 ))}
 <div className="flex justify-between gap-3 sm:gap-4 pt-2">
 <dt className="font-semibold text-ink">Total capital deployed</dt>
 <dd className="font-semibold text-ink">AED {money(result.total)}</dd>
 </div>
 <div className="flex justify-between gap-3 sm:gap-4">
 <dt className="text-ink-muted">Acquisition costs / price</dt>
 <dd className="text-ink">{(result.acquisitionPct * 100).toFixed(2)}%</dd>
 </div>
 </dl>
 <Link href="/strategy-session" className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto">
 {siteConfig.cta.strategySession}
 </Link>
 </div>
 </GatedResults>
 </div>
 );
}
