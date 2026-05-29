"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { IMAGES } from "@/lib/constants";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function FoodZoomTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      if (isMobile) {
        // Simpler mobile: just fade + slight scale
        gsap.fromTo(
          imageRef.current,
          { scale: 0.85, opacity: 0, borderRadius: "16px" },
          {
            scale: 1,
            opacity: 1,
            borderRadius: "0px",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
        return;
      }

      // Desktop: pin and zoom from small to fullscreen
      gsap.fromTo(
        imageRef.current,
        {
          scale: 0.5,
          borderRadius: "24px",
          opacity: 0.8,
        },
        {
          scale: 1,
          borderRadius: "0px",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        }
      );

      // Overlay text fades out as zoom completes
      if (overlayTextRef.current) {
        gsap.fromTo(
          overlayTextRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "40% top",
              scrub: 1,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden bg-midnight ${
        isMobile ? "py-12 px-6" : "h-dvh"
      }`}
    >
      {/* Zooming image */}
      <div
        ref={imageRef}
        className={`relative overflow-hidden ${
          isMobile ? "aspect-[16/9] mx-auto max-w-lg" : "absolute inset-0"
        }`}
      >
        <Image
          src={IMAGES.food.burger1}
          alt="Signature burger close-up"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-midnight/30" />
      </div>

      {/* Overlay text - desktop only */}
      {!isMobile && (
        <div
          ref={overlayTextRef}
          className="absolute inset-0 z-10 flex items-center justify-center text-center px-6"
        >
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-amber/80 block mb-4">
              Discover
            </span>
            <h2 className="font-[family-name:var(--font-heading)] text-5xl lg:text-7xl font-bold text-warm-cream">
              The Menu
            </h2>
          </div>
        </div>
      )}
    </section>
  );
}
