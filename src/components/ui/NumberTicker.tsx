"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

export default function NumberTicker({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30, // Reduced damping for faster convergence
    stiffness: 80, // Reduced stiffness to match damping
  });
  const display = useTransform(springValue, (current: number) => 
    Math.round(current).toLocaleString('en-IN')
  );
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}
