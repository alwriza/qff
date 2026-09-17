import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function About() {
  const t = useTranslations("about");
  const body = t.raw("body") as string[];

  return (
    <Section id="about" bg="tint" index="01">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            {body.slice(0, 2).map((p) => (
              <p key={p} className="max-w-[60ch] text-text">
                {p}
              </p>
            ))}
          </div>
          <div className="space-y-5">
            {body.slice(2).map((p) => (
              <p key={p} className="max-w-[60ch] text-text">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
