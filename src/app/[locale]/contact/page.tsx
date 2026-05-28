"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PageTransition } from "@/components/layout/PageTransition";
import { FadeInView } from "@/components/ui/FadeInView";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact_page");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

      <section className="py-16 md:py-24 px-6 md:px-12 bg-midnight">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <FadeInView>
              <GlowCard className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg text-warm-cream mb-1">Address</h3>
                    <p className="text-cream/50 text-sm">{t("info.address")}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeInView>

            <FadeInView delay={0.1}>
              <GlowCard className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg text-warm-cream mb-1">Phone</h3>
                    <p className="text-cream/50 text-sm">{t("info.phone")}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeInView>

            <FadeInView delay={0.15}>
              <GlowCard className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg text-warm-cream mb-1">
                      {t("info.hours.label")}
                    </h3>
                    <p className="text-cream/50 text-sm">{t("info.hours.weekdays")}</p>
                    <p className="text-cream/50 text-sm">{t("info.hours.weekends")}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeInView>

            <FadeInView delay={0.2}>
              <GlowCard className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-amber/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-amber" strokeWidth="1.5">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-lg text-warm-cream mb-1">Email</h3>
                    <p className="text-cream/50 text-sm">{t("info.email")}</p>
                  </div>
                </div>
              </GlowCard>
            </FadeInView>

            {/* Social links */}
            <FadeInView delay={0.25}>
              <div className="flex gap-4 pt-4">
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-cream/10 text-cream/50 text-xs tracking-[0.15em] uppercase hover:border-amber/40 hover:text-amber transition-all duration-300"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </FadeInView>
          </div>

          {/* Contact Form + Map */}
          <div className="space-y-8">
            {/* Map */}
            <FadeInView delay={0.1}>
              <div className="relative aspect-video overflow-hidden bg-charcoal border border-cream/5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.78!3d9.01!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMzYuMCJOIDM4wrA0Nic0OC4wIkU!5e0!3m2!1sen!2set!4v1"
                  width="100%"
                  height="100%"
                  className="absolute inset-0 border-0 opacity-80 grayscale"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lakers location"
                />
              </div>
            </FadeInView>

            {/* Form */}
            <FadeInView delay={0.2}>
              <GlowCard className="p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <p className="font-[family-name:var(--font-heading)] text-xl text-amber mb-2">
                      {t("form.success")}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder={t("form.name")}
                        required
                        className="w-full bg-transparent border-b border-cream/10 pb-3 text-cream placeholder:text-cream/30 focus:border-amber/50 focus:outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder={t("form.email")}
                        required
                        className="w-full bg-transparent border-b border-cream/10 pb-3 text-cream placeholder:text-cream/30 focus:border-amber/50 focus:outline-none transition-colors duration-300 text-sm"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder={t("form.message")}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-cream/10 pb-3 text-cream placeholder:text-cream/30 focus:border-amber/50 focus:outline-none transition-colors duration-300 text-sm resize-none"
                      />
                    </div>
                    <MagneticButton onClick={() => {}}>
                      {t("form.submit")}
                    </MagneticButton>
                  </form>
                )}
              </GlowCard>
            </FadeInView>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
