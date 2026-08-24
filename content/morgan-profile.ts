/**
 * Verified Morgan Kaiser profile fields.
 * Do not invent credentials. Unverified items stay null / TODO comments.
 */

export const morganProfile = {
  name: "Morgan Kaiser",
  /** Public title — UAE Property Portfolio Strategist */
  title: "UAE Property Portfolio Strategist",
  /** Supporting expertise framing */
  expertiseLine: "Vision · Strategy · Property",
  company: "Huspy",
  companyRole: "Associate Director",
  /** TODO: MORGAN_VERIFIED_LOCATION_DETAIL */
  location: "Dubai, United Arab Emirates",
  /** Core brand philosophy */
  philosophy: "Vision First. Strategy Second. Property Third.",
  philosophyLines: ["Vision First.", "Strategy Second.", "Property Third."] as const,
  formulaHeadline: "Formula Over Feelings.",
  huspyLine:
    "As an Associate Director at Huspy, Morgan provides strategic property guidance and access to the relationships, market intelligence and opportunities required throughout the property acquisition journey.",
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
    whyNumbersFirst: "TODO: Morgan discovery interview — why formula over feelings.",
    internationalExperience: "TODO: Morgan discovery interview — international investor experience.",
    methodology: "TODO: Morgan discovery interview — investment methodology detail.",
    howClientsWork: "TODO: Morgan discovery interview — engagement process.",
  },
} as const;
