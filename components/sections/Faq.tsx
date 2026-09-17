import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";

export default function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as AccordionItem[];

  return (
    <Section id="faq" bg="tint" index="07">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <div className="mt-10">
          <Accordion items={items} />
        </div>
      </Reveal>
    </Section>
  );
}
