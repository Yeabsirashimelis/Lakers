"use client";

import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Divider } from "@/components/ui/Divider";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export function ReservationCTA() {
  const t = useTranslations("reservation");

  return (
    <section className="relative h-[60vh] md:h-[70vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <ParallaxImage
        src={IMAGES.reservation}
        alt="Lakers atmosphere"
        containerClassName="absolute inset-0"
        speed={0.2}
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-midnight/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <FadeInView>
          <span className="text-xs tracking-[0.3em] uppercase text-amber mb-4 block">
            {t("label")}
          </span>
        </FadeInView>

        <FadeInView delay={0.1}>
          <Divider className="mb-8" />
        </FadeInView>

        <FadeInView delay={0.2}>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-bold text-warm-cream mb-6">
            {t("heading")}
          </h2>
        </FadeInView>

        <FadeInView delay={0.3}>
          <p className="text-cream/60 text-base md:text-lg mb-10 max-w-md mx-auto">
            {t("description")}
          </p>
        </FadeInView>

        <FadeInView delay={0.4}>
          <MagneticButton href="/contact">
            {t("cta")}
          </MagneticButton>
        </FadeInView>
      </div>
    </section>
  );
}
