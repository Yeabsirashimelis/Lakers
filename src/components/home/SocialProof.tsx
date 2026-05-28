"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const TESTIMONIAL_KEYS = ["t1", "t2", "t3"] as const;

export function SocialProof() {
  const [current, setCurrent] = useState(0);
  const t = useTranslations("social");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIAL_KEYS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
        />

        {/* Instagram grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-24">
          {IMAGES.social.map((src, i) => (
            <FadeInView key={i} delay={i * 0.08}>
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
                    className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative h-48 md:h-40">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <p className="font-[family-name:var(--font-heading)] text-xl md:text-2xl text-warm-cream italic mb-6 leading-relaxed">
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-amber w-6" : "bg-cream/20"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
