"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { galleryImages } from "@/data/gallery-images";
import { PageTransition } from "@/components/layout/PageTransition";
import { FadeInView } from "@/components/ui/FadeInView";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations("gallery_page");

  const openLightbox = (src: string, index: number) => {
    setSelectedImage(src);
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      const newIndex =
        direction === "next"
          ? (selectedIndex + 1) % galleryImages.length
          : (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedIndex(newIndex);
      setSelectedImage(galleryImages[newIndex].src);
    },
    [selectedIndex]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate("prev");
      if (e.key === "ArrowRight") navigate("next");
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeLightbox, navigate]);

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-midnight text-center">
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
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-8 pb-24 bg-midnight section-contain">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-7xl mx-auto">
          {galleryImages.map((img, i) => (
            <FadeInView key={img.id} delay={Math.min(i * 0.05, 0.4)}>
              <div
                className="group relative overflow-hidden mb-4 cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(img.src, i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.alt}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(img.src, i);
                  }
                }}
              >
                <div
                  className={`relative ${
                    img.aspect === "portrait"
                      ? "aspect-[3/4]"
                      : img.aspect === "landscape"
                      ? "aspect-[4/3]"
                      : "aspect-square"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-midnight/0 group-hover:bg-midnight/30 transition-colors duration-500" />
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[200] bg-midnight/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10 p-2"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav arrows */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
              aria-label="Previous image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
              aria-label="Next image"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              className="relative max-w-[85vw] max-h-[80vh] w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={`Gallery image ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="85vw"
                priority
              />
            </motion.div>

            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/40 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
