"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

type CursorVariant = "default" | "hover" | "text" | "view";

export function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [visible, setVisible] = useState(false);
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing dot springs — must be called unconditionally (Rules of Hooks)
  const trailX = useSpring(mouseX, { damping: 40, stiffness: 200 });
  const trailY = useSpring(mouseY, { damping: 40, stiffness: 200 });

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest("a, button, [role='button'], [data-cursor]");

      if (!el) {
        setVariant("default");
        return;
      }

      const cursorType = el.getAttribute("data-cursor");
      if (cursorType === "view") {
        setVariant("view");
      } else if (cursorType === "text") {
        setVariant("text");
      } else {
        setVariant("hover");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile, mouseX, mouseY, visible]);

  // Render nothing on mobile, but hooks above still run (Rules of Hooks safe)
  if (isMobile) return null;

  const sizes: Record<CursorVariant, number> = {
    default: 12,
    hover: 40,
    text: 80,
    view: 80,
  };

  const size = sizes[variant];

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.3, ease: "easeOut" },
          height: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full border flex items-center justify-center"
          style={{
            backgroundColor:
              variant === "default" ? "rgba(212, 165, 116, 0.9)" : "transparent",
            borderColor:
              variant === "default" ? "transparent" : "rgba(212, 165, 116, 0.6)",
          }}
        >
          {variant === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] tracking-[0.15em] uppercase text-amber font-medium"
            >
              View
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 rounded-full bg-amber/40 pointer-events-none z-[9997]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible && variant === "default" ? 0.6 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      />
    </>
  );
}
