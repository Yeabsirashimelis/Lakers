"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useParams, useRouter as useNextRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { navOverlay, navItem } from "@/lib/animations";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();
  const nextRouter = useNextRouter();
  const params = useParams();
  const currentLocale = (params.locale as string) || "en";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "am" : "en";
    // pathname from next-intl's usePathname is without locale prefix (e.g. "/" or "/menu")
    nextRouter.push(`/${newLocale}${pathname === "/" ? "" : pathname}`);
  };

  return (
    <>
      {/* Fixed header bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-midnight/90 backdrop-blur-md border-b border-cream/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-[family-name:var(--font-heading)] text-2xl tracking-[0.15em] text-warm-cream hover:text-amber transition-colors duration-300"
          >
            LAKERS
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={cn(
                  "relative text-sm tracking-[0.1em] uppercase transition-colors duration-300",
                  pathname === link.href
                    ? "text-amber"
                    : "text-cream/70 hover:text-cream"
                )}
              >
                {t(link.key)}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-amber"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLocale}
              className="text-xs tracking-[0.15em] uppercase text-cream/60 hover:text-amber transition-colors duration-300 hidden md:block"
            >
              {t("language")}
            </button>

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2 border border-amber/30 text-xs tracking-[0.15em] uppercase text-cream hover:border-amber hover:bg-amber/10 transition-all duration-300"
            >
              {t("reserve")}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative z-60 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-px bg-cream"
                animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-px bg-cream"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-px bg-cream"
                animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-midnight flex items-center justify-center"
            variants={navOverlay}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.key}
                  variants={navItem}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-[family-name:var(--font-heading)] text-4xl md:text-5xl tracking-wide transition-colors duration-300",
                      pathname === link.href
                        ? "text-amber"
                        : "text-warm-cream hover:text-amber"
                    )}
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile language toggle */}
              <motion.div
                variants={navItem}
                initial="closed"
                animate="open"
                exit="closed"
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.08 }}
              >
                <button
                  onClick={() => {
                    toggleLocale();
                    setIsOpen(false);
                  }}
                  className="mt-4 text-sm tracking-[0.2em] uppercase text-cream/60 hover:text-amber transition-colors duration-300 border border-cream/20 px-6 py-2"
                >
                  {t("language")}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
