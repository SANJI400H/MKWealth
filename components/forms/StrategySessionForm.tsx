"use client";

import { useState, type FormEvent } from "react";
import { getAttribution, trackEvent } from "@/lib/analytics";

const fieldClass =
  "w-full rounded-lg border border-ink/10 bg-paper/70 px-4 py-3.5 text-ink shadow-sm backdrop-blur-sm placeholder:text-ink-muted/50 focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon/30";

const CAPITAL_OPTIONS = [
  "AED 2M, 5M",
  "AED 5M, 10M",
  "AED 10M+",
  "AED 1M, 2M",
  "Under AED 1M",
  "Prefer to discuss",
] as const;

const OWN_OPTIONS = ["Yes", "No", "Prefer to discuss"] as const;

/**
 * Strategy session intake → Morgan approves → Morgan books Google Meet.
 */
export default function StrategySessionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ownsProperty, setOwnsProperty] = useState("");
  const [capital, setCapital] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(
    "Morgan will review your request. If approved, you will receive a calendar invitation with Google Meet.",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/session/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "strategy-session",
          existingUaeProperty: ownsProperty,
          budgetRange: capital,
          intent: "30-minute-strategy-session",
          attribution: getAttribution(),
          leadScoreHint: "high",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      if (typeof data.message === "string" && data.message.trim()) {
        setSuccessMessage(data.message);
      }

      trackEvent("session_request", { content_name: "strategy-session" });
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="w-full rounded-2xl border border-maroon/20 bg-maroon/[0.06] px-6 py-8 text-center backdrop-blur-md">
        <p className="font-display text-xl font-bold text-ink">Request received.</p>
        <p className="mx-auto mt-3 max-w-md text-ink-muted leading-relaxed">{successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-lg flex-col items-stretch gap-5 rounded-2xl border border-ink/10 bg-paper/55 p-6 text-center shadow-[0_20px_50px_-28px_rgba(20,16,16,0.45)] backdrop-blur-xl sm:p-8"
    >
      <label className="flex flex-col items-center gap-2 text-sm text-ink-muted">
        Name
        <input
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${fieldClass} text-center`}
        />
      </label>
      <label className="flex flex-col items-center gap-2 text-sm text-ink-muted">
        Email
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${fieldClass} text-center`}
        />
      </label>
      <label className="flex flex-col items-center gap-2 text-sm text-ink-muted">
        Phone number
        <input
          required
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`${fieldClass} text-center`}
          placeholder="+971…"
        />
      </label>
      <label className="flex flex-col items-center gap-2 text-sm text-ink-muted">
        Do you currently own property?
        <select
          required
          value={ownsProperty}
          onChange={(e) => setOwnsProperty(e.target.value)}
          className={`${fieldClass} text-center`}
        >
          <option value="" disabled>
            Select
          </option>
          {OWN_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col items-center gap-2 text-sm text-ink-muted">
        What capital are you looking to deploy?
        <select
          required
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          className={`${fieldClass} text-center`}
        >
          <option value="" disabled>
            Select
          </option>
          {CAPITAL_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      {error ? <p className="text-sm text-maroon">{error}</p> : null}

      <div className="mt-2 flex w-full justify-center">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-primary w-full justify-center sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Request strategy session"}
        </button>
      </div>
      <p className="mx-auto max-w-sm text-xs leading-relaxed text-ink-muted">
        After approval, Morgan sends a Google Calendar invite with Meet. You do not pick a slot on this page.
      </p>
    </form>
  );
}
