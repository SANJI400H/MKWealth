"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GatedResults } from "@/components/tools/GatedResults";
import { trackEvent } from "@/lib/analytics";
import {
 parseDecimal,
 percentAboveWarning,
 requireNonNegativeAmount,
 requirePercent,
 requirePositiveAmount,
} from "@/lib/calculators/validate";
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
 const [purchasePrice, setPurchasePrice] = useState("2000000");
 const [dldPct, setDldPct] = useState("4");
 const [agencyPct, setAgencyPct] = useState("2");
 const [trusteeFee, setTrusteeFee] = useState("4000");
 const [adminFees, setAdminFees] = useState("0");
 const [furniture, setFurniture] = useState("0");
 const [other, setOther] = useState("0");
 const [includeVat, setIncludeVat] = useState(true);
 const [dldAdminFee, setDldAdminFee] = useState("580");
 const [started, setStarted] = useState(false);
 const [completed, setCompleted] = useState(false);

 useEffect(() => {
 if (started) return;
 setStarted(true);
 trackEvent("calculator_start", { calculator: "purchase-cost" });
 }, [started]);

 const errors = {
 price: requirePositiveAmount(purchasePrice),
 dld: requirePercent(dldPct, 20),
 agency: requirePercent(agencyPct, 20),
 trustee: requireNonNegativeAmount(trusteeFee),
 dldAdmin: requireNonNegativeAmount(dldAdminFee),
 admin: requireNonNegativeAmount(adminFees),
 furniture: requireNonNegativeAmount(furniture),
 other: requireNonNegativeAmount(other),
 };
 const warnings = {
 dld: percentAboveWarning(dldPct, 10),
 agency: percentAboveWarning(agencyPct, 10),
 };
 const invalid = Object.values(errors).some(Boolean);

 const result = useMemo(() => {
 if (invalid) return null;
 const price = parseDecimal(purchasePrice) ?? 0;
 const dld = price * pct(dldPct);
 const agency = price * pct(agencyPct);
 const trustee = parseDecimal(trusteeFee) ?? 0;
 const dldAdmin = parseDecimal(dldAdminFee) ?? 0;
 const vat = includeVat ? 0.05 * (agency + trustee) : 0;
 const admin = num(adminFees);
 const furn = num(furniture);
 const oth = num(other);
 const acquisition = dld + agency + trustee + vat + dldAdmin + admin + furn + oth;
 const total = price + acquisition;
 const acquisitionPct = price > 0 ? acquisition / price : 0;
 return { price, dld, agency, trustee, vat, dldAdmin, admin, furn, oth, acquisition, total, acquisitionPct };
 }, [invalid, purchasePrice, dldPct, agencyPct, trusteeFee, dldAdminFee, includeVat, adminFees, furniture, other]);

 useEffect(() => {
 if (completed || !result || result.price <= 0) return;
 setCompleted(true);
 trackEvent("calculator_complete", { calculator: "purchase-cost" });
 }, [completed, result]);

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
 {errors.price ? <span className="mt-1 block text-xs text-maroon">{errors.price}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">DLD transfer fee (%)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={dldPct}
 onChange={(e) => setDldPct(e.target.value)}
 />
 {errors.dld ? <span className="mt-1 block text-xs text-maroon">{errors.dld}</span> : null}
 {warnings.dld ? <span className="mt-1 block text-xs text-amber-800">{warnings.dld}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Agency commission (%)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={agencyPct}
 onChange={(e) => setAgencyPct(e.target.value)}
 />
 {errors.agency ? <span className="mt-1 block text-xs text-maroon">{errors.agency}</span> : null}
 {warnings.agency ? <span className="mt-1 block text-xs text-amber-800">{warnings.agency}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Trustee / registration (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={trusteeFee}
 onChange={(e) => setTrusteeFee(e.target.value)}
 />
 {errors.trustee ? <span className="mt-1 block text-xs text-maroon">{errors.trustee}</span> : null}
 </label>
 <label className="flex items-start gap-2 text-sm text-ink">
 <input type="checkbox" className="mt-1" checked={includeVat} onChange={(e) => setIncludeVat(e.target.checked)} />
 <span>VAT on agency and trustee (5%). Confirm for your transaction.</span>
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">DLD admin / title deed fee (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={dldAdminFee}
 onChange={(e) => setDldAdminFee(e.target.value)}
 />
 {errors.dldAdmin ? <span className="mt-1 block text-xs text-maroon">{errors.dldAdmin}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Admin / NOC / misc (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={adminFees}
 onChange={(e) => setAdminFees(e.target.value)}
 />
 {errors.admin ? <span className="mt-1 block text-xs text-maroon">{errors.admin}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Furniture / fit-out (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={furniture}
 onChange={(e) => setFurniture(e.target.value)}
 />
 {errors.furniture ? <span className="mt-1 block text-xs text-maroon">{errors.furniture}</span> : null}
 </label>
 <label className="block text-sm">
 <span className="text-ink-muted">Other acquisition (AED)</span>
 <input
 className={`${fieldClass} mt-1`}
 inputMode="decimal"
 value={other}
 onChange={(e) => setOther(e.target.value)}
 />
 {errors.other ? <span className="mt-1 block text-xs text-maroon">{errors.other}</span> : null}
 </label>
 <p className="text-xs text-ink-muted">
 Defaults are illustrative (e.g. ~4% DLD framing). Confirm actual fees for your transaction, buyer/seller
 splits can vary.
 </p>
 </div>

 <GatedResults className="order-1 lg:order-2">
 {!result ? (
 <p className="text-sm text-ink-muted">Enter valid inputs to see an estimate.</p>
 ) : (
 <div className="border border-line bg-ink/[0.02] p-6">
 <h2 className="font-display text-xl font-bold text-ink">Cost stack</h2>
 <dl className="mt-6 space-y-3 text-sm">
 {[
 ["Purchase price", result.price],
 ["DLD", result.dld],
 ["Agency", result.agency],
 ["Trustee", result.trustee],
 ["VAT on agency and trustee", result.vat],
 ["DLD admin / title deed", result.dldAdmin],
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
 )}
 </GatedResults>
 </div>
 );
}
