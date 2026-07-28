"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "../../lib/i18n";

const screenshots = [
  {
    src: "/screenshots/archive-document-list.png",
    alt: "Filenest archive with AI summaries, document types, and extracted tags",
  },
  {
    src: "/screenshots/settings-local-ai.png",
    alt: "Filenest local AI settings with offline model controls",
  },
  {
    src: "/screenshots/document-preview.png",
    alt: "Filenest document preview with extracted fields ready for review",
  },
  {
    src: "/screenshots/ai-chat-light.png",
    alt: "Filenest AI Chat answering questions with cited local document sources",
  },
  {
    src: "/screenshots/settings-archive-templates-top.png",
    alt: "Filenest archive templates for different professional workflows",
  },
];

function ShowcaseItem({
  tag, headline, body, screenshot, alt, index, onEnter,
}: {
  tag: string; headline: string; body: string; screenshot: string; alt: string;
  index: number; onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-25% 0px -25% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <div ref={ref} className="py-14 md:py-20 text-center md:text-left">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-widest uppercase text-accent mb-4 block"
      >
        {tag}
      </motion.span>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold tracking-tight text-foreground leading-snug mb-5"
      >
        {headline}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-foreground-muted leading-relaxed text-base md:text-lg md:max-w-sm mx-auto md:mx-0"
      >
        {body}
      </motion.p>

      {/* Mobile-only screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="md:hidden mt-8 rounded-xl border border-border-subtle overflow-hidden shadow-xl shadow-black/40"
      >
        <div className="relative">
          <Image src={screenshot} alt={alt} width={1400} height={1000} className="w-full h-auto block" sizes="100vw" />
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Showcase() {
  const t = useTranslations("showcase");
  const [activeIndex, setActiveIndex] = useState(0);
  const stickyRef = useRef<HTMLDivElement>(null);

  const items = [
    { tag: t("s1_tag"), headline: t("s1_headline"), body: t("s1_body"), screenshot: screenshots[0].src, alt: screenshots[0].alt },
    { tag: t("s2_tag"), headline: t("s2_headline"), body: t("s2_body"), screenshot: screenshots[1].src, alt: screenshots[1].alt },
    { tag: t("s3_tag"), headline: t("s3_headline"), body: t("s3_body"), screenshot: screenshots[2].src, alt: screenshots[2].alt },
    { tag: t("s4_tag"), headline: t("s4_headline"), body: t("s4_body"), screenshot: screenshots[3].src, alt: screenshots[3].alt },
    { tag: t("s5_tag"), headline: t("s5_headline"), body: t("s5_body"), screenshot: screenshots[4].src, alt: screenshots[4].alt },
  ];

  return (
    <section className="relative py-12 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 max-w-xl"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {t("heading")}
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-20 mt-0">
          {/* Left — scrolling text */}
          <div className="md:w-[42%] flex-shrink-0">
            {items.map((item, i) => (
              <ShowcaseItem
                key={item.tag}
                {...item}
                index={i}
                onEnter={setActiveIndex}
              />
            ))}
          </div>

          {/* Right — sticky screenshot */}
          <div className="hidden md:flex md:w-[58%] items-start">
            <div ref={stickyRef} className="sticky w-full" style={{ top: "calc(50vh - 240px)" }}>
              <div className="absolute inset-0 -z-10 blur-[80px] opacity-20 bg-accent rounded-full scale-75" />
              <div className="relative rounded-2xl border border-border-subtle overflow-hidden shadow-2xl shadow-black/50">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />
                <div className="relative" style={{ aspectRatio: "87/57" }}>
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="absolute inset-0 overflow-hidden"
                    >
                      <Image
                        src={items[activeIndex].screenshot}
                        alt={items[activeIndex].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1280px) 55vw, 640px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-surface to-transparent pointer-events-none z-10" />
                </div>
                <div className="px-5 py-3 border-t border-border-subtle bg-surface flex items-center gap-3">
                  <div className="flex gap-1">
                    {items.map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${
                          i === activeIndex ? "w-4 h-1.5 bg-accent" : "w-1.5 h-1.5 bg-foreground-dim/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-foreground-dim ml-1">{items[activeIndex].tag}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
