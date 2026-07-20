import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/routing";
import { I18nProvider } from "../../lib/i18n";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const OG_LOCALE: Record<string, string> = {
  en: "en_CA", "zh-CN": "zh_CN", "zh-TW": "zh_TW", fr: "fr_CA",
  es: "es_ES", pt: "pt_BR", ja: "ja_JP", ko: "ko_KR",
};

/** hreflang alternates: every locale + x-default → /en. Without these, Google
 * treats 8 language variants as duplicate content and picks one at random. */
const LANGUAGE_ALTERNATES = Object.fromEntries([
  ...locales.map((l) => [l, `https://filenest.ca/${l}`]),
  ["x-default", "https://filenest.ca/en"],
]);

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
  const url = `https://filenest.ca/${locale}`;

  return {
    metadataBase: new URL("https://filenest.ca"),
    title,
    description,
    alternates: { canonical: url, languages: LANGUAGE_ALTERNATES },
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

  // Load messages directly — no external dependency
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
        {/* Structured data: lets search results show Filenest as a macOS app
            with its price range (rich snippet eligibility). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Filenest",
              operatingSystem: "macOS",
              applicationCategory: "BusinessApplication",
              description: messages.seo?.description,
              url: `https://filenest.ca/${locale}`,
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "3.99",
                highPrice: "199",
                offerCount: 3,
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
