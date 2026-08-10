"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

interface BookMeetingLinkProps {
  className?: string;
  children?: ReactNode;
}

/** Calendly scheduling CTA for Book a Meeting. */
export default function BookMeetingLink({
  className = "",
  children = "Book a Meeting",
}: BookMeetingLinkProps) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && className.includes("btn-primary");

  if (!animated) {
    return (
      <a
        href={siteConfig.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-cta="calendly"
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={siteConfig.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta="calendly"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.a>
  );
}
