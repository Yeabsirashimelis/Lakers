"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { menuItems } from "@/data/menu-items";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/ui/FadeInView";
import { GlowCard } from "@/components/ui/GlowCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { IMAGES } from "@/lib/constants";

const CATEGORIES = [
  "all",
  "burgers",
  "pizzas",
  "coffee",
  "mocktails",
  "desserts",
  "brunch",
  "fusion",
] as const;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const t = useTranslations("menu_page");

  const filtered =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.food.burger1}
            alt={t("title")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-midnight/70" />
        </div>
        <div className="relative z-10 text-center px-6">
          <FadeInView>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-7xl font-bold text-warm-cream tracking-[0.1em]">
              {t("title")}
            </h1>
          </FadeInView>
          <FadeInView delay={0.2}>
            <p className="mt-4 text-cream/60 text-base md:text-lg max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Categories + Grid */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-midnight section-contain">
        <div className="max-w-7xl mx-auto">
          {/* Category tabs - horizontal scroll on mobile */}
          <div className="flex gap-2 md:gap-3 mb-16 overflow-x-auto pb-4 md:pb-0 md:flex-wrap md:justify-center scrollbar-none -mx-6 px-6 md:mx-0 md:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 md:px-5 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-300 flex-shrink-0"
              >
                <span
                  className={
                    activeCategory === cat
                      ? "text-amber"
                      : "text-cream/50 hover:text-cream"
                  }
                >
                  {t(`categories.${cat}`)}
                </span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="menu-tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-amber"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                >
                  <GlowCard>
                    <div className="group">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.nameKey}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent" />
                      </div>
                      <div className="p-5 md:p-6">
                        <div className="flex items-start justify-between mb-2 gap-3">
                          <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl text-warm-cream">
                            {item.nameKey}
                          </h3>
                          <span className="text-amber text-sm tracking-wider flex-shrink-0">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-cream/40 text-sm leading-relaxed">
                          {item.descriptionKey}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
