import type { Metadata } from "next";
import GuideGate from "./GuideGate";
import SiteNav from "@/components/sections/SiteNav";
import SiteFooter from "@/components/sections/SiteFooter";
import { guideLeadFromCookies } from "@/lib/guide-session";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Private Investor Guide | Morgan Kaiser",
  description: "Morgan Kaiser's private investor guide. The series unlocks after your details are saved.",
  path: "/guide",
  noIndex: true,
});

type Props = { searchParams: { error?: string; unlocked?: string } };

export default async function GuidePage({ searchParams }: Props) {
  const unlocked = (await guideLeadFromCookies()) !== null;

  return (
    <main className="flex min-h-screen flex-col bg-paper">
      <SiteNav />
      <GuideGate
        initialUnlocked={unlocked}
        error={searchParams.error}
        justUnlocked={searchParams.unlocked === "1"}
      />
      <SiteFooter />
    </main>
  );
}
