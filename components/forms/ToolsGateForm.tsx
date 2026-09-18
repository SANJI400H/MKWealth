"use client";

import { useRouter, useSearchParams } from "next/navigation";
import LeadForm from "@/components/ui/LeadForm";
import { trackEvent } from "@/lib/analytics";

export default function ToolsGateForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  return (
    <LeadForm
      source="tools"
      intro="Enter your details to unlock investment tools and the investor guide"
      phoneLabel="WhatsApp number"
      submitLabel="Unlock tools"
      onSuccess={() => {
        trackEvent("lead_score_signal", { signal: "tools_lead" });
        const dest =
          next && next.startsWith("/") && !next.startsWith("//") ? next : "/tools";
        router.push(dest);
        router.refresh();
      }}
    />
  );
}
