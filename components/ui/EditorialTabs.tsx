"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PillSectionBar from "@/components/ui/PillSectionBar";
import type { SectionNavItem } from "@/content/navigation";

const easePremium = [0.16, 1, 0.3, 1] as const;

function resolveTab(items: SectionNavItem[], hash: string | null | undefined) {
  const id = (hash ?? "").replace(/^#/, "");
  if (id && items.some((item) => item.id === id)) return id;
  return items[0]?.id ?? "";
}

/**
 * Same-page editorial tabs — centered pill bar, hash sync, panel crossfade.
 */
export default function EditorialTabs({
  items,
  panels,
  cta,
  layoutId = "editorial-tab-pill",
  ariaLabel = "On this page",
  className = "mt-10",
}: {
  items: SectionNavItem[];
  panels: Record<string, ReactNode>;
  cta?: { label: string; href: string };
  layoutId?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    setActive(resolveTab(items, window.location.hash));
    const onHash = () => setActive(resolveTab(items, window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [items]);

  const selectTab = useCallback((id: string) => {
    setActive(id);
    const url = `${window.location.pathname}${window.location.search}#${id}`;
    window.history.replaceState(null, "", url);
  }, []);

  const panel = panels[active] ?? null;

  return (
    <div className={className}>
      <PillSectionBar
        items={items}
        active={active}
        onSelect={selectTab}
        layoutId={layoutId}
        ariaLabel={ariaLabel}
        role="tablist"
        className="mb-8"
        getButtonProps={(item, isActive) => ({
          role: "tab",
          id: `${baseId}-tab-${item.id}`,
          "aria-selected": isActive,
          "aria-controls": `${baseId}-panel-${item.id}`,
          tabIndex: isActive ? 0 : -1,
        })}
      />

      {cta ? (
        <div className="mb-8 flex justify-center">
          <Link href={cta.href} className="text-[12px] font-semibold text-maroon hover:underline">
            {cta.label} →
          </Link>
        </div>
      ) : null}

      <div className="relative min-h-[12rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            role="tabpanel"
            id={`${baseId}-panel-${active}`}
            aria-labelledby={`${baseId}-tab-${active}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.38, ease: easePremium }}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
