"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
  priority?: boolean;
  sizes?: string;
}

const clipPaths: Record<string, { from: string; to: string }> = {
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  top: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
  bottom: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
};

export function ImageReveal({
  src,
  alt,
  className,
  containerClassName,
  direction = "left",
  delay = 0,
  duration = 1.2,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        gsap.set(containerRef.current, { clipPath: clipPaths[direction].to });
        return;
      }

      gsap.fromTo(
        containerRef.current,
        { clipPath: clipPaths[direction].from },
        {
          clipPath: clipPaths[direction].to,
          duration,
          delay,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
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
      <Image
        src={src}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
