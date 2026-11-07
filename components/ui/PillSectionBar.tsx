"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import type { SectionNavItem } from "@/content/navigation";

const easePremium = [0.16, 1, 0.3, 1] as const;

type PillSectionBarProps = {
  items: SectionNavItem[];
  active: string;
  onSelect: (id: string) => void;
  layoutId: string;
  ariaLabel?: string;
  /** tablist for EditorialTabs; navigation list for scroll-spy */
  role?: "tablist" | "list";
  getButtonProps?: (item: SectionNavItem, isActive: boolean) => Record<string, string | number | boolean | undefined>;
  className?: string;
};

/**
 * Centered sticky glass pill track. The maroon selection slides, with a short neon-red glow on each shift.
 * Shared by StickySectionNav (scroll) and EditorialTabs (panels).
 */
export default function PillSectionBar({
  items,
  active,
  onSelect,
  layoutId,
  ariaLabel = "On this page",
  role = "list",
  getButtonProps,
  className = "",
}: PillSectionBarProps) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const previousActive = useRef(active);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const btn = track.querySelector<HTMLButtonElement>(`[data-pill-id="${CSS.escape(active)}"]`);
    if (!btn) return;
    const left = btn.offsetLeft - (track.clientWidth - btn.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    if (reduceMotion) return;
    setPulse((count) => count + 1);
  }, [active, reduceMotion]);

  return (
    <motion.nav
      aria-label={ariaLabel}
      className={`sticky top-[calc(3.5rem+env(safe-area-inset-top,0px))] z-30 -mx-5 bg-transparent px-5 py-3 sm:top-[calc(4rem+env(safe-area-inset-top,0px))] sm:-mx-8 sm:px-8 ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easePremium }}
    >
      <div className="flex justify-center">
        <LayoutGroup id={layoutId}>
          <div
            ref={trackRef}
            className="no-scrollbar inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-white/80 bg-white/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_28px_rgba(17,17,17,0.07)] backdrop-blur-2xl backdrop-saturate-150 sm:gap-1 sm:p-1.5"
            role={role}
          >
            {items.map((item) => {
              const isActive = active === item.id;
              const extra = getButtonProps?.(item, isActive) ?? {};
              return (
                <button
                  key={item.id}
                  type="button"
                  data-pill-id={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`relative flex min-h-10 shrink-0 items-center rounded-full px-3.5 py-2 text-[11px] tracking-[-0.01em] transition-colors duration-300 sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-[12px] ${
                    isActive
                      ? "font-semibold text-white"
                      : "font-medium text-ink-muted hover:text-ink"
                  }`}
                  aria-current={role === "list" && isActive ? "true" : undefined}
                  {...extra}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={`${layoutId}-active`}
                      className="absolute inset-0 rounded-full bg-maroon shadow-[0_1px_2px_rgba(66,16,28,0.28)]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34, mass: 0.65 }
                      }
                    >
                      {pulse > 0 && !reduceMotion ? (
                        <span key={pulse} aria-hidden className="pill-shift-neon absolute inset-0 rounded-full" />
                      ) : null}
                    </motion.span>
                  ) : null}
                  <span className="relative z-[1] whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </motion.nav>
  );
}
