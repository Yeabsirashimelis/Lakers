"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"] as const;

export function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations("social");

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIAL_KEYS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal section-contain">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
        />

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-16 md:mb-24">
          {IMAGES.social.map((src, i) => (
            <FadeInView key={i} delay={Math.min(i * 0.08, 0.4)}>
              <div className="group relative aspect-square overflow-hidden cursor-pointer">
                <Image
                  src={src}
                  alt={`Lakers moment ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/40 transition-colors duration-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                  </svg>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div
          className="max-w-2xl mx-auto text-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          role="region"
          aria-label="Customer testimonials"
          aria-live="polite"
        >
          <div className="relative min-h-[160px] md:min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <p className="font-[family-name:var(--font-heading)] text-lg md:text-xl lg:text-2xl text-warm-cream italic mb-6 leading-relaxed px-4">
                  &ldquo;{t(`testimonials.${TESTIMONIAL_KEYS[current]}.quote`)}&rdquo;
                </p>
                <p className="text-amber text-sm tracking-[0.1em]">
                  {t(`testimonials.${TESTIMONIAL_KEYS[current]}.name`)}
                </p>
                <p className="text-cream/40 text-xs tracking-[0.15em] uppercase mt-1">
                  {t(`testimonials.${TESTIMONIAL_KEYS[current]}.role`)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {TESTIMONIAL_KEYS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-amber w-6" : "bg-cream/20 w-2"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
