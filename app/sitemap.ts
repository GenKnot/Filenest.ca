import type { MetadataRoute } from "next";
import { locales } from "../i18n/routing";
import { languageAlternates, localizedUrl } from "../lib/seo";

export const dynamic = "force-static";

const LOCALIZED_ROUTES = [
  "",
  "/for/immigration-consultants",
  "/for/lawyers",
  "/for/accountants",
] as const;

const ENGLISH_ONLY_ROUTES = [
  "/about",
  "/security",
  "/contact",
  "/privacy",
  "/terms",
  "/refund",
] as const;

const LAST_SIGNIFICANT_UPDATE = "2026-07-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = LOCALIZED_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route),
      lastModified: LAST_SIGNIFICANT_UPDATE,
      alternates: { languages: languageAlternates(route) },
    })),
  );

  const legalPages = ENGLISH_ONLY_ROUTES.map((route) => {
    const url = localizedUrl("en", route);
    return {
      url,
      lastModified: LAST_SIGNIFICANT_UPDATE,
      alternates: {
        languages: {
          en: url,
          "x-default": url,
        },
      },
    };
  });

  return [...localizedPages, ...legalPages];
}
