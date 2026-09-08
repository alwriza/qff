import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { event } from "@/config/event";

export default function Register() {
  const t = useTranslations("register");
  const tc = useTranslations("common");

  const rows = [
    { key: "audience", value: t("audience") },
    { key: "deadline", value: event.registrationDeadline ?? tc("tbd") },
    { key: "format", value: event.format ?? tc("tbd") },
  ];

  return (
    <Section id="register" bg="surface">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="h2">{t("title")}</h2>
            <p className="mt-6 max-w-[46ch] text-text">{t("lede")}</p>
            <p className="mt-4 max-w-[46ch] text-muted">{t("note")}</p>
          </div>

          <div>
            <dl className="border-t border-border/40">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline justify-between gap-6 border-b border-border/40 py-4"
                >
                  <dt className="mono text-muted">{t(`labels.${row.key}`)}</dt>
                  <dd className="mono text-text">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8">
              {/* registrationUrl === null → кнопка disabled с подписью «opens soon» */}
              <Button
                href={event.registrationUrl ?? "#register"}
                disabled={!event.registrationUrl}
                variant="primary"
              >
                {t("cta")}
              </Button>
              {!event.registrationUrl && (
                <p className="mono mt-3 text-muted">{t("opensSoon")}</p>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
