"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number;
  priority?: boolean;
  sizes?: string;
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.3,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile || !containerRef.current || !imageRef.current) return;

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
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div ref={imageRef} className={cn("relative w-full", isMobile ? "h-full" : "h-[120%] -top-[10%]")}>
        <Image
          src={src}
          alt={alt}
          fill
          className={cn("object-cover", className)}
          sizes={sizes}
          priority={priority}
        />
      </div>
    </div>
  );
}
