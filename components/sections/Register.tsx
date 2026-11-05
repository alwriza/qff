import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";

export default function Register() {
  const t = useTranslations("register");
  return (
    <Section id="register" bg="accent" index="05">
      <Reveal>
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="h2 h2--on-dark">{t("title")}</h2>
          <p className="mx-auto mt-7 max-w-[58ch] text-2xl leading-relaxed text-white md:text-3xl">
            {t("lede")}
          </p>
          <Link href="/register" className="btn btn--on-dark mt-8">{t("cta")}</Link>
        </div>
      </Reveal>
    </Section>
  );
}
