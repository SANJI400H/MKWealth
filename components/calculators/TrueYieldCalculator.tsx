"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GatedResults } from "@/components/tools/GatedResults";
import { trackEvent } from "@/lib/analytics";
import { parseDecimal, requireNonNegativeAmount, requirePercent, requirePositiveAmount } from "@/lib/calculators/validate";
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

function ratio(n: number) {
 if (!Number.isFinite(n)) return ", ";
 return `${(n * 100).toFixed(2)}%`;
}

/**
 * Transparent UAE property yield underwriting helper.
 * Educational, not advice. Methodology shown inline.
 */
export default function TrueYieldCalculator() {
 const [purchasePrice, setPurchasePrice] = useState("2000000");
 const [annualRent, setAnnualRent] = useState("140000");
 const [dldPct, setDldPct] = useState("4");
 const [agencyPct, setAgencyPct] = useState("2");
 const [trusteeFee, setTrusteeFee] = useState("4000");
 const [otherAcquisition, setOtherAcquisition] = useState("0");
 const [serviceCharges, setServiceCharges] = useState("18000");
 const [managementPct, setManagementPct] = useState("5");
 const [vacancyPct, setVacancyPct] = useState("5");
 const [maintenance, setMaintenance] = useState("5000");
 const [insurance, setInsurance] = useState("2000");
 const [cooling, setCooling] = useState("0");
 const [otherAnnual, setOtherAnnual] = useState("0");
 const [includeVat, setIncludeVat] = useState(true);
 const [dldAdminFee, setDldAdminFee] = useState("580");
 const [started, setStarted] = useState(false);

 useEffect(() => {
 if (started) return;
 setStarted(true);
 trackEvent("calculator_start", { calculator: "true-yield" });
 }, [started]);

 const result = useMemo(() => {
 const invalid = [
 requirePositiveAmount(purchasePrice),
 requireNonNegativeAmount(annualRent),
 requirePercent(dldPct),
 requirePercent(agencyPct),
 requireNonNegativeAmount(trusteeFee),
 requireNonNegativeAmount(dldAdminFee),
 requireNonNegativeAmount(otherAcquisition),
 requireNonNegativeAmount(serviceCharges),
 requirePercent(managementPct),
 requirePercent(vacancyPct),
 requireNonNegativeAmount(maintenance),
 requireNonNegativeAmount(insurance),
 requireNonNegativeAmount(cooling),
 requireNonNegativeAmount(otherAnnual),
 ].some(Boolean);
 if (invalid) return null;

 const price = parseDecimal(purchasePrice) ?? 0;
 const rent = parseDecimal(annualRent) ?? 0;
 const dld = price * pct(dldPct);
 const agency = price * pct(agencyPct);
 const trustee = parseDecimal(trusteeFee) ?? 0;
 const dldAdmin = parseDecimal(dldAdminFee) ?? 0;
 const vat = includeVat ? 0.05 * (agency + trustee) : 0;
 const otherAcq = num(otherAcquisition);
 const capital = price + dld + agency + trustee + vat + dldAdmin + otherAcq;

 const vacancyLoss = rent * pct(vacancyPct);
 const effectiveRent = rent - vacancyLoss;
 const management = effectiveRent * pct(managementPct);
 const service = num(serviceCharges);
 const maint = num(maintenance);
 const ins = num(insurance);
 const cool = num(cooling);
 const other = num(otherAnnual);
 const annualCosts = management + service + maint + ins + cool + other + vacancyLoss;
 const netIncome = rent - annualCosts;
 const grossYield = price > 0 ? rent / price : 0;
 const netYieldOnPrice = price > 0 ? netIncome / price : 0;
 const netYieldOnCapital = capital > 0 ? netIncome / capital : 0;

 return {
 price,
 rent,
 capital,
 vacancyLoss,
 management,
 service,
 maint,
 ins,
 cool,
 other,
 annualCosts,
 netIncome,
 grossYield,
 netYieldOnPrice,
 netYieldOnCapital,
 vat,
 dldAdmin,
 };
 }, [
 purchasePrice,
 annualRent,
 dldPct,
 agencyPct,
 trusteeFee,
 dldAdminFee,
 includeVat,
 otherAcquisition,
 serviceCharges,
 managementPct,
 vacancyPct,
 maintenance,
 insurance,
 cooling,
 otherAnnual,
 ]);

 useEffect(() => {
 if (!result) return;
 trackEvent("calculator_complete", {
 calculator: "true-yield",
 gross_yield: Number(result.grossYield.toFixed(4)),
 net_yield_capital: Number(result.netYieldOnCapital.toFixed(4)),
 });
 }, [result]);

 const fieldErrors: Record<string, string | null> = {
 "Purchase price (AED)": requirePositiveAmount(purchasePrice),
 "Annual rent (AED)": requireNonNegativeAmount(annualRent),
 "DLD / transfer fee %": requirePercent(dldPct),
 "Agency commission %": requirePercent(agencyPct),
 "Trustee / registration fee (AED)": requireNonNegativeAmount(trusteeFee),
 "DLD admin / title deed fee (AED)": requireNonNegativeAmount(dldAdminFee),
 "Other acquisition costs (AED)": requireNonNegativeAmount(otherAcquisition),
 "Service charges (AED / year)": requireNonNegativeAmount(serviceCharges),
 "Management fee % of effective rent": requirePercent(managementPct),
 "Vacancy assumption %": requirePercent(vacancyPct),
 "Maintenance (AED / year)": requireNonNegativeAmount(maintenance),
 "Insurance (AED / year)": requireNonNegativeAmount(insurance),
 "Cooling / chiller (AED / year)": requireNonNegativeAmount(cooling),
 "Other annual costs (AED)": requireNonNegativeAmount(otherAnnual),
 };

 const fields: { label: string; help: string; value: string; set: (v: string) => void; suffix?: string }[] = [
 { label: "Purchase price (AED)", help: "Contract price before acquisition costs.", value: purchasePrice, set: setPurchasePrice },
 { label: "Annual rent (AED)", help: "Expected or asking annual rent before vacancy.", value: annualRent, set: setAnnualRent },
 { label: "DLD / transfer fee %", help: "Often ~4% in Dubai freehold, confirm for your transaction.", value: dldPct, set: setDldPct, suffix: "%" },
 { label: "Agency commission %", help: "Buyer-side agency if applicable.", value: agencyPct, set: setAgencyPct, suffix: "%" },
 { label: "Trustee / registration fee (AED)", help: "Fixed or quoted registration/trustee costs.", value: trusteeFee, set: setTrusteeFee },
 { label: "DLD admin / title deed fee (AED)", help: "Illustrative title-deed and admin fee. Confirm for your transaction.", value: dldAdminFee, set: setDldAdminFee },
 { label: "Other acquisition costs (AED)", help: "NOC, furniture packages paid at buy, and other quoted costs.", value: otherAcquisition, set: setOtherAcquisition },
 { label: "Service charges (AED / year)", help: "Community / building service charges.", value: serviceCharges, set: setServiceCharges },
 { label: "Management fee % of effective rent", help: "Property manager fee if used.", value: managementPct, set: setManagementPct, suffix: "%" },
 { label: "Vacancy assumption %", help: "Expected void / unpaid period as % of annual rent.", value: vacancyPct, set: setVacancyPct, suffix: "%" },
 { label: "Maintenance (AED / year)", help: "Repairs, appliances, soft furnishings allowance.", value: maintenance, set: setMaintenance },
 { label: "Insurance (AED / year)", help: "Building / contents as applicable.", value: insurance, set: setInsurance },
 { label: "Cooling / chiller (AED / year)", help: "Where billed separately from service charges.", value: cooling, set: setCooling },
 { label: "Other annual costs (AED)", help: "Anything else recurring.", value: otherAnnual, set: setOtherAnnual },
 ];

 return (
 <div className="grid gap-10 lg:grid-cols-2">
 <div className="order-2 space-y-4 lg:order-1">
 {fields.map((f) => (
 <label key={f.label} className="block text-sm text-ink-muted">
 <span className="font-medium text-ink">{f.label}</span>
 <span className="mt-0.5 block text-xs">{f.help}</span>
 <div className="mt-1.5 flex items-center gap-2">
 <input
 className={fieldClass}
 value={f.value}
 onChange={(e) => f.set(e.target.value)}
 inputMode="decimal"
 />
 {f.suffix ? <span className="text-ink-muted">{f.suffix}</span> : null}
 </div>
 {fieldErrors[f.label] ? <span className="mt-1 block text-xs text-maroon">{fieldErrors[f.label]}</span> : null}
 </label>
 ))}
 <label className="flex items-start gap-2 text-sm text-ink">
 <input
 type="checkbox"
 className="mt-1"
 checked={includeVat}
 onChange={(e) => setIncludeVat(e.target.checked)}
 />
 <span>VAT on agency and trustee (5%). Confirm for your transaction.</span>
 </label>
 </div>

 <GatedResults className="order-1 lg:order-2">
 {!result ? (
 <p className="text-sm text-ink-muted">Enter valid inputs to see an estimate.</p>
 ) : (
 <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
 <div className="rounded-sm border border-line p-5">
 <p className="eyebrow">Outputs</p>
 <dl className="mt-4 space-y-3 text-sm">
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">Advertised / gross yield</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">{ratio(result.grossYield)}</dd>
 </div>
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">Net annual rental income</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">AED {money(result.netIncome)}</dd>
 </div>
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">VAT on agency and trustee</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">AED {money(result.vat)}</dd>
 </div>
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">DLD admin / title deed</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">AED {money(result.dldAdmin)}</dd>
 </div>
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">True capital deployed</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">AED {money(result.capital)}</dd>
 </div>
 <div className="flex justify-between gap-3 border-b border-line pb-2 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">Net yield on purchase price</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">{ratio(result.netYieldOnPrice)}</dd>
 </div>
 <div className="flex justify-between gap-3 sm:gap-4">
 <dt className="min-w-0 pr-2 text-ink-muted">Net yield on capital deployed</dt>
 <dd className="shrink-0 text-right font-semibold tabular-nums text-ink">{ratio(result.netYieldOnCapital)}</dd>
 </div>
 </dl>
 </div>

 <div className="rounded-sm border border-line p-5">
 <p className="eyebrow">Annual cost breakdown</p>
 <ul className="mt-4 space-y-2 text-sm text-ink-muted">
 <li className="flex justify-between gap-3">
 <span>Vacancy loss</span>
 <span>AED {money(result.vacancyLoss)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Management</span>
 <span>AED {money(result.management)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Service charges</span>
 <span>AED {money(result.service)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Maintenance</span>
 <span>AED {money(result.maint)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Insurance</span>
 <span>AED {money(result.ins)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Cooling</span>
 <span>AED {money(result.cool)}</span>
 </li>
 <li className="flex justify-between gap-3">
 <span>Other</span>
 <span>AED {money(result.other)}</span>
 </li>
 <li className="flex justify-between gap-3 border-t border-line pt-2 font-medium text-ink">
 <span>Total annual costs</span>
 <span>AED {money(result.annualCosts)}</span>
 </li>
 </ul>
 <p className="mt-4 text-xs text-ink-muted">
 Gross yield = annual rent ÷ purchase price. True capital = price + DLD + agency + trustee + VAT
 (when included) + DLD admin + other acquisition. Net income = rent − all annual costs (including
 vacancy). Net yield on capital = net income ÷ true capital. Confirm the fees for your transaction.
 </p>
 </div>

 <Link href="/strategy-session" className="btn-primary inline-flex w-full justify-center sm:w-auto">
 {siteConfig.cta.strategySession}
 </Link>
 <p className="text-xs text-ink-muted">
 Or{" "}
 <Link href="/work-with-morgan" className="text-maroon hover:underline">
 Work With Morgan
 </Link>
 . Illustrative only, not advice.
 </p>
 </div>
 )}
 </GatedResults>
 </div>
 );
}
