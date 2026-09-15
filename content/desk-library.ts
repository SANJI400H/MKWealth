/** Post-approval Private Desk chapters. Replace copy as real briefings ship. */

export type DeskChapter = {
  id: string;
  title: string;
  summary: string;
  body: string[];
};

export const deskChapters: DeskChapter[] = [
  {
    id: "how-to-use",
    title: "How to use this desk",
    summary: "What this room is for, and how Morgan works with you after approval.",
    body: [
      "This Private Desk is for investors Morgan has spoken with and approved. It is not a public marketing feed.",
      "Use the chapters to stay current on how Morgan is reading the market. When a live opportunity fits your profile, you will hear from Morgan directly.",
      "If you need a number stress-tested, use the Tools calculators. If you already hold property with Morgan, use the Client Portal for your portfolio view.",
    ],
  },
  {
    id: "market-stance",
    title: "Current market stance",
    summary: "High-level view across Dubai, Abu Dhabi, and Ras Al Khaimah.",
    body: [
      "Morgan’s sequence stays Vision → Strategy → Property. Inventory is last.",
      "Dubai remains the primary off-plan theatre for foreign capital when payment plans and exit liquidity align with your hold period.",
      "Abu Dhabi is used when lower volatility and longer holds matter more than headline launches.",
      "Ras Al Khaimah is a lower-entry option when the brief is growth-oriented and you accept thinner liquidity.",
    ],
  },
  {
    id: "underwriting",
    title: "Underwriting rules of thumb",
    summary: "How deals are filtered before they reach a shortlist.",
    body: [
      "True capital deployed includes DLD, agency, and trustee, not only purchase price.",
      "Net yield must survive vacancy, service charges, and management, not brochure gross.",
      "Payment plans are stress-tested against your liquidity, not the developer’s marketing split.",
      "Financing only enters the structure when lender appetite matches the schedule, coordinated via Huspy where relevant.",
    ],
  },
  {
    id: "next-steps",
    title: "Working together",
    summary: "What happens after you are inside the desk.",
    body: [
      "Keep your investment profile current: capital, timeline, market preference, and leverage appetite.",
      "Book a follow-up strategy session when your situation changes, or when a chapter raises a decision.",
      "Existing clients: open the Client Portal for portfolio maintenance and scenario work on assets you already hold.",
    ],
  },
];
