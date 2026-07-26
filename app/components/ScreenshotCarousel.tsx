"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const screenshots = [
  {
    src: "/screenshots/archive-document-list.png",
    alt: "Filenest archive with AI summaries, document types, and extracted tags",
  },
  {
    src: "/screenshots/ai-chat-light.png",
    alt: "Filenest AI Chat answering questions with cited local document sources",
  },
  {
    src: "/screenshots/document-preview-expanded.png",
    alt: "Filenest document preview with extracted fields and suggested values",
  },
  {
    src: "/screenshots/contact-overview.png",
    alt: "Filenest contact overview with files, tags, and recent activity",
  },
  {
    src: "/screenshots/search-results.png",
    alt: "Filenest search results across archives and documents",
  },
  {
    src: "/screenshots/archive-document-list-dark.png",
    alt: "Filenest archive with document summaries in dark mode",
  },
  {
    src: "/screenshots/ai-chat-dark.png",
    alt: "Filenest AI Chat answering document questions in dark mode",
  },
  {
    src: "/screenshots/contact-overview-dark.png",
    alt: "Filenest contact overview in dark mode",
  },
  {
    src: "/screenshots/settings-local-ai.png",
    alt: "Filenest local AI settings and offline model controls",
  },
  {
    src: "/screenshots/settings-archive-templates-dark.png",
    alt: "Filenest archive templates for professional workflows in dark mode",
  },
];

const INTERVAL = 4500;

export default function ScreenshotCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % screenshots.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [next]);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  return (
    <div className="relative w-full">
      {/* Top accent line */}
      <div className="absolute -top-px inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />

      {/* Screenshot frame */}
      <div
        className="relative overflow-hidden rounded-t-2xl border border-b-0 border-border-subtle bg-surface"
        style={{ aspectRatio: "87/57" }}
      >
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={screenshots[index].src}
              alt={screenshots[index].alt}
              fill
              className="object-contain"
              priority={index === 0}
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-5">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to screenshot ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === index
                ? "w-5 h-1.5 bg-accent"
                : "w-1.5 h-1.5 bg-foreground-dim/40 hover:bg-foreground-dim"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
