/**
 * Verified Morgan Kaiser profile fields, sourced from Brand & Growth discovery questionnaire (Aug 2026).
 * Do not invent credentials. Items Morgan declined to particularise stay null.
 * Brand safety: no sold-sign / unit-volume flex; no influencer-style Dubai RE framing.
 */

export const morganProfile = {
 name: "Morgan Kaiser",
 /** Brand / entity framing from discovery */
 entityLine: "Morgan Kaiser. Wealth Management",
 /** Public title. UAE Property Portfolio Strategist */
 title: "UAE Property Portfolio Strategist",
 /** Supporting expertise framing */
 expertiseLine: "Vision · Strategy · Property",
 company: "Huspy",
 companyRole: "Associate Director",
 location: "Dubai, United Arab Emirates",
 /** Core brand philosophy */
 philosophy: "Vision First. Strategy Second. Property Third.",
 philosophyLines: ["Vision First.", "Strategy Second.", "Property Third."] as const,
 formulaHeadline: "Formula Over Feelings.",
 huspyLine:
 "As an Associate Director at Huspy, Morgan provides strategic property guidance and access to the relationships, market intelligence and opportunities required throughout the property acquisition journey.",
 /** RERA broker number from discovery, keep format as provided */
 reraOrDldCredential: "RERA 92787",
 /**
 * Soft proof Morgan authorised for public use (not brokerage unit-volume).
 * Do not turn into a sold-sign / sales-volume claim.
 */
 personalPortfolioNote:
 "Morgan owns multiple properties in the UAE and across different continents.",
 aumNote: "Nine-figure active assets under management across the UAE (as stated for public framing).",
 earningsNote: "Seven-figure annual earner (as stated for public framing).",
 /** Prefer not to publish raw brokerage transaction volume */
 transactionVolume: null as string | null,
 clientGeographies: [
 "United Kingdom",
 "Europe",
 "UAE",
 "GCC",
 "India",
 "Asia",
 "Africa",
 "North America",
 "Australia",
 ] as string[],
 /** Ideal capital filter from discovery, do not prioritise below this */
 preferredMinimumCapitalAed: "AED 2M+",
 idealClientFilter:
 "International investors building multi-year UAE exposure, not end-users, and not tickets below AED 2M.",
 awards: ["Huspy No.1 Broker", "Allegiance No.1 B2C Broker"] as string[],
 mediaAppearances: null as string[] | null,
 yearsExperience: null as number | null,
 /** Current commercial mix from discovery */
 currentMixNote: "Current acquisition focus is 100% off-plan.",
 marketFocusNote: "Strong working knowledge across Dubai, Abu Dhabi and Ras Al Khaimah.",
 priorityAreas: [
 "Hudayriyat Island",
 "Ramhan Island",
 "Saadiyat Island",
 "Yas Island",
 "Al Reem Island",
 "Al Marjan Island",
 "Maritime City",
 "Palm Jebel Ali",
 ] as string[],
 priorityDevelopers: [
 "Modon",
 "Aldar",
 "Emaar",
 "Nakheel",
 "Meraas",
 "Sobha",
 "Ellington",
 "Dar Global",
 ] as string[],
 priorityProjects: [
 "Lunaya by Zaya",
 "Marsa Al Saadiyat",
 "Mondrian Residences",
 "One District Commercial",
 ] as string[],
 brandSafety: [
 "No sold-sign / unit-volume sales flex on the public site",
 "No association with low-quality developers",
 "No influencer-style Dubai real-estate content positioning",
 ] as string[],
 about: {
 careerStory:
 "Morgan went from washing caravans in the rain at the largest leisure-home sales company in the UK to becoming their top sales representative, then business manager, managing the largest leisure finance account in the UK. He moved to Dubai to pursue a life without a ceiling. Real estate was new; business, finance and money were not. He attended international roadshows in the UAE selling Dubai property before transitioning companies to build a better platform for scaling investment property portfolios for international clients.",
 whyNumbersFirst:
 "The work starts with a strategy session: where the investor is today, what the motivations are, and where capital needs to go over the next decade, before any brochure shortlist. Emirate, area and product only come after that brief is clear.",
 internationalExperience:
 "Morgan’s client base spans the UK, Europe, the UAE, the GCC, India, Asia, Africa, North America and Australia. He builds and scales UAE property portfolios for international investors, with coordination through preferred banking channels, visa pathways, corporate structure, wills and succession planning where relevant.",
 methodology:
 "After the strategy session, Morgan shares structured materials on the areas under consideration. Once the right emirate and micro-market are identified, the shortlist is limited to options that fit cash-flow and leverage preferences. Exit strategy and financing are discussed together. After acquisition, support continues through fund movement, developer paperwork, and introductions into Morgan’s private investor channel and network.",
 howClientsWork:
 "This is framed as a multi-generational journey, not a one-off purchase. Strategy first, focused research second, underwritten options third, then acquisition support and ongoing portfolio coordination.",
 },
};
