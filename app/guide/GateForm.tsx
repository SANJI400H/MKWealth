"use client";

import { useState, type FormEvent } from "react";

interface GateFormProps {
  onUnlock: () => void;
}

interface FormState {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

const empty: FormState = { name: "", phone: "", whatsapp: "", email: "" };

export default function GateForm({ onUnlock }: GateFormProps) {
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
      const response = await fetch("/api/guide-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      window.fbq?.("track", "Lead", { content_name: "guide-gate" });
      onUnlock();
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  const fieldClass =
    "rounded-md border border-ink/10 bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-4">
      <p className="text-sm text-ink-muted">Enter your details to unlock the guide</p>

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
          placeholder="+44 …"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        WhatsApp number
        <input
          name="whatsapp"
          type="tel"
          inputMode="tel"
          required
          placeholder="+971 …"
          value={form.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
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

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary disabled:opacity-60"
      >
        {status === "submitting" ? "Unlocking…" : "Unlock the Guide"}
      </button>
    </form>
  );
}
