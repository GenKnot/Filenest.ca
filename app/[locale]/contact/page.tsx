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
    route: "/contact",
    title: "Contact Filenest",
    description:
      "Contact Filenest for product questions, technical support, billing help, refunds, security reports, or professional workflow feedback.",
  });
}

export default function ContactPage() {
  return (
    <InfoLayout
      title="Contact Filenest"
      intro="Questions about the product, billing, privacy, or a workflow you want Filenest to support? Get in touch directly."
    >
      <h2>Product and technical support</h2>
      <p>
        Email <a href="mailto:info@mischicat.com">info@mischicat.com</a> and include the
        macOS version, Filenest version, and a brief description of the issue. Do not
        attach sensitive client documents.
      </p>
      <h2>Billing and refunds</h2>
      <p>
        Include the email address used for purchase and your Paddle order number. Review
        the <Link href="/en/refund">Refund Policy</Link> before submitting a request.
      </p>
      <h2>Security reports</h2>
      <p>
        Use the subject line “Security report” and provide steps that reproduce the
        issue. Please avoid sending real confidential documents or license keys.
      </p>
      <h2>Product feedback</h2>
      <p>
        Filenest is shaped by real document-heavy workflows. Suggestions from
        immigration consultants, lawyers, accountants, and other professionals are
        especially useful.
      </p>
    </InfoLayout>
  );
}
