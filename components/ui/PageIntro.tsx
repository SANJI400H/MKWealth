"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easePremium = [0.16, 1, 0.3, 1] as const;

/** Page-enter motion for editorial title + lead. */
export default function PageIntro({
  title,
  lead,
  children,
}: {
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="scroll-mt-[calc(3.5rem+env(safe-area-inset-top,0px)+3.75rem)] sm:scroll-mt-[calc(4rem+env(safe-area-inset-top,0px)+4rem)]">
      <motion.h1
        className="page-h1"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easePremium }}
      >
        {title}
      </motion.h1>
      {lead ? (
        <motion.p
          className="page-lead"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.1, ease: easePremium }}
        >
          {lead}
        </motion.p>
      ) : null}
      {children ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.16, ease: easePremium }}
        >
          {children}
        </motion.div>
      ) : null}
    </section>
  );
}
