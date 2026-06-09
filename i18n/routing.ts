export const locales = ["en", "fr", "es", "pt", "zh-CN", "zh-TW", "ja", "ko"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
