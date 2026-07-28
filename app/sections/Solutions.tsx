import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PROFESSIONS = [
  "immigration-consultants",
  "lawyers",
  "accountants",
] as const;

interface UseCaseCopy {
  h1: string;
  intro: string;
}

interface Messages {
  solutions: {
    label: string;
    heading: string;
    description: string;
    learnMore: string;
  };
  useCases: {
    "immigration-consultants": UseCaseCopy;
    lawyers: UseCaseCopy;
    accountants: UseCaseCopy;
  };
}

export default function Solutions({
  locale,
  messages,
}: {
  locale: string;
  messages: Messages;
}) {
  const copy = messages.solutions;

  return (
    <section id="solutions" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-widest text-accent">
            {copy.label}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            {copy.heading}
          </h2>
          <p className="mt-4 text-foreground-muted">{copy.description}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROFESSIONS.map((profession) => {
            const item = messages.useCases[profession];
            return (
              <Link
                key={profession}
                href={`/${locale}/for/${profession}`}
                className="group rounded-2xl border border-border-subtle bg-surface/50 p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-elevated"
              >
                <h3 className="text-xl font-semibold text-foreground">{item.h1}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-foreground-muted">
                  {item.intro}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  {copy.learnMore}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
