"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "../../lib/i18n";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-border-subtle px-6 py-12 md:py-16">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7">
              <Image src="/logo.png" alt="Filenest" fill className="object-contain" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">Filenest</span>
          </Link>
          <p className="text-xs text-foreground-dim max-w-xs text-center md:text-left">
            {t("tagline")}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/GenKnot" target="_blank" rel="noopener noreferrer"
            className="text-foreground-dim hover:text-foreground transition-colors" aria-label="GitHub">
            <GithubIcon size={18} />
          </a>
          <a href="https://x.com/GenKnot" target="_blank" rel="noopener noreferrer"
            className="text-foreground-dim hover:text-foreground transition-colors" aria-label="X / Twitter">
            <XIcon size={18} />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground-dim">
          {/* Internal links to the profession pages (tier-2 SEO): keeps them
              crawlable from every page instead of orphaned. */}
          <Link href={`/${locale}/for/immigration-consultants`} className="hover:text-foreground transition-colors">{t("for_ic")}</Link>
          <Link href={`/${locale}/for/lawyers`} className="hover:text-foreground transition-colors">{t("for_law")}</Link>
          <Link href={`/${locale}/for/accountants`} className="hover:text-foreground transition-colors">{t("for_acc")}</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors">{t("privacy")}</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">{t("terms")}</Link>
          <Link href="/refund" className="hover:text-foreground transition-colors">{t("refund")}</Link>
          <a href="mailto:info@mischicat.com" className="hover:text-foreground transition-colors">{t("contact")}</a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border-subtle text-center md:text-left">
        <p className="text-[11px] text-foreground-dim/60">
          &copy; {new Date().getFullYear()} Filenest. {t("copyright")}
        </p>
      </div>
    </footer>
  );
}
