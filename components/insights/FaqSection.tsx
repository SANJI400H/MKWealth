"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { faqPageSchema, type FaqItem } from "@/lib/schema";

const easePremium = [0.16, 1, 0.3, 1] as const;

function FaqItemRow({ item }: { item: FaqItem }) {
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line">
      <h3 className="font-display text-lg font-bold text-ink">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-maroon"
        >
          <span>{item.question}</span>
          <ChevronDown
            size={18}
            strokeWidth={1.75}
            className={`shrink-0 text-ink-muted transition-transform duration-300 ${open ? "rotate-180 text-maroon" : ""}`}
            aria-hidden
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: easePremium }}
            className="overflow-hidden"
          >
            <p className="body-copy pb-5 pr-8">{item.answer}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section aria-label="Frequently asked questions" className="mt-16">
      <JsonLd data={faqPageSchema(items)} />
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-2">
        {items.map((item) => (
          <FaqItemRow key={item.question} item={item} />
        ))}
      </div>
    </section>
  );
}
