export type AreaMarket = "dubai" | "abu-dhabi" | "rak";
export type PublishStatus = "published" | "draft";

export type AreaSource = { label: string; url?: string; note?: string };

export interface Area {
  slug: string;
  name: string;
  market: AreaMarket;
  status: PublishStatus;
  tagline: string;
  /** Framework analysis — not a forecast. Pending Morgan discovery where marked. */
  morganView: string;
  investorProfile: string;
  priceContext: string;
  rentalContext: string;
  supply: string;
  infrastructure: string;
  risks: string[];
  exitConsiderations: string;
  relatedInsightSlugs?: string[];
  relatedMarketHref: string;
  sources?: AreaSource[];
  workingNote?: string;
  /** Editorial photo under /public/images */
  image?: string;
  imageAlt?: string;
}

const WORKING =
  "Working analysis for underwriting orientation. Not a ranking, forecast, or inventory pitch.";

const PRIORITY =
  "Listed by Morgan among the communities he is most confident advising international investors on. Still unit-level underwriting — not a buy recommendation.";

export const areas: Area[] = [
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    market: "dubai",
    status: "published",
    tagline: "Established waterfront densification — liquidity often deeper than newer fringe communities.",
    workingNote: WORKING,
    morganView:
      "Evaluate as a mature, high-visibility lifestyle node where resale depth and rental demand can support investors who prioritise exit optionality — provided unit-level pricing, service charges, and building quality clear underwriting. Do not assume marina branding alone justifies a premium.",
    investorProfile:
      "Buyers who want recognisable stock, possible immediate income (secondary), and clearer comps — and who can absorb service-charge and vacancy variability typical of dense waterfront product.",
    priceContext:
      "Price discovery is usually stronger on secondary stock via comps. Off-plan nearby or redevelopment-linked stock still needs payment-plan and delivery risk modelled separately. Avoid citywide averages; underwrite AED/sq ft and total capital deployed for the specific unit.",
    rentalContext:
      "Rental demand is often lifestyle- and tourism-adjacent, but achievable rent, furnishing, and vacancy must be stress-tested. Gross brochure yields are not net.",
    supply:
      "Dense existing stock plus ongoing nearby supply can pressure rents and exits in soft cycles. Map competing handovers and inventory in the same micro-pocket.",
    infrastructure:
      "Metro, marina walk, and hospitality density support accessibility — still verify building access, parking, and community fees for the asset you buy.",
    risks: [
      "Service-charge drag on net yield",
      "Competition from newer waterfront and island product",
      "Tourism-cycle sensitivity for short-stay strategies",
      "Building-quality and association governance variance",
    ],
    exitConsiderations:
      "Liquidity can be better than fringe communities, but exit still depends on price, condition, and cycle — not brand alone.",
    relatedInsightSlugs: ["gross-vs-net-yield-dubai-property"],
    relatedMarketHref: "/invest/dubai",
    sources: [{ label: "Framework page — pending Morgan-verified comps and period data" }],
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    market: "dubai",
    status: "published",
    tagline: "Central corridor with mixed commercial and residential density — underwrite building and canal micro-location.",
    workingNote: WORKING,
    morganView:
      "Treat Business Bay as a mid-city play where building selection, views, and parking matter more than community marketing. Suitable when the brief needs centrality without assuming Downtown pricing — only if maths and exit logic hold.",
    investorProfile:
      "Investors balancing location premium vs entry price, often comparing canal-facing vs inland towers, and off-plan vs completed stock.",
    priceContext:
      "Wide dispersion between towers. Secondary comps and service charges can swing net returns more than headline AED/sq ft.",
    rentalContext:
      "Corporate and mid-term demand can appear in some buildings; short-stay rules and HOA policies must be confirmed before modelling.",
    supply:
      "Ongoing tower delivery means supply timing is a first-order risk. Overlay handover calendars against your hold period.",
    infrastructure:
      "Proximity to Downtown / DIFC corridors helps accessibility; traffic and parking still affect livability and tenant appeal.",
    risks: [
      "Tower-by-tower quality variance",
      "Construction and handover clustering",
      "Service-charge escalation",
      "View/amenity premiums that may not hold on exit",
    ],
    exitConsiderations:
      "Resale depth varies sharply by building. Prefer assets with clearer comparable sets.",
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
    relatedMarketHref: "/invest/dubai",
  },
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    market: "dubai",
    status: "published",
    tagline: "Iconic core — premiums must be justified by liquidity, rent, and hold-period maths.",
    workingNote: WORKING,
    morganView:
      "Downtown is a brand-led, high-visibility market. Pay for location only when underwriting shows the premium is recoverable via rent, capital preservation, or exit — not because of skyline photos.",
    investorProfile:
      "Capital-stronger buyers seeking landmark stock, tourism adjacency, or long-hold prestige — who still insist on unit-level numbers.",
    priceContext:
      "Premiums vs surrounding districts are common; confirm whether you are buying view, floor, or brand. Off-plan in the wider core needs separate delivery risk treatment.",
    rentalContext:
      "Short-stay and tourism demand can support some strategies where permitted; licensing and building rules are deal-breakers to verify early.",
    supply:
      "Finite iconic stock vs expanding surrounding inventory — relative scarcity is not automatic pricing power.",
    infrastructure:
      "Metro, mall, and hospitality density support footfall; fees and association rules still hit net yield.",
    risks: [
      "Overpaying for brand",
      "High service charges",
      "Regulatory limits on short-stay use",
      "Cycle sensitivity on luxury segments",
    ],
    exitConsiderations:
      "Liquidity can be strong for correctly priced units; thin for over-speculative entries.",
    relatedInsightSlugs: ["gross-vs-net-yield-dubai-property"],
    relatedMarketHref: "/invest/dubai",
  },
  {
    slug: "jvc",
    name: "Jumeirah Village Circle (JVC)",
    market: "dubai",
    status: "published",
    tagline: "Higher-volume community product — entry and yield stories need hard vacancy and fee checks.",
    workingNote: WORKING,
    morganView:
      "JVC often appears in yield-led conversations. Treat advertised yields as a hypothesis: price, achievable rent, vacancy, and service charges decide whether the thesis survives.",
    investorProfile:
      "Investors seeking lower entry relative to waterfront cores, often income-oriented, who can underwrite community-level competition.",
    priceContext:
      "Competitive pricing and frequent off-plan promotions. Compare total capital deployed, not only ticket size.",
    rentalContext:
      "Tenant pools can be deep in absolute terms, but competing inventory can compress rents. Model vacancy explicitly.",
    supply:
      "Elevated delivery volume is a core risk. Map nearby handovers overlapping your lease-up window.",
    infrastructure:
      "Road access and amenities vary by cluster; verify school, retail, and transit relevance for your tenant profile.",
    risks: [
      "Supply-led rent pressure",
      "Developer / building quality variance",
      "Over-optimistic brochure yields",
      "Exit competition in soft markets",
    ],
    exitConsiderations:
      "Exit is possible but often price-sensitive — avoid relying on perpetual appreciation narratives.",
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work", "gross-vs-net-yield-dubai-property"],
    relatedMarketHref: "/invest/dubai",
  },
  {
    slug: "saadiyat-island",
    name: "Saadiyat Island",
    market: "abu-dhabi",
    status: "published",
    tagline: "Abu Dhabi cultural / leisure island context — underwrite slower cycle and different liquidity vs Dubai.",
    workingNote: PRIORITY,
    morganView:
      "Frame Saadiyat as an Abu Dhabi thesis: cultural infrastructure and lifestyle positioning matter, but Dubai-style liquidity assumptions do not transfer automatically. Prefer patience and quality over flip narratives.",
    investorProfile:
      "Buyers allocating to Abu Dhabi for diversification or lifestyle-led hold, with capital that can tolerate lower turnover.",
    priceContext:
      "Premium island product vs mainland AD. Compare within Abu Dhabi comps, not Dubai Marina equivalents.",
    rentalContext:
      "Rental depth differs from Dubai’s denser tourism nodes. Confirm realistic lease assumptions before modelling yield.",
    supply:
      "Phased island development — track competing projects and infrastructure milestones.",
    infrastructure:
      "Cultural institutions and hospitality are part of the long-term story; verify current access and amenity delivery for the phase you buy.",
    risks: [
      "Lower resale velocity than core Dubai pockets",
      "Phase delivery risk",
      "Premium that may not capitalise into rent",
      "Cross-emirate comparison mistakes",
    ],
    exitConsiderations:
      "Plan longer holds or clearer owner-occupier exit paths; do not assume Dubai-like bid depth.",
    relatedMarketHref: "/invest/abu-dhabi",
  },
  {
    slug: "al-marjan-island",
    name: "Al Marjan Island",
    market: "rak",
    status: "published",
    tagline: "RAK waterfront / entertainment-led growth narrative — entry math and developer delivery dominate.",
    workingNote: PRIORITY,
    morganView:
      "Al Marjan sits in a Ras Al Khaimah growth narrative often linked to hospitality and entertainment infrastructure. Underwrite payment plans, delivery, and exit liquidity in RAK terms — not Dubai comps.",
    investorProfile:
      "Investors seeking lower entry than Dubai waterfront, accepting RAK liquidity and cycle differences, often via off-plan structures.",
    priceContext:
      "Entry can look attractive vs Dubai; total capital, fees, and plan schedules still decide risk. Avoid headline-only comparisons.",
    rentalContext:
      "Hospitality and tourism adjacency may support some strategies when operational; confirm use case (long-let vs short-stay) and operator reality.",
    supply:
      "Masterplan phasing and competing launches can cluster supply. Overlay your handover date against regional inventory.",
    infrastructure:
      "Island and access infrastructure are part of the thesis — verify what is delivered vs marketed for your phase.",
    risks: [
      "Delivery and masterplan timing",
      "Thinner secondary market than Dubai cores",
      "Tourism-cycle dependence for some use cases",
      "Off-plan payment-plan liquidity stress",
    ],
    exitConsiderations:
      "Exit may require longer marketing periods; price discipline at entry is the main control.",
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
    relatedMarketHref: "/invest/rak",
  },
  {
    slug: "hudayriyat-island",
    name: "Hudayriyat Island",
    market: "abu-dhabi",
    status: "published",
    tagline: "Abu Dhabi island growth narrative — underwrite phase delivery and AD liquidity, not Dubai comps.",
    workingNote: PRIORITY,
    morganView:
      "Hudayriyat sits in Morgan’s priority community set for international investors. Treat it as an Abu Dhabi thesis: masterplan timing, payment structure and exit liquidity matter more than brochure lifestyle language.",
    investorProfile:
      "Capital-ready investors diversifying into Abu Dhabi island product with patience for phase delivery.",
    priceContext:
      "Compare within Abu Dhabi island comps and total capital deployed — not Dubai waterfront ticket sizes alone.",
    rentalContext:
      "Model achievable rent and vacancy explicitly; do not import Dubai tourism-rent assumptions blindly.",
    supply: "Phased island supply can cluster — overlay handover calendars against your hold period.",
    infrastructure: "Verify what access and amenity infrastructure is delivered for the phase you buy.",
    risks: ["Phase delivery", "Thinner secondary depth than core Dubai", "Concept premium vs rent"],
    exitConsiderations: "Plan longer holds or clearer exit paths; price discipline at entry is the control.",
    relatedMarketHref: "/invest/abu-dhabi",
  },
  {
    slug: "ramhan-island",
    name: "Ramhan Island",
    market: "abu-dhabi",
    status: "published",
    tagline: "Abu Dhabi island context — masterplan and delivery first, marketing second.",
    workingNote: PRIORITY,
    morganView:
      "Ramhan is on Morgan’s priority advisory list. Underwrite infrastructure timing and payment schedules before treating island branding as an investment thesis.",
    investorProfile: "Investors with Abu Dhabi allocation intent and tolerance for masterplan sequencing.",
    priceContext: "Underwrite AED/sq ft and fees for the specific product — avoid citywide averages.",
    rentalContext: "Confirm use case and realistic lease assumptions before modelling yield.",
    supply: "Track competing island and mainland inventory overlapping your handover window.",
    infrastructure: "Access and amenity delivery are first-order risks on island product.",
    risks: ["Delivery timing", "Liquidity", "Cross-emirate comparison mistakes"],
    exitConsiderations: "Do not assume Dubai-like bid depth on exit.",
    relatedMarketHref: "/invest/abu-dhabi",
  },
  {
    slug: "yas-island",
    name: "Yas Island",
    market: "abu-dhabi",
    status: "published",
    tagline: "Leisure and entertainment adjacency — still underwrite the unit, not the theme park.",
    workingNote: PRIORITY,
    morganView:
      "Yas is a priority community for Morgan’s international advisory work. Entertainment infrastructure can support demand narratives — it does not replace net yield and exit maths.",
    investorProfile: "Investors seeking Abu Dhabi leisure-adjacent stock with patient capital.",
    priceContext: "Premiums for location must be justified by rent, capital preservation or exit — not footfall photos.",
    rentalContext: "Tourism adjacency may help some strategies where permitted; confirm building rules early.",
    supply: "Ongoing hospitality and residential delivery can pressure rents and exits in soft cycles.",
    infrastructure: "Transport and amenity density help accessibility — fees still hit net yield.",
    risks: ["Overpaying for brand", "Service charges", "Cycle sensitivity"],
    exitConsiderations: "Liquidity varies by product; correctly priced units exit more cleanly.",
    relatedMarketHref: "/invest/abu-dhabi",
  },
  {
    slug: "al-reem-island",
    name: "Al Reem Island",
    market: "abu-dhabi",
    status: "published",
    tagline: "Established Abu Dhabi island densification — underwrite building and micro-location.",
    workingNote: PRIORITY,
    morganView:
      "Al Reem is on Morgan’s confident advisory list. Tower and micro-location selection matter more than island branding alone.",
    investorProfile: "Investors wanting recognisable Abu Dhabi stock with clearer comps than fringe product.",
    priceContext: "Wide dispersion between buildings — secondary comps and fees can swing net returns.",
    rentalContext: "Corporate and residential demand vary by tower; confirm realistic rent before modelling.",
    supply: "Dense existing stock plus ongoing delivery — map competing handovers.",
    infrastructure: "Connectivity supports accessibility; parking and association rules still matter.",
    risks: ["Building-quality variance", "Service-charge drag", "Supply clustering"],
    exitConsiderations: "Prefer assets with clearer comparable sets.",
    relatedMarketHref: "/invest/abu-dhabi",
  },
  {
    slug: "maritime-city",
    name: "Dubai Maritime City",
    market: "dubai",
    status: "published",
    tagline: "Waterfront densification narrative — underwrite delivery, fees and exit depth.",
    workingNote: PRIORITY,
    morganView:
      "Maritime City is among Morgan’s priority Dubai communities for international investors. Off-plan structures dominate current work — payment plans and handover timing are first-order.",
    investorProfile: "Investors comfortable with off-plan cash-flow staging when the brief fits.",
    priceContext: "Compare total capital deployed and plan schedules, not headline ticket size alone.",
    rentalContext: "Income usually waits for handover and lease-up — model vacancy explicitly.",
    supply: "Competing waterfront inventory can pressure rents and exits.",
    infrastructure: "Confirm access and amenity delivery for the phase you buy.",
    risks: ["Payment-plan liquidity stress", "Delivery timing", "Service charges"],
    exitConsiderations: "Exit depends on price, condition and cycle — not waterfront branding alone.",
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
    relatedMarketHref: "/invest/dubai",
  },
  {
    slug: "palm-jebel-ali",
    name: "Palm Jebel Ali",
    market: "dubai",
    status: "published",
    tagline: "Large-scale island masterplan — long-dated optionality with long-dated risk.",
    workingNote: PRIORITY,
    morganView:
      "Palm Jebel Ali is on Morgan’s priority list. Masterplan ambition is not completion evidence — underwrite the phase, payment schedule and exit assumptions you can actually own.",
    investorProfile: "Longer-horizon capital that can tolerate masterplan sequencing — not short flip narratives.",
    priceContext: "Concept premiums must survive capital deployed and hold-period maths.",
    rentalContext: "Do not model mature Palm Jumeirah rents onto early phases without evidence.",
    supply: "Phased delivery and competing inventory timing are core risks.",
    infrastructure: "Island access and amenity delivery dominate outcomes — verify what is live for your phase.",
    risks: ["Masterplan delays", "Liquidity thinner than established cores", "Off-plan cash-flow stress"],
    exitConsiderations: "Price discipline at entry is the primary control.",
    relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
    relatedMarketHref: "/invest/dubai",
  },
];

export function getPublishedAreas() {
  return areas.filter((a) => a.status === "published");
}

export function getAreaBySlug(slug: string) {
  return areas.find((a) => a.slug === slug && a.status === "published");
}

export function getAreasByMarket(market: AreaMarket) {
  return getPublishedAreas().filter((a) => a.market === market);
}
