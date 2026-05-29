"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface FadeInViewProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "span";
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeInView({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  distance,
  once = true,
  as = "div",
}: FadeInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  const offset = directionMap[direction];
  const x = distance !== undefined ? (offset.x > 0 ? distance : offset.x < 0 ? -distance : 0) : offset.x;
  const y = distance !== undefined ? (offset.y > 0 ? distance : offset.y < 0 ? -distance : 0) : offset.y;

  const MotionComponent = motion[as];

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </MotionComponent>
  );
}
