import { regulatory } from "@/content/regulatory";

export type PublishStatus = "published" | "draft";

export interface RealNumberEntry {
 id: string;
 claim: string;
 value: string;
 caveat: string;
 source: string;
 asOf: string;
 status: PublishStatus;
 relatedHref?: string;
}

/**
 * Only entries backed by regulatory config or explicitly illustrative framing.
 * Do not invent KPIs here.
 */
export const realNumberEntries: RealNumberEntry[] = [
 {
 id: "dld-transfer-fee",
 claim: "Dubai Land Department transfer fee (typical framing)",
 value: regulatory.dubaiAcquisition.dldTransferFeeTypical.value,
 caveat: regulatory.dubaiAcquisition.dldTransferFeeTypical.note ?? "",
 source: regulatory.dubaiAcquisition.dldTransferFeeTypical.source,
 asOf: regulatory.dubaiAcquisition.dldTransferFeeTypical.lastReviewed,
 status: "published",
 relatedHref: "/calculators/purchase-cost",
 },
 {
 id: "golden-visa-threshold",
 claim: "Golden Visa, commonly cited property investment threshold",
 value: regulatory.goldenVisa.headlineThresholdAed.value,
 caveat: `${regulatory.goldenVisa.headlineThresholdAed.note ?? ""} ${regulatory.goldenVisa.offPlanNote}`,
 source: regulatory.goldenVisa.headlineThresholdAed.source,
 asOf: regulatory.goldenVisa.headlineThresholdAed.lastReviewed,
 status: "published",
 relatedHref: "/invest/dubai",
 },
 {
 id: "dubai-gross-yield-illustrative",
 claim: "Dubai gross rental yield, illustrative market talk",
 value: regulatory.yields.dubaiGrossIllustrative.value,
 caveat: regulatory.yields.dubaiGrossIllustrative.note ?? "",
 source: regulatory.yields.dubaiGrossIllustrative.source,
 asOf: regulatory.yields.dubaiGrossIllustrative.lastReviewed,
 status: "published",
 relatedHref: "/calculators/true-yield",
 },
 {
 id: "abu-dhabi-gross-yield-illustrative",
 claim: "Abu Dhabi gross yield, illustrative framing",
 value: regulatory.yields.abuDhabiGrossIllustrative.value,
 caveat: regulatory.yields.abuDhabiGrossIllustrative.note ?? "",
 source: regulatory.yields.abuDhabiGrossIllustrative.source,
 asOf: regulatory.yields.abuDhabiGrossIllustrative.lastReviewed,
 status: "published",
 relatedHref: "/invest/abu-dhabi",
 },
 {
 id: "uae-personal-tax-note",
 claim: "UAE individual property returns, tax framing",
 value: "No UAE personal income / CGT on typical individual property returns (fees still apply)",
 caveat: regulatory.tax.uaeIndividualPropertyNote,
 source: "Site regulatory config, educational framing, not tax advice",
 asOf: "2026-08-20",
 status: "published",
 relatedHref: "/disclaimer",
 },
 {
 id: "methodology-rule",
 claim: "How numbers appear on this site",
 value: "Source · period · last reviewed, or labelled illustrative",
 caveat:
 "Unsourced permanent claims (e.g. hard “Dubai yields X%”) are avoided. Transaction volume, awards, and RERA IDs appear only when Morgan-verified.",
 source: "Site editorial policy",
 asOf: "2026-08-20",
 status: "published",
 relatedHref: "/about#methodology",
 },
];

export function getPublishedRealNumbers() {
 return realNumberEntries.filter((e) => e.status === "published");
}
