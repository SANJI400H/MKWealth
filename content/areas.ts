export type AreaMarket = "dubai" | "abu-dhabi" | "rak";
export type PublishStatus = "published" | "draft";

export type AreaSource = { label: string; url?: string; note?: string };

export interface Area {
 slug: string;
 name: string;
 market: AreaMarket;
 status: PublishStatus;
 tagline: string;
 /** Framework analysis, not a forecast. Pending Morgan discovery where marked. */
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
 imageCredit?: string;
 /** Leave null when the figure is not verified. The page hides the tile. */
 pricePerSqft?: string | null;
 yieldRange?: string | null;
 priceBand?: string | null;
 supplyPipeline?: string | null;
 handoverWindow?: string | null;
 suits?: string[];
 strengths?: string[];
 bestPropertyTypes?: string[];
 paymentPlanNotes?: string;
 readyMarketNotes?: string;
 catalysts?: string;
}

const WORKING =
 "Working analysis for underwriting orientation. Not a ranking, forecast, or inventory pitch.";

const PRIORITY =
 "Listed by Morgan among the communities he is most confident advising international investors on. Still unit-level underwriting, not a buy recommendation.";

export const areas: Area[] = [
 {
 slug: "dubai-marina",
 name: "Dubai Marina",
 market: "dubai",
 status: "published",
 tagline: "Established waterfront densification, liquidity often deeper than newer fringe communities.",
 workingNote: WORKING,
 morganView:
 "Evaluate as a mature, high-visibility lifestyle node where resale depth and rental demand can support investors who prioritise exit optionality, provided unit-level pricing, service charges, and building quality clear underwriting. Do not assume marina branding alone justifies a premium.",
 investorProfile:
 "Buyers who want recognisable stock, possible immediate income (secondary), and clearer comps, and who can absorb service-charge and vacancy variability typical of dense waterfront product.",
 priceContext:
 "Price discovery is usually stronger on secondary stock via comps. Off-plan nearby or redevelopment-linked stock still needs payment-plan and delivery risk modelled separately. Avoid citywide averages; underwrite AED/sq ft and total capital deployed for the specific unit.",
 rentalContext:
 "Rental demand is often lifestyle- and tourism-adjacent, but achievable rent, furnishing, and vacancy must be stress-tested. Gross brochure yields are not net.",
 supply:
 "Dense existing stock plus ongoing nearby supply can pressure rents and exits in soft cycles. Map competing handovers and inventory in the same micro-pocket.",
 infrastructure:
 "Metro, marina walk, and hospitality density support accessibility, still verify building access, parking, and community fees for the asset you buy.",
 risks: [
 "Service-charge drag on net yield",
 "Competition from newer waterfront and island product",
 "Tourism-cycle sensitivity for short-stay strategies",
 "Building-quality and association governance variance",
 ],
 exitConsiderations:
 "Liquidity can be better than fringe communities, but exit still depends on price, condition, and cycle, not brand alone.",
 relatedInsightSlugs: ["gross-vs-net-yield-dubai-property"],
 relatedMarketHref: "/invest/dubai",
 sources: [{ label: "Framework page, pending Morgan-verified comps and period data" }],
 image: "/images/areas/dubai-marina.jpg",
 imageAlt: "Dubai Marina skyline and marina at night",
 imageCredit: "Dubai Marina skyline. Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "business-bay",
 name: "Business Bay",
 market: "dubai",
 status: "published",
 tagline: "Central corridor with mixed commercial and residential density, underwrite building and canal micro-location.",
 workingNote: WORKING,
 morganView:
 "Treat Business Bay as a mid-city play where building selection, views, and parking matter more than community marketing. Suitable when the brief needs centrality without assuming Downtown pricing, only if maths and exit logic hold.",
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
 image: "/images/areas/business-bay.jpg",
 imageAlt: "Business Bay and the canal crossing at night, with D1 Tower",
 imageCredit: "Business Bay and the canal crossing. Photo by Thesixthscallywag, Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "downtown-dubai",
 name: "Downtown Dubai",
 market: "dubai",
 status: "published",
 tagline: "Iconic core, premiums must be justified by liquidity, rent, and hold-period maths.",
 workingNote: WORKING,
 morganView:
 "Downtown is a brand-led, high-visibility market. Pay for location only when underwriting shows the premium is recoverable via rent, capital preservation, or exit, not because of skyline photos.",
 investorProfile:
 "Capital-stronger buyers seeking landmark stock, tourism adjacency, or long-hold prestige, who still insist on unit-level numbers.",
 priceContext:
 "Premiums vs surrounding districts are common; confirm whether you are buying view, floor, or brand. Off-plan in the wider core needs separate delivery risk treatment.",
 rentalContext:
 "Short-stay and tourism demand can support some strategies where permitted; licensing and building rules are deal-breakers to verify early.",
 supply:
 "Finite iconic stock vs expanding surrounding inventory, relative scarcity is not automatic pricing power.",
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
 tagline: "Higher-volume community product, entry and yield stories need hard vacancy and fee checks.",
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
 "Exit is possible but often price-sensitive, avoid relying on perpetual appreciation narratives.",
 relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work", "gross-vs-net-yield-dubai-property"],
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/jvc.jpg",
 imageAlt: "Townhouses in Jumeirah Village Circle",
 imageCredit: "Supplied photograph of Jumeirah Village Circle.",
 },
 {
 slug: "saadiyat-island",
 name: "Saadiyat Island",
 market: "abu-dhabi",
 status: "published",
 tagline: "Abu Dhabi cultural / leisure island context, underwrite slower cycle and different liquidity vs Dubai.",
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
 "Phased island development, track competing projects and infrastructure milestones.",
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
 image: "/images/areas/saadiyat-island.jpg",
 imageAlt: "The dome of Louvre Abu Dhabi on Saadiyat Island",
 imageCredit: "Louvre Abu Dhabi on Saadiyat Island. Photo by Tasos Lekkas, Wikimedia Commons, CC0.",
 },
 {
 slug: "al-marjan-island",
 name: "Al Marjan Island",
 market: "rak",
 status: "published",
 tagline: "RAK waterfront / entertainment-led growth narrative, entry math and developer delivery dominate.",
 workingNote: PRIORITY,
 morganView:
 "Al Marjan sits in a Ras Al Khaimah growth narrative often linked to hospitality and entertainment infrastructure. Underwrite payment plans, delivery, and exit liquidity in RAK terms, not Dubai comps.",
 investorProfile:
 "Investors seeking lower entry than Dubai waterfront, accepting RAK liquidity and cycle differences, often via off-plan structures.",
 priceContext:
 "Entry can look attractive vs Dubai; total capital, fees, and plan schedules still decide risk. Avoid headline-only comparisons.",
 rentalContext:
 "Hospitality and tourism adjacency may support some strategies when operational; confirm use case (long-let vs short-stay) and operator reality.",
 supply:
 "Masterplan phasing and competing launches can cluster supply. Overlay your handover date against regional inventory.",
 infrastructure:
 "Island and access infrastructure are part of the thesis, verify what is delivered vs marketed for your phase.",
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
 image: "/images/areas/al-marjan-island.jpg",
 imageAlt: "The seafront on Al Marjan Island, Ras Al Khaimah",
 imageCredit: "Sea view on Al Marjan Island, Ras Al Khaimah. Photo by Tashmetova808, Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "hudayriyat-island",
 name: "Hudayriyat Island",
 market: "abu-dhabi",
 status: "published",
 tagline: "Abu Dhabi island growth narrative, underwrite phase delivery and AD liquidity, not Dubai comps.",
 workingNote: PRIORITY,
 morganView:
 "Hudayriyat sits in Morgan’s priority community set for international investors. Treat it as an Abu Dhabi thesis: masterplan timing, payment structure and exit liquidity matter more than brochure lifestyle language.",
 investorProfile:
 "Capital-ready investors diversifying into Abu Dhabi island product with patience for phase delivery.",
 priceContext:
 "Compare within Abu Dhabi island comps and total capital deployed, not Dubai waterfront ticket sizes alone.",
 rentalContext:
 "Model achievable rent and vacancy explicitly; do not import Dubai tourism-rent assumptions blindly.",
 supply: "Phased island supply can cluster, overlay handover calendars against your hold period.",
 infrastructure: "Verify what access and amenity infrastructure is delivered for the phase you buy.",
 risks: ["Phase delivery", "Thinner secondary depth than core Dubai", "Concept premium vs rent"],
 exitConsiderations: "Plan longer holds or clearer exit paths; price discipline at entry is the control.",
 relatedMarketHref: "/invest/abu-dhabi",
 image: "/images/areas/hudayriyat-island.jpg",
 imageAlt: "Hudayriyat Island waterfront at night, Abu Dhabi",
 imageCredit: "Hudayriyat Island waterfront at night. Photo by Slywire, Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "ramhan-island",
 name: "Ramhan Island",
 market: "abu-dhabi",
 status: "published",
 tagline: "Abu Dhabi island context, masterplan and delivery first, marketing second.",
 workingNote: PRIORITY,
 morganView:
 "Ramhan is on Morgan’s priority advisory list. Underwrite infrastructure timing and payment schedules before treating island branding as an investment thesis.",
 investorProfile: "Investors with Abu Dhabi allocation intent and tolerance for masterplan sequencing.",
 priceContext: "Underwrite AED/sq ft and fees for the specific product, avoid citywide averages.",
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
 tagline: "Leisure and entertainment adjacency, still underwrite the unit, not the theme park.",
 workingNote: PRIORITY,
 morganView:
 "Yas is a priority community for Morgan’s international advisory work. Entertainment infrastructure can support demand narratives, it does not replace net yield and exit maths.",
 investorProfile: "Investors seeking Abu Dhabi leisure-adjacent stock with patient capital.",
 priceContext: "Premiums for location must be justified by rent, capital preservation or exit, not footfall photos.",
 rentalContext: "Tourism adjacency may help some strategies where permitted; confirm building rules early.",
 supply: "Ongoing hospitality and residential delivery can pressure rents and exits in soft cycles.",
 infrastructure: "Transport and amenity density help accessibility, fees still hit net yield.",
 risks: ["Overpaying for brand", "Service charges", "Cycle sensitivity"],
 exitConsiderations: "Liquidity varies by product; correctly priced units exit more cleanly.",
 relatedMarketHref: "/invest/abu-dhabi",
 image: "/images/areas/yas-island.jpg",
 imageAlt: "Yas Bay waterfront and Etihad Arena on Yas Island, Abu Dhabi",
 imageCredit: "Yas Bay waterfront, Yas Island. Photo by Oleg Yunakov, Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "al-reem-island",
 name: "Al Reem Island",
 market: "abu-dhabi",
 status: "published",
 tagline: "Established Abu Dhabi island densification, underwrite building and micro-location.",
 workingNote: PRIORITY,
 morganView:
 "Al Reem is on Morgan’s confident advisory list. Tower and micro-location selection matter more than island branding alone.",
 investorProfile: "Investors wanting recognisable Abu Dhabi stock with clearer comps than fringe product.",
 priceContext: "Wide dispersion between buildings, secondary comps and fees can swing net returns.",
 rentalContext: "Corporate and residential demand vary by tower; confirm realistic rent before modelling.",
 supply: "Dense existing stock plus ongoing delivery, map competing handovers.",
 infrastructure: "Connectivity supports accessibility; parking and association rules still matter.",
 risks: ["Building-quality variance", "Service-charge drag", "Supply clustering"],
 exitConsiderations: "Prefer assets with clearer comparable sets.",
 relatedMarketHref: "/invest/abu-dhabi",
 image: "/images/areas/al-reem-island.jpg",
 imageAlt: "Al Reem Island skyline from Al Reem Central Park, Abu Dhabi",
 imageCredit: "Al Reem Island skyline from Al Reem Central Park, 2024. Photo by Yusuf Elbohoty, Wikimedia Commons, CC BY-SA 4.0.",
 },
 {
 slug: "maritime-city",
 name: "Dubai Maritime City",
 market: "dubai",
 status: "published",
 tagline: "Waterfront densification narrative, underwrite delivery, fees and exit depth.",
 workingNote: PRIORITY,
 morganView:
 "Maritime City is among Morgan's priority Dubai communities for international investors. Off-plan is one structure used here. Payment plans and handover timing are first-order when that is the product.",
 investorProfile: "Investors comfortable with off-plan cash-flow staging when the brief fits.",
 priceContext: "Compare total capital deployed and plan schedules, not headline ticket size alone.",
 rentalContext: "Income usually waits for handover and lease-up, model vacancy explicitly.",
 supply: "Competing waterfront inventory can pressure rents and exits.",
 infrastructure: "Confirm access and amenity delivery for the phase you buy.",
 risks: ["Payment-plan liquidity stress", "Delivery timing", "Service charges"],
 exitConsiderations: "Exit depends on price, condition and cycle, not waterfront branding alone.",
 relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/maritime-city.jpg",
 imageAlt: "Dubai Maritime City peninsula",
 imageCredit: "Project image supplied for this page.",
 },
 {
 slug: "palm-jebel-ali",
 name: "Palm Jebel Ali",
 market: "dubai",
 status: "published",
 tagline: "Large-scale island masterplan, long-dated optionality with long-dated risk.",
 workingNote: PRIORITY,
 morganView:
 "Palm Jebel Ali is on Morgan’s priority list. Masterplan ambition is not completion evidence, underwrite the phase, payment schedule and exit assumptions you can actually own.",
 investorProfile: "Longer-horizon capital that can tolerate masterplan sequencing, not short flip narratives.",
 priceContext: "Concept premiums must survive capital deployed and hold-period maths.",
 rentalContext: "Do not model mature Palm Jumeirah rents onto early phases without evidence.",
 supply: "Phased delivery and competing inventory timing are core risks.",
 infrastructure: "Island access and amenity delivery dominate outcomes, verify what is live for your phase.",
 risks: ["Masterplan delays", "Liquidity thinner than established cores", "Off-plan cash-flow stress"],
 exitConsiderations: "Price discipline at entry is the primary control.",
 relatedInsightSlugs: ["how-dubai-off-plan-payment-plans-work"],
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/palm-jebel-ali.jpg",
 imageAlt: "Palm Jebel Ali yacht club",
 imageCredit: "Project image supplied for this page.",
 },
 {
 slug: "dubai-islands",
 name: "Dubai Islands",
 market: "dubai",
 status: "published",
 tagline: "Northern island masterplan, formerly discussed as Palm Deira. Underwrite the phase you can actually buy.",
 workingNote: WORKING,
 morganView:
 "Treat Dubai Islands as a long-dated waterfront thesis. Masterplan language is not completion evidence. Confirm what is delivered for the phase on offer.",
 investorProfile:
 "Investors who can hold through infrastructure sequencing and who want exposure beyond the established marina cores.",
 priceContext: "No sourced price band is published for this community. Do not use a citywide average.",
 rentalContext: "Income usually waits for handover and a real tenant pool. Model vacancy explicitly.",
 supply: "Phased island supply can cluster. Overlay handover dates against your hold period.",
 infrastructure: "Access roads and bridges are part of the thesis. Verify what is live for your phase.",
 risks: ["Masterplan timing", "Thinner resale than established cores", "Payment plan cash stress"],
 exitConsiderations: "Price discipline at entry is the main control.",
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/dubai-islands.jpg",
 imageAlt: "Dubai Islands beachfront",
 imageCredit: "Project image supplied for this page.",
 suits: ["Investor", "Long hold"],
 strengths: ["Large scale waterfront land", "Different from the established marina cores"],
 bestPropertyTypes: ["Confirm the unit type against the phase actually on sale"],
 paymentPlanNotes: "Off-plan schedules must match liquidity. A mortgage, if any, is typically a handover question.",
 readyMarketNotes: "Ready stock, where it exists, should be underwritten on comps, not on the masterplan story.",
 catalysts: "Bridge and island access. Confirm what is operating before you treat it as a demand driver.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 },
 {
 slug: "dubai-harbour",
 name: "Dubai Harbour",
 market: "dubai",
 status: "published",
 tagline: "Marina-adjacent harbour. Do not confuse it with Dubai Creek Harbour.",
 workingNote: WORKING,
 morganView:
 "Dubai Harbour sits beside the marina and the palm, not at the creek. Underwrite the specific tower, service charges and how the harbour uses the surrounding demand.",
 investorProfile: "Investors comparing waterfront stock next to Dubai Marina who still want unit-level maths.",
 priceContext: "No sourced price band is published for this community.",
 rentalContext: "Tourism and marina adjacency can support some strategies. Confirm building rules before modelling short stays.",
 supply: "Nearby marina and beachfront supply is part of the competitive set.",
 infrastructure: "Harbour, beach access and road links into the marina corridor. Verify the building, not the brochure map.",
 risks: ["Paying a waterfront premium rent cannot support", "Service charges", "Confusion with Creek Harbour comps"],
 exitConsiderations: "Exit depth should be judged against marina and beachfront comps, not a harbour logo.",
 relatedMarketHref: "/invest/dubai",
 suits: ["Investor", "Holiday let", "End user"],
 strengths: ["Sits on the marina and beach corridor"],
 bestPropertyTypes: ["Waterfront apartments, underwritten tower by tower"],
 paymentPlanNotes: "Match any payment plan to cash. Do not assume a marina mortgage timeline.",
 readyMarketNotes: "Completed stock can be inspected. Price discovery comes from comps.",
 catalysts: "Harbour and beach access. Named openings stay off this page until they are confirmed.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 },
 {
 slug: "emaar-beachfront",
 name: "Emaar Beachfront",
 market: "dubai",
 status: "published",
 tagline: "Beachfront stock between the marina and Palm Jumeirah.",
 workingNote: WORKING,
 morganView:
 "Treat Emaar Beachfront as its own micro-market, not as Dubai Marina and not as the Palm. Brand and beach do not waive fee, view and exit checks.",
 investorProfile: "Buyers who want beachfront living or a holiday let and can underwrite a premium.",
 priceContext: "No sourced price band is published for this community. Do not borrow marina averages.",
 rentalContext: "Holiday and end-user demand may both appear. Confirm what the building allows.",
 supply: "Competing beach and marina inventory can pressure rents in a soft cycle.",
 infrastructure: "Beach, marina access and the road corridor. Verify parking and community access for the tower.",
 risks: ["Brand and beach premium", "Service charges", "Short-stay rules"],
 exitConsiderations: "Liquidity depends on price and the tower, not the beach photograph.",
 relatedMarketHref: "/invest/dubai",
 suits: ["End user", "Holiday let", "Investor"],
 strengths: ["Beach position on a known corridor"],
 bestPropertyTypes: ["Beachfront apartments"],
 paymentPlanNotes: "Off-plan phases still need a cash schedule. Mortgage timing is a handover question.",
 readyMarketNotes: "Ready units can be lived in or let sooner, with a heavier day-one cheque.",
 catalysts: "Beach and marina adjacency. Do not invent a pipeline figure.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 image: "/images/areas/emaar-beachfront.jpg",
 imageAlt: "Emaar Beachfront at night",
 imageCredit: "Project image supplied for this page.",
 },
 {
 slug: "dubailand",
 name: "Dubailand",
 market: "dubai",
 status: "published",
 tagline: "Inland master district. Yield stories need vacancy, fees and the specific community, not the district name.",
 workingNote: WORKING,
 morganView:
 "Dubailand is a wide label. Underwrite the community and the building. A district average will mislead you.",
 investorProfile: "Investors seeking lower entry than the waterfront cores, often with an income brief.",
 priceContext: "No sourced price band is published here. Do not collapse Dubailand into one number.",
 rentalContext: "Tenant depth varies by cluster. Model vacancy. Do not import marina rents.",
 supply: "Volume communities inside the district can hand over together. Map the cluster you are buying.",
 infrastructure: "Roads, schools and retail differ by community. Verify the ones your tenant would actually use.",
 risks: ["Supply-led rent pressure", "Community quality variance", "Over-optimistic brochure yields"],
 exitConsiderations: "Exit is usually price-sensitive. Avoid perpetual appreciation stories.",
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/dubailand.jpg",
 imageAlt: "Legoland Dubai, inside the Dubailand district",
 imageCredit: "Legoland Dubai, inside Dubailand, 2023. Photo by Sarion, Wikimedia Commons, CC BY-SA 4.0. A residential street photograph is still needed.",
 suits: ["Investor", "Family"],
 strengths: ["Lower entry than waterfront cores", "Several distinct communities inside one district"],
 bestPropertyTypes: ["Community apartments and townhouses, named by cluster"],
 paymentPlanNotes: "Promotional payment plans are common. Stress-test the cash, not the headline price.",
 readyMarketNotes: "Completed stock can produce income sooner if rent and fees survive the model.",
 catalysts: "Roads and community retail. Named catalysts stay off this page until they are confirmed.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 },
 {
 slug: "dubai-south",
 name: "Dubai South",
 market: "dubai",
 status: "published",
 tagline: "Southern growth corridor around Al Maktoum International. Logistics and aviation are context, not a yield.",
 workingNote: WORKING,
 morganView:
 "Dubai South is a long-horizon allocation. Airport and expo adjacency do not replace payment-plan, rent and exit maths.",
 investorProfile: "Patient capital that understands a thinner resale market than central Dubai.",
 priceContext: "No sourced price band is published for this community.",
 rentalContext: "Demand stories often cite aviation and logistics. Confirm a realistic lease before modelling yield.",
 supply: "Masterplan phasing can cluster handovers. Time your entry against that calendar.",
 infrastructure: "Al Maktoum International Airport and the southern road network. Verify what serves your community today.",
 risks: ["Long-dated infrastructure", "Thinner secondary market", "Masterplan delay"],
 exitConsiderations: "Plan a longer hold. Entry price is the control.",
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/dubai-south.jpg",
 imageAlt: "Al Maktoum International Airport terminal in Dubai South",
 imageCredit: "Al Maktoum International Airport, Dubai South. Wikimedia Commons. A residential street photograph is still needed.",
 suits: ["Investor", "Long hold"],
 strengths: ["Southern growth corridor", "Airport adjacency"],
 bestPropertyTypes: ["Community apartments tied to a named phase"],
 paymentPlanNotes: "Construction schedules must match cash. Do not assume a central-Dubai exit.",
 readyMarketNotes: "Where completed stock exists, inspect it and underwrite the tenant, not the airport render.",
 catalysts: "Airport and southern transport. Named projects stay off this page until they are confirmed.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 },
 {
 slug: "jumeirah",
 name: "Jumeirah",
 market: "dubai",
 status: "published",
 tagline: "Established beach corridor. Villas, low-rise streets and the high-rise beachfront are different products.",
 workingNote: WORKING,
 morganView:
 "Say which Jumeirah you mean. The villa streets and the beachfront towers do not share a price or a tenant. Underwrite the asset class in front of you.",
 investorProfile: "End users and families who want the beach corridor, and investors who can fund a heavier cheque.",
 priceContext: "No sourced price band is published for this community. Villa and tower stock should not be averaged.",
 rentalContext: "End-user and holiday demand both show up. Confirm use, furnishing and vacancy for the actual unit.",
 supply: "Beachfront towers compete with the marina. Villa stock is a different set.",
 infrastructure: "Beach road, retail and schools. The photograph is Jumeirah Mosque, not a villa street.",
 risks: ["Premium for the name", "Service charges on towers", "Renovation cash on older villas"],
 exitConsiderations: "Correctly priced beach stock can exit. Overpaying for the postcode is the usual mistake.",
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/jumeirah.jpg",
 imageAlt: "Jumeirah Mosque in the Jumeirah district, Dubai",
 imageCredit: "Jumeirah Mosque, 2013. Photo by trolvag, Wikimedia Commons, CC BY-SA 3.0.",
 suits: ["End user", "Family", "Holiday let"],
 strengths: ["Established beach corridor", "End-user demand"],
 bestPropertyTypes: ["Beachfront apartments", "Villas, underwritten separately"],
 paymentPlanNotes: "New beachfront launches still need a payment plan check.",
 readyMarketNotes: "Ready homes can be lived in now. Renovation, where relevant, needs more cash upfront.",
 catalysts: "Beach access and the existing retail strip.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
 },
 {
 slug: "bluewaters",
 name: "Bluewaters",
 market: "dubai",
 status: "published",
 tagline: "Island beside the marina, marked by Ain Dubai. Lifestyle pricing still has to survive fees and exit.",
 workingNote: WORKING,
 morganView:
 "Bluewaters is a small, recognisable island. Pay for it only when rent, service charges and resale comps support the cheque.",
 investorProfile: "End users and holiday-let buyers who want a contained island next to the marina.",
 priceContext: "No sourced price band is published for this community.",
 rentalContext: "Tourism adjacency can help some units. Confirm building rules before modelling short stays.",
 supply: "The island is finite, but marina and beach stock next door is not. Compare the set you would actually compete with.",
 infrastructure: "Island access, retail on the island, and Ain Dubai as a landmark rather than a yield.",
 risks: ["Lifestyle premium", "Service charges", "Short-stay regulation"],
 exitConsiderations: "Liquidity is better when the entry price is disciplined.",
 relatedMarketHref: "/invest/dubai",
 image: "/images/areas/bluewaters.jpg",
 imageAlt: "Ain Dubai and residential buildings on Bluewaters Island",
 imageCredit: "Bluewaters Island and Ain Dubai. Wikimedia Commons, CC BY-SA 4.0.",
 suits: ["End user", "Holiday let", "Investor"],
 strengths: ["Recognisable island", "Next to Dubai Marina"],
 bestPropertyTypes: ["Island apartments"],
 paymentPlanNotes: "Any remaining off-plan stock still needs a cash schedule.",
 readyMarketNotes: "Most of the conversation here is completed stock. Income can start sooner, with more cash on day one.",
 catalysts: "Ain Dubai and island retail. Do not treat the wheel as a rent guarantee.",
 pricePerSqft: null,
 yieldRange: null,
 priceBand: null,
 supplyPipeline: null,
 handoverWindow: null,
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
