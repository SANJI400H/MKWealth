/**
 * Central regulatory / market reference claims.
 * Update here — do not hard-code figures across pages.
 * Every public number should carry source + period + lastReviewed.
 */

export type SourcedClaim = {
  value: string;
  note?: string;
  source: string;
  sourceUrl?: string;
  referencePeriod?: string;
  lastReviewed: string;
  /** When false, do not present as a hard public claim without qualifier. */
  verified: boolean;
};

export const regulatory = {
  goldenVisa: {
    headlineThresholdAed: {
      value: "AED 2,000,000",
      note: "Federal property investment threshold commonly cited for 10-year Golden Visa eligibility. Exact rules (including mortgage treatment and off-plan paid percentage) are set by authorities and change — confirm before relying on this for planning.",
      source: "UAE Federal Authority for Identity, Citizenship, Customs & Port Security / Land Department practice — verify current rules",
      referencePeriod: "As commonly applied; confirm at time of application",
      lastReviewed: "2026-08-20",
      verified: false,
    } satisfies SourcedClaim,
    offPlanNote:
      "Off-plan eligibility often depends on a minimum percentage of the purchase price paid. Confirm current Land Department requirements before treating visa planning as settled.",
  },
  dubaiAcquisition: {
    dldTransferFeeTypical: {
      value: "Typically ~4% of purchase price",
      note: "Dubai Land Department transfer fee for many freehold purchases. Exact rate and who pays (buyer/seller split) can vary by transaction — verify at the time of purchase.",
      source: "Dubai Land Department publicly referenced practice",
      lastReviewed: "2026-08-20",
      verified: false,
    } satisfies SourcedClaim,
  },
  yields: {
    dubaiGrossIllustrative: {
      value: "Illustrative gross rental yields often discussed in a wide band (commonly cited ~5–9% depending on unit type and area)",
      note: "Not a forecast. Yields vary by asset, entry price, achievable rent, vacancy, and costs. Prefer underwriting a specific unit over citywide averages.",
      source: "Market practice / illustrative only — replace with sourced period data when available",
      lastReviewed: "2026-08-20",
      verified: false,
    } satisfies SourcedClaim,
    abuDhabiGrossIllustrative: {
      value: "Illustrative gross yields in investment zones often discussed in a narrower band than Dubai's wider range",
      note: "Illustrative only. Underwrite the specific asset.",
      source: "Market practice / illustrative only",
      lastReviewed: "2026-08-20",
      verified: false,
    } satisfies SourcedClaim,
  },
  tax: {
    uaeIndividualPropertyNote:
      "The UAE does not levy personal income tax or capital gains tax on typical individual property investment returns inside the UAE. Buyers still pay acquisition/registration fees. Investors may have tax obligations in their home country — this site does not provide tax advice.",
  },
  disclaimerShort:
    "Information on this site is educational and may change. It is not legal, tax, or financial advice. Past or illustrative performance does not guarantee future results. Investment decisions depend on individual circumstances.",
} as const;
