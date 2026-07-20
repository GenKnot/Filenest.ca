import type { MetadataRoute } from "next";
import { locales } from "../i18n/routing";

export const dynamic = "force-static";

const BASE = "https://filenest.ca";
const ROUTES = ["", "/privacy", "/terms", "/refund"];

export default function sitemap(): MetadataRoute.Sitemap {
  const languageAlternates = (route: string) =>
    Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${route}`]));

  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("yearly" as const),
      priority: route === "" ? 1 : 0.3,
      alternates: { languages: languageAlternates(route) },
    })),
  );
}
