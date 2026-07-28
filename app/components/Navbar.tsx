"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "../../lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t("features"), href: `/${locale}#features` },
    { label: t("pricing"), href: `/${locale}#pricing` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        {/* Bottom border — fades in on scroll */}
        <div
          className={`absolute bottom-0 inset-x-0 h-px bg-border-subtle transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="relative h-8 w-8">
            <Image
              src="/logo.png"
              alt="Filenest"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Filenest
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href={`/${locale}#pricing`}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors duration-200"
          >
            {t("cta")}
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="p-2 text-foreground-muted hover:text-foreground transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border-subtle bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`/${locale}#pricing`}
                onClick={() => setMobileOpen(false)}
                className="mt-1 text-sm font-semibold px-4 py-2.5 rounded-lg bg-foreground text-background text-center hover:bg-foreground/90 transition-colors"
              >
                {t("cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
