import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import IllustrationSlot from "@/components/ui/IllustrationSlot";

export default function LocaleNotFound() {
  const t = useTranslations("notFound");

  return (
    <main id="main" className="flex flex-1 items-center">
      <div className="container-max py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div>
            <p className="mono text-violet">{t("code")}</p>
            <h1 className="display mt-6">{t("title")}</h1>
            <p className="mt-8 max-w-[52ch] text-xl text-muted">{t("body")}</p>
            <Link
              href="/"
              className="btn btn--secondary mt-10"
            >
              ← {t("cta")}
            </Link>
          </div>

          {/* «Схема со смайликами» — уместна здесь, в hero её не ставим */}
          <IllustrationSlot name="smileys" ratio="square" />
        </div>
      </div>
    </main>
  );
}
