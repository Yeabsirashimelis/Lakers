"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { IMAGES } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("hero");

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Title letter-by-letter reveal
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".hero-char");
        tl.fromTo(
          chars,
          { opacity: 0, y: 80, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.08 },
          0.5
        );
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        );
      }

      // CTA fade in
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2"
        );
      }

      // Parallax on scroll
      if (sectionRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const titleChars = t("title").split("");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero.main}
          alt="Lakers Restaurant Interior"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/40 to-midnight/80"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-heading)] text-[15vw] md:text-[10vw] lg:text-[8vw] font-bold text-warm-cream leading-none tracking-[0.15em] perspective-[1000px]"
        >
          {titleChars.map((char, i) => (
            <span key={i} className="hero-char inline-block">
              {char}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-cream/80 tracking-[0.2em] uppercase font-light opacity-0"
        >
          {t("subtitle")}
        </p>

        <div ref={ctaRef} className="mt-10 opacity-0">
          <MagneticButton href="/menu">
            {t("cta")}
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40">
          {t("scroll")}
        </span>
        <div className="w-px h-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber to-transparent animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}
