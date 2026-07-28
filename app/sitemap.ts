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
  "/privacy",
  "/terms",
  "/refund",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = LOCALIZED_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route),
      changeFrequency:
        route === "" ? ("weekly" as const) : route.startsWith("/for/") ? ("monthly" as const) : ("yearly" as const),
      priority: route === "" ? 1 : route.startsWith("/for/") ? 0.8 : 0.3,
      alternates: { languages: languageAlternates(route) },
    })),
  );

  const legalPages = ENGLISH_ONLY_ROUTES.map((route) => {
    const url = localizedUrl("en", route);
    return {
      url,
      changeFrequency: "yearly" as const,
      priority: 0.3,
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
