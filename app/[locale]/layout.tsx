import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { locales } from "../../i18n/routing";
import { I18nProvider } from "../../lib/i18n";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// TODO: Create /public/og-image.png (1200×630) — ask user
export const metadata: Metadata = {
  metadataBase: new URL("https://filenest.ca"),
  title: "Filenest — Local-First Document Management with AI",
  description:
    "AI-powered document management for immigration consultants, lawyers, and accountants. Your files, your AI, your machine. Zero cloud uploads.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Filenest — Local-First Document Management with AI",
    description: "AI-powered document management for immigration consultants, lawyers, and accountants.",
    url: "https://filenest.ca",
    siteName: "Filenest",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filenest — Local-First Document Management with AI",
    description: "Your files. Your AI. Your machine.",
    creator: "@GenKnot",
    images: ["/og-image.png"],
  },
};

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
      </body>
    </html>
  );
}
