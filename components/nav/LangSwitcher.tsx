"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const labels: Record<string, string> = {
  en: "EN",
  ru: "RU",
  kk: "KK",
};

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: next });
  }

  return (
    <div className="flex items-center gap-2 mono" aria-label="Language">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span className="text-muted/60" aria-hidden="true">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => switchLocale(l)}
            aria-current={l === locale ? "true" : undefined}
            className={`lang-chip border border-transparent px-2 py-1 transition-colors duration-150 ${
              l === locale
                ? "border border-text text-text"
                : "text-muted hover:text-text"
            }`}
          >
            {labels[l]}
          </button>
        </span>
      ))}
    </div>
  );
}
