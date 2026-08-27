"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { SectionNavItem } from "@/content/navigation";

const easePremium = [0.16, 1, 0.3, 1] as const;

function resolveTab(items: SectionNavItem[], hash: string | null | undefined) {
  const id = (hash ?? "").replace(/^#/, "");
  if (id && items.some((item) => item.id === id)) return id;
  return items[0]?.id ?? "";
}

/**
 * Same-page editorial tabs — hash sync, spring underline, panel crossfade.
 * Replaces scroll-spy SectionNavigation on deep editorial pages.
 */
export default function EditorialTabs({
  items,
  panels,
  cta,
  layoutId = "editorial-tab-underline",
  ariaLabel = "On this page",
  className = "mt-10",
}: {
  items: SectionNavItem[];
  panels: Record<string, ReactNode>;
  cta?: { label: string; href: string };
  /** Unique per page so Framer layoutIds do not collide across routes. */
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
      <motion.nav
        aria-label={ariaLabel}
        className="sticky top-14 z-30 mb-10 bg-paper/90 backdrop-blur-sm sm:top-16"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.12, ease: easePremium }}
      >
        <div className="no-scrollbar -mx-1 flex items-end gap-0 overflow-x-auto border-b border-line px-1" role="tablist">
          {items.map((item) => {
            const isActive = active === item.id;
            const tabId = `${baseId}-tab-${item.id}`;
            const panelId = `${baseId}-panel-${item.id}`;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={tabId}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(item.id)}
                className={`relative shrink-0 px-3 pb-3 pt-2 text-[12px] tracking-[-0.01em] transition-colors sm:px-3.5 ${
                  isActive ? "font-semibold text-ink" : "font-medium text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId={reduceMotion ? undefined : layoutId}
                    aria-hidden
                    className="absolute inset-x-3 bottom-0 h-px bg-maroon sm:inset-x-3.5"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
              </button>
            );
          })}
          {cta ? (
            <Link
              href={cta.href}
              className="ml-auto shrink-0 px-3 pb-3 pt-2 text-[12px] font-semibold text-maroon hover:underline"
            >
              {cta.label} →
            </Link>
          ) : null}
        </div>
      </motion.nav>

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
