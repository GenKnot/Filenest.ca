import type { Metadata } from "next";
import LegalLayout from "../../components/LegalLayout";
import { locales, type Locale } from "../../../i18n/routing";
import { legalPageMetadata } from "../../../lib/seo";

const titles: Record<string, { title: string; effective: string }> = {
  en: { title: "Privacy Policy", effective: "Effective date: June 2026" },
  fr: { title: "Politique de confidentialité", effective: "Date d'effet : juin 2026" },
  es: { title: "Política de privacidad", effective: "Fecha de vigencia: junio 2026" },
  pt: { title: "Política de privacidade", effective: "Data de vigência: junho 2026" },
  "zh-CN": { title: "隐私政策", effective: "生效日期：2026 年 6 月" },
  "zh-TW": { title: "隱私政策", effective: "生效日期：2026 年 6 月" },
  ja: { title: "プライバシーポリシー", effective: "施行日：2026年6月" },
  ko: { title: "개인정보처리방침", effective: "시행일: 2026년 6월" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

  return legalPageMetadata({
    locale: safeLocale,
    route: "/privacy",
    title: titles[safeLocale].title,
    description:
      "Learn how Filenest protects your privacy with local-first document storage, on-device AI processing, and no cloud uploads.",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { title, effective } = titles[locale] ?? titles.en;

  return (
    <LegalLayout title={title} effectiveDate={effective}>
      <p>
        Filenest is a local-first application. Your documents, client files, and data
        never leave your device.
      </p>
      <h2>What we collect</h2>
      <p>
        <strong>Nothing from your documents.</strong> Every file you add to Filenest is
        stored on your own machine. No file contents, metadata, or AI-generated summaries
        are ever uploaded to our servers — because we don&apos;t have any servers in the loop.
        All AI processing runs locally on your device.
      </p>
      <h2>Payment processing</h2>
      <p>
        Filenest uses <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer">Paddle</a> to
        process payments. Paddle collects your billing information per their privacy policy.
        We receive only a purchase confirmation and your email address.
      </p>
      <h2>Analytics & crash reporting</h2>
      <p>
        We do not use third-party analytics or crash reporting tools that send data
        externally. If this changes, we will notify existing users before it takes effect.
      </p>
      <h2>License validation</h2>
      <p>
        The app performs a license check at startup, sending only a license key and
        device fingerprint. No document data is involved.
      </p>
      <h2>Data stored on your device</h2>
      <ul>
        <li>Your document files (in the storage folder you choose)</li>
        <li>Archive records, extracted fields, and AI-generated summaries</li>
        <li>App settings and preferences</li>
        <li>Your license key (stored in your OS keychain)</li>
      </ul>
      <h2>Contact</h2>
      <p>
        Questions? Email <a href="mailto:info@mischicat.com">info@mischicat.com</a>.
      </p>
    </LegalLayout>
  );
}
