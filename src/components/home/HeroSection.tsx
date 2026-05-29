"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { useTranslations } from "next-intl";
import { IMAGES } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("hero");

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const titles = sectionRef.current.querySelectorAll(".hero-title");

      if (prefersReduced) {
        gsap.set(titles, { opacity: 1, y: 0 });
        if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

      // Title reveal (both mobile & desktop h1, CSS hides the wrong one)
      tl.fromTo(
        titles,
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2 },
        0
      );

      // Subtitle fade in
      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        );
      }

      // CTA fade in
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }

      // Parallax on scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.9,
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

  return (
    <section
      ref={sectionRef}
      className="relative h-dvh w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image (fallback & mobile) */}
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

      {/* Video background for desktop — hidden on mobile via CSS, avoids hydration mismatch */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        poster={IMAGES.hero.main}
        onError={(e) => {
          // If video fails to load, hide it — background image is the fallback
          (e.target as HTMLVideoElement).style.display = "none";
        }}
      >
        <source
          src="https://videos.pexels.com/video-files/3298572/3298572-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/50 to-midnight/80"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-full">
        {/* Mobile title — plain text */}
        <h1
          className="hero-title md:hidden font-[family-name:var(--font-heading)] text-[14vw] font-bold text-warm-cream leading-none tracking-[0.15em] opacity-0"
        >
          {t("title")}
        </h1>

        {/* Desktop title — text-masked with food image */}
        <div className="relative hidden md:block">
          <h1
            className="hero-title font-[family-name:var(--font-heading)] text-[12vw] lg:text-[10vw] font-bold leading-none tracking-[0.15em] text-mask-video opacity-0"
            style={{
              backgroundImage: `url(${IMAGES.hero.burger})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {t("title")}
          </h1>
          {/* Subtle outline for depth */}
          <h1
            className="absolute inset-0 font-[family-name:var(--font-heading)] text-[12vw] lg:text-[10vw] font-bold leading-none tracking-[0.15em] pointer-events-none"
            style={{
              WebkitTextStroke: "1px rgba(212, 165, 116, 0.15)",
              color: "transparent",
            }}
            aria-hidden="true"
          >
            {t("title")}
          </h1>
        </div>

        <p
          ref={subtitleRef}
          className="mt-6 text-base md:text-lg lg:text-xl text-cream/80 tracking-[0.15em] uppercase font-light opacity-0"
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
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40 hidden md:block">
          {t("scroll")}
        </span>
        <div className="w-px h-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber to-transparent animate-scroll-indicator" />
        </div>
      </motion.div>
    </section>
  );
}
