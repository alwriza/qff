import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { event } from "@/config/event";
import ContourField from "@/components/ui/ContourField";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/sections/Footer";

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
    title: t("cocTitle"),
    description: t("cocDescription"),
  };
}

function CocBody() {
  const t = useTranslations("coc");
  const tc = useTranslations("common");
  const sections = t.raw("sections") as { heading: string; body: string }[];

  return (
    <main id="main" className="flex-1">
      <div className="container-max relative z-10 py-20 md:py-28">
        <h1 className="h2">{t("title")}</h1>
        <p className="mt-6 max-w-[62ch] text-xl text-muted">{t("lede")}</p>

        <div className="card mt-12 px-6 md:px-10">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="grid gap-4 border-b py-8 last:border-b-0 md:grid-cols-[minmax(0,24ch)_minmax(0,1fr)] md:gap-10"
              style={{ borderColor: "var(--rule)" }}
            >
              <h2 className="mono text-violet">{section.heading}</h2>
              <p className="max-w-[70ch] text-text">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <p className="mono text-muted">{t("contactLabel")}</p>
          {event.contactEmail ? (
            <a
              href={`mailto:${event.contactEmail}`}
              className="underline-sweep mt-2 inline-block text-text transition-colors duration-150 hover:text-violet"
            >
              {event.contactEmail}
            </a>
          ) : (
            <p className="mono mt-2 text-text">{tc("tbd")}</p>
          )}
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="mono underline-sweep text-violet transition-colors duration-150 hover:text-text"
          >
            ← {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default async function CodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <div className="relative flex flex-1 flex-col">
        <ContourField />
        <CocBody />
        <Footer />
      </div>
    </>
  );
}
