export type PublishStatus = "published" | "draft";

export type DeveloperSource = { label: string; url?: string; note?: string };

export interface Developer {
 slug: string;
 name: string;
 status: PublishStatus;
 markets: ("dubai" | "abu-dhabi" | "rak")[];
 tagline: string;
 overview: string;
 morganExperience: string;
 trackRecord: string;
 projects: string[];
 deliveryNotes: string;
 paymentPlanNotes: string;
 suitability: string;
 risks: string[];
 relatedInsightSlugs?: string[];
 sources?: DeveloperSource[];
 workingNote?: string;
 /** Shown when the spoken name still needs confirmation. */
 nameConfirm?: string;
 yearsActive?: string | null;
 deliveredNote?: string | null;
 productPositioning?: string;
 strengths?: string[];
 morganView?: string;
}

const ACTIVE =
 "Morgan listed this developer among those he knows particularly well or actively works with. That is evaluation access, not an endorsement of any project.";

export const developers: Developer[] = [
 {
 slug: "emaar",
 name: "Emaar",
 status: "published",
 markets: ["dubai"],
 tagline: "Large-scale master developer, brand strength is not a substitute for unit underwriting.",
 workingNote: ACTIVE,
 overview:
 "Emaar is among the most visible Dubai developers, associated with landmark communities and high marketing reach. Visibility can support liquidity narratives, but each project still needs price, fees, delivery timing, and exit logic underwritten separately.",
 morganExperience:
 "Included in Morgan’s active developer set for international portfolio work. Treat every launch as a separate underwrite, brand does not waive payment-plan, fee or exit scrutiny.",
 trackRecord:
 "Public track record should be read from delivered communities and disclosed project histories, not from brochure claims alone. This page does not publish unverified delivery statistics.",
 projects: [
 "Iconic / Downtown-adjacent communities (evaluate unit by unit)",
 "Master-planned suburban and waterfront extensions (phase-dependent)",
 ],
 deliveryNotes:
 "Large pipelines mean phase timing and competing inventory matter. Confirm construction status, SPA milestones, and handover definitions for the specific unit.",
 paymentPlanNotes:
 "Payment plans vary by launch. Stress-test schedules against your liquidity using the payment-plan calculator, do not assume a ‘standard’ Emaar plan.",
 suitability:
 "Investors who want recognisable stock and clearer secondary comps in some communities, still only when price and net yield survive scrutiny.",
 risks: [
 "Paying a brand premium that rent cannot support",
 "Phase / inventory clustering",
 "Service-charge and association outcomes by community",
 "Assuming past landmark success guarantees future launches",
 ],
 relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work", "gross-vs-net-yield-dubai-property"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "nakheel",
 name: "Nakheel",
 status: "published",
 markets: ["dubai"],
 tagline: "Waterfront and island-scale master planning, delivery and masterplan risk sit beside brand.",
 workingNote: ACTIVE,
 overview:
 "Nakheel is closely associated with large waterfront and island concepts in Dubai. Masterplan ambition can create long-dated optionality, and long-dated uncertainty. Underwrite the phase you can actually buy.",
 morganExperience:
 "Included in Morgan’s active developer set. Palm Jebel Ali and related island product sit in his priority community list, still phase-by-phase underwriting only.",
 trackRecord:
 "Assess delivered phases vs announced masterplan. Do not treat concept renders as completion evidence.",
 projects: [
 "Island and waterfront master communities (phase-specific)",
 "Associated residential product within wider Nakheel plans",
 ],
 deliveryNotes:
 "Infrastructure and island access timing can dominate investor outcomes. Confirm what is delivered for your plot/building vs marketing timelines.",
 paymentPlanNotes:
 "Construction-linked schedules must match cash-flow. Compare early vs late instalment weightings carefully.",
 suitability:
 "Investors with longer horizons and tolerance for masterplan sequencing, not short flip assumptions.",
 risks: [
 "Masterplan and infrastructure delays",
 "Liquidity thinner than core urban towers in some phases",
 "Concept premium vs achievable rent",
 "Cross-cycle hold requirements",
 ],
 relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "aldar",
 name: "Aldar",
 status: "published",
 markets: ["abu-dhabi"],
 tagline: "Major Abu Dhabi developer, evaluate on AD liquidity and cycle, not Dubai comps.",
 workingNote: ACTIVE,
 overview:
 "Aldar is a primary Abu Dhabi development name across residential and mixed-use contexts. Cross-emirate investors should reset liquidity and yield expectations vs Dubai before comparing ticket prices.",
 morganExperience:
 "Included in Morgan’s active developer set for Abu Dhabi work (including island / leisure-adjacent contexts such as Saadiyat and Yas, underwrite the specific project).",
 trackRecord:
 "Use disclosed Abu Dhabi delivery history and community performance, this page does not invent rankings.",
 projects: [
 "Abu Dhabi mainland communities",
 "Island / leisure-adjacent product (where applicable), underwrite phase by phase",
 ],
 deliveryNotes:
 "Confirm construction progress and handover terms in the SPA. Abu Dhabi process and fee stacks can differ from Dubai.",
 paymentPlanNotes:
 "Plan structures vary. Model cash needs through construction; financing eligibility is not guaranteed by brand.",
 suitability:
 "Investors diversifying into Abu Dhabi with patient capital and realistic rent/exit assumptions.",
 risks: [
 "Applying Dubai yield or liquidity assumptions",
 "Phase delivery risk",
 "Thinner secondary markets in some segments",
 "Fee and process differences vs Dubai",
 ],
 relatedInsightSlugs: [],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "modon",
 name: "Modon",
 status: "published",
 markets: ["abu-dhabi"],
 tagline: "Abu Dhabi, anchored development context, underwrite on AD terms.",
 workingNote: ACTIVE,
 overview:
 "Modon sits in Morgan’s active Abu Dhabi developer set. Use this page as an evaluation framework for projects linked to Modon, not as a recommendation list.",
 morganExperience:
 "Named by Morgan among developers he knows particularly well or actively works with. Project-level maths still decide.",
 trackRecord: "Assess disclosed delivery and community performance, no invented rankings here.",
 projects: ["Evaluate live launches unit by unit against the investor brief"],
 deliveryNotes: "Confirm construction status, SPA milestones and what is delivered vs marketed for your phase.",
 paymentPlanNotes: "Stress-test schedules against liquidity; do not assume a standard plan.",
 suitability: "Investors allocating to Abu Dhabi with patient capital and clear exit logic.",
 risks: ["Cross-emirate comparison mistakes", "Phase delivery risk", "Liquidity thinner than core Dubai pockets"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "meraas",
 name: "Meraas",
 status: "published",
 markets: ["dubai"],
 tagline: "Lifestyle and masterplan-led Dubai product, underwrite the phase you can buy.",
 workingNote: ACTIVE,
 overview:
 "Meraas is associated with distinctive Dubai lifestyle and waterfront concepts. Brand and place-making do not replace payment-plan, fee and exit underwriting.",
 morganExperience:
 "Named by Morgan among developers he knows particularly well or actively works with, not an endorsement of any launch.",
 trackRecord: "Read delivered phases and disclosed histories; do not treat renders as completion evidence.",
 projects: ["Lifestyle / waterfront master communities, phase-specific"],
 deliveryNotes: "Infrastructure and amenity delivery timing can dominate outcomes.",
 paymentPlanNotes: "Construction-linked schedules must match cash-flow reality.",
 suitability: "Investors who accept masterplan sequencing risk when the brief fits.",
 risks: ["Masterplan timing", "Concept premium vs rent", "Liquidity variance by phase"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "sobha",
 name: "Sobha",
 status: "published",
 markets: ["dubai"],
 tagline: "Quality and delivery narratives still need unit-level maths.",
 workingNote: ACTIVE,
 overview:
 "Sobha is often discussed in quality and delivery conversations. Treat those narratives as hypotheses, underwrite price, fees, handover and exit for the specific unit.",
 morganExperience:
 "Named by Morgan among developers he knows particularly well or actively works with.",
 trackRecord: "Use disclosed delivery history, this page does not invent rankings.",
 projects: ["Evaluate live and secondary stock against the brief"],
 deliveryNotes: "Confirm construction status and SPA definitions of handover.",
 paymentPlanNotes: "Compare instalment weightings carefully against liquidity.",
 suitability: "Investors who want delivery-sensitive underwriting, not brochure trust.",
 risks: ["Brand premium", "Service-charge outcomes", "Supply clustering nearby"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "ellington",
 name: "Ellington",
 status: "published",
 markets: ["dubai"],
 tagline: "Design-led product, still underwrite capital deployed and exit.",
 workingNote: ACTIVE,
 overview:
 "Ellington is frequently associated with design-led residential product. Design does not waive yield, fee or liquidity scrutiny.",
 morganExperience:
 "Named by Morgan among developers he knows particularly well or actively works with.",
 trackRecord: "Assess delivered projects and disclosed histories without inventing rankings.",
 projects: ["Evaluate launches and completed stock unit by unit"],
 deliveryNotes: "Confirm milestones and what is contractually delivered.",
 paymentPlanNotes: "Stress-test the schedule against the investor’s cash-flow.",
 suitability: "Investors comparing design premiums against net return.",
 risks: ["Design premium vs rent", "Building-level variance", "Exit competition"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "dar-global",
 name: "Dar Global",
 status: "published",
 markets: ["dubai"],
 tagline: "International-facing product, underwrite UAE liquidity on UAE terms.",
 workingNote: ACTIVE,
 overview:
 "Dar Global appears in international-facing UAE conversations. Cross-border marketing does not change local fee stacks, handover risk or exit reality.",
 morganExperience:
 "Named by Morgan among developers he knows particularly well or actively works with.",
 trackRecord: "Use disclosed project histories, no invented delivery statistics here.",
 projects: ["Evaluate specific launches against the investor brief"],
 deliveryNotes: "Confirm construction progress and SPA handover definitions.",
 paymentPlanNotes: "Align financing appetite with drawdown schedules where leverage is used.",
 suitability: "International buyers who still insist on local underwriting discipline.",
 risks: ["Marketing vs local liquidity", "Payment-plan stress", "Exit timing"],
 sources: [{ label: "Morgan discovery questionnaire, active developer list (Aug 2026)" }],
 },
 {
 slug: "damac",
 name: "DAMAC",
 status: "published",
 markets: ["dubai"],
 tagline: "High-volume Dubai product. Brand offers are not a substitute for unit maths.",
 workingNote: ACTIVE,
 overview:
 "DAMAC is widely marketed across Dubai launches. Volume and incentives change the underwriting job: price, fees, handover and exit still decide.",
 morganExperience: "Named from Morgan's developer list. The public brand is DAMAC.",
 trackRecord: "Use disclosed delivery history. This page does not publish unverified completion statistics.",
 projects: ["Evaluate the specific launch, not the brand reel"],
 deliveryNotes: "Confirm construction status and the contractual meaning of handover.",
 paymentPlanNotes: "Incentive-heavy plans need a cash stress test. Do not underwrite the discount headline.",
 suitability: "Investors who can separate a promotion from the net return.",
 risks: ["Incentive versus net price", "Delivery clustering", "Exit competition"],
 productPositioning: "Often positioned with furnished or branded product. Confirm what is actually in the price.",
 strengths: ["Wide launch volume", "Payment plans that can spread cash"],
 morganView: "Treat every DAMAC launch as a fresh underwrite. The brand does not clear the brief.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "DAMAC public brand mark" }],
 },
 {
 slug: "danube",
 name: "Danube Properties",
 status: "published",
 markets: ["dubai"],
 tagline: "Payment-plan led product. The voice note said Zaya, which is a project name rather than this company.",
 workingNote: ACTIVE,
 overview:
 "Danube is often discussed through long payment plans. The plan is the product. Liquidity and handover still have to fit the investor.",
 morganExperience: "Danube Properties is the developer. Lunaya by Zaya remains a project name on Morgan's list.",
 trackRecord: "No delivery statistic is published here until Morgan verifies it.",
 projects: ["Lunaya by Zaya is already on Morgan's project list and may be the related name"],
 deliveryNotes: "Confirm milestones in the sale agreement.",
 paymentPlanNotes: "Long plans can look light on day one and heavy later. Model the whole schedule.",
 suitability: "Investors who need staged cash and will still walk away if the unit does not fit.",
 risks: ["Plan looks easier than the total cash", "Delivery timing", "Exit in a crowded segment"],
 productPositioning: "Typically mid-market apartments with extended schedules.",
 strengths: ["Staged capital", "Accessible tickets for some briefs"],
 morganView: "Underwrite the schedule first. A long plan is not the same thing as a good asset.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "danubeproperties.com" }],
 },
 {
 slug: "alta",
 name: "ALTA",
 status: "published",
 markets: ["dubai"],
 tagline: "Dubai developer at altadevelopment.ae. Peninsula Altera is a different, newly licensed name.",
 workingNote: ACTIVE,
 overview:
 "ALTA Real Estate Development publishes its own site and projects, including Mr. C Residences and Villa Gaia. Peninsula Altera Real Estate Development L.L.C is a separate Dubai licence with no published projects on the open developer register checked in October 2026.",
 morganExperience: "The voice note said Alter. The established Dubai developer matching that sound is ALTA.",
 trackRecord: "No delivery count is published here.",
 projects: ["Mr. C Residences Downtown", "Mr. C Residences Jumeirah", "Villa Gaia", "Maison Margiela Residences"],
 deliveryNotes: "Confirm construction status on the specific building.",
 paymentPlanNotes: "Match the schedule to cash.",
 suitability: "Buyers whose brief survives unit-level maths on an ALTA project.",
 risks: ["Luxury premium versus exit", "Confusion with Peninsula Altera, a separate licence"],
 productPositioning: "The company presents itself in the luxury residential market.",
 strengths: ["Named projects on its own site"],
 morganView: "Treat ALTA as the developer. Keep Peninsula Altera off the shortlist until it has a real project record.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "altadevelopment.ae" }],
 },
 {
 slug: "beyond",
 name: "BEYOND",
 status: "published",
 markets: ["dubai"],
 tagline: "Premium brand launched by Omniyat Group. Underwrite the project, not the wordmark.",
 workingNote: ACTIVE,
 overview:
 "BEYOND Developments is a premium brand under Omniyat Group, announced in September 2024, with a public site at beyonddevelopments.ae. This page is a framework for that name, not a ranking.",
 morganExperience: "The company describes itself as part of Omniyat Group.",
 trackRecord: "",
 projects: ["List projects only from verified material"],
 deliveryNotes: "Confirm construction status on the specific building.",
 paymentPlanNotes: "Stress-test the schedule against liquidity.",
 suitability: "Investors whose brief survives unit-level maths.",
 risks: ["Unverified delivery history on this page", "Brand versus price"],
 productPositioning: "",
 strengths: ["Included on Morgan's working list"],
 morganView: "Keep the underwriting the same as for any other name: price, fees, handover, exit.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "beyonddevelopments.ae, Omniyat Group brand" }],
 },
 {
 slug: "omniyat",
 name: "Omniyat",
 status: "published",
 markets: ["dubai"],
 tagline: "Design-led, higher-ticket product. The premium still has to be earned by the exit.",
 workingNote: ACTIVE,
 overview:
 "Omniyat is associated with design-led residential product in Dubai. Design is not a waiver on price or liquidity.",
 morganExperience: "Added from the voice note.",
 trackRecord: "No sales or delivery counts are published here.",
 projects: ["Evaluate the named building, not the portfolio slogan"],
 deliveryNotes: "Confirm what the agreement calls handover.",
 paymentPlanNotes: "Higher tickets make the schedule less forgiving. Model it in full.",
 suitability: "Capital that can hold a premium product and still wants the maths.",
 risks: ["Design premium versus rent", "Thinner buyer pool on exit", "Service charges"],
 productPositioning: "Generally the upper end of the residential market. Confirm the actual ticket.",
 strengths: ["Distinct product versus volume launches"],
 morganView: "Pay for design only when the hold and the exit still work.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "Omniyat public brand mark" }],
 },
 {
 slug: "dubai-properties",
 name: "Dubai Properties",
 status: "published",
 markets: ["dubai"],
 tagline: "Master-developer scale. Community and phase still decide the unit.",
 workingNote: ACTIVE,
 overview:
 "Dubai Properties sits behind large Dubai communities. Scale is context. The unit, fees and handover are the decision.",
 morganExperience: "Added from the voice note.",
 trackRecord: "",
 projects: ["Underwrite the community phase on offer"],
 deliveryNotes: "Large pipelines mean neighbouring handovers matter.",
 paymentPlanNotes: "Do not assume one standard plan across communities.",
 suitability: "Investors who want recognisable community stock and will still check the building.",
 risks: ["Community averages hiding a weak building", "Supply inside the same masterplan"],
 productPositioning: "Community apartments and, in some places, townhouses.",
 strengths: ["Scale and community recognition"],
 morganView: "Pick the building. The master developer name is not the underwrite.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "Dubai Properties public brand mark" }],
 },
 {
 slug: "select-group",
 name: "Select Group",
 status: "published",
 markets: ["dubai"],
 tagline: "Dubai developer with a public site at select-group.ae.",
 workingNote: ACTIVE,
 overview:
 "Select Group is included from Morgan's list. Use the page as a placeholder framework until project-level notes are added.",
 morganExperience: "Added from the voice note.",
 trackRecord: "",
 projects: ["Add verified projects when Morgan supplies them"],
 deliveryNotes: "Confirm status on the building, not from marketing.",
 paymentPlanNotes: "Match the schedule to cash.",
 suitability: "Only after the unit fits the brief.",
 risks: ["Thin public notes on this page", "Name confusion with other Select entities"],
 productPositioning: "",
 strengths: ["Included on Morgan's working list"],
 morganView: "Do not advance a buyer on the name alone.",
 yearsActive: null,
 deliveredNote: null,
 sources: [{ label: "select-group.ae" }],
 },
];

export function getPublishedDevelopers() {
 return developers.filter((d) => d.status === "published");
}

export function getDeveloperBySlug(slug: string) {
 return developers.find((d) => d.slug === slug && d.status === "published");
}
