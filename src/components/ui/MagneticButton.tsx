"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const buttonClasses = cn(
    "relative inline-flex items-center justify-center px-8 py-4",
    "font-[family-name:var(--font-heading)] text-sm tracking-[0.2em] uppercase",
    "border border-amber/40 text-cream",
    "transition-all duration-500",
    "hover:border-amber hover:bg-amber/10 hover:shadow-[0_0_30px_rgba(212,165,116,0.15)]",
    className
  );

  const wrapper = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} className={buttonClasses}>
          {children}
        </Link>
      ) : (
        <motion.button
          type={type}
          onClick={onClick}
          className={buttonClasses}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.button>
      )}
    </motion.div>
  );

  return wrapper;
}
