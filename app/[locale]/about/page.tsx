import type { Metadata } from "next";
import InfoLayout from "../../components/InfoLayout";
import { locales, type Locale } from "../../../i18n/routing";
import { englishOnlyPageMetadata } from "../../../lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

  return englishOnlyPageMetadata({
    locale: safeLocale,
    route: "/about",
    title: "About Filenest",
    description:
      "Learn why Filenest was built and how its local-first approach helps professionals organize sensitive documents without cloud uploads.",
  });
}

export default function AboutPage() {
  return (
    <InfoLayout
      title="About Filenest"
      intro="Filenest is a local-first document management app for professionals who need powerful organization without giving up control of sensitive files."
    >
      <h2>Why we built it</h2>
      <p>
        Important documents are often scattered across folders, named inconsistently,
        and difficult to find months later. Filenest was created to make that work
        simpler: import a document, let the app read and organize it, and retrieve it
        later with a natural-language question.
      </p>
      <h2>Built for document-heavy work</h2>
      <p>
        The product is designed around the daily needs of immigration consultants,
        lawyers, accountants, and other professionals who manage many client records,
        deadlines, and document types at once.
      </p>
      <h2>Local-first by design</h2>
      <p>
        OCR, AI analysis, search, and storage run on your Mac. Filenest does not require
        your documents to be uploaded to a cloud AI service. This architecture is a
        product decision, not an optional privacy mode.
      </p>
      <h2>Independent software</h2>
      <p>
        Filenest is independently developed and supported. Product questions, feedback,
        and support requests are welcome at{" "}
        <a href="mailto:info@mischicat.com">info@mischicat.com</a>.
      </p>
    </InfoLayout>
  );
}
