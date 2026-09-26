import { useLocale, useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { event } from "@/config/event";

export default function Register() {
  const t = useTranslations("register");
  const tc = useTranslations("common");
  const locale = useLocale();
  const registrationHref = event.registrationUrl ?? "/" + locale + "/register";
  const format =
    event.format === "hybrid"
      ? t("hybrid")
      : event.format === "in-person"
        ? t("inPerson")
        : tc("tbd");

  return (
    <Section id="register" bg="accent" index="05">
      <Reveal>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="h2 h2--on-dark">{t("title")}</h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-2xl leading-relaxed text-white md:text-3xl">
            {t("lede")}
          </p>
          <p className="mono mt-6 text-white/90">
            {t("labels.deadline")}: {event.registrationDeadline ?? tc("tbd")} {" "}
            <span aria-hidden="true">&middot;</span> {t("labels.format")}: {format}
          </p>
          <p className="mx-auto mt-5 max-w-[64ch] text-base text-white/85 md:text-lg">
            {t("note")}
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={registrationHref} variant="on-dark">
              {t("cta")}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
