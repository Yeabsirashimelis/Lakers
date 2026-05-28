import { IMAGES } from "@/lib/constants";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
}

export const galleryImages: GalleryImage[] = IMAGES.gallery.map((src, i) => ({
  id: `g${i + 1}`,
  src,
  alt: `Lakers gallery image ${i + 1}`,
  aspect: i % 3 === 0 ? "portrait" : i % 3 === 1 ? "landscape" : "square",
}));
