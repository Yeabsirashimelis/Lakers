import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SetLocaleOnHtml } from "@/components/layout/SetLocaleOnHtml";
import { CustomCursor } from "@/components/layout/CustomCursor";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;

  return {
    title: metadata?.title || "Lakers",
    description: metadata?.description || "Premium Restaurant & Café",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "am")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  const isAmharic = locale === "am";

  return (
    <div className={isAmharic ? "locale-am" : ""}>
      <SetLocaleOnHtml locale={locale} isAmharic={isAmharic} />
      <NextIntlClientProvider messages={messages}>
        <AnimationProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </AnimationProvider>
      </NextIntlClientProvider>
    </div>
  );
}
