import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Showcase from "../sections/Showcase";
import ThemeShowcase from "../sections/ThemeShowcase";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";

export default function Home() {
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
    </>
  );
}
