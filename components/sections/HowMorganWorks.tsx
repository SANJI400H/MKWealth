"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import EditorialImage from "@/components/ui/EditorialImage";
import { serviceImages } from "@/content/editorial-images";
import { howMorganWorksStages, type HowMorganStage } from "@/content/how-morgan-works";

function StageBody({ stage }: { stage: HowMorganStage }) {
 const photo = serviceImages[stage.assetId];

 return (
 <div className="grid gap-8 rounded-sm border border-maroon/15 bg-gradient-to-br from-white via-paper to-maroon/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-12 lg:p-8">
 <div>
 <p className="font-display text-4xl font-bold tracking-tight text-maroon sm:text-6xl">{stage.number}</p>
 <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:mt-4 sm:text-4xl">{stage.title}</h3>
 <p className="mt-4 text-base font-medium text-ink sm:text-xl">{stage.question}</p>
 <p className="body-copy mt-4 sm:text-lg">{stage.body}</p>
 <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-maroon">Morgan examines</p>
 <ul className="mt-3 grid gap-2 sm:grid-cols-2">
 {stage.examines.map((item) => (
 <li key={item} className="flex gap-2 text-sm text-ink-muted">
 <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-maroon" aria-hidden />
 <span>{item}</span>
 </li>
 ))}
 </ul>
 </div>
 <EditorialImage
 src={photo?.src}
 alt={photo?.alt ?? `${stage.title}, engagement stage`}
 assetId={stage.assetId}
 categoryLabel={stage.categoryLabel}
 ratio="16:10"
 fit="contain"
 className="border border-maroon/10 bg-paper"
 />
 </div>
 );
}

/** Interactive four-stage sequence, post-cinema; no scroll hijacking. */
export default function HowMorganWorks() {
 const [active, setActive] = useState(0);
 const stage = howMorganWorksStages[active]!;

 return (
 <section id="how-morgan-works" className="section-pad bg-surface" aria-label="How Morgan works with you">
 <div className="section-inner">
 <RevealOnScroll>
 <p className="eyebrow">Work with Morgan</p>
 <h2 className="section-title">How Morgan works with you.</h2>
 <p className="section-lead">A deliberate sequence, strategy and underwriting before inventory.</p>
 </RevealOnScroll>

 <div className="section-body">
 <div className="flex flex-wrap gap-1 border-b border-silver" role="tablist" aria-label="Engagement stages">
 {howMorganWorksStages.map((s, i) => (
 <button
 key={s.id}
 type="button"
 role="tab"
 aria-selected={i === active}
 aria-controls={`stage-panel-${s.id}`}
 id={`stage-tab-${s.id}`}
 onClick={() => setActive(i)}
 className={`relative px-4 pb-3.5 pt-2 text-left transition ${
 i === active ? "text-maroon" : "text-ink-muted hover:text-ink"
 }`}
 >
 <span className="block text-[10px] font-semibold tracking-[0.16em]">{s.number}</span>
 <span className="mt-0.5 block text-sm font-semibold uppercase tracking-wide">{s.title}</span>
 <span
 aria-hidden
 className={`absolute inset-x-4 bottom-0 h-px ${i === active ? "bg-maroon" : "bg-transparent"}`}
 />
 </button>
 ))}
 </div>
 <div
 id={`stage-panel-${stage.id}`}
 role="tabpanel"
 aria-labelledby={`stage-tab-${stage.id}`}
 className="mt-10"
 key={stage.id}
 >
 <StageBody stage={stage} />
 </div>
 </div>
 </div>
 </section>
 );
}
