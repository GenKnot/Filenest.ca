import Footer from "../sections/Footer";
import Navbar from "./Navbar";

export default function InfoLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 pb-24 pt-32">
        <article className="mx-auto max-w-2xl">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{intro}</p>
          </header>
          <div className="prose-legal">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
