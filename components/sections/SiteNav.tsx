"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import BrandLogo from "@/components/ui/BrandLogo";
import {
  cinemaSectionIds,
  groupIsActive,
  pathMatches,
  primaryNav,
  type NavGroup,
} from "@/content/navigation";

const CINEMA = new Set<string>(cinemaSectionIds);

function DesktopMega({
  group,
  pathname,
  lightChrome,
}: {
  group: NavGroup;
  pathname: string;
  lightChrome: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const active = groupIsActive(pathname, group);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  const linkTone = lightChrome ? "text-white/80 hover:text-white" : "text-ink-muted hover:text-ink";
  const activeTone = lightChrome ? "text-white" : "text-ink";
  const multi = group.columns.length > 1 || Boolean(group.featured);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 px-3 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors ${
          active || open ? activeTone : linkTone
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <ChevronDown size={14} strokeWidth={1.75} className={`transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${group.label} menu`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 pt-2"
            onMouseEnter={clearClose}
            onMouseLeave={scheduleClose}
          >
            <div
              className={`rounded-sm border border-line bg-paper py-5 shadow-[0_16px_48px_rgba(0,0,0,0.08)] ${
                multi ? "min-w-[28rem] px-6" : "min-w-[16rem] px-5"
              }`}
            >
              <div className={`grid gap-8 ${multi ? "sm:grid-cols-[1fr_1fr_auto]" : ""}`}>
                {group.columns.map((col) => (
                  <div key={col.title}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{col.title}</p>
                    <ul className="mt-3 space-y-1">
                      {col.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            className="block rounded-sm px-1 py-2 transition hover:bg-ink/[0.03]"
                            onClick={() => setOpen(false)}
                          >
                            <span
                              className={`block text-[13px] font-medium ${
                                pathMatches(pathname, link.href) ? "text-maroon" : "text-ink"
                              }`}
                            >
                              {link.label}
                            </span>
                            {link.description ? (
                              <span className="mt-0.5 block text-[11px] leading-snug text-ink-muted">
                                {link.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {group.featured ? (
                  <div className="border-t border-line pt-4 sm:max-w-[11rem] sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      {group.featured.eyebrow}
                    </p>
                    <Link
                      href={group.featured.href}
                      className="mt-3 block text-[13px] font-medium leading-snug text-ink hover:text-maroon"
                      onClick={() => setOpen(false)}
                    >
                      {group.featured.title}
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 border-t border-line pt-3">
                <Link
                  href={group.href}
                  className="text-[12px] font-semibold text-maroon hover:underline"
                  onClick={() => setOpen(false)}
                >
                  View all →
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MobileAccordion({
  group,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: {
  group: NavGroup;
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const active = groupIsActive(pathname, group);

  return (
    <div className="border-b border-line/80">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-1 py-3.5 text-left text-[15px] font-medium ${
          active ? "text-ink" : "text-ink-muted"
        }`}
      >
        {group.label}
        <ChevronDown size={16} className={`transition ${expanded ? "rotate-180" : ""}`} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-4 pl-2">
              {group.columns.map((col) => (
                <div key={col.title}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{col.title}</p>
                  <ul className="mt-2 space-y-1">
                    {col.links.map((link) => (
                      <li key={link.href + link.label}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className={`flex min-h-11 items-center py-3 text-[14px] ${
                            pathMatches(pathname, link.href) ? "font-medium text-ink" : "text-ink-muted"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/**
 * One header · three states: cinema light chrome · post-cinema / internal paper surface.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cinemaSection, setCinemaSection] = useState("home");
  const [cinemaRevealed, setCinemaRevealed] = useState(false);
  const [pastCinema, setPastCinema] = useState(!onHome);

  const overCinema = onHome && CINEMA.has(cinemaSection) && !open;
  const lightChrome = overCinema && !cinemaRevealed;
  const solidChrome = open || pastCinema || (onHome && !overCinema);
  const easeOut = [0.16, 1, 0.3, 1] as const;

  useEffect(() => {
    if (!onHome) {
      setPastCinema(true);
      setCinemaSection("home");
      return;
    }
    setPastCinema(false);

    const ratios = new Map<string, number>();
    const sectionIds = ["home", "about", "services", "invest", "intelligence", "proof", "contact"];

    const sync = () => {
      let best = "home";
      let bestRatio = -1;
      for (const id of sectionIds) {
        const ratio = ratios.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      setCinemaSection(best);
      setPastCinema(!CINEMA.has(best));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        sync();
      },
      { rootMargin: "-28% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    sync();
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!onHome || !CINEMA.has(cinemaSection)) {
      setCinemaRevealed(false);
      return;
    }
    const section = document.getElementById(cinemaSection);
    const target = section?.querySelector<HTMLElement>("[data-revealed]");
    if (!target) {
      setCinemaRevealed(false);
      return;
    }
    const sync = () => setCinemaRevealed(target.getAttribute("data-revealed") === "true");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(target, { attributes: true, attributeFilter: ["data-revealed"] });
    return () => mo.disconnect();
  }, [onHome, cinemaSection]);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  const headerClass = open
    ? "border-b border-line bg-paper"
    : solidChrome
      ? "border-b border-line/80 bg-paper/90 backdrop-blur-md"
      : "border-b border-transparent bg-transparent";

  return (
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${headerClass}`}>
      <div className="pointer-events-auto mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-4 pt-[env(safe-area-inset-top,0px)] sm:h-16 sm:px-8">
        <Link href="/" className="relative z-10 shrink-0 transition-opacity hover:opacity-80" aria-label="Home" onClick={() => setOpen(false)}>
          <BrandLogo size="nav" />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {primaryNav.map((group) => (
            <DesktopMega key={group.id} group={group} pathname={pathname} lightChrome={lightChrome && !solidChrome} />
          ))}
        </nav>

        <div className="hidden lg:block">
          <BookMeetingLink href="/strategy-session" className="btn-primary btn-sm">
            Book Strategy Session
          </BookMeetingLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm lg:hidden ${lightChrome && !solidChrome ? "text-white" : "text-ink"}`}
        >
          {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav-panel"
            key="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="pointer-events-auto h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain border-b border-line bg-paper pb-[env(safe-area-inset-bottom,0px)] sm:h-[calc(100dvh-4rem-env(safe-area-inset-top,0px))] lg:hidden"
          >
            <nav className="mx-auto flex max-w-content flex-col px-5 py-2 sm:px-8">
              {primaryNav.map((group) => (
                <MobileAccordion
                  key={group.id}
                  group={group}
                  pathname={pathname}
                  expanded={expanded === group.id}
                  onToggle={() => setExpanded((id) => (id === group.id ? null : group.id))}
                  onNavigate={() => setOpen(false)}
                />
              ))}
              <BookMeetingLink href="/strategy-session" className="btn-primary mt-4 mb-6 w-full">
                Book Strategy Session
              </BookMeetingLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
