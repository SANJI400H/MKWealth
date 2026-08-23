"use client";

import LeadForm from "@/components/ui/LeadForm";
import { trackEvent } from "@/lib/analytics";

interface GateFormProps {
  onUnlock: () => void;
}

export default function GateForm({ onUnlock }: GateFormProps) {
  return (
    <LeadForm
      source="guide"
      intro="Enter your details to unlock the guide"
      submitLabel="Unlock guide"
      onSuccess={() => {
        trackEvent("guide_lead", { funnel: "guide" });
        trackEvent("lead_score_signal", { signal: "guide_lead" });
        onUnlock();
      }}
    />
  );
}
