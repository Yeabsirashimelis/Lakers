"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { FadeInView } from "@/components/ui/FadeInView";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FOOD_ITEMS = [
  { key: "burger", image: IMAGES.food.burger1 },
  { key: "pizza", image: IMAGES.food.pizza1 },
  { key: "dessert", image: IMAGES.food.dessert1 },
  { key: "fusion", image: IMAGES.food.fusion },
] as const;

export function SignatureFoods() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("signatureFoods");
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile || !sectionRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  if (isMobile) {
    return (
      <section className="py-24 px-6 bg-midnight section-contain">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
        />
        <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
          {FOOD_ITEMS.map((item, i) => (
            <FadeInView key={item.key} delay={i * 0.1}>
              <div className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.name`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-warm-cream mb-2">
                  {t(`items.${item.key}.name`)}
                </h3>
                <p className="text-cream/50 text-sm leading-relaxed">
                  {t(`items.${item.key}.description`)}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-dvh overflow-hidden bg-midnight">
      {/* Heading overlay */}
      <div className="absolute top-12 left-0 right-0 z-10 text-center pointer-events-none">
        <span className="text-xs tracking-[0.3em] uppercase text-amber">
          {t("label")}
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold text-warm-cream mt-2">
          {t("heading")}
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 h-full flex items-center gap-8 pl-[10vw] pr-[10vw] pt-28"
      >
        {FOOD_ITEMS.map((item) => (
          <div
            key={item.key}
            className="flex-shrink-0 w-[35vw] group"
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-6">
              <Image
                src={item.image}
                alt={t(`items.${item.key}.name`)}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl text-warm-cream mb-2">
              {t(`items.${item.key}.name`)}
            </h3>
            <p className="text-cream/50 text-sm lg:text-base leading-relaxed max-w-sm">
              {t(`items.${item.key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
