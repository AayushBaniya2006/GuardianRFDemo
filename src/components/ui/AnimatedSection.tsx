"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

type Variant = "fade-up" | "fade-in" | "fade-left" | "clip-reveal";

type VariantDef = {
  initial: Record<string, string | number>;
  whileInView: Record<string, string | number>;
};

const variantMap: Record<Variant, VariantDef> = {
  "fade-up": {
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
  },
  "fade-in": {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  "fade-left": {
    initial: { opacity: 0, x: 24 },
    whileInView: { opacity: 1, x: 0 },
  },
  "clip-reveal": {
    initial: { clipPath: "inset(0% 0% 100% 0%)", opacity: 1 },
    whileInView: { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 },
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
      viewport={{ once: true, margin: "0px 0px -15% 0px", amount: 0.05 }}
      transition={{
        duration: 0.3,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Parallax wrapper — shifts Y position based on scroll progress */
export function ParallaxSection({
  children,
  className = "",
  offset = 40,
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
