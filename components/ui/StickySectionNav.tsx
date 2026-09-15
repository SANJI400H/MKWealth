"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import PillSectionBar from "@/components/ui/PillSectionBar";
import type { SectionNavItem } from "@/content/navigation";

/**
 * Sticky scroll-spy bar for long editorial pages (e.g. About).
 */
export default function StickySectionNav({
  items,
  layoutId = "sticky-section-pill",
  ariaLabel = "On this page",
  className = "mt-10",
}: {
  items: SectionNavItem[];
  layoutId?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && items.some((item) => item.id === hash)) {
      setActive(hash);
    }
  }, [items]);

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
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.45, 0.7, 1] },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) io.observe(el);
    }

    return () => io.disconnect();
  }, [items]);

  const goTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      setActive(id);
      const url = `${window.location.pathname}${window.location.search}#${id}`;
      window.history.replaceState(null, "", url);
      el.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduceMotion],
  );

  return (
    <PillSectionBar
      items={items}
      active={active}
      onSelect={goTo}
      layoutId={layoutId}
      ariaLabel={ariaLabel}
      role="list"
      className={className}
    />
  );
}
