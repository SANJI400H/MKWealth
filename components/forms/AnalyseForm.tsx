"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { getAttribution, trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site-config";

const fieldClass =
  "rounded-md border border-ink/10 bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-maroon focus:outline-none";

type FormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  propertyName: string;
  purchasePrice: string;
  expectedRent: string;
  marketType: string;
  objective: string;
  timeline: string;
  notes: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  country: "",
  propertyName: "",
  purchasePrice: "",
  expectedRent: "",
  marketType: "",
  objective: "",
  timeline: "",
  notes: "",
};

/** Medium-intent analysis request — contact first; deal detail optional. */
export default function AnalyseForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const calculatorSnapshot = useMemo(() => {
    const snap: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith("calc_")) snap[key.replace(/^calc_/, "")] = value;
    });
    return Object.keys(snap).length ? snap : null;
  }, [searchParams]);

  useEffect(() => {
    trackEvent("analyse_start", { has_calculator: Boolean(calculatorSnapshot) });
    if (!calculatorSnapshot) return;
    setShowMore(true);
    setForm((prev) => ({
      ...prev,
      purchasePrice: calculatorSnapshot.purchasePrice ?? prev.purchasePrice,
      expectedRent: calculatorSnapshot.annualRent ?? prev.expectedRent,
      notes: prev.notes || `Calculator handoff: ${JSON.stringify(calculatorSnapshot)}`,
    }));
  }, [calculatorSnapshot]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "analyse",
          intent: form.marketType || "investment-analysis",
          calculatorSnapshot,
          attribution: getAttribution(),
          leadScoreHint: "high",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("analyse_submit", { market_type: form.marketType || "unspecified" });
      setForm(empty);
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-line bg-ink/[0.02] p-6">
        <p className="font-display text-xl font-bold text-ink">Request received</p>
        <p className="mt-3 text-ink-muted">
          Morgan will review what you shared. For faster follow-up, WhatsApp with the same project name.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-sm text-ink-muted">
        Start with contact details. Add deal numbers if you have them — upload comes later.
      </p>

      {calculatorSnapshot ? (
        <p className="rounded-sm border border-maroon/30 bg-maroon/5 px-3 py-2 text-sm text-ink">
          Calculator values were carried into this form.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
          Full name
          <input required className={fieldClass} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
          Email
          <input
            required
            type="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-muted sm:col-span-2">
          WhatsApp / phone
          <input
            required
            type="tel"
            placeholder="+971 …"
            className={fieldClass}
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink-muted sm:col-span-2">
          Property / project name (optional)
          <input
            className={fieldClass}
            value={form.propertyName}
            onChange={(e) => update("propertyName", e.target.value)}
          />
        </label>
      </div>

      <button
        type="button"
        className="text-left text-sm font-semibold text-maroon underline-offset-2 hover:underline"
        onClick={() => setShowMore((v) => !v)}
      >
        {showMore ? "Hide extra deal details" : "Add deal details (optional)"}
      </button>

      {showMore ? (
        <div className="grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Country
            <input className={fieldClass} value={form.country} onChange={(e) => update("country", e.target.value)} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Off-plan or secondary
            <select
              className={fieldClass}
              value={form.marketType}
              onChange={(e) => update("marketType", e.target.value)}
            >
              <option value="">Select…</option>
              <option value="off-plan">Off-plan</option>
              <option value="secondary">Secondary</option>
              <option value="unsure">Not sure</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Purchase price (AED)
            <input
              className={fieldClass}
              value={form.purchasePrice}
              onChange={(e) => update("purchasePrice", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Expected annual rent
            <input
              className={fieldClass}
              value={form.expectedRent}
              onChange={(e) => update("expectedRent", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Timeline
            <input
              className={fieldClass}
              placeholder="e.g. 3 to 6 months"
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
            Objective
            <input
              className={fieldClass}
              placeholder="Yield, Golden Visa…"
              value={form.objective}
              onChange={(e) => update("objective", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-ink-muted sm:col-span-2">
            Notes
            <textarea
              rows={3}
              className={fieldClass}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </label>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button type="submit" disabled={status === "submitting"} className="btn-primary disabled:opacity-60">
        {status === "submitting" ? "Sending…" : siteConfig.cta.analyseSubmit}
      </button>
    </form>
  );
}
