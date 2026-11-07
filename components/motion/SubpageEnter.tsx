"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/** Quiet settle-in for every route except the homepage cinema. */
export default function SubpageEnter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const still = pathname === "/" || reduceMotion;

  if (still) return children;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0.86 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease }}
    >
      {children}
    </motion.div>
  );
}
