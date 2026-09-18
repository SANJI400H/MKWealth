"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { guideCategories, type GuideCategoryId } from "@/content/guide-library";
import { siteConfig } from "@/lib/site-config";

type Step = "categories" | "confirmed";

/**
 * Post-approval Investor Guide.
 * Leads already captured at qualify. Until real files exist, collect topics and
 * tell the investor materials will be emailed — no stub video/PDF downloads.
 */
export default function GuideExperience() {
  const [step, setStep] = useState<Step>("categories");
  const [selected, setSelected] = useState<GuideCategoryId[]>([]);

  const topicLabels = useMemo(
    () =>
      selected
        .map((id) => guideCategories.find((c) => c.id === id)?.label ?? id)
        .join(", "),
    [selected],
  );

  const toggleCategory = (id: GuideCategoryId) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  if (step === "confirmed") {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-20 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-maroon/25 bg-maroon/5 text-maroon">
          <Mail size={22} strokeWidth={1.5} aria-hidden />
        </div>
        <p className="eyebrow">Investor Guide</p>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">We’ll email your materials</h1>
        <p className="text-ink-muted leading-relaxed">
          Thanks — your topics are noted
          {topicLabels ? (
            <>
              {" "}
              (<span className="font-medium text-ink">{topicLabels}</span>)
            </>
          ) : null}
          . Private guide videos and PDF briefings will be emailed to the address you registered with.
        </p>
        <p className="text-sm text-ink-muted">Check your inbox (and spam folder) over the next day or two.</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/strategy-session" className="btn-primary w-full justify-center sm:w-auto">
            Request strategy session
          </Link>
          <Link href="/video-guides" className="btn-ghost-dark w-full justify-center sm:w-auto">
            Public Video Guides
          </Link>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Already investing with Morgan?{" "}
          <Link href={siteConfig.clientPortalUrl || "/portal"} className="font-semibold text-maroon hover:underline">
            Open Client Portal
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-14">
      <div className="text-center">
        <p className="eyebrow">Private Investor Guide</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">What should we send you?</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-muted">
          Pick the topics you care about. We’ll email the matching videos and briefings — nothing to download
          on this page yet.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {guideCategories.map((category) => {
          const active = selected.includes(category.id);
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => toggleCategory(category.id)}
              className={`rounded-md border px-4 py-4 text-left transition ${
                active ? "border-ink bg-ink text-paper" : "border-ink/10 bg-paper text-ink hover:border-ink/30"
              }`}
              aria-pressed={active}
            >
              <span className="block font-display text-base font-bold">{category.label}</span>
              <span className={`mt-1.5 block text-sm leading-snug ${active ? "text-paper/75" : "text-ink-muted"}`}>
                {category.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="btn-primary disabled:opacity-50"
          disabled={selected.length === 0}
          onClick={() => setStep("confirmed")}
        >
          Confirm — email me these topics
        </button>
      </div>
    </div>
  );
}
