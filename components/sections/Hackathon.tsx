import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

export default function Hackathon() {
  const t = useTranslations("hackathon");
  const rows = [
    { key: "format", value: t("format") },
    { key: "teams", value: t("teams") },
    { key: "span", value: t("span") },
  ];

  return (
    <Section id="hackathon" bg="tint" index="04">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div>
            {/* Градиентный акцент — только на крупном кегле: розовый даёт 3.5:1. */}
            <h2 className="h2"><span className="grad-text">{t("title")}</span></h2>
            <p className="mt-6 max-w-[58ch] text-text">{t("lede")}</p>

            <dl className="card mt-10 px-6 md:px-8">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-2 border-b py-5 last:border-b-0 md:grid-cols-[minmax(0,18ch)_minmax(0,1fr)] md:gap-8"
                  style={{ borderColor: "var(--rule)" }}
                >
                  <dt className="mono text-muted">{t(`labels.${row.key}`)}</dt>
                  <dd className="text-text">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </Reveal>
    </Section>
  );
}
