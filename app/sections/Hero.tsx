"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, Cpu } from "lucide-react";
import { useTranslations } from "../../lib/i18n";
import ScreenshotCarousel from "../components/ScreenshotCarousel";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Each orb drifts through a sequence of x/y positions, looping forever
const orb1 = {
  x: [0, 80, -60, 40, -80, 0],
  y: [0, -60, 40, 80, -40, 0],
  scale: [1, 1.1, 0.95, 1.05, 0.98, 1],
};
const orb2 = {
  x: [0, -70, 50, -40, 60, 0],
  y: [0, 50, -70, 30, -50, 0],
  scale: [1, 0.9, 1.1, 0.95, 1.05, 1],
};
const orb3 = {
  x: [0, 60, -80, 70, -50, 0],
  y: [0, -40, 60, -70, 50, 0],
  scale: [1, 1.08, 0.92, 1.06, 0.96, 1],
};

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate flex flex-col items-center overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32 px-6">
      {/* Mobile-safe ambient glow: a plain radial gradient. iOS Safari
          rasterizes huge blur() layers in tiles and clips them, which showed
          as a hard horizontal seam mid-hero on phones — gradients never do. */}
      <div aria-hidden className="hero-glow absolute inset-0 pointer-events-none" />

      {/* Ambient glow orbs — freely drifting. Desktop-only: the blurred
          layers are what iOS clips (see above). */}
      <motion.div
        className="glow-orb hidden md:block bg-accent w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2"
        animate={orb1}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="glow-orb hidden md:block bg-accent-secondary w-[400px] h-[400px] top-20 -right-40 opacity-20"
        animate={orb2}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      />
      <motion.div
        className="glow-orb hidden md:block bg-accent w-[350px] h-[350px] top-40 -left-32 opacity-20"
        animate={orb3}
        transition={{ duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-medium bg-surface/60 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-foreground-muted tracking-wide uppercase">
            {t("badge")}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05]"
        >
          <span className="gradient-text">{t("headline1")}</span>
          <br />
          <span className="gradient-text">{t("headline2")}</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-lg md:text-xl text-foreground-muted leading-relaxed"
        >
          {t("sub")}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            // Stable download URL: the worker 302s to the current version's
            // notarized DMG in R2 (see license-server /download/macos).
            href="https://filenest-license.503-18a.workers.dev/download/macos"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent-glow transition-all duration-300 hover:brightness-110 hover:shadow-accent-glow/50 hover:-translate-y-0.5"
          >
            {t("download")}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-xl border border-border-medium px-7 py-3.5 text-base font-medium text-foreground-muted hover:text-foreground hover:border-border-medium/80 hover:bg-surface transition-all duration-200"
          >
            {t("explore")}
          </a>
        </motion.div>

        {/* System requirements — visible BEFORE the download click so Intel-Mac
            users aren't left wondering why the app won't open. */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-4 text-xs text-foreground-dim"
        >
          {t("requirements")}
        </motion.p>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-dim"
        >
          <span className="inline-flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-400" />
            {t("trust1")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock size={14} className="text-emerald-400" />
            {t("trust2")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Cpu size={14} className="text-emerald-400" />
            {t("trust3")}
          </span>
        </motion.div>

        {/* Hero visual — screenshot carousel */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-16 md:mt-20 w-full max-w-4xl"
        >
          <ScreenshotCarousel />
        </motion.div>
      </div>
    </section>
  );
}
