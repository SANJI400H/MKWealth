"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { getAttribution, trackEvent } from "@/lib/analytics";
import { trueCostWorksheet } from "@/content/true-cost-worksheet";

const fieldClass =
  "w-full rounded-md border border-ink/10 bg-paper px-4 py-3 text-ink placeholder:text-ink-muted/50 focus:border-maroon focus:outline-none";

function WorksheetBody() {
  return (
    <div id="worksheet" className="mx-auto mt-12 max-w-2xl space-y-10 border-t border-line pt-12">
      {trueCostWorksheet.sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">{section.title}</h2>
          <ul className="mt-4 space-y-3">
            {section.items.map((item) => (
              <li key={item} className="flex gap-3 text-ink-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon" aria-hidden />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default function TrueCostGate({ children }: { children?: ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          source: "guide",
          intent: "true-cost-worksheet",
          leadScoreHint: "base",
          notes: "true_cost_worksheet_unlock",
          attribution: getAttribution(),
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("worksheet_lead", { content_name: "true-cost" });
      setStatus("success");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <>
        <div className="rounded-md border border-maroon/25 bg-maroon/5 px-5 py-6 text-center">
          <p className="font-display text-xl font-bold text-ink">Worksheet unlocked</p>
          <p className="mt-2 text-sm text-ink-muted">Save or print this page. Checklist is below.</p>
          <p className="mt-4 text-sm text-ink-muted">
            <Link href="/strategy-session" className="font-semibold text-maroon underline-offset-2 hover:underline">
              Request a strategy session →
            </Link>
          </p>
        </div>
        <WorksheetBody />
        {children}
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 text-left">
      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        Name
        <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={fieldClass} />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        Email
        <input
          required
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm text-ink-muted">
        WhatsApp / phone
        <input
          required
          type="tel"
          autoComplete="tel"
          placeholder="+971…"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={fieldClass}
        />
      </label>
      {error ? <p className="text-sm text-maroon">{error}</p> : null}
      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full justify-center">
        {status === "submitting" ? "Unlocking…" : "Unlock the True Cost worksheet"}
      </button>
      <p className="text-center text-xs text-ink-muted">No spam. Used to send updates and follow up if you ask.</p>
    </form>
  );
}
