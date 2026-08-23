"use client";

import { useEffect, useState } from "react";

export type SectionNavItem = { id: string; label: string };

/**
 * Restrained local section nav for deep editorial pages.
 * Does not compete with the global header.
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
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.45, 0.7, 1] }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-14 z-30 -mx-6 mb-10 border-y border-line bg-paper/95 backdrop-blur-sm sm:top-16"
    >
      <div className="flex items-center gap-1 overflow-x-auto px-6 py-3 scrollbar-none">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`shrink-0 px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] transition-colors ${
              active === item.id ? "text-ink" : "text-ink-muted hover:text-ink"
            }`}
          >
            {item.label}
          </a>
        ))}
        {cta ? (
          <a
            href={cta.href}
            className="ml-auto shrink-0 px-3 py-1.5 text-[12px] font-semibold text-gold hover:underline"
          >
            {cta.label}
          </a>
        ) : null}
      </div>
    </nav>
  );
}
