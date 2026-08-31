export type CaseStudyStatus = "draft" | "published";

export interface CaseStudy {
 slug: string;
 title: string;
 status: CaseStudyStatus;
 investorProfile?: string;
 region?: string;
 objective?: string;
 capital?: string;
 challenge?: string;
 optionsConsidered?: string[];
 analysis?: string;
 decision?: string;
 why?: string;
 outcome?: string;
 keyLesson?: string;
 clientQuote?: string;
 disclaimer?: string;
}

/**
 * Case studies stay draft until genuine and approved.
 * Do not publish fabricated outcomes.
 */
export const caseStudies: CaseStudy[] = [
 {
 slug: "template-example",
 title: "Case study template (unpublished)",
 status: "draft",
 investorProfile: "TODO",
 objective: "TODO",
 challenge: "TODO",
 analysis: "TODO",
 decision: "TODO",
 outcome: "TODO",
 keyLesson: "TODO",
 disclaimer: "Illustrative structure only, not a real client story.",
 },
];

export function getPublishedCaseStudies() {
 return caseStudies.filter((c) => c.status === "published");
}

export function getCaseStudyBySlug(slug: string) {
 return caseStudies.find((c) => c.slug === slug && c.status === "published");
}
