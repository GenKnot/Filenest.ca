import type { Metadata } from "next";
import LegalLayout from "../../components/LegalLayout";
import { locales, type Locale } from "../../../i18n/routing";
import { legalPageMetadata } from "../../../lib/seo";

const titles: Record<string, { title: string; effective: string }> = {
  en: { title: "Terms of Service", effective: "Effective date: June 2026" },
  fr: { title: "Conditions d'utilisation", effective: "Date d'effet : juin 2026" },
  es: { title: "Términos de servicio", effective: "Fecha de vigencia: junio 2026" },
  pt: { title: "Termos de serviço", effective: "Data de vigência: junho 2026" },
  "zh-CN": { title: "服务条款", effective: "生效日期：2026 年 6 月" },
  "zh-TW": { title: "服務條款", effective: "生效日期：2026 年 6 月" },
  ja: { title: "利用規約", effective: "施行日：2026年6月" },
  ko: { title: "이용약관", effective: "시행일: 2026년 6월" },
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
    route: "/terms",
    title: titles[safeLocale].title,
    description:
      "Read the Filenest terms covering licenses, free trials, subscriptions, lifetime purchases, and responsible use of AI-generated results.",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { title, effective } = titles[locale] ?? titles.en;

  return (
    <LegalLayout title={title} effectiveDate={effective}>
      <p>By downloading or using Filenest, you agree to these terms.</p>
      <h2>License</h2>
      <p>
        Filenest grants you a personal, non-transferable license to install and use the
        application on up to 2 devices. You may use it for personal or professional
        purposes. You may not resell, sublicense, or distribute the software.
      </p>
      <h2>Free trial</h2>
      <p>
        All paid plans include a 14-day free trial. No credit card is required to start.
        Your documents remain on your device if you choose not to continue.
      </p>
      <h2>Subscriptions</h2>
      <p>
        Monthly and Annual plans are billed automatically. You can cancel anytime —
        cancellation takes effect at the end of the current billing period.
      </p>
      <h2>Lifetime license</h2>
      <p>
        A Lifetime purchase grants access to Filenest and all updates within the current
        major version (v1.x). Major version upgrades may be offered as a discounted upgrade.
      </p>
      <h2>AI accuracy disclaimer</h2>
      <p>
        <strong>AI-extracted data is not guaranteed to be accurate.</strong> Do not rely
        solely on AI outputs for legal, immigration, medical, or financial decisions.
        Always verify against the original documents.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Province of Quebec, Canada.</p>
      <h2>Contact</h2>
      <p>
        <a href="mailto:info@mischicat.com">info@mischicat.com</a>
      </p>
    </LegalLayout>
  );
}
