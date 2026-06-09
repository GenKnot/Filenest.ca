import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import Showcase from "../sections/Showcase";
import Pricing from "../sections/Pricing";
import Footer from "../sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Showcase />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
