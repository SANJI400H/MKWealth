import type { Metadata } from "next";
import GuideExperience from "./GuideExperience";
import { pageMetadata } from "@/lib/metadata";

// Automation-only traffic (Instagram DM funnel), never meant to rank, hence noIndex.
export const metadata: Metadata = pageMetadata({
  title: "Unlock the Dubai Off-Plan Investment Guide",
  description: "Enter your WhatsApp number to unlock Morgan Kaiser's video guide to Dubai off-plan investment.",
  path: "/guide",
  noIndex: true,
});

export default function GuidePage() {
  return (
    <main className="flex min-h-screen flex-col bg-paper">
      <GuideExperience />
    </main>
  );
}
