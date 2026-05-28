"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.3,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      gsap.fromTo(
        imageRef.current,
        { y: -50 * speed },
        {
          y: 50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={priority}
        />
      </div>
    </div>
  );
}
