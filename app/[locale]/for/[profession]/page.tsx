import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { locales } from "../../../../i18n/routing";
import Navbar from "../../../components/Navbar";
import Footer from "../../../sections/Footer";

// Tier-2 SEO (roadmap §0.6): one deep page per profession × locale, each
// targeting "[profession] document management software" and local
// equivalents. Statically generated; copy lives in messages/<locale>.json
// under useCases.<slug>.

const PROFESSIONS = ["immigration-consultants", "lawyers", "accountants"] as const;
type Profession = (typeof PROFESSIONS)[number];

const BASE = "https://filenest.ca";

interface UseCaseCopy {
  metaTitle: string;
  metaDesc: string;
  h1: string;
  intro: string;
  b1t: string; b1d: string;
  b2t: string; b2d: string;
  b3t: string; b3d: string;
  b4t: string; b4d: string;
  cta: string;
}

async function loadCopy(locale: string, profession: string): Promise<{ copy: UseCaseCopy; download: string; pricing: string } | null> {
  try {
    const messages = (await import(`../../../../messages/${locale}.json`)).default;
    const copy = messages.useCases?.[profession];
    if (!copy) return null;
    return { copy, download: messages.hero.download, pricing: messages.useCases.see_pricing };
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return locales.flatMap((locale) => PROFESSIONS.map((profession) => ({ locale, profession })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; profession: string }>;
}): Promise<Metadata> {
  const { locale, profession } = await params;
  const loaded = await loadCopy(locale, profession);
  if (!loaded) return {};
  const { copy } = loaded;
  const route = `/for/${profession}`;
  const url = `${BASE}/${locale}${route}`;
  return {
    metadataBase: new URL(BASE),
    title: copy.metaTitle,
    description: copy.metaDesc,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${BASE}/${l}${route}`]),
        ["x-default", `${BASE}/en${route}`],
      ]),
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDesc,
      url,
      siteName: "Filenest",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      type: "website",
    },
  };
}

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; profession: string }>;
}) {
  const { locale, profession } = await params;
  if (!locales.includes(locale as never) || !PROFESSIONS.includes(profession as Profession)) {
    notFound();
  }
  const loaded = await loadCopy(locale, profession);
  if (!loaded) notFound();
  const { copy, download, pricing } = loaded;

  const blocks = [
    { t: copy.b1t, d: copy.b1d },
    { t: copy.b2t, d: copy.b2d },
    { t: copy.b3t, d: copy.b3d },
    { t: copy.b4t, d: copy.b4d },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative isolate overflow-hidden px-6 pt-36 pb-16 md:pt-44">
          <div aria-hidden className="hero-glow absolute inset-0 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">{copy.h1}</h1>
            <p className="mt-6 text-lg leading-relaxed text-foreground-muted">{copy.intro}</p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://filenest-license.503-18a.workers.dev/download/macos"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
              >
                {download}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <Link
                href={`/${locale}#pricing`}
                className="inline-flex items-center gap-2 rounded-xl border border-border-medium px-7 py-3.5 text-base font-medium text-foreground-muted hover:text-foreground hover:bg-surface transition-all duration-200"
              >
                {pricing}
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
            {blocks.map(({ t, d }) => (
              <div key={t} className="rounded-xl border border-border-medium bg-surface/40 p-6">
                <h2 className="text-lg font-semibold">{t}</h2>
                <p className="mt-2.5 text-sm leading-relaxed text-foreground-muted">{d}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-base text-foreground-muted">{copy.cta}</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
