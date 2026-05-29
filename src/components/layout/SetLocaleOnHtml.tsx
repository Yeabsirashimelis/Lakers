"use client";

import { useEffect } from "react";

export function SetLocaleOnHtml({ locale, isAmharic }: { locale: string; isAmharic: boolean }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    if (isAmharic) {
      document.body.classList.add("locale-am");
    } else {
      document.body.classList.remove("locale-am");
    }
  }, [locale, isAmharic]);

  return null;
}
