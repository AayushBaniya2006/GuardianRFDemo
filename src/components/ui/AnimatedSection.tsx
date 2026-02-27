"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Variant = "fade-up" | "fade-in";

const variantMap: Record<Variant, { initial: Record<string, number>; whileInView: Record<string, number> }> = {
  "fade-up": {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
};

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: Props) {
  const v = variantMap[variant];

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
