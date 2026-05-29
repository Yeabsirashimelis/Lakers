import type { Metadata } from "next";
import { playfair, inter, notoSansEthiopic, notoSerifEthiopic } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lakers — Premium Restaurant & Café",
  description: "Premium Restaurant & Café in Bole, Addis Ababa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${playfair.variable}
        ${inter.variable}
        ${notoSansEthiopic.variable}
        ${notoSerifEthiopic.variable}
        antialiased
      `}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
      </body>
    </html>
  );
}
