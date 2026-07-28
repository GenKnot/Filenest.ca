import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Showcase from "../sections/Showcase";
import ThemeShowcase from "../sections/ThemeShowcase";
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
    </>
  );
}
