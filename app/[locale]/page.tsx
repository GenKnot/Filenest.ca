import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Showcase from "../sections/Showcase";
import ThemeShowcase from "../sections/ThemeShowcase";
import Solutions from "../sections/Solutions";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Solutions locale={locale} messages={messages} />
        <Showcase />
        <ThemeShowcase />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://filenest.ca/#website",
                url: "https://filenest.ca/",
                name: "Filenest",
                alternateName: "Filenest for Mac",
                inLanguage: locale,
              },
              {
                "@type": "Organization",
                "@id": "https://filenest.ca/#organization",
                name: "Filenest",
                url: "https://filenest.ca/",
                logo: {
                  "@type": "ImageObject",
                  url: "https://filenest.ca/icon.png",
                  width: 192,
                  height: 192,
                },
                sameAs: [
                  "https://github.com/GenKnot",
                  "https://x.com/GenKnot",
                ],
              },
            ],
          }),
        }}
      />
    </>
  );
}
