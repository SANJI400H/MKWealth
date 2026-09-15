"use client";

import { useMemo, useState, type FormEvent } from "react";
import { ChevronLeft } from "lucide-react";
import { getAttribution, trackEvent } from "@/lib/analytics";
import { guideQualifySteps } from "@/content/guide-qualify";

type Answers = {
  objective: string;
  budgetRange: string;
  market: string;
  timeline: string;
  financing: string;
  name: string;
  phone: string;
  email: string;
  bestCallTime: string;
};

const empty: Answers = {
  objective: "",
  budgetRange: "",
  market: "",
  timeline: "",
  financing: "",
  name: "",
  phone: "",
  email: "",
  bestCallTime: "",
};

const fieldClass =
  "mt-1 w-full rounded-md border border-ink/10 bg-paper px-3 py-2.5 text-ink focus:border-maroon focus:outline-none";

type Props = {
  onApproved: () => void;
};

/** Qualification → pending (Morgan approve) or immediate unlock when GUIDE_AUTO_APPROVE. */
export default function GuideQualifyFlow({ onApproved }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const step = guideQualifySteps[stepIndex]!;
  const isLast = step.field === "contact";
  const progress = ((stepIndex + 1) / guideQualifySteps.length) * 100;

  const canContinue = useMemo(() => {
    if (step.field === "contact") return false;
    const key = step.field as keyof Answers;
    return Boolean(answers[key]);
  }, [answers, step.field]);

  const selectOption = (optionId: string) => {
    if (step.field === "contact") return;
    const key = step.field as keyof Answers;
    setAnswers((prev) => ({ ...prev, [key]: optionId }));
  };

  const goNext = () => {
    if (!canContinue) return;
    trackEvent("guide_qualify_step", { step: step.id, value: answers[step.field as keyof Answers] });
    setStepIndex((i) => Math.min(i + 1, guideQualifySteps.length - 1));
  };

  const goBack = () => {
    setError("");
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const notes = [
        `objective=${answers.objective}`,
        `budget=${answers.budgetRange}`,
        `market=${answers.market}`,
        `timeline=${answers.timeline}`,
        `financing=${answers.financing}`,
        answers.bestCallTime ? `best_call_time=${answers.bestCallTime}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const response = await fetch("/api/guide/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: answers.name,
          phone: answers.phone,
          email: answers.email,
          intent: "Investor Guide qualification",
          objective: answers.objective,
          budgetRange: answers.budgetRange,
          market: answers.market,
          timeline: answers.timeline,
          financing: answers.financing,
          notes,
          attribution: getAttribution(),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        status?: string;
        message?: string;
      };
      if (!response.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      trackEvent("guide_lead", { funnel: "guide_qualify", status: data.status ?? "unknown" });
      trackEvent("lead_score_signal", { signal: "guide_qualify_complete" });
      window.fbq?.("track", "Lead", { content_name: "guide_qualify" });

      if (data.status === "approved") {
        onApproved();
        return;
      }
      setPending(true);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pending) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-20 text-center">
        <p className="eyebrow">Application received</p>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Pending Morgan’s review</h1>
        <p className="text-ink-muted">
          Your details are with Morgan. If approved, you will receive an email with a private unlock
          link for the Investor Guide videos and briefings. This is a gated room, not an open catalogue.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-6 py-14">
      <div>
        <p className="eyebrow">Private Investor Guide</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{step.title}</h1>
        <p className="mt-3 text-ink-muted">{step.subtitle}</p>
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <div className="h-full bg-maroon transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-xs text-ink-muted">
          Step {stepIndex + 1} of {guideQualifySteps.length}
        </p>
      </div>

      {!isLast && step.options ? (
        <div className="grid gap-3">
          {step.options.map((option) => {
            const selected = answers[step.field as keyof Answers] === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => selectOption(option.id)}
                className={`rounded-md border px-4 py-4 text-left transition ${
                  selected
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/10 bg-paper text-ink hover:border-ink/30"
                }`}
                aria-pressed={selected}
              >
                <span className="block font-display text-base font-bold">{option.label}</span>
                {option.description ? (
                  <span
                    className={`mt-1.5 block text-sm leading-snug ${
                      selected ? "text-paper/75" : "text-ink-muted"
                    }`}
                  >
                    {option.description}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      {isLast ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm">
            <span className="text-ink-muted">Full name</span>
            <input
              className={fieldClass}
              required
              minLength={2}
              autoComplete="name"
              value={answers.name}
              onChange={(e) => setAnswers((p) => ({ ...p, name: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Best email</span>
            <input
              className={fieldClass}
              type="email"
              required
              autoComplete="email"
              value={answers.email}
              onChange={(e) => setAnswers((p) => ({ ...p, email: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Best phone / WhatsApp</span>
            <input
              className={fieldClass}
              required
              inputMode="tel"
              autoComplete="tel"
              placeholder="+971…"
              value={answers.phone}
              onChange={(e) => setAnswers((p) => ({ ...p, phone: e.target.value }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink-muted">Best time to call (optional)</span>
            <textarea
              className={`${fieldClass} min-h-[80px] resize-y`}
              rows={2}
              placeholder="Timezone and preferred window…"
              value={answers.bestCallTime}
              onChange={(e) => setAnswers((p) => ({ ...p, bestCallTime: e.target.value }))}
            />
          </label>
          {error ? <p className="text-sm text-maroon">{error}</p> : null}
          <p className="text-xs text-ink-muted">
            Access is reviewed. Morgan may approve or decline. Auto-approval can be enabled for trusted
            funnels.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" className="btn-ghost-dark inline-flex items-center gap-1.5" onClick={goBack}>
              <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
              Back
            </button>
            <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
              {loading ? "Submitting…" : "Submit for access"}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="btn-ghost-dark inline-flex items-center gap-1.5 disabled:opacity-40"
            onClick={goBack}
            disabled={stepIndex === 0}
          >
            <ChevronLeft size={16} strokeWidth={1.5} aria-hidden />
            Back
          </button>
          <button
            type="button"
            className="btn-primary w-full sm:w-auto disabled:opacity-50"
            disabled={!canContinue}
            onClick={goNext}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
