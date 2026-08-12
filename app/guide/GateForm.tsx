"use client";

import LeadForm from "@/components/ui/LeadForm";

interface GateFormProps {
  onUnlock: () => void;
}

export default function GateForm({ onUnlock }: GateFormProps) {
  return (
    <LeadForm
      source="guide-gate"
      intro="Enter your details to unlock the guide"
      submitLabel="Unlock the Guide"
      submittingLabel="Unlocking…"
      onSuccess={onUnlock}
    />
  );
}
