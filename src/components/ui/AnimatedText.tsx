"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { splitGraphemes, splitWords } from "@/lib/text-utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "fadeUp" | "splitWord" | "splitChar";
  delay?: number;
  once?: boolean;
  staggerDelay?: number;
}

export function AnimatedText({
  text,
  className,
  as: Tag = "p",
  animation = "fadeUp",
  delay = 0,
  once = true,
  staggerDelay,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-40px" });

  if (animation === "fadeUp") {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <Tag className={cn(className)}>{text}</Tag>
      </motion.div>
    );
  }

  if (animation === "splitWord") {
    const words = splitWords(text);
    const stagger = staggerDelay ?? 0.08;
    return (
      <Tag ref={ref} className={cn(className)}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ marginRight: "0.3em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    );
  }

  // splitChar - use grapheme-safe splitting
  const chars = splitGraphemes(text);
  const stagger = staggerDelay ?? 0.03;
  return (
    <Tag ref={ref} className={cn(className)}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 0.5,
            delay: delay + i * stagger,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
