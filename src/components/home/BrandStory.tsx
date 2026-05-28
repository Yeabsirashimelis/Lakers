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

      // Pin the section
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${paragraphs.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      // Fade paragraphs in/out sequentially
      paragraphs.forEach((p, i) => {
        const startProgress = i / paragraphs.length;
        const endProgress = (i + 1) / paragraphs.length;
        const midProgress = (startProgress + endProgress) / 2;

        // Fade in
        gsap.fromTo(
          p,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${startProgress * paragraphs.length * 100}% top`,
              end: `top+=${midProgress * paragraphs.length * 100}% top`,
              scrub: 1,
            },
          }
        );

        // Fade out (except last)
        if (i < paragraphs.length - 1) {
          gsap.to(p, {
            opacity: 0,
            y: -20,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${midProgress * paragraphs.length * 100}% top`,
              end: `top+=${endProgress * paragraphs.length * 100}% top`,
              scrub: 1,
            },
          });
        }
      });
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  // Mobile: simple stacked layout
  if (isMobile) {
    return (
      <section className="relative py-24 px-6 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <FadeInView>
            <span className="text-xs tracking-[0.3em] uppercase text-amber mb-4 block">
              {t("label")}
            </span>
          </FadeInView>
          <FadeInView delay={0.1}>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-warm-cream mb-12">
              {t("heading")}
            </h2>
          </FadeInView>
          {(["p1", "p2", "p3"] as const).map((key, i) => (
            <FadeInView key={key} delay={0.2 + i * 0.1}>
              <p className="text-cream/60 text-lg leading-relaxed mb-8">
                {t(key)}
              </p>
            </FadeInView>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
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

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12">
        <span className="text-xs tracking-[0.3em] uppercase text-amber mb-6">
          {t("label")}
        </span>
        <h2 className="font-[family-name:var(--font-heading)] text-5xl md:text-6xl font-bold text-warm-cream mb-16 text-center">
          {t("heading")}
        </h2>

        <div className="relative max-w-2xl text-center">
          {(["p1", "p2", "p3"] as const).map((key) => (
            <p
              key={key}
              className="story-paragraph absolute inset-0 flex items-center text-cream/70 text-xl leading-relaxed opacity-0 first:relative"
            >
              {t(key)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
