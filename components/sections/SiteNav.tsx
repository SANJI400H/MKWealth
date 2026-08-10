"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import BookMeetingLink from "@/components/ui/BookMeetingLink";
import { siteConfig } from "@/lib/site-config";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "invest", label: "Invest" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
] as const;

const CINEMA = new Set(["home", "about", "services"]);

/**
 * Transparent cinema chrome — no bar fill; mobile drawer stays solid when open.
 */
export default function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const overCinema = onHome && CINEMA.has(active) && !open;

  useEffect(() => {
    if (!onHome) return;

    const ratios = new Map<string, number>();

    const sync = () => {
      let best = "home";
      let bestRatio = -1;
      for (const link of links) {
        const ratio = ratios.get(link.id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = link.id;
        }
      }
      setActive(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        sync();
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    for (const link of links) {
      const el = document.getElementById(link.id);
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

  const goToSection = (id: string) => {
    setOpen(false);
    if (!onHome) {
      window.location.href = `/#${id}`;
      return;
    }
    // Cinema controller handles snap + final-frame presentation for home/about/services.
    window.dispatchEvent(new CustomEvent("cinema:goto", { detail: { id } }));
    if (!CINEMA.has(id)) {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    }
    setActive(id);
  };

  const linkTone = "text-ink-muted hover:text-ink";
  const activeTone = "text-ink";
  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        open ? "border-b border-line bg-paper" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="pointer-events-auto mx-auto flex h-14 max-w-content items-center justify-between gap-4 px-4 pt-[env(safe-area-inset-top,0px)] sm:h-16 sm:px-8">
        <button
          type="button"
          onClick={() => goToSection("home")}
          className="shrink-0 font-display text-[13px] font-semibold tracking-[-0.02em] text-gold transition-opacity hover:opacity-80"
        >
          {siteConfig.name}
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className={`px-3 py-2 text-[12px] font-medium tracking-[-0.01em] transition-colors ${
                active === link.id && onHome ? activeTone : linkTone
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <BookMeetingLink className="btn-primary !px-5 !py-2.5 text-[12px]" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className={`rounded-sm p-1.5 lg:hidden ${overCinema ? "text-white" : "text-ink"}`}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
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
            className="pointer-events-auto border-b border-line bg-paper lg:hidden"
          >
            <nav className="mx-auto flex max-w-content flex-col px-5 py-3 sm:px-8">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className={`px-1 py-3 text-left text-[15px] font-medium tracking-[-0.01em] transition-colors ${
                    active === link.id && onHome ? "text-ink" : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <BookMeetingLink className="btn-primary mt-2 w-full" />
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
