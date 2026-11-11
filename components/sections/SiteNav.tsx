"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import BrandLogo from "@/components/ui/BrandLogo";
import { subscribeNavVideo } from "@/components/motion/navPlayback";
import {
  groupIsActive,
  pathMatches,
  primaryNav,
  type NavGroup,
} from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";

function DesktopMega({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
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

  const reduceMotion = useReducedMotion();
  const linkTone = "text-ink-muted hover:text-ink";
  const activeTone = "text-ink";
  const multi = group.columns.length > 1 || Boolean(group.featured);
  const itemEase = [0.16, 1, 0.3, 1] as const;
  const childHrefs = group.columns.flatMap((col) => col.links.map((link) => link.href));
  const showViewAll = !childHrefs.includes(group.href);

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
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          className={`transition duration-300 ease-out ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-label={`${group.label} menu`}
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.98 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32, mass: 0.7 }
            }
            style={{ transformOrigin: "top left" }}
            className="absolute left-0 top-full z-50 pt-2"
            onMouseEnter={clearClose}
            onMouseLeave={scheduleClose}
          >
            <div
              className={`rounded-2xl border border-white/80 bg-white/75 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.1)] backdrop-blur-2xl ${
                multi ? "min-w-[28rem] px-6" : "min-w-[16rem] px-5"
              }`}
            >
              <div className={`grid gap-8 ${multi ? "sm:grid-cols-[1fr_1fr_auto]" : ""}`}>
                {group.columns.map((col) => (
                  <div key={col.title}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{col.title}</p>
                    <motion.ul
                      className="mt-3 space-y-0.5"
                      initial={reduceMotion ? false : "hidden"}
                      animate="show"
                      variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
                      }}
                    >
                      {col.links.map((link) => (
                        <motion.li
                          key={link.href + link.label}
                          variants={
                            reduceMotion
                              ? undefined
                              : {
                                  hidden: { opacity: 0, y: 8 },
                                  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: itemEase } },
                                }
                          }
                        >
                          <Link
                            href={link.href}
                            className="block rounded-lg px-2 py-2 transition duration-200 hover:bg-ink/[0.04]"
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
                        </motion.li>
                      ))}
                    </motion.ul>
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
              {showViewAll ? (
                <div className="mt-4 border-t border-line pt-3">
                  <Link
                    href={group.href}
                    className="text-[12px] font-semibold text-maroon hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    View all →
                  </Link>
                </div>
              ) : null}
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
  const reduceMotion = useReducedMotion();
  const itemEase = [0.16, 1, 0.3, 1] as const;

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
        <ChevronDown
          size={16}
          className={`transition duration-300 ease-out ${expanded ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.38, ease: itemEase }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pb-4 pl-2">
              {group.columns.map((col) => (
                <div key={col.title}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{col.title}</p>
                  <motion.ul
                    className="mt-1"
                    initial={reduceMotion ? false : "hidden"}
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.035 } },
                    }}
                  >
                    {col.links.map((link) => (
                      <motion.li
                        key={link.href + link.label}
                        variants={
                          reduceMotion
                            ? undefined
                            : {
                                hidden: { opacity: 0, x: -8 },
                                show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: itemEase } },
                              }
                        }
                      >
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className={`flex min-h-11 items-center py-3 text-[14px] transition-colors ${
                            pathMatches(pathname, link.href) ? "font-medium text-ink" : "text-ink-muted"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/** Fixed header. Clears while a cinema video is playing, then returns to paper. */
export default function SiteNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(pathname === "/");

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
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => subscribeNavVideo(setVideoPlaying), []);

  const clearBar = videoPlaying && !open;
  const headerClass = clearBar
    ? "border-b border-transparent bg-transparent"
    : "border-b border-line bg-paper";

  return (
    <header className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-colors duration-700 ${headerClass}`}>
      <div className="pointer-events-auto mx-auto flex h-14 max-w-content items-center justify-between gap-3 px-5 pt-[env(safe-area-inset-top,0px)] sm:h-16 sm:px-8">
        <div className="relative z-10 flex shrink-0 items-center gap-4">
          <Link href="/" className="transition-opacity hover:opacity-80" aria-label="Home" onClick={() => setOpen(false)}>
            <BrandLogo size="nav" />
          </Link>
          <Link
            href="/about-huspy"
            aria-label="In partnership with Huspy"
            className="flex items-center gap-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-ink-muted hover:text-maroon sm:text-[11px] sm:tracking-[0.12em]"
          >
            <span className="hidden sm:inline">In partnership with</span>
            <img
              src="/images/logos/huspy.svg"
              alt=""
              className="h-3.5 w-auto sm:h-4"
            />
          </Link>
        </div>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          {primaryNav.map((group) => (
            <DesktopMega key={group.id} group={group} pathname={pathname} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={siteConfig.clientPortalUrl} className="text-[11px] font-medium text-ink-muted hover:text-ink">
            Client login
          </a>
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
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-ink lg:hidden"
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
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={
              reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34, mass: 0.8 }
            }
            className="pointer-events-auto h-[calc(100dvh-3.5rem-env(safe-area-inset-top,0px))] overflow-y-auto overscroll-contain border-b border-line bg-paper pb-[env(safe-area-inset-bottom,0px)] sm:h-[calc(100dvh-4rem-env(safe-area-inset-top,0px))] lg:hidden"
          >
            <nav className="mx-auto flex max-w-content flex-col px-5 py-2 sm:px-8">
              <Link href="/about-huspy" className="flex items-center gap-3 py-3 text-sm font-semibold text-ink" onClick={() => setOpen(false)}>
                In partnership with
                <img src="/images/logos/huspy.svg" alt="" className="h-4 w-auto" />
              </Link>
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
              <a
                href={siteConfig.clientPortalUrl}
                className="mt-4 text-sm font-medium text-ink-muted"
                onClick={() => setOpen(false)}
              >
                Client login
              </a>
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
