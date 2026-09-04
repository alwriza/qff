import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Certificates() {
  const t = useTranslations("certificates");

  const levels = [
    { title: t("excellenceTitle"), body: t("excellenceBody") },
    { title: t("completionTitle"), body: t("completionBody") },
  ];

  return (
    <Section id="certificates" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <p className="mt-6 max-w-[58ch] text-muted">{t("lede")}</p>

        <div className="mt-10 grid gap-px border border-border/40 bg-border/40 md:grid-cols-2">
          {levels.map((level) => (
            <div key={level.title} className="bg-bg p-6 md:p-8">
              <p className="mono text-mint">{level.title}</p>
              <p className="mt-4 max-w-[46ch] text-text">{level.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
