"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

interface BookMeetingLinkProps {
  className?: string;
  children?: ReactNode;
  /** Override destination (e.g. /strategy-session briefing page). Defaults to live booking URL. */
  href?: string;
}

/** Strategy session CTA. Calendar by default; pass href for in-site briefing. */
export default function BookMeetingLink({
  className = "",
  children = siteConfig.cta.strategySession,
  href,
}: BookMeetingLinkProps) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && className.includes("btn-primary");
  const target = href ?? siteConfig.bookingUrl;
  const external = target.startsWith("http");

  const onClick = () => {
    // Only fire Schedule-intent when opening a live calendar URL.
    // In-site /strategy-session is a request form, not a booked slot.
    trackEvent("book_session_click", {
      cta: "strategy_session",
      destination: external ? "calendar" : "request_page",
    });
  };

  const shared = {
    className,
    "data-cta": "strategy-session" as const,
    onClick,
    ...(external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  };

  if (!animated) {
    return (
      <a href={target} {...shared}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={target}
      {...shared}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.a>
  );
}
