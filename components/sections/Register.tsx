import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { event } from "@/config/event";

/**
 * Второй акцентный экран страницы: та же розово-фиолетовая заливка и те же
 * контуры, что в hero. Текст здесь белый, поэтому кнопка — инверсная,
 * а таблица фактов лежит на полупрозрачном стекле, а не на белой карточке.
 */
export default function Register() {
  const t = useTranslations("register");
  const tc = useTranslations("common");
  const locale = useLocale();
  const registrationHref = event.registrationUrl ?? `/${locale}/register`;

  const rows = [
    { key: "audience", value: t("audience") },
    { key: "deadline", value: event.registrationDeadline ?? tc("tbd") },
    { key: "format", value: event.format ?? tc("tbd") },
  ];

  return (
    <Section id="register" bg="accent" index="05">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="h2 h2--on-dark">{t("title")}</h2>
            <p className="mt-7 max-w-[46ch] text-xl text-white">{t("lede")}</p>
            <p className="mt-4 max-w-[46ch] text-white/75">{t("note")}</p>

            <div className="mt-10">
              <Button href={registrationHref} variant="on-dark">
                {t("cta")}
              </Button>
            </div>
          </div>

          <div className="card-glass p-6 md:p-8">
            <dl>
              {rows.map((row, i) => (
                <div
                  key={row.key}
                  className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 ${
                    i > 0 ? "border-t border-white/20" : "pt-0"
                  }`}
                >
                  <dt className="mono text-white/85">{t(`labels.${row.key}`)}</dt>
                  <dd className="mono text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
