import type { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, locales } from "@/i18n/routing";
import { fontVariables } from "@/app/fonts";
import GridLines from "@/components/ui/GridLines";
import Grain from "@/components/ui/Grain";
import "../globals.css";

const SITE_URL = "https://qffca.vercel.app"; // TODO: заменить на боевой домен

const ogLocale: Record<string, string> = {
  en: "en_US",
  ru: "ru_RU",
  kk: "kk_KZ",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      siteName: t("title"),
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
      // TODO: положить реальные PNG 1200×630 в public/og перед анонсом —
      // ссылку постят в LinkedIn IBM Quantum, битое превью увидят десятки тысяч.
      images: [
        {
          url: `/og/og-${locale}.png`,
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`/og/og-${locale}.png`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={`${fontVariables} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="mono sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-mint focus:bg-bg focus:px-4 focus:py-2 focus:text-mint"
          >
            {t("skipToContent")}
          </a>
          <GridLines />
          <Grain />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
