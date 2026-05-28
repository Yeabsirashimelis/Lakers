"use client";

import { FadeInView } from "./FadeInView";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  heading: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  heading,
  subtitle,
  className,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <FadeInView delay={0}>
          <span
            className={cn(
              "inline-block text-xs tracking-[0.3em] uppercase mb-4",
              light ? "text-amber" : "text-amber"
            )}
          >
            {label}
          </span>
        </FadeInView>
      )}
      <FadeInView delay={0.1}>
        <h2
          className={cn(
            "font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold leading-tight",
            light ? "text-warm-cream" : "text-warm-cream"
          )}
        >
          {heading}
        </h2>
      </FadeInView>
      {subtitle && (
        <FadeInView delay={0.2}>
          <p
            className={cn(
              "mt-6 text-lg max-w-2xl leading-relaxed",
              align === "center" && "mx-auto",
              light ? "text-cream/70" : "text-cream/60"
            )}
          >
            {subtitle}
          </p>
        </FadeInView>
      )}
    </div>
  );
}
