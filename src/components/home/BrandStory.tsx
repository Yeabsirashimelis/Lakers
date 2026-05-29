"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { FadeInView } from "@/components/ui/FadeInView";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("brandStory");
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile || !sectionRef.current) return;

      const paragraphs = sectionRef.current.querySelectorAll(".story-paragraph");
      const scrollLength = paragraphs.length * 100;

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollLength}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      paragraphs.forEach((p, i) => {
        const startProgress = i / paragraphs.length;
        const endProgress = (i + 1) / paragraphs.length;
        const midProgress = (startProgress + endProgress) / 2;

        gsap.fromTo(
          p,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startProgress * scrollLength}% top`,
              end: `top+=${midProgress * scrollLength}% top`,
              scrub: 1,
            },
          }
        );

        if (i < paragraphs.length - 1) {
          gsap.to(p, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${midProgress * scrollLength}% top`,
              end: `top+=${endProgress * scrollLength}% top`,
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // Both mobile and desktop use same structure, just different styling
  return (
    <section
      ref={isMobile ? undefined : sectionRef}
      className={isMobile ? "relative py-24 px-6 bg-charcoal section-contain" : "relative h-dvh w-full overflow-hidden"}
    >
      {/* Background image - desktop only */}
      {!isMobile && (
        <div className="absolute inset-0">
          <Image
            src={IMAGES.atmosphere.interior1}
            alt="Lakers interior"
            fill
            className="object-cover opacity-20"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/90" />
        </div>
      )}

      <div className={
        isMobile
          ? "max-w-3xl mx-auto text-center"
          : "relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12"
      }>
        <FadeInView>
          <span className="text-xs tracking-[0.3em] uppercase text-amber mb-4 md:mb-6 block">
            {t("label")}
          </span>
        </FadeInView>
        <FadeInView delay={0.1}>
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl lg:text-6xl font-bold text-warm-cream mb-8 md:mb-16 text-center">
            {t("heading")}
          </h2>
        </FadeInView>

        {isMobile ? (
          // Mobile: stacked paragraphs
          (["p1", "p2", "p3"] as const).map((key, i) => (
            <FadeInView key={key} delay={0.2 + i * 0.1}>
              <p className="text-cream/60 text-base leading-relaxed mb-6">
                {t(key)}
              </p>
            </FadeInView>
          ))
        ) : (
          // Desktop: animated paragraphs
          <div className="relative max-w-2xl text-center min-h-[120px]">
            {(["p1", "p2", "p3"] as const).map((key, i) => (
              <p
                key={key}
                className={`story-paragraph text-cream/70 text-xl leading-relaxed ${
                  i === 0 ? "relative" : "absolute inset-0 flex items-center"
                } opacity-0`}
              >
                {t(key)}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
