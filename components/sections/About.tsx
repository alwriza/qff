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
        <div className="mt-8 max-w-[78ch] space-y-5">
          {body.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-text md:text-xl">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
