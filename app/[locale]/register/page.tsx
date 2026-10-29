import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/sections/Footer";
import { registrationCopy } from "@/config/registration";
import { Link } from "@/i18n/navigation";
import ContourField from "@/components/ui/ContourField";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "register" });
  return { title: `${t("closedTitle")} — Hilbert Space Quantum Fest 2026`, description: t("closedBody") };
}

export default async function RegistrationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const copy = registrationCopy[locale as Locale];
  const t = await getTranslations({ locale, namespace: "register" });

  return (
    <>
      <Nav />
      <div className="relative flex flex-1 flex-col">
        <ContourField />
        <main id="main" className="flex-1">
          <header className="section-tint relative">
          <div className="container-max relative z-10 py-16 md:py-24">
            <Link href="/" className="mono underline-sweep text-violet transition-colors hover:text-text">
              ← {copy.back}
            </Link>
            <p className="mono mt-12 text-violet">Hilbert Space Quantum Fest 2026</p>
            <h1 className="h2 mt-6 max-w-[18ch]">{t("closedTitle")}</h1>
            <p className="mt-7 max-w-[62ch] text-lg text-muted md:text-xl">{t("closedBody")}</p>
          </div>
        </header>
        </main>
        <Footer />
      </div>
    </>
  );
}
