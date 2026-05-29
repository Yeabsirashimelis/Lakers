"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { IMAGES } from "@/lib/constants";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeInView } from "@/components/ui/FadeInView";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { useIsMobile } from "@/hooks/useMediaQuery";

const TIMELINE_KEYS = ["e1", "e2", "e3", "e4", "e5"] as const;
const TEAM_KEYS = ["m1", "m2", "m3"] as const;
const TEAM_IMAGES = [IMAGES.team.chef, IMAGES.team.barista, IMAGES.team.founder];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("about_page");
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (!timelineRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const items = timelineRef.current.querySelectorAll(".timeline-item");
      const line = timelineRef.current.querySelector(".timeline-line-fill");

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: timelineRef, dependencies: [isMobile] }
  );

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={IMAGES.atmosphere.interior2}
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

      {/* Philosophy */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal section-contain">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ParallaxImage
            src={IMAGES.atmosphere.ambiance}
            alt={t("philosophy.heading")}
            containerClassName="aspect-[4/5]"
            speed={0.2}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div>
            <FadeInView>
              <span className="text-xs tracking-[0.3em] uppercase text-amber mb-4 block">
                {t("philosophy.label")}
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold text-warm-cream mb-8">
                {t("philosophy.heading")}
              </h2>
            </FadeInView>
            <FadeInView delay={0.1}>
              <p className="text-cream/60 text-base md:text-lg leading-relaxed mb-6">
                {t("philosophy.p1")}
              </p>
            </FadeInView>
            <FadeInView delay={0.2}>
              <p className="text-cream/60 text-base md:text-lg leading-relaxed">
                {t("philosophy.p2")}
              </p>
            </FadeInView>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-midnight section-contain">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            label={t("timeline.label")}
            heading={t("timeline.heading")}
          />

          <div ref={timelineRef} className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-cream/10 md:-translate-x-1/2">
              <div className="timeline-line-fill absolute inset-0 w-full bg-amber/40 origin-top" />
            </div>

            {TIMELINE_KEYS.map((key, i) => (
              <div
                key={key}
                className={`timeline-item relative flex items-start gap-8 ${
                  i < TIMELINE_KEYS.length - 1 ? "mb-12 md:mb-16" : ""
                } ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-amber border-2 border-midnight -translate-x-1/2 mt-2 z-10" />

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <span className="text-amber font-[family-name:var(--font-heading)] text-xl md:text-2xl">
                    {t(`timeline.events.${key}.year`)}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl text-warm-cream mt-2 mb-2">
                    {t(`timeline.events.${key}.title`)}
                  </h3>
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {t(`timeline.events.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-charcoal section-contain">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label={t("team.label")}
            heading={t("team.heading")}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {TEAM_KEYS.map((key, i) => (
              <FadeInView key={key} delay={Math.min(i * 0.15, 0.3)}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden mb-6">
                    <Image
                      src={TEAM_IMAGES[i]}
                      alt={t(`team.members.${key}.name`)}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-midnight/20 group-hover:bg-midnight/0 transition-colors duration-500" />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg md:text-xl text-warm-cream mb-1">
                    {t(`team.members.${key}.name`)}
                  </h3>
                  <p className="text-amber text-xs tracking-[0.15em] uppercase mb-3">
                    {t(`team.members.${key}.role`)}
                  </p>
                  <p className="text-cream/40 text-sm leading-relaxed">
                    {t(`team.members.${key}.description`)}
                  </p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
