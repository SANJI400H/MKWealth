"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Apple-style scroll zoom: the frame stays still, the picture eases larger as it
 * reaches the middle of the viewport, then settles back.
 */
export default function ScrollZoom({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="relative h-full w-full" style={reduceMotion ? undefined : { scale, y }}>
        {children}
      </motion.div>
    </div>
  );
}
