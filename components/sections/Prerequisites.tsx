import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Prerequisites() {
  const t = useTranslations("prerequisites");
  const items = t.raw("items") as string[];

  return (
    <Section id="prerequisites" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <ol className="mt-10 border-t border-border/40">
          {items.map((item, i) => (
            <li
              key={item}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b border-border/40 py-5"
            >
              <span className="mono text-mint" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-text">{item}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
