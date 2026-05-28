"use client";

import { useState } from "react";
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

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  const navigate = (direction: "prev" | "next") => {
    const newIndex =
      direction === "next"
        ? (selectedIndex + 1) % galleryImages.length
        : (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(galleryImages[newIndex].src);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-midnight text-center">
        <FadeInView>
          <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl font-bold text-warm-cream tracking-[0.1em]">
            {t("title")}
          </h1>
        </FadeInView>
        <FadeInView delay={0.2}>
          <p className="mt-4 text-cream/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </FadeInView>
      </section>

      {/* Masonry Grid */}
      <section className="px-4 md:px-8 pb-24 bg-midnight">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 max-w-7xl mx-auto">
          {galleryImages.map((img, i) => (
            <FadeInView key={img.id} delay={i * 0.05}>
              <div
                className="group relative overflow-hidden mb-4 cursor-pointer break-inside-avoid"
                onClick={() => openLightbox(img.src, i)}
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-cream/60 hover:text-cream transition-colors z-10"
              onClick={closeLightbox}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Nav arrows */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("prev");
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation();
                navigate("next");
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                alt="Gallery image"
                fill
                className="object-contain"
                sizes="85vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
