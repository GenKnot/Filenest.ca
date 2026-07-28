import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/routing";
import { I18nProvider } from "../../lib/i18n";
import { languageAlternates, localizedUrl } from "../../lib/seo";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const OG_LOCALE: Record<string, string> = {
  en: "en_CA", "zh-CN": "zh_CN", "zh-TW": "zh_TW", fr: "fr_CA",
  es: "es_ES", pt: "pt_BR", ja: "ja_JP", ko: "ko_KR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const seo = messages.seo ?? {};
  const title: string = seo.title ?? "Filenest — Local-First Document Management with AI";
  const description: string = seo.description ?? "";
  const url = localizedUrl(locale);

  return {
    metadataBase: new URL("https://filenest.ca"),
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates() },
    icons: {
      icon: [
        { url: "/icon.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Filenest",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale: OG_LOCALE[locale] ?? "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@GenKnot",
      images: ["/og-image.png"],
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as never)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nProvider messages={messages} locale={locale}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
