import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function WhatYouGet() {
  const t = useTranslations("whatYouGet");
  const items = t.raw("items") as string[];

  return (
    <Section id="what-you-get" bg="bg" index="02">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item) => (
            <li key={item} className="card-sm flex items-start gap-4 p-5">
              <span
                className="mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-bg"
                style={{ background: "var(--grad-accent)" }}
                aria-hidden="true"
              >
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
