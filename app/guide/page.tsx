import type { Metadata } from "next";
import { cookies } from "next/headers";
import GuideExperience from "./GuideExperience";
import { ToolsGateProvider } from "@/components/tools/ToolsGateProvider";
import { pageMetadata } from "@/lib/metadata";
import { TOOLS_ACCESS_COOKIE, verifyToolsAccessCookie } from "@/lib/tools-access";

// Automation-only traffic (Instagram DM funnel), never meant to rank, hence noIndex.
export const metadata: Metadata = pageMetadata({
 title: "Unlock the Dubai Off-Plan Investment Guide",
 description: "Browse Morgan Kaiser's Dubai off-plan guide, register to download videos and PDF briefings.",
 path: "/guide",
 noIndex: true,
});

export default async function GuidePage() {
 const unlocked = await verifyToolsAccessCookie(cookies().get(TOOLS_ACCESS_COOKIE)?.value);

 return (
 <main className="flex min-h-screen flex-col bg-paper">
 <ToolsGateProvider
 initialUnlocked={unlocked}
 source="guide"
 title="Unlock downloads"
 intro="Enter your name, WhatsApp number, and email to download videos and PDF briefings."
 >
 <GuideExperience />
 </ToolsGateProvider>
 </main>
 );
}
