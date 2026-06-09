import LegalLayout from "../../components/LegalLayout";

const titles: Record<string, { title: string; effective: string }> = {
  en: { title: "Refund Policy", effective: "Effective date: June 2026" },
  fr: { title: "Politique de remboursement", effective: "Date d'effet : juin 2026" },
  es: { title: "Política de reembolso", effective: "Fecha de vigencia: junio 2026" },
  pt: { title: "Política de reembolso", effective: "Data de vigência: junho 2026" },
  "zh-CN": { title: "退款政策", effective: "生效日期：2026 年 6 月" },
  "zh-TW": { title: "退款政策", effective: "生效日期：2026 年 6 月" },
  ja: { title: "返金ポリシー", effective: "施行日：2026年6月" },
  ko: { title: "환불정책", effective: "시행일: 2026년 6월" },
};

export default async function RefundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { title, effective } = titles[locale] ?? titles.en;

  return (
    <LegalLayout title={title} effectiveDate={effective}>
      <p>
        We want you to be confident buying Filenest. If it&apos;s not right for you,
        getting your money back is straightforward.
      </p>
      <h2>14-day money-back guarantee</h2>
      <p>
        If you&apos;re not satisfied within the first 14 days, email us for a full refund —
        no questions asked. This applies to Monthly, Annual, and Lifetime plans.
      </p>
      <h2>After 14 days — subscriptions</h2>
      <p>
        Monthly and Annual subscriptions are non-refundable after the 14-day window.
        You can cancel at any time to stop future charges.
      </p>
      <h2>After 14 days — Lifetime</h2>
      <p>Lifetime purchases are non-refundable after the 14-day window.</p>
      <h2>How to request a refund</h2>
      <p>
        Email <a href="mailto:info@mischicat.com">info@mischicat.com</a> with your order
        number and the email used to purchase. Paddle processes refunds within 5–10
        business days.
      </p>
      <h2>Contact</h2>
      <p>
        <a href="mailto:info@mischicat.com">info@mischicat.com</a>
      </p>
    </LegalLayout>
  );
}
