import type { Metadata } from "next";
import Link from "next/link";
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
    route: "/security",
    title: "Security and Privacy",
    description:
      "See how Filenest protects documents with local AI processing, AES-256 database encryption, user-controlled storage, and no cloud uploads.",
  });
}

export default function SecurityPage() {
  return (
    <InfoLayout
      title="Security and privacy"
      intro="Filenest is designed so your document library remains under your control, on the Mac and storage location you choose."
    >
      <h2>On-device AI processing</h2>
      <p>
        OCR, document analysis, field extraction, summaries, and natural-language search
        run locally. Document contents are not sent to ChatGPT, Gemini, Claude, or another
        hosted AI service.
      </p>
      <h2>Encrypted library database</h2>
      <p>
        Filenest protects its library database with AES-256 encryption through SQLCipher.
        The database can only be opened with its encryption key.
      </p>
      <h2>You choose where files live</h2>
      <p>
        Original files remain in a folder you select. The app does not require a Filenest
        cloud drive, and local backups can be stored in locations you control.
      </p>
      <h2>Limited network activity</h2>
      <p>
        The app contacts the licensing service to validate a license using a license key
        and device fingerprint. Document contents, extracted text, and AI-generated
        summaries are not included in that request.
      </p>
      <h2>No advertising analytics</h2>
      <p>
        Filenest does not use third-party advertising trackers or analytics that upload
        your document activity. See the{" "}
        <Link href="/en/privacy">Privacy Policy</Link> for the complete policy.
      </p>
      <h2>Report a security concern</h2>
      <p>
        To report a potential security or privacy issue, email{" "}
        <a href="mailto:info@mischicat.com">info@mischicat.com</a>.
      </p>
    </InfoLayout>
  );
}
