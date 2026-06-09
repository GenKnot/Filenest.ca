"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const screenshots = [
  { src: "/ss-3.png", alt: "Filenest Archives — document list with AI-extracted summaries and tags" },
  { src: "/ss-5.png", alt: "Filenest AI Chat — ask questions about your documents locally" },
  { src: "/ss-6.png", alt: "Filenest extracted fields — AI suggestion review" },
  { src: "/ss-4.png", alt: "Filenest AI Chat — detailed document analysis" },
  { src: "/ss-7.png", alt: "Filenest New Archive — template selection" },
  { src: "/ss-2.png", alt: "Filenest New Archive — dark theme" },
  { src: "/ss-1.png", alt: "Filenest Settings — AI models and language" },
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
      <div className="relative overflow-hidden rounded-t-2xl border border-b-0 border-border-subtle bg-surface" style={{ aspectRatio: "16/10" }}>
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
              className="object-cover object-top"
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
