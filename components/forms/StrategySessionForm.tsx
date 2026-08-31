"use client";

import { useState, type FormEvent } from "react";
import { getAttribution, trackEvent } from "@/lib/analytics";

const fieldClass =
 "w-full rounded-sm border border-silver bg-paper px-4 py-3.5 text-ink placeholder:text-ink-muted/50 focus:border-maroon focus:outline-none";

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
 * Low-friction strategy session intake, name, email, phone, ownership, capital.
 */
export default function StrategySessionForm() {
 const [name, setName] = useState("");
 const [email, setEmail] = useState("");
 const [phone, setPhone] = useState("");
 const [ownsProperty, setOwnsProperty] = useState("");
 const [capital, setCapital] = useState("");
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
 source: "strategy-session",
 existingUaeProperty: ownsProperty,
 budgetRange: capital,
 intent: "30-minute-strategy-session",
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

 trackEvent("analyse_submit", { content_name: "strategy-session" });
 window.fbq?.("track", "Lead", { content_name: "strategy-session" });
 setStatus("success");
 } catch {
 setError("Network error. Please try again.");
 setStatus("error");
 }
 }

 if (status === "success") {
 return (
 <div className="rounded-sm border border-maroon/25 bg-maroon/5 px-6 py-8">
 <p className="font-display text-xl font-bold text-ink">Details received.</p>
 <p className="mt-3 text-ink-muted">
 Choose a time below to complete your 30-minute strategy session booking.
 </p>
 </div>
 );
 }

 return (
 <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-5">
 <label className="flex flex-col gap-2 text-sm text-ink-muted">
 Name
 <input
 required
 autoComplete="name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 className={fieldClass}
 />
 </label>
 <label className="flex flex-col gap-2 text-sm text-ink-muted">
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
 <label className="flex flex-col gap-2 text-sm text-ink-muted">
 Phone number
 <input
 required
 type="tel"
 autoComplete="tel"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 className={fieldClass}
 />
 </label>
 <label className="flex flex-col gap-2 text-sm text-ink-muted">
 Do you currently own property?
 <select
 required
 value={ownsProperty}
 onChange={(e) => setOwnsProperty(e.target.value)}
 className={fieldClass}
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
 <label className="flex flex-col gap-2 text-sm text-ink-muted">
 What capital are you looking to deploy?
 <select required value={capital} onChange={(e) => setCapital(e.target.value)} className={fieldClass}>
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

 <button type="submit" disabled={status === "submitting"} className="btn-primary mt-2 w-full sm:w-auto">
 {status === "submitting" ? "Sending…" : "Continue to booking"}
 </button>
 </form>
 );
}
