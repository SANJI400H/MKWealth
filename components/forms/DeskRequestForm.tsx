"use client";

import { useState, FormEvent } from "react";

/** Requests Private Desk access; does not unlock until Morgan grants via /api/desk/grant. */
export function DeskRequestFormDirect() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/desk/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, notes }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-md border border-line bg-ink/[0.03] px-5 py-6">
        <p className="font-display text-lg font-bold text-ink">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          Book or complete your strategy session if you have not already. Morgan unlocks the desk after
          approval.
        </p>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-ink focus:border-maroon focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm">
        <span className="text-ink-muted">Full name</span>
        <input className={field} value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
      </label>
      <label className="block text-sm">
        <span className="text-ink-muted">WhatsApp number</span>
        <input
          className={field}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="+971…"
          inputMode="tel"
        />
      </label>
      <label className="block text-sm">
        <span className="text-ink-muted">Email</span>
        <input
          className={field}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="block text-sm">
        <span className="text-ink-muted">Anything Morgan should know (optional)</span>
        <textarea
          className={`${field} min-h-[88px] resize-y`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </label>
      {error ? <p className="text-sm text-maroon">{error}</p> : null}
      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
        {loading ? "Sending…" : "Request Private Desk access"}
      </button>
    </form>
  );
}
