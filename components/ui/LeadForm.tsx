"use client";

import { useState, type FormEvent } from "react";
import { getAttribution, trackEvent } from "@/lib/analytics";
import type { LeadSource } from "@/lib/leads";

interface LeadFormProps {
  source?: LeadSource;
  /** Extra context for the notification (service id, market, etc.). */
  intent?: string;
  submitLabel?: string;
  submittingLabel?: string;
  intro?: string;
  phoneLabel?: string;
  /** When false, omit phone (tier-3 calculator gate). Default true. */
  requirePhone?: boolean;
  /** Explicit soft-launch tier hint: tier_1 | tier_2 | tier_3 */
  leadScoreHint?: string;
  /** Extra fields merged into the lead POST (e.g. calculatorSnapshot). */
  extraPayload?: Record<string, unknown>;
  onSuccess?: () => void;
  className?: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
}

const empty: FormState = { name: "", phone: "", email: "" };

const fieldClass =
  "rounded-md border border-ink/10 bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-maroon focus:outline-none";

export default function LeadForm({
  source = "guide",
  intent,
  submitLabel = "Submit",
  submittingLabel = "Sending…",
  intro = "Enter your details below",
  phoneLabel = "Phone number",
  requirePhone = true,
  leadScoreHint,
  extraPayload,
  onSuccess,
  className = "",
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function defaultTierHint() {
    if (leadScoreHint) return leadScoreHint;
    if (source === "analyse" || source === "strategy-session") return "tier_1";
    if (source === "guide" || source === "guide-gate") return "tier_2";
    if (source === "calculator" || source === "tools") return "tier_3";
    return "tier_3";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: requirePhone ? form.phone : "",
          source,
          intent,
          attribution: getAttribution(),
          leadScoreHint: defaultTierHint(),
          ...extraPayload,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("guide_lead", { content_name: source, content_category: intent ?? source });
      setForm(empty);
      setStatus("idle");
      onSuccess?.();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex w-full max-w-sm flex-col gap-4 text-left ${className}`}>
      {intro ? <p className="text-sm text-ink-muted">{intro}</p> : null}

      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        Full name
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={fieldClass}
        />
      </label>

      {requirePhone ? (
        <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
          {phoneLabel}
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            placeholder="+971 …"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClass}
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={fieldClass}
        />
      </label>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
        {status === "submitting" ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
