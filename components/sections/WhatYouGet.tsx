import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function WhatYouGet() {
  const t = useTranslations("whatYouGet");
  const items = t.raw("items") as string[];

  return (
    <Section id="what-you-get" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <ul className="mt-10 grid gap-x-12 gap-y-6 border-t border-border/40 pt-8 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3">
              <span className="mono mt-1 text-mint" aria-hidden="true">
                ✓
              </span>
              <span className="text-text">{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
