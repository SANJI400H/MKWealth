"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppLinkProps {
  message: string;
  className?: string;
  children: ReactNode;
}

/** WhatsApp CTA, transform-only micro-motion when motion is allowed. */
export default function WhatsAppLink({ message, className = "", children }: WhatsAppLinkProps) {
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && className.includes("btn-primary");
  const onClick = () => trackEvent("whatsapp_click");

  if (!animated) {
    return (
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        data-cta="whatsapp"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta="whatsapp"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
    >
      {children}
    </motion.a>
  );
}
