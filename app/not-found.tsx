import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import { routing } from "@/i18n/routing";
import messages from "@/content/en.json";
import GridLines from "@/components/ui/GridLines";
import Grain from "@/components/ui/Grain";
import "./globals.css";

/**
 * Корневой 404 — рендерится для путей вне сегмента [locale],
 * поэтому несёт собственные <html>/<body>. Локаль неизвестна,
 * поэтому берём дефолтную (en).
 */
export default function RootNotFound() {
  const t = messages.notFound;

  return (
    <html
      lang={routing.defaultLocale}
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <GridLines />
        <Grain />
        <main className="relative z-10 flex flex-1 items-center">
          <div className="container-max py-24">
            <p className="mono text-coral">{t.code}</p>
            <h1 className="display mt-6">{t.title}</h1>
            <p className="mt-8 max-w-[52ch] text-xl text-muted">{t.body}</p>
            <Link
              href={`/${routing.defaultLocale}`}
              className="mono mt-10 inline-block border border-border px-6 py-3 text-text transition-colors duration-150 hover:border-mint hover:text-mint"
            >
              ← {t.cta}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
