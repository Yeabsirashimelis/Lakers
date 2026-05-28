"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import Image from "next/image";

const STEPS = ["source", "craft", "serve"] as const;

export function ChefSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("chef");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const steps = sectionRef.current.querySelectorAll(".chef-step");
      const lines = sectionRef.current.querySelectorAll(".chef-line");

      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });

      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15 + 0.3,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-espresso/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeInView>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={IMAGES.team.chef}
                alt="Chef at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/40 to-transparent" />
            </div>
          </FadeInView>

          {/* Content */}
          <div>
            <FadeInView>
              <span className="text-xs tracking-[0.3em] uppercase text-amber mb-4 block">
                {t("label")}
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-warm-cream mb-12">
                {t("heading")}
              </h2>
            </FadeInView>

            <div className="space-y-0">
              {STEPS.map((step, i) => (
                <div key={step}>
                  <div className="chef-step flex items-start gap-6 py-6">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full border border-amber/40 flex items-center justify-center text-amber text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] text-xl text-warm-cream mb-2">
                        {t(`steps.${step}.title`)}
                      </h3>
                      <p className="text-cream/50 text-sm leading-relaxed">
                        {t(`steps.${step}.description`)}
                      </p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="chef-line ml-5 w-px h-8 bg-amber/20 origin-top" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
