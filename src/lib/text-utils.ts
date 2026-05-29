/**
 * Split text into grapheme clusters safely (handles Amharic, emoji, etc.)
 * Falls back to Array.from for environments without Intl.Segmenter
 */
export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    return [...segmenter.segment(text)].map((s) => s.segment);
  }
  return Array.from(text);
}

/**
 * Split text into words safely
 */
export function splitWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}
