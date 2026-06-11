"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Calendar, Zap, Infinity } from "lucide-react";
import { useTranslations } from "../../lib/i18n";
import { CheckoutButton } from "../components/CheckoutButton";
import { PRICE_IDS } from "../../lib/paddle";

export default function Pricing() {
  const t = useTranslations("pricing");
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const plans = [
    {
      name: t("monthly_name"),
      price: t("monthly_price"),
      period: t("monthly_period"),
      subline: t("monthly_subline"),
      description: t("monthly_desc"),
      icon: Calendar,
      popular: false,
      priceId: PRICE_IDS.monthly,
      showTrial: true,
      features: [
        t("f_unlimited"), t("f_ai"), t("f_enc"), t("f_apps"), t("f_email"),
      ],
      cta: t("monthly_cta"),
    },
    {
      name: t("annual_name"),
      price: t("annual_price"),
      period: t("annual_period"),
      subline: t("annual_subline"),
      description: t("annual_desc"),
      icon: Zap,
      popular: true,
      priceId: PRICE_IDS.annual,
      showTrial: true,
      features: [
        t("f_unlimited"), t("f_save"), t("f_priority"), t("f_beta"), t("f_devices2"),
      ],
      cta: t("annual_cta"),
    },
    {
      name: t("lifetime_name"),
      price: t("lifetime_price"),
      period: t("lifetime_period"),
      subline: t("lifetime_subline"),
      description: t("lifetime_desc"),
      icon: Infinity,
      popular: false,
      priceId: PRICE_IDS.lifetime,
      showTrial: false,
      features: [
        t("f_unlimited"), t("f_updates"), t("f_priority"), t("f_devices2b"), t("f_early"),
      ],
      cta: t("lifetime_cta"),
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 24 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-16 md:mb-20 text-center"
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-3 block">
            {t("label")}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-foreground-muted">{t("sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} trialLabel={t("trial")} lifetimeLabel={t("lifetime_badge")} popularLabel={t("popular")} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan, index, trialLabel, lifetimeLabel, popularLabel,
}: {
  plan: {
    name: string; price: string; period: string; subline: string; description: string;
    icon: React.ElementType; popular: boolean; priceId: string; showTrial: boolean; features: string[]; cta: string;
  };
  index: number;
  trialLabel: string;
  lifetimeLabel: string;
  popularLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] as const }}
      className={`relative flex flex-col rounded-2xl border p-8 transition-colors duration-300 ${
        plan.popular
          ? "border-accent/40 bg-surface-elevated shadow-xl shadow-accent-glow/20"
          : "border-border-subtle bg-surface hover:border-border-medium"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-accent-glow">
            {popularLabel}
          </span>
        </div>
      )}

      <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
        <plan.icon size={22} strokeWidth={1.8} />
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-foreground">{plan.name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight text-foreground">{plan.price}</span>
        <span className="text-sm text-foreground-dim">{plan.period}</span>
      </div>
      <p className="mt-1 text-xs text-foreground-dim">{plan.subline}</p>
      <p className="mt-3 text-sm text-foreground-muted leading-relaxed">{plan.description}</p>

      {plan.showTrial ? (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20 self-start">
          <Check size={11} strokeWidth={2.5} />
          {trialLabel}
        </div>
      ) : (
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent ring-1 ring-accent/20 self-start">
          <Infinity size={11} strokeWidth={2.5} />
          {lifetimeLabel}
        </div>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-foreground-muted">
            <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" />
            {f}
          </li>
        ))}
      </ul>

      <CheckoutButton
        priceId={plan.priceId}
        label={plan.cta}
        className={`mt-8 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none ${
          plan.popular
            ? "bg-accent text-white shadow-lg shadow-accent-glow hover:brightness-110 hover:-translate-y-0.5"
            : "border border-border-medium text-foreground hover:bg-surface-elevated hover:border-border-medium/80"
        }`}
      />
    </motion.div>
  );
}
