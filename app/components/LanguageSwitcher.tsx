"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "../../lib/i18n";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { locales, type Locale } from "../../i18n/routing";

const labels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
  pt: "PT",
  "zh-CN": "中文",
  "zh-TW": "繁體",
  ja: "日本語",
  ko: "한국어",
};

const full: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
};

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const getLocalePath = (next: Locale): string => {
    const segments = pathname.split("/").filter(Boolean);
    const isLocaleSegment = locales.includes(segments[0] as Locale);
    const rest = isLocaleSegment ? segments.slice(1) : segments;
    const restPath = rest.length ? `/${rest.join("/")}` : "/";
    return `/${next}${restPath}`;
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-surface"
        aria-label="Switch language"
      >
        <span>{labels[locale]}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border-subtle bg-surface-elevated shadow-xl shadow-black/40 overflow-hidden z-50">
          {locales.map((l) => (
            <a
              key={l}
              href={getLocalePath(l)}
              onClick={() => setOpen(false)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors block ${
                l === locale
                  ? "text-accent bg-accent/5 font-medium"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              {full[l]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
