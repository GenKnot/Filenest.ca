"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "../../lib/i18n";

const ITEMS = [1, 2, 3, 4, 5, 6] as const;

/**
 * FAQ — SEO workhorse (roadmap: landing tier-1 SEO). Each question is written
 * as a real search query in each locale; the FAQPage JSON-LD makes the Q&As
 * eligible for rich results. <details>/<summary> keeps the answers in the
 * static HTML (indexed) with zero JS state.
 */
export default function Faq() {
  const t = useTranslations("faq");
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const qa = ITEMS.map((i) => ({ q: t(`q${i}`), a: t(`a${i}`) }));

  return (
    <section id="faq" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t("title")}</h2>
        </motion.div>

        <div className="space-y-3">
          {qa.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-border-medium bg-surface/40 px-6 py-4 transition-colors hover:border-border-medium/80 open:bg-surface/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground [&::-webkit-details-marker]:hidden">
                {q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-foreground-dim transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>

      {/* FAQPage rich-result eligibility — same strings as the visible Q&As. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: qa.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          }),
        }}
      />
    </section>
  );
}
