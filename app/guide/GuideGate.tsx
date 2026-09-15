"use client";

import { useEffect, useState } from "react";
import GuideExperience from "./GuideExperience";
import GuideQualifyFlow from "@/components/guide/GuideQualifyFlow";
import { useRouter } from "next/navigation";

type Props = {
  initialUnlocked: boolean;
  error?: string;
  justUnlocked?: boolean;
};

/** Guide gate: qualification + approval cookie. Library only when unlocked. */
export default function GuideGate({ initialUnlocked, error, justUnlocked }: Props) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(initialUnlocked);

  useEffect(() => {
    if (initialUnlocked) setUnlocked(true);
  }, [initialUnlocked]);

  if (!unlocked) {
    return (
      <>
        {error === "invalid" ? (
          <p className="px-6 pt-8 text-center text-sm text-maroon">
            That unlock link is invalid or expired. Submit a new application below.
          </p>
        ) : null}
        {error === "config" ? (
          <p className="px-6 pt-8 text-center text-sm text-maroon">
            Guide access is not configured. Contact Morgan directly.
          </p>
        ) : null}
        <GuideQualifyFlow
          onApproved={() => {
            setUnlocked(true);
            router.refresh();
          }}
        />
      </>
    );
  }

  return (
    <>
      {justUnlocked ? (
        <p className="px-6 pt-6 text-center text-sm font-medium text-ink">Guide unlocked on this browser.</p>
      ) : null}
      <GuideExperience />
    </>
  );
}
