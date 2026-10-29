import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Register() {
  const t = useTranslations("register");
  return (
    <Section id="register" bg="accent" index="05">
      <Reveal>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="h2 h2--on-dark">{t("closedTitle")}</h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-2xl leading-relaxed text-white md:text-3xl">
            {t("closedBody")}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
