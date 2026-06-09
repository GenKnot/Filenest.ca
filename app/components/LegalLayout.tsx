import Navbar from "./Navbar";
import Footer from "../sections/Footer";

interface LegalLayoutProps {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, effectiveDate, children }: LegalLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="mt-2 text-sm text-foreground-dim">
              Effective date: {effectiveDate}
            </p>
          </div>
          <div className="prose-legal">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
