"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { splitGraphemes } from "@/lib/text-utils";

export function IntroLoader({ children }: { children: React.ReactNode }) {
  const [isComplete, setIsComplete] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const chars = splitGraphemes("LAKERS");

  useGSAP(
    () => {
      if (!loaderRef.current || !textRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setIsComplete(true);
        return;
      }

      const charElements = textRef.current.querySelectorAll(".intro-char");
      const line = loaderRef.current.querySelector(".intro-line");

      const tl = gsap.timeline({
        onComplete: () => setIsComplete(true),
      });

      // Line draws in
      if (line) {
        tl.fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          0
        );
      }

      // Characters reveal staggered
      tl.fromTo(
        charElements,
        { opacity: 0, y: 60, rotateX: -80 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.3
      );

      // Hold for a moment
      tl.to({}, { duration: 0.5 });

      // Fade everything out
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });
    },
    { scope: loaderRef }
  );

  return (
    <>
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            ref={loaderRef}
            className="fixed inset-0 z-[10000] bg-midnight flex flex-col items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Decorative line */}
            <div className="intro-line w-16 h-px bg-amber/60 mb-8 origin-center" style={{ transform: "scaleX(0)" }} />

            {/* LAKERS text */}
            <h1
              ref={textRef}
              className="font-[family-name:var(--font-heading)] text-[14vw] md:text-[8vw] font-bold text-warm-cream tracking-[0.2em] leading-none"
              style={{ perspective: "600px" }}
            >
              {chars.map((char, i) => (
                <span
                  key={i}
                  className="intro-char inline-block opacity-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Subtle tagline */}
            <motion.p
              className="mt-6 text-[10px] md:text-xs tracking-[0.4em] uppercase text-cream/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Bole, Addis Ababa
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content - visible after loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
