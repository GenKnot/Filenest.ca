import type { Metadata } from "next";
import { locales, type Locale } from "../i18n/routing";

export const BASE_URL = "https://filenest.ca";

export function localizedUrl(locale: string, route = "") {
  return `${BASE_URL}/${locale}${route}`;
}

export function languageAlternates(route = "") {
  return Object.fromEntries([
    ...locales.map((locale) => [locale, localizedUrl(locale, route)]),
    ["x-default", localizedUrl("en", route)],
  ]);
}

export function legalPageMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: Locale;
  route: `/${string}`;
  title: string;
  description: string;
}): Metadata {
  const canonical = localizedUrl("en", route);
  const isEnglish = locale === "en";

  return {
    metadataBase: new URL(BASE_URL),
    title: `${title} | Filenest`,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        "x-default": canonical,
      },
    },
    robots: {
      index: isEnglish,
      follow: true,
    },
    openGraph: {
      title: `${title} | Filenest`,
      description,
      url: canonical,
      siteName: "Filenest",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Filenest`,
      description,
      creator: "@GenKnot",
      images: ["/og-image.png"],
    },
  };
}
