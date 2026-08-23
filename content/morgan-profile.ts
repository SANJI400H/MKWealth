/**
 * Verified Morgan Kaiser profile fields.
 * Do not invent credentials. Unverified items stay null / TODO comments.
 */

export const morganProfile = {
  name: "Morgan Kaiser",
  /** Working public title — update after discovery interview if needed. */
  title: "Dubai Real Estate Investment Advisor & Property Portfolio Strategist",
  /** Shorter supporting line under title. */
  expertiseLine: "Off-Plan | Secondary Market | Property Portfolio Strategy",
  company: "Huspy",
  /** TODO: confirm exact Huspy role title with Morgan (e.g. Associate Director). */
  companyRole: "Partner agent",
  /** TODO: MORGAN_VERIFIED_LOCATION_DETAIL */
  location: "Dubai, United Arab Emirates",
  philosophy: "Numbers first. Property second.",
  /** TODO: MORGAN_VERIFIED_RERA_OR_DLD_CREDENTIAL — display only when set */
  reraOrDldCredential: null as string | null,
  /** TODO: MORGAN_VERIFIED_TRANSACTION_VOLUME */
  transactionVolume: null as string | null,
  /** TODO: MORGAN_VERIFIED_CLIENT_GEOGRAPHIES */
  clientGeographies: null as string[] | null,
  /** TODO: MORGAN_VERIFIED_AWARDS */
  awards: null as string[] | null,
  /** TODO: MORGAN_VERIFIED_MEDIA */
  mediaAppearances: null as string[] | null,
  /** TODO: MORGAN_VERIFIED_YEARS_EXPERIENCE */
  yearsExperience: null as number | null,
  aboutPlaceholders: {
    careerStory: "TODO: Morgan discovery interview — career story.",
    whyNumbersFirst: "TODO: Morgan discovery interview — why numbers-first.",
    internationalExperience: "TODO: Morgan discovery interview — international investor experience.",
    methodology: "TODO: Morgan discovery interview — investment methodology detail.",
    howClientsWork: "TODO: Morgan discovery interview — engagement process.",
  },
} as const;
