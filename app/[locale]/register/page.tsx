import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/sections/Footer";
import RegistrationForm from "@/components/registration/RegistrationForm";
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
  const copy = registrationCopy[locale];
  return { title: copy.metaTitle, description: copy.metaDescription };
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
            <p className="mono mt-12 text-violet">{copy.eyebrow}</p>
            <h1 className="h2 mt-6 max-w-[18ch]">{copy.title}</h1>
            <p className="mt-7 max-w-[62ch] text-lg text-muted md:text-xl">{copy.lede}</p>
          </div>
        </header>

        <section className="container-max py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono text-muted">13 / fields</p>
              <p className="mt-4 max-w-[26ch] text-sm text-muted">{copy.required}</p>
            </aside>
            <RegistrationForm copy={copy} locale={locale as Locale} />
          </div>
        </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
