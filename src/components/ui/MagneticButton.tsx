"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center justify-center px-8 py-4",
          "font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] uppercase",
          "border border-amber/40 text-cream",
          "transition-all duration-500",
          "hover:border-amber hover:bg-amber/10 hover:shadow-[0_0_30px_rgba(212,165,116,0.15)]",
          "before:absolute before:inset-0 before:bg-amber/5 before:opacity-0 before:transition-opacity before:duration-500",
          "hover:before:opacity-100",
          className
        )}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </Component>
    </motion.div>
  );
}
