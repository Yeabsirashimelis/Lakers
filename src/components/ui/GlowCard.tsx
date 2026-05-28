"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <motion.div
      className={cn(
        "relative group bg-charcoal border border-cream/5 overflow-hidden",
        className
      )}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-amber/5 via-transparent to-burgundy/5" />
      </div>
      {/* Border glow */}
      <div className="absolute inset-0 border border-amber/0 group-hover:border-amber/20 transition-colors duration-500 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
