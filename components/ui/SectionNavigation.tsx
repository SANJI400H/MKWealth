"use client";

import { useEffect, useState } from "react";

export type SectionNavItem = { id: string; label: string };

/**
 * Quiet on-page rail for deep editorial pages.
 * Left-aligned text; thin active underline — does not compete with global header.
 */
export default function SectionNavigation({
  items,
  cta,
}: {
  items: SectionNavItem[];
  cta?: { label: string; href: string };
}) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const ratios = new Map<string, number>();

    const sync = () => {
      let best = items[0]?.id ?? "";
      let bestRatio = -1;
      for (const item of items) {
        const ratio = ratios.get(item.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = item.id;
        }
      }
      if (best) setActive(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        sync();
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2, 0.45, 0.7, 1] }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-14 z-30 mb-10 bg-paper/90 backdrop-blur-sm sm:top-16">
      <div className="no-scrollbar -mx-1 flex items-end gap-0 overflow-x-auto border-b border-line px-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative shrink-0 px-3 pb-3 pt-2 text-[12px] tracking-[-0.01em] transition-colors sm:px-3.5 ${
                isActive ? "font-semibold text-ink" : "font-medium text-ink-muted hover:text-ink"
              }`}
            >
              {item.label}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-0 h-px transition-colors sm:inset-x-3.5 ${
                  isActive ? "bg-maroon" : "bg-transparent"
                }`}
              />
            </a>
          );
        })}
        {cta ? (
          <a
            href={cta.href}
            className="ml-auto shrink-0 px-3 pb-3 pt-2 text-[12px] font-semibold text-maroon hover:underline"
          >
            {cta.label} →
          </a>
        ) : null}
      </div>
    </nav>
  );
}
