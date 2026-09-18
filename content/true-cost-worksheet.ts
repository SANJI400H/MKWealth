/**
 * Low-commitment True Cost worksheet (social “comment COST” magnet).
 * On-site HTML checklist until Morgan supplies a designed PDF.
 */

export const trueCostWorksheet = {
  slug: "true-cost",
  title: "True Cost of Buying in Dubai",
  subtitle: "A one-page checklist for international investors — before you trust a brochure number.",
  sections: [
    {
      title: "Acquisition costs to model",
      items: [
        "DLD transfer fee (typical secondary) vs off-plan developer fee schedule",
        "Agency / brokerage (buyer-side and seller-side where relevant)",
        "Trustee / admin / NOC fees if secondary",
        "Mortgage registration / bank fees if financing",
        "Furniture, fit-out, and first-year service charge buffer",
      ],
    },
    {
      title: "Yield sanity checks",
      items: [
        "Gross rent ÷ purchase price is not net yield",
        "Vacancy, management, maintenance, insurance assumptions",
        "Service charge AED/sq ft vs comps in the same building",
        "Payment-plan cash drag if off-plan (capital locked before rent starts)",
      ],
    },
    {
      title: "Questions before you reserve",
      items: [
        "What is total capital deployed at reservation, at 50% built, and at handover?",
        "What happens if handover slips 6–12 months?",
        "Who is the end-user demand for this unit type in this micro-location?",
        "What is a realistic exit window and competing supply?",
      ],
    },
  ],
} as const;
