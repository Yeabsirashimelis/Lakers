"use client";

import { LenisProvider } from "./LenisProvider";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
