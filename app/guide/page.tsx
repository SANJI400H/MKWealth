import type { Metadata } from "next";
import { cookies } from "next/headers";
import GuideGate from "./GuideGate";
import { GUIDE_ACCESS_COOKIE, verifyGuideAccessCookie } from "@/lib/guide-access";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Private Investor Guide | Morgan Kaiser",
  description:
    "Qualify for Morgan Kaiser's private investor guide. Access after review, or automated approval when enabled.",
  path: "/guide",
  noIndex: true,
});

type Props = { searchParams: { error?: string; unlocked?: string } };

export default async function GuidePage({ searchParams }: Props) {
  const unlocked = await verifyGuideAccessCookie(cookies().get(GUIDE_ACCESS_COOKIE)?.value);

  return (
    <main className="flex min-h-screen flex-col bg-paper">
      <GuideGate
        initialUnlocked={unlocked}
        error={searchParams.error}
        justUnlocked={searchParams.unlocked === "1"}
      />
    </main>
  );
}
