"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, SOCIAL_LINKS, SITE_NAME } from "@/lib/constants";
import { FadeInView } from "@/components/ui/FadeInView";
import { Divider } from "@/components/ui/Divider";

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
              <nav className="flex flex-col gap-3">
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
                    className="text-cream/40 hover:text-amber transition-colors duration-300 text-sm capitalize"
                  >
                    {name}
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
