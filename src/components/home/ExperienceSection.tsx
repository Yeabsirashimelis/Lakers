"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EXPERIENCE_IMAGES = [
  { src: IMAGES.atmosphere.interior1, alt: "Lakers interior" },
  { src: IMAGES.atmosphere.interior2, alt: "Lakers ambiance" },
  { src: IMAGES.atmosphere.people1, alt: "Guests enjoying" },
  { src: IMAGES.atmosphere.ambiance, alt: "Lakers atmosphere" },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("experience");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const images = sectionRef.current.querySelectorAll(".exp-image");

      images.forEach((img, i) => {
        if (prefersReduced) {
          gsap.set(img, { clipPath: "inset(0 0% 0 0%)" });
          return;
        }

        const fromClip = i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";

        gsap.fromTo(
          img,
          { clipPath: fromClip },
          {
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-12 bg-charcoal section-contain">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label={t("label")}
          heading={t("heading")}
          subtitle={t("description")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {EXPERIENCE_IMAGES.map((img, i) => (
            <div
              key={i}
              className="exp-image relative aspect-[4/3] overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-midnight/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
