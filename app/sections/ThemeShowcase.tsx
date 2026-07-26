"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "../../lib/i18n";

const themes = {
  light: {
    src: "/screenshots/archive-document-list.png",
    icon: Sun,
  },
  dark: {
    src: "/screenshots/archive-document-list-dark.png",
    icon: Moon,
  },
} as const;

type Theme = keyof typeof themes;

export default function ThemeShowcase() {
  const t = useTranslations("themeShowcase");
  const [theme, setTheme] = useState<Theme>("dark");
  const activeTheme = themes[theme];

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            {t("label")}
          </span>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-muted md:text-lg">
            {t("body")}
          </p>

          <div
            className="mt-7 inline-flex rounded-xl border border-border-subtle bg-surface p-1"
            role="group"
            aria-label={t("controlLabel")}
          >
            {(Object.keys(themes) as Theme[]).map((option) => {
              const Icon = themes[option].icon;
              const isActive = option === theme;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTheme(option)}
                  aria-pressed={isActive}
                  className={`inline-flex min-w-28 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-md shadow-accent-glow"
                      : "text-foreground-muted hover:bg-background hover:text-foreground"
                  }`}
                >
                  <Icon size={16} />
                  {t(option)}
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl shadow-black/40"
          style={{ aspectRatio: "87/57" }}
        >
          <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <AnimatePresence initial={false} mode="sync">
            <motion.div
              key={theme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeTheme.src}
                alt={t(`${theme}Alt`)}
                fill
                className="object-contain"
                sizes="(max-width: 1152px) 100vw, 1152px"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
