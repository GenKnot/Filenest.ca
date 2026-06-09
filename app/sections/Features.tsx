"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { FolderSearch, BrainCircuit, LockKeyhole } from "lucide-react";
import { useTranslations } from "../../lib/i18n";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: FolderSearch,
      title: t("f1_title"),
      description: t("f1_desc"),
      highlight: t("f1_highlight"),
    },
    {
      icon: BrainCircuit,
      title: t("f2_title"),
      description: t("f2_desc"),
      highlight: t("f2_highlight"),
    },
    {
      icon: LockKeyhole,
      title: t("f3_title"),
      description: t("f3_desc"),
      highlight: t("f3_highlight"),
    },
  ];

  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {t("heading")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: { icon: React.ElementType; title: string; description: string; highlight: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    card.addEventListener("mousemove", onMove);
    return () => card.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
      className="card-shine group relative rounded-2xl border border-border-subtle bg-surface p-8 transition-colors duration-300 hover:border-border-medium"
    >
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
          <feature.icon size={22} strokeWidth={1.8} />
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-foreground mb-3">
          {feature.title}
        </h3>
        <p className="text-foreground-muted leading-relaxed mb-5">{feature.description}</p>
        <div className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
          {feature.highlight}
        </div>
      </div>
    </motion.div>
  );
}
