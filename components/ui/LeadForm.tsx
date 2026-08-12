"use client";

import { useState, type FormEvent } from "react";

export type LeadSource = "guide-gate" | "service" | "invest" | "contact";

interface LeadFormProps {
  source?: LeadSource;
  /** Extra context for the notification (service id, market, etc.). */
  intent?: string;
  submitLabel?: string;
  submittingLabel?: string;
  intro?: string;
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
  "rounded-md border border-ink/10 bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none";

export default function LeadForm({
  source = "guide-gate",
  intent,
  submitLabel = "Submit",
  submittingLabel = "Sending…",
  intro = "Enter your details below",
  onSuccess,
  className = "",
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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
        body: JSON.stringify({ ...form, source, intent }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      window.fbq?.("track", "Lead", { content_name: source, content_category: intent ?? source });
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

      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        Phone number
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
