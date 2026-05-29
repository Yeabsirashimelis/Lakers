"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { Divider } from "@/components/ui/Divider";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.78a8.18 8.18 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.21z" />
    </svg>
  ),
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

export function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const contactT = useTranslations("contact_page");

  return (
    <footer className="bg-midnight border-t border-cream/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand column */}
          <FadeInView delay={0}>
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl text-warm-cream tracking-[0.1em] mb-4">
                {SITE_NAME.toUpperCase()}
              </h3>
              <p className="text-cream/50 text-sm leading-relaxed max-w-xs">
                {t("tagline")}
              </p>
            </div>
          </FadeInView>

          {/* Quick Links */}
          <FadeInView delay={0.1}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-amber mb-6">
                {t("quickLinks")}
              </h4>
              <nav className="flex flex-col gap-3" aria-label="Footer navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-sm text-cream/50 hover:text-cream transition-colors duration-300"
                  >
                    {navT(link.key)}
                  </Link>
                ))}
              </nav>
            </div>
          </FadeInView>

          {/* Contact & Social */}
          <FadeInView delay={0.2}>
            <div>
              <h4 className="text-xs tracking-[0.2em] uppercase text-amber mb-6">
                {t("contactUs")}
              </h4>
              <div className="flex flex-col gap-2 text-sm text-cream/50 mb-8">
                <p>{contactT("info.address")}</p>
                <p>{contactT("info.phone")}</p>
                <p>{contactT("info.email")}</p>
              </div>

              <h4 className="text-xs tracking-[0.2em] uppercase text-amber mb-4">
                {t("followUs")}
              </h4>
              <div className="flex gap-4">
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/40 hover:text-amber transition-colors duration-300"
                    aria-label={`Follow us on ${name}`}
                  >
                    {SOCIAL_ICONS[name]}
                  </a>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>

        <Divider className="mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} {SITE_NAME}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
