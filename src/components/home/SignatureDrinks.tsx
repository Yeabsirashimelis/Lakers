"use client";

import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SignatureDrinks() {
  const t = useTranslations("signatureDrinks");

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-midnight section-contain">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
        />

        {/* Coffee row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-16 md:mb-24">
          <ParallaxImage
            src={IMAGES.drinks.coffee1}
            alt={t("coffee.name")}
            containerClassName="aspect-[3/4] md:aspect-[4/5]"
            speed={0.3}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <FadeInView direction="right" delay={0.2}>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl lg:text-4xl text-warm-cream mb-4">
                {t("coffee.name")}
              </h3>
              <p className="text-cream/50 text-base md:text-lg leading-relaxed">
                {t("coffee.description")}
              </p>
              <div className="mt-6 w-16 h-px bg-amber/40" />
            </div>
          </FadeInView>
        </div>

        {/* Mocktail row (reversed on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <FadeInView direction="left" delay={0.2} className="order-2 md:order-1">
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl lg:text-4xl text-warm-cream mb-4">
                {t("mocktail.name")}
              </h3>
              <p className="text-cream/50 text-base md:text-lg leading-relaxed">
                {t("mocktail.description")}
              </p>
              <div className="mt-6 w-16 h-px bg-amber/40" />
            </div>
          </FadeInView>
          <div className="order-1 md:order-2">
            <ParallaxImage
              src={IMAGES.drinks.mocktail1}
              alt={t("mocktail.name")}
              containerClassName="aspect-[3/4] md:aspect-[4/5]"
              speed={0.3}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
